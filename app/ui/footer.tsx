'use client'

// CSS
import '@/app/ui/global.css';
import styles from '@/app/ui/home.module.css';


// Fonts

// Hooks

// Next Components
import Link from 'next/link';

// My Components


function Footer() {
  return (
    <div className="grow flex justify-center align-end w-[100vw] bg-blue-dark text-white p-4 font-medium text-xs md:text-2xl">

    {/* <div id="footer-bar" className="p-4 flex flex-column w-[100vw] object-contain justify-center items-start shrink-0 bg-blue-dark font-medium text-sm md:text-2xl text-white border border-red-500" > */}
      <div id="container" className="flex w-full max-w-6xl">
        <div className="grid grid-cols-2 grid-rows-2 gap-x-8 items-center" >
          <a href="https://maps.app.goo.gl/hAhheN86wLPWfpz97" target="_blank" className="transition-colors hover:bg-blue-main">
            <span>2033 Port Street<br/>New Orleans, LA 70117</span> 
          </a>
          <a href="https://arlspublic.lslbc.louisiana.gov/Public/DetailedSearch/ByNumber" target="_blank" className="transition-colors hover:bg-blue-main grid-col-start-2">
            <span>Louisiana License #79644</span> 
          </a>
          <span className="col-start-1 col-span-2 row-start-2">&copy; 2025 Wilson's Wires LLC. All rights reserved.</span> 

        </div>
      </div>
    </div>
  );
}


export default Footer;