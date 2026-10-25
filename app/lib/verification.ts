// Email verification links. Server-side only.
import { createHash, randomBytes } from 'node:crypto';

// How long a verification link keeps working.
export const VERIFICATION_LINK_DAYS = 7;

// How long someone must wait before asking for another link.
export const RESEND_WAIT_MINUTES = 5;

// Only the hash is stored, so a copy of the database cannot be used to verify accounts.
export function hashToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

// Returns a new random token (for the email) and its hash (for the database).
export function createVerificationToken(): { token: string; tokenHash: string } {
  const token = randomBytes(32).toString('base64url');
  return { token, tokenHash: hashToken(token) };
}

// Tokens are 32 random bytes in base64url, which is always 43 characters.
export function looksLikeToken(token: unknown): token is string {
  return typeof token === 'string' && /^[A-Za-z0-9_-]{43}$/.test(token);
}

// The address the site is served from. Set SITE_URL to control it; otherwise
// Vercel's own variables are used, then localhost for development.
export function siteUrl(): string {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/+$/, '');
  if (process.env.VERCEL_ENV === 'production' && process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'http://localhost:3000';
}

export function verificationLink(token: string): string {
  return `${siteUrl()}/new-client/verify?token=${token}`;
}
