// Email sending through Resend (https://resend.com). Server-side only.
import { formatPhone, type NewClient } from '@/app/lib/validation';
import { VERIFICATION_LINK_DAYS } from '@/app/lib/verification';

const RESEND_ENDPOINT = 'https://api.resend.com/emails';

interface Email {
  to: string;
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
}

// Returns true when Resend accepted the message. Never throws.
async function sendEmail(email: Email): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  if (!apiKey || !from) {
    console.warn(`Email not sent (RESEND_API_KEY or EMAIL_FROM is not set): "${email.subject}"`);
    return false;
  }
  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [email.to],
        subject: email.subject,
        text: email.text,
        html: email.html,
        reply_to: email.replyTo,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) {
      console.error(`Resend rejected "${email.subject}": ${response.status} ${await response.text()}`);
      return false;
    }
    return true;
  } catch (error) {
    console.error(`Failed to send "${email.subject}"`, error);
    return false;
  }
}

// Makes text typed by a visitor safe to place inside HTML.
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function summaryLines(client: NewClient): [string, string][] {
  const address = [
    client.billingStreet + (client.billingUnit ? `, ${client.billingUnit}` : ''),
    `${client.billingCity}, ${client.billingState} ${client.billingZip}`,
  ].join(', ');
  const lines: [string, string][] = [['Name', client.name]];
  if (client.businessName) lines.push(['Business', client.businessName]);
  lines.push(['Email', client.email], ['Phone', formatPhone(client.phone)], ['Billing address', address]);
  return lines;
}

function toText(lines: [string, string][]): string {
  return lines.map(([label, value]) => `${label}: ${value}`).join('\n');
}

function toHtml(lines: [string, string][]): string {
  const rows = lines
    .map(([label, value]) => `<tr><td style="padding:2px 12px 2px 0;color:#555">${label}</td><td>${escapeHtml(value)}</td></tr>`)
    .join('');
  return `<table style="border-collapse:collapse">${rows}</table>`;
}

const SIGN_OFF_TEXT = "Wilson's Wires LLC\n2033 Port Street, New Orleans, LA 70117\nLouisiana License #79644";
const SIGN_OFF_HTML = "<p>Wilson's Wires LLC<br>2033 Port Street, New Orleans, LA 70117<br>Louisiana License #79644</p>";

function verifyText(verifyUrl: string): string {
  return `Please confirm your email address by opening this link:\n${verifyUrl}\n\nThe link works for ${VERIFICATION_LINK_DAYS} days. If you did not fill out our New Client form, you can ignore this email.`;
}

function verifyHtml(verifyUrl: string): string {
  const url = escapeHtml(verifyUrl);
  return [
    `<p><a href="${url}" style="display:inline-block;padding:10px 18px;background:#002abc;color:#ffffff;border-radius:8px;text-decoration:none;font-weight:600">Confirm my email address</a></p>`,
    `<p style="color:#555">Or copy this link into your browser:<br>${url}</p>`,
    `<p style="color:#555">The link works for ${VERIFICATION_LINK_DAYS} days. If you did not fill out our New Client form, you can ignore this email.</p>`,
  ].join('\n');
}

// Sends the confirmation, with its verification link, to the new client and,
// when EMAIL_NOTIFY_TO is set, a notice to the office. A failure here never
// undoes the saved account.
// Returns true when the client's confirmation was accepted for delivery.
export async function sendNewClientEmails(client: NewClient, verifyUrl: string): Promise<boolean> {
  const lines = summaryLines(client);
  const notifyTo = process.env.EMAIL_NOTIFY_TO;

  const confirmation = sendEmail({
    to: client.email,
    subject: "Confirm your email for Wilson's Wires",
    replyTo: notifyTo,
    text: [
      `Hello ${client.name},`,
      "Thank you for setting up a client account with Wilson's Wires.",
      verifyText(verifyUrl),
      'Here is the information we have on file:',
      toText(lines),
      'If anything looks wrong, or you have questions, call us at 504-323-4935.',
      SIGN_OFF_TEXT,
    ].join('\n\n'),
    html: [
      `<p>Hello ${escapeHtml(client.name)},</p>`,
      "<p>Thank you for setting up a client account with Wilson's Wires.</p>",
      verifyHtml(verifyUrl),
      '<p>Here is the information we have on file:</p>',
      toHtml(lines),
      '<p>If anything looks wrong, or you have questions, call us at <a href="tel:504-323-4935">504-323-4935</a>.</p>',
      SIGN_OFF_HTML,
    ].join('\n'),
  });

  const notice = notifyTo
    ? sendEmail({
        to: notifyTo,
        subject: `New client: ${client.businessName ?? client.name}`,
        replyTo: client.email,
        text: `A new ${client.clientType} client signed up on the website. Their email address is not verified yet.\n\n${toText(lines)}`,
        html: `<p>A new ${client.clientType} client signed up on the website. Their email address is not verified yet.</p>\n${toHtml(lines)}`,
      })
    : Promise.resolve(false);

  const [confirmationSent] = await Promise.all([confirmation, notice]);
  return confirmationSent;
}

// Sends a fresh verification link to a client who asked for another one.
export async function sendVerificationEmail(to: string, name: string, verifyUrl: string): Promise<boolean> {
  return sendEmail({
    to,
    subject: "Confirm your email for Wilson's Wires",
    replyTo: process.env.EMAIL_NOTIFY_TO,
    text: [
      `Hello ${name},`,
      'Here is a new link to confirm your client account.',
      verifyText(verifyUrl),
      'Questions? Call us at 504-323-4935.',
      SIGN_OFF_TEXT,
    ].join('\n\n'),
    html: [
      `<p>Hello ${escapeHtml(name)},</p>`,
      '<p>Here is a new link to confirm your client account.</p>',
      verifyHtml(verifyUrl),
      '<p>Questions? Call us at <a href="tel:504-323-4935">504-323-4935</a>.</p>',
      SIGN_OFF_HTML,
    ].join('\n'),
  });
}
