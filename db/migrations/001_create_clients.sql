-- Clients: one row per person or business that requests work.

CREATE TABLE clients (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_type    text NOT NULL CHECK (client_type IN ('personal', 'business')),
  name           text NOT NULL,              -- the person requesting work
  business_name  text,                       -- required when client_type = 'business'
  email          text NOT NULL,              -- stored lowercase
  phone          text NOT NULL CHECK (phone ~ '^[0-9]{10}$'),  -- 10 digits, no punctuation
  billing_street text NOT NULL,
  billing_unit   text,
  billing_city   text NOT NULL,
  billing_state  text NOT NULL CHECK (billing_state ~ '^[A-Z]{2}$'),
  billing_zip    text NOT NULL CHECK (billing_zip ~ '^[0-9]{5}(-[0-9]{4})?$'),
  created_at     timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT business_has_name CHECK (client_type = 'personal' OR business_name IS NOT NULL)
);

-- One account per email address.
CREATE UNIQUE INDEX clients_email_key ON clients (email);
