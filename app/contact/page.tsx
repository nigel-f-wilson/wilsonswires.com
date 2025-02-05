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

interface RadioProps {
  label: string;
  value: string;
  name: string;
  onChange: (value: string) => void;
  checked?: boolean;
}

const Radio: React.FC<RadioProps> = ({ label, value, name, onChange, checked }) => {
  return (
    <label className="flex items-center">
      <input
        type="radio"
        name={name}
        value={value}
        onChange={() => onChange(value)}
        checked={checked}
        className="hidden peer" 
      />
      <div className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center peer-checked:bg-blue-500 peer-checked:border-blue-500">
        <div className="w-2 h-2 rounded-full bg-blue-500 peer-checked:block hidden"></div>
      </div>
      <span className="ml-2 text-gray-700">{label}</span>
    </label>
  );
};

  
export default function Page() {
  const [addressesAreSame, setAddressesAreSame] = useState(false);
  const [howYouHeardAboutUs, setHowYouHeardAboutUs] = useState("");

  const handleHowYouHeardChange = (value: string) => {
    setHowYouHeardAboutUs(value);
  };

  // STyLE CLASSES
  const formItemClasses = "flex flex-col sm:flex-row mb-4"
  const inputClasses = "peer block w-full rounded-md border border-gray-200 pl-4 text-sm sm:text-lg placeholder:text-gray-500 outline-2 "
  

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
              onChange={(e) => setAddressesAreSame(e.target.checked)} 
              data-collapse-target="collapse"
              className="peer h-5 w-5 transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-slate-800 checked:border-slate-800 mr-4"  />
              <span className="">Billing address is the same as the address where work will be performed.</span>
            </div>
        </label>

        {/* BILLING ADDRESS */}
        {!addressesAreSame && (
          <label 
            data-collapse="collapse"
            className={`block h-0 w-full basis-full overflow-hidden  ${formItemClasses}`} 
          >
            <FormLabel label="Billing Address:" />
            <input id="projectAddress" type="projectAddress" name="projectAddress"
              className={inputClasses}
              placeholder="Address to send the invoice to"
              required={!addressesAreSame}
            />
          </label>
        )}

        
        {/* MESSAGE */}
        <label className={`${formItemClasses} flex sm:flex-col`} >
          <FormLabel label="What can we do for you?" />
          <textarea 
            name="message" 
            placeholder="Describe your project. The more detail the better. We will call you with any further questions."
            required
            className={inputClasses}
          />
        </label>

        {/* HOW DID YOU HEAR ABOUT US? */}
        <label className="mb-4" >
          <FormLabel label="How did you hear about us?" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 mx-auto p-4 text-black">
            <Radio label="Word of mouth" value="wordOfMouth" name="radioGroup" onChange={handleHowYouHeardChange} checked={howYouHeardAboutUs === 'wordOfMouth'} />
            <Radio label="Google Maps" value="googleMaps" name="radioGroup" onChange={handleHowYouHeardChange} checked={howYouHeardAboutUs === 'googleMaps'} />
            <Radio label="Web Search or Google Ads" value="searchEngine" name="radioGroup" onChange={handleHowYouHeardChange} checked={howYouHeardAboutUs === 'searchEngine'} />
            <Radio label="From a yard sign" value="yardSign" name="radioGroup" onChange={handleHowYouHeardChange} checked={howYouHeardAboutUs === 'yardSign'} />
            <Radio label="I saw your van" value="vanSign" name="radioGroup" onChange={handleHowYouHeardChange} checked={howYouHeardAboutUs === 'vanSign'} />
            <Radio label="Thumbtack" value="thumbtack" name="radioGroup" onChange={handleHowYouHeardChange} checked={howYouHeardAboutUs === 'thumbtack'} />
            <Radio label="Angi's List" value="angisList" name="radioGroup" onChange={handleHowYouHeardChange} checked={howYouHeardAboutUs === 'angisList'} />
            <Radio label="Other" value="other" name="radioGroup" onChange={handleHowYouHeardChange} checked={howYouHeardAboutUs === 'other'} />
          </div>
        </label>


        <div className="flex w-full justify-center" >
          <button type="submit" className="flex h-10 w-fit  items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50">
            <EnvelopeIcon className="mr-4 h-5 w-5 text-gray-50 " />
            Send 
          </button>
        </div>
        {/* <div className="flex h-8 items-end space-x-1">
          Add form errors here
        </div> */}
      </form>

    </main>
  );
}