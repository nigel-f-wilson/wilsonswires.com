'use server';

import { getDb } from '@/app/lib/db';
import { sendNewClientEmails, sendVerificationEmail } from '@/app/lib/email';
import { newClientSchema, type NewClientField } from '@/app/lib/validation';
import {
  RESEND_WAIT_MINUTES, VERIFICATION_LINK_DAYS,
  createVerificationToken, hashToken, looksLikeToken, verificationLink,
} from '@/app/lib/verification';
import { z } from 'zod';

export interface NewClientFormState {
  status: 'idle' | 'success' | 'error';
  // Whether the confirmation email went out (only set on success).
  confirmationSent?: boolean;
  // A message about the form as a whole.
  message?: string;
  // Messages about individual fields, keyed by field name.
  errors?: Partial<Record<NewClientField, string>>;
  // What the visitor typed, so the form can be refilled after an error.
  values?: Partial<Record<NewClientField, string>>;
}

const FIELDS: NewClientField[] = [
  'clientType', 'name', 'businessName', 'email', 'phone',
  'billingStreet', 'billingUnit', 'billingCity', 'billingState', 'billingZip',
];

const POSTGRES_UNIQUE_VIOLATION = '23505';

export async function createClient(
  previousState: NewClientFormState,
  formData: FormData,
): Promise<NewClientFormState> {
  const values: Partial<Record<NewClientField, string>> = {};
  for (const field of FIELDS) {
    const value = formData.get(field);
    values[field] = typeof value === 'string' ? value : '';
  }

  // Spam trap: real visitors never see or fill this field, so pretend it worked.
  if (formData.get('website')) {
    return { status: 'success' };
  }

  const parsed = newClientSchema.safeParse(values);
  if (!parsed.success) {
    const errors: Partial<Record<NewClientField, string>> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as NewClientField;
      // Keep the first message for each field.
      errors[field] ??= issue.message;
    }
    return { status: 'error', message: 'Please fix the highlighted fields and try again.', errors, values };
  }

  const client = parsed.data;
  // The account is saved now, unverified. Clicking the emailed link verifies it.
  const { token, tokenHash } = createVerificationToken();
  try {
    const sql = getDb();
    await sql`
      INSERT INTO clients (
        client_type, name, business_name, email, phone,
        billing_street, billing_unit, billing_city, billing_state, billing_zip,
        verification_token_hash, verification_expires_at, verification_sent_at
      ) VALUES (
        ${client.clientType}, ${client.name}, ${client.businessName}, ${client.email}, ${client.phone},
        ${client.billingStreet}, ${client.billingUnit}, ${client.billingCity}, ${client.billingState}, ${client.billingZip},
        ${tokenHash}, now() + make_interval(days => ${VERIFICATION_LINK_DAYS}), now()
      )
    `;
  } catch (error) {
    if ((error as { code?: string }).code === POSTGRES_UNIQUE_VIOLATION) {
      return {
        status: 'error',
        message: 'We already have a client account with that email address. If you have not confirmed it yet, check your inbox for our email. Call us at 504-323-4935 if you need to update your information.',
        errors: { email: 'This email address is already registered.' },
        values,
      };
    }
    console.error('Failed to save new client', error);
    return {
      status: 'error',
      message: 'Something went wrong on our end and your information was not saved. Please try again, or call us at 504-323-4935.',
      values,
    };
  }

  // The account is saved at this point; a failed email is logged, not shown.
  const confirmationSent = await sendNewClientEmails(client, verificationLink(token));

  return { status: 'success', confirmationSent };
}


export interface VerifyEmailState {
  status: 'idle' | 'verified' | 'already-verified' | 'expired' | 'invalid' | 'error';
}

// Runs when the visitor presses the button on the page their emailed link opens.
export async function verifyEmail(
  previousState: VerifyEmailState,
  formData: FormData,
): Promise<VerifyEmailState> {
  const token = formData.get('token');
  if (!looksLikeToken(token)) {
    return { status: 'invalid' };
  }
  try {
    const sql = getDb();
    const tokenHash = hashToken(token);
    const verified = await sql`
      UPDATE clients
      SET email_verified_at = now()
      WHERE verification_token_hash = ${tokenHash}
        AND email_verified_at IS NULL
        AND verification_expires_at > now()
      RETURNING id
    `;
    if (verified.length > 0) {
      return { status: 'verified' };
    }
    // Nothing changed: find out why, so the page can say something useful.
    const [client] = await sql`
      SELECT email_verified_at FROM clients WHERE verification_token_hash = ${tokenHash}
    `;
    if (!client) return { status: 'invalid' };
    return { status: client.email_verified_at ? 'already-verified' : 'expired' };
  } catch (error) {
    console.error('Failed to verify email', error);
    return { status: 'error' };
  }
}

export interface ResendVerificationState {
  status: 'idle' | 'done' | 'error';
  message?: string;
}

// Emails a fresh link. The reply is the same whether or not the address is on
// file, so this cannot be used to find out who our clients are.
export async function resendVerification(
  previousState: ResendVerificationState,
  formData: FormData,
): Promise<ResendVerificationState> {
  const parsed = z.string().trim().toLowerCase().email().max(254).safeParse(formData.get('email'));
  if (!parsed.success) {
    return { status: 'error', message: 'That does not look like an email address.' };
  }
  const done: ResendVerificationState = {
    status: 'done',
    message: 'If that address has an account waiting to be confirmed, a new link is on its way. Please check your inbox.',
  };
  try {
    const sql = getDb();
    const { token, tokenHash } = createVerificationToken();
    // Replaces the old link. Skipped when the account is already verified or a
    // link was sent in the last few minutes.
    const [client] = await sql`
      UPDATE clients
      SET verification_token_hash = ${tokenHash},
          verification_expires_at = now() + make_interval(days => ${VERIFICATION_LINK_DAYS}),
          verification_sent_at = now()
      WHERE email = ${parsed.data}
        AND email_verified_at IS NULL
        AND (verification_sent_at IS NULL OR verification_sent_at < now() - make_interval(mins => ${RESEND_WAIT_MINUTES}))
      RETURNING name, email
    `;
    if (client) {
      await sendVerificationEmail(client.email, client.name, verificationLink(token));
    }
    return done;
  } catch (error) {
    console.error('Failed to resend verification email', error);
    return { status: 'error', message: 'Something went wrong on our end. Please try again, or call us at 504-323-4935.' };
  }
}
