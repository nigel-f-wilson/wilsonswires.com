'use client';

// Hooks
import React, { useActionState } from 'react';

// ICONS
import { CheckCircleIcon, EnvelopeIcon } from '@heroicons/react/20/solid';

// Server Actions
import {
  resendVerification, verifyEmail,
  type ResendVerificationState, type VerifyEmailState,
} from '@/app/lib/actions';


// STYLE CLASSES
const cardClasses = "flex flex-col flex-1 items-center rounded-lg bg-gray-50 p-8 mx-4 mb-8 text-center"
const buttonClasses = "flex h-10 w-fit items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
const inputClasses = "peer block w-full rounded-md border border-gray-200 pl-4 text-sm sm:text-lg placeholder:text-gray-500 outline-2 "


const initialResendState: ResendVerificationState = { status: 'idle' };

// Lets someone whose link no longer works ask for a new one.
const ResendForm: React.FC = ({}) => {
  const [state, formAction, isPending] = useActionState(resendVerification, initialResendState);

  if (state.status === 'done') {
    return <p role="status" className="text-lg">{state.message}</p>;
  }

  return (
    <form action={formAction} className="flex flex-col items-center w-full max-w-xl">
      <label className="flex flex-col w-full mb-4 text-left" >
        <span className="text-xl mb-1">Email Address:</span>
        <input id="email" type="email" name="email"
          className={inputClasses}
          placeholder="The email address you signed up with"
          autoComplete="email"
          maxLength={254}
          required
        />
      </label>
      {state.message && (
        <p role="alert" className="mb-4 text-sm sm:text-base font-medium text-red-main">{state.message}</p>
      )}
      <button type="submit" aria-disabled={isPending} disabled={isPending} className={buttonClasses}>
        <EnvelopeIcon className="mr-4 h-5 w-5 text-gray-50 " />
        {isPending ? "Sending..." : "Send a New Link"}
      </button>
    </form>
  );
}


interface VerifyEmailFormProps {
  token: string;
}

const initialVerifyState: VerifyEmailState = { status: 'idle' };

const VerifyEmailForm: React.FC<VerifyEmailFormProps> = ({ token }) => {
  const [state, formAction, isPending] = useActionState(verifyEmail, initialVerifyState);

  // SUCCESS
  if (state.status === 'verified' || state.status === 'already-verified') {
    return (
      <div id="verify-email-success" role="status" className={cardClasses}>
        <CheckCircleIcon className="h-12 w-12 text-blue-main mb-4" />
        <span className="text-3xl mb-2">
          {state.status === 'verified' ? "Your email is confirmed." : "Your email was already confirmed."}
        </span>
        <span className="text-lg">Thank you! Your client account is all set.</span>
      </div>
    );
  }

  // LINK DID NOT WORK
  if (!token || state.status === 'invalid' || state.status === 'expired') {
    return (
      <div id="verify-email-failed" className={cardClasses}>
        <span role="alert" className="text-3xl mb-2">
          {state.status === 'expired' ? "This link has expired." : "This link is not valid."}
        </span>
        <span className="text-lg mb-6">
          Enter your email address and we will send you a new one. If you keep having trouble, call us at 504-323-4935.
        </span>
        <ResendForm />
      </div>
    );
  }

  // CONFIRM BUTTON
  // Pressing a button, not just opening the page, is what confirms the address.
  // Email scanners that open every link in a message cannot confirm it by accident.
  return (
    <form action={formAction} className={cardClasses}>
      <span className="text-3xl mb-2">Almost done!</span>
      <span className="text-lg mb-6">Press the button to confirm your email address.</span>
      <input type="hidden" name="token" value={token} />
      {state.status === 'error' && (
        <p role="alert" className="mb-4 text-base sm:text-lg font-medium text-red-main">
          Something went wrong on our end. Please try again, or call us at 504-323-4935.
        </p>
      )}
      <button type="submit" aria-disabled={isPending} disabled={isPending} className={buttonClasses}>
        <CheckCircleIcon className="mr-4 h-5 w-5 text-gray-50 " />
        {isPending ? "Confirming..." : "Confirm My Email"}
      </button>
    </form>
  );
}

export default VerifyEmailForm;
