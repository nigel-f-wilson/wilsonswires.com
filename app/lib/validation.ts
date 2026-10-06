// Validation rules for the New Client form. Used on the server before saving.
import { z } from 'zod';

export const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS',
  'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC',
  'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
] as const;

// Reduces "(504) 323-4935", "504.323.4935" or "+1 504 323 4935" to "5043234935".
// Returns null when the entry could not be a US phone number.
export function normalizePhone(input: string): string | null {
  if (/[^0-9()+\-.\s]/.test(input)) return null;
  let digits = input.replace(/\D/g, '');
  if (digits.length === 11 && digits.startsWith('1')) digits = digits.slice(1);
  // Area codes and exchanges never start with 0 or 1.
  return /^[2-9]\d{2}[2-9]\d{6}$/.test(digits) ? digits : null;
}

// "5043234935" -> "504-323-4935"
export function formatPhone(digits: string): string {
  return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
}

const requiredText = (message: string, max = 200) =>
  z.string().trim().min(1, message).max(max, 'That entry is too long.');

const optionalText = (max = 200) =>
  z.string().trim().max(max, 'That entry is too long.').transform((value) => value || null);

export const newClientSchema = z
  .object({
    clientType: z.enum(['personal', 'business'], {
      errorMap: () => ({ message: 'Please choose personal or business.' }),
    }),
    name: requiredText('Please enter your first and last name.'),
    businessName: optionalText(),
    email: z
      .string()
      .trim()
      .toLowerCase()
      .min(1, 'Please enter your email address.')
      .max(254, 'That entry is too long.')
      .email('That does not look like an email address.'),
    phone: z
      .string()
      .trim()
      .min(1, 'Please enter your phone number.')
      .transform((value, ctx) => {
        const digits = normalizePhone(value);
        if (!digits) {
          ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Please enter a 10-digit phone number.' });
          return z.NEVER;
        }
        return digits;
      }),
    billingStreet: requiredText('Please enter the street address.'),
    billingUnit: optionalText(50),
    billingCity: requiredText('Please enter the city.', 100),
    billingState: z
      .string()
      .trim()
      .toUpperCase()
      .refine((value) => (US_STATES as readonly string[]).includes(value), 'Please choose a state.'),
    billingZip: z
      .string()
      .trim()
      .regex(/^\d{5}(-\d{4})?$/, 'Please enter a 5-digit ZIP code.'),
  })
  .superRefine((client, ctx) => {
    if (client.clientType === 'business' && !client.businessName) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['businessName'],
        message: 'Please enter the name of the business.',
      });
    }
  })
  // A business name left over from switching back to "personal" is not saved.
  .transform((client) => ({
    ...client,
    businessName: client.clientType === 'business' ? client.businessName : null,
  }));

export type NewClient = z.infer<typeof newClientSchema>;
export type NewClientField = keyof NewClient;
