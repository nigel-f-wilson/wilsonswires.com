'use client';

// Hooks
import React, { useActionState, useState } from 'react';

// ICONS
import { CheckCircleIcon, UserPlusIcon } from '@heroicons/react/20/solid';

// Server Actions
import { createClient, type NewClientFormState } from '@/app/lib/actions';
import { US_STATES, type NewClientField } from '@/app/lib/validation';


// STYLE CLASSES
const formItemClasses = "flex flex-col sm:flex-row mb-4"
const inputClasses = "peer block w-full rounded-md border border-gray-200 pl-4 text-sm sm:text-lg placeholder:text-gray-500 outline-2 aria-[invalid=true]:border-red-main"


interface FormLabelProps {
  label: string;
}

const FormLabel: React.FC<FormLabelProps> = ({ label }) => {
  return (
    <span className="text-2xl mb-1 md:mb-2 mr-4 text-nowrap">
      {label}
    </span>
  );
}

interface FieldErrorProps {
  id: string;
  message?: string;
}

const FieldError: React.FC<FieldErrorProps> = ({ id, message }) => {
  if (!message) return null;
  return (
    <p id={id} className="-mt-3 mb-4 text-sm sm:text-base font-medium text-red-main">
      {message}
    </p>
  );
}

interface TextFieldProps {
  label: string;
  name: NewClientField;
  placeholder: string;
  state: NewClientFormState;
  type?: string;
  autoComplete?: string;
  inputMode?: 'text' | 'email' | 'tel' | 'numeric';
  pattern?: string;
  title?: string;
  maxLength?: number;
  required?: boolean;
}

const TextField: React.FC<TextFieldProps> = ({ label, name, placeholder, state, type = "text", required = true, ...inputProps }) => {
  const error = state.errors?.[name];
  const errorId = `${name}-error`;
  return (
    <>
      <label className={formItemClasses} >
        <FormLabel label={label} />
        <input id={name} type={type} name={name}
          className={inputClasses}
          placeholder={placeholder}
          defaultValue={state.values?.[name] ?? ""}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          {...inputProps}
        />
      </label>
      <FieldError id={errorId} message={error} />
    </>
  );
}

interface RadioProps {
  label: string;
  value: string;
  name: string;
  onChange: (value: string) => void;
  defaultChecked?: boolean;
}

// Uncontrolled, so that it refills from the server's reply like the other inputs.
const Radio: React.FC<RadioProps> = ({ label, value, name, onChange, defaultChecked }) => {
  return (
    <label className="flex items-center cursor-pointer">
      <input
        type="radio"
        name={name}
        value={value}
        onChange={() => onChange(value)}
        defaultChecked={defaultChecked}
        required
        className="sr-only peer"
      />
      <div className="w-4 h-4 rounded-full border border-gray-300 peer-checked:bg-blue-500 peer-checked:border-blue-500 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-blue-500"></div>
      <span className="ml-2 text-gray-700">{label}</span>
    </label>
  );
};


const initialState: NewClientFormState = { status: 'idle' };

