// Email sending through Resend (https://resend.com). Server-side only.
import { formatPhone, type NewClient } from '@/app/lib/validation';

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

// Sends the confirmation to the new client and, when EMAIL_NOTIFY_TO is set,
// a notice to the office. A failure here never undoes the saved account.
// Returns true when the client's confirmation was accepted for delivery.
export async function sendNewClientEmails(client: NewClient): Promise<boolean> {
  const lines = summaryLines(client);
  const notifyTo = process.env.EMAIL_NOTIFY_TO;

  const confirmation = sendEmail({
    to: client.email,
    subject: "Welcome to Wilson's Wires",
    replyTo: notifyTo,
    text: [
      `Hello ${client.name},`,
      "Thank you for setting up a client account with Wilson's Wires. Here is the information we have on file:",
      toText(lines),
      'If anything looks wrong, or you have questions, call us at 504-323-4935.',
      "Wilson's Wires LLC\n2033 Port Street, New Orleans, LA 70117\nLouisiana License #79644",
    ].join('\n\n'),
    html: [
      `<p>Hello ${escapeHtml(client.name)},</p>`,
      "<p>Thank you for setting up a client account with Wilson's Wires. Here is the information we have on file:</p>",
      toHtml(lines),
      '<p>If anything looks wrong, or you have questions, call us at <a href="tel:504-323-4935">504-323-4935</a>.</p>',
      "<p>Wilson's Wires LLC<br>2033 Port Street, New Orleans, LA 70117<br>Louisiana License #79644</p>",
    ].join('\n'),
  });

  const notice = notifyTo
    ? sendEmail({
        to: notifyTo,
        subject: `New client: ${client.businessName ?? client.name}`,
        replyTo: client.email,
        text: `A new ${client.clientType} client signed up on the website.\n\n${toText(lines)}`,
        html: `<p>A new ${client.clientType} client signed up on the website.</p>\n${toHtml(lines)}`,
      })
    : Promise.resolve(false);

  const [confirmationSent] = await Promise.all([confirmation, notice]);
  return confirmationSent;
}
