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
    <div id="footer-bar" className="p-4 flex flex-column w-full object-contain justify-center items-start shrink-0 bg-blue-dark font-medium text-sm md:text-2xl text-white " >
      <div id="container" className="flex w-full max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-2" >
          <a href="https://maps.app.goo.gl/hAhheN86wLPWfpz97" className="transition-colors hover:bg-blue-main">
            <span>2033 Port Street, New Orleans, LA 70117</span> 
          </a>
          <a href="https://arlspublic.lslbc.louisiana.gov/Public/DetailedSearch/ByNumber" className="transition-colors hover:bg-blue-main">
            <span>Louisiana License #79644</span> 
          </a>
          <span>&copy; 2025 Wilson's Wires LLC</span> 

        </div>
      </div>
    </div>
  );
}


export default Footer;