const NewClientForm: React.FC = ({}) => {
  const [state, formAction, isPending] = useActionState(createClient, initialState);
  const [clientType, setClientType] = useState(state.values?.clientType ?? "");

  if (state.status === 'success') {
    return (
      <div id="new-client-success" role="status" className="flex flex-col flex-1 items-center rounded-lg bg-gray-50 p-8 mx-4 mb-8 text-center">
        <CheckCircleIcon className="h-12 w-12 text-blue-main mb-4" />
        <span className="text-3xl mb-2">Thank you!</span>
        <span className="text-lg">
          Your information has been saved{state.confirmationSent ? " and a confirmation email is on its way" : ""}. We will be in touch soon.
        </span>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="flex flex-col flex-1 rounded-lg bg-gray-50 p-4 mx-4 mb-8"
    >

      {/* FORM-WIDE ERROR */}
      {state.message && (
        <p role="alert" className="mb-4 rounded-md border border-red-main bg-white p-3 text-base sm:text-lg font-medium text-red-main">
          {state.message}
        </p>
      )}

      {/* PERSONAL OR BUSINESS */}
      <fieldset className="mb-4" aria-describedby={state.errors?.clientType ? "clientType-error" : undefined}>
        <legend><FormLabel label="Who is this work for?" /></legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 p-4 text-black">
          <Radio label="Myself or my household" value="personal" name="clientType" onChange={setClientType} defaultChecked={state.values?.clientType === 'personal'} />
          <Radio label="A business or organization" value="business" name="clientType" onChange={setClientType} defaultChecked={state.values?.clientType === 'business'} />
        </div>
      </fieldset>
      <FieldError id="clientType-error" message={state.errors?.clientType} />

      {/* NAME */}
      <TextField label="Your Name:" name="name" state={state}
        placeholder="Enter your first and last name"
        autoComplete="name"
        maxLength={200}
      />

      {/* BUSINESS NAME */}
      {clientType === 'business' && (
        <TextField label="Business Name:" name="businessName" state={state}
          placeholder="Name of the business you represent"
          autoComplete="organization"
          maxLength={200}
        />
      )}

      {/* EMAIL */}
      <TextField label="Email Address:" name="email" state={state} type="email"
        placeholder="Enter your email address"
        autoComplete="email"
        inputMode="email"
        maxLength={254}
      />

      {/* PHONE NUMBER */}
      <TextField label="Phone Number:" name="phone" state={state} type="tel"
        placeholder="504-555-0123"
        autoComplete="tel"
        inputMode="tel"
        pattern="[0-9\(\)+.\s\-]{10,20}"
        title="A 10-digit phone number, like 504-555-0123"
        maxLength={20}
      />

      {/* BILLING ADDRESS */}
      <TextField label="Billing Address:" name="billingStreet" state={state}
        placeholder="Street address to send invoices to"
        autoComplete="billing address-line1"
        maxLength={200}
      />
      <TextField label="Apt / Suite:" name="billingUnit" state={state}
        placeholder="Apartment, suite, or unit (optional)"
        autoComplete="billing address-line2"
        maxLength={50}
        required={false}
      />
      <TextField label="City:" name="billingCity" state={state}
        placeholder="City"
        autoComplete="billing address-level2"
        maxLength={100}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-6">
        <div>
          {/* STATE */}
          <label className={formItemClasses} >
            <FormLabel label="State:" />
            <select id="billingState" name="billingState"
              className={inputClasses}
              defaultValue={state.values?.billingState || "LA"}
              autoComplete="billing address-level1"
              required
              aria-invalid={state.errors?.billingState ? true : undefined}
              aria-describedby={state.errors?.billingState ? "billingState-error" : undefined}
            >
              {US_STATES.map((abbreviation) => (
                <option key={abbreviation} value={abbreviation}>{abbreviation}</option>
              ))}
            </select>
          </label>
          <FieldError id="billingState-error" message={state.errors?.billingState} />
        </div>
        <div>
          {/* ZIP */}
          <TextField label="ZIP Code:" name="billingZip" state={state}
            placeholder="70117"
            autoComplete="billing postal-code"
            inputMode="numeric"
            pattern="[0-9]{5}(-[0-9]{4})?"
            title="A 5-digit ZIP code"
            maxLength={10}
          />
        </div>
      </div>

      {/* SPAM TRAP: hidden from people, filled in by bots */}
      <div className="hidden" aria-hidden="true">
        <label>
          Leave this field empty
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="flex w-full justify-center" >
        <button type="submit" aria-disabled={isPending} disabled={isPending} className="flex h-10 w-fit items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50">
          <UserPlusIcon className="mr-4 h-5 w-5 text-gray-50 " />
          {isPending ? "Saving..." : "Create Account"}
        </button>
      </div>
    </form>
  );
}

export default NewClientForm;
