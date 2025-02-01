'use client';

import React, { useState } from 'react';

import { EnvelopeIcon } from '@heroicons/react/20/solid';

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

interface RadioButtonProps {
  label: string;
  selected: boolean;
} 

  
export default function Page() {
  const [addressesAreSame, setAddressesAreSame] = useState(false);

  const formItemClasses = "flex flex-col sm:flex-row mb-4"
  const inputClasses = "peer block w-full rounded-md border border-gray-200 py-[9px] pl-4 text-sm outline-2 placeholder:text-gray-500"
  

  return (
    <main id="contact-page" className="flex flex-col">
      {/* HEADER TEXT */}
      <div id="header-text" className="flex justify-center p-8 text-black leading-none text-[3.5rem] sm:text-[6rem] md:text-[8rem] lg:text-[9rem] xl:text-[10rem] xl:pr-4">
        Contact Us
      </div>
      <form
        action="https://formspree.io/f/xovqrrpq"
        method="POST"
        className="flex flex-col flex-1 rounded-lg bg-gray-50 p-4 mx-4 mb-8"
      >
        
        {/* NAME */}
        <label className={formItemClasses} >
          <FormLabel label="Your Name:" />
          <input id="name" type="name" name="name"
            className={inputClasses}
            placeholder="Enter your first and last name"
            required
          />
        </label>

        {/* EMAIL */}
        <label className={formItemClasses} >
          <FormLabel label="Email Address:" />
          <input id="email" type="email" name="email"
            className={inputClasses}
            placeholder="Enter your email address"
            required
          />
        </label>

        {/* PHONE NUMBER */}
        <label className={formItemClasses} >
          <FormLabel label="Phone Number:" />
          <input id="phone" type="phone" name="phone"
            className={inputClasses}
            placeholder="Enter your phone number"
            required
          />
        </label>

        {/* PROJECT ADDRESS */}
        <label className={formItemClasses} >
          <FormLabel label="Project Address:" />
          <input id="projectAddress" type="projectAddress" name="projectAddress"
            className={inputClasses}
            placeholder="Address where you need work done"
            required
          />
        </label>

        {/* ADDRESSES ARE SAME */}
        <label className={`flex cursor-pointer relative ${formItemClasses}`} >
          <div className='flex items-center'>
            <input type="checkbox" id="check"
              checked={addressesAreSame} 
              onChange={() => setAddressesAreSame(!addressesAreSame)} 
              data-collapse-target="collapse"
              className="peer h-5 w-5 transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-slate-800 checked:border-slate-800 mr-4"  />
              {/* <span className="absolute text-black opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" stroke-width="1">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
              </span> */}
              <span className="">Billing address is the same as the address where work will be performed.</span>
            </div>
        </label>

        {/* BILLING ADDRESS */}
        <label 
          data-collapse="collapse"
          className={`block h-0 w-full basis-full overflow-hidden transition-all duration-300 ease-in-out ${formItemClasses}`} 
        >
          <FormLabel label="Billing Address:" />
          <input id="projectAddress" type="projectAddress" name="projectAddress"
            className={inputClasses}
            placeholder="Address you want invoice sent to"
            required
          />
        </label>

        
        {/* MESSAGE */}
        <label className={formItemClasses} >
          <FormLabel label="What can we do for you?" />
          <textarea 
            name="message" 
            placeholder="Describe your project. The more detail the better. "
            required
            className={inputClasses}
          />
        </label>

        <button type="submit" className="mt-4 w-full">
          Send <EnvelopeIcon className="ml-auto h-5 w-5 text-gray-50" />
        </button>
        <div className="flex h-8 items-end space-x-1">
          {/* Add form errors here */}
        </div>
      </form>

    </main>
  );
}