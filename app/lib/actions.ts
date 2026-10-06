'use server';

import { getDb } from '@/app/lib/db';
import { newClientSchema, type NewClientField } from '@/app/lib/validation';

export interface NewClientFormState {
  status: 'idle' | 'success' | 'error';
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
  try {
    const sql = getDb();
    await sql`
      INSERT INTO clients (
        client_type, name, business_name, email, phone,
        billing_street, billing_unit, billing_city, billing_state, billing_zip
      ) VALUES (
        ${client.clientType}, ${client.name}, ${client.businessName}, ${client.email}, ${client.phone},
        ${client.billingStreet}, ${client.billingUnit}, ${client.billingCity}, ${client.billingState}, ${client.billingZip}
      )
    `;
  } catch (error) {
    if ((error as { code?: string }).code === POSTGRES_UNIQUE_VIOLATION) {
      return {
        status: 'error',
        message: 'We already have a client account with that email address. Call us at 504-323-4935 if you need to update it.',
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

  return { status: 'success' };
}
