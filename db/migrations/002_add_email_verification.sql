-- Email verification. A client row is saved as soon as the form is submitted;
-- email_verified_at stays empty until they click the link in their email.

ALTER TABLE clients
  ADD COLUMN email_verified_at       timestamptz,  -- empty = not verified yet
  ADD COLUMN verification_token_hash text,         -- SHA-256 of the token in the emailed link
  ADD COLUMN verification_expires_at timestamptz,  -- the link stops working after this
  ADD COLUMN verification_sent_at    timestamptz;  -- when the latest link was emailed

CREATE UNIQUE INDEX clients_verification_token_hash_key ON clients (verification_token_hash);
