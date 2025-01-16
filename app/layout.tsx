'use client'
import { clsx } from 'clsx';

// CSS
import '@/app/ui/global.css';
import styles from '@/app/ui/home.module.css';


// Fonts
import { inter } from '@/app/ui/fonts';

// Hooks
import { usePathname } from 'next/navigation'

// Next Components
import Link from 'next/link';

// My Components
import Logo from '@/app/ui/logo';
import Navbar from './ui/navbar';

interface LayoutProps {
  children: React.ReactNode;
} 

const RootLayout: React.FC<LayoutProps> = ({children}) => {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased flex flex-col items-center bg-blue-light ${styles.body}`}>
        <Navbar/>

        <Header children={children} />

        <Footer />
      </body>
    </html>
  );
}


interface HeaderProps {
  children: React.ReactNode;
} 

const Header: React.FC<HeaderProps> = ({children}) => {
  return (
    <header className={`${styles.header}`}>
      <div id="container" className="w-full flex border border-yellow-600 border-dashed">
        {children}
      </div>
    </header>
  );
}

// interface BodyProps {
//   children: React.ReactNode;
// } 

// const Body: React.FC<BodyProps> = ({children}) => {
//   return (
//     <body className={`${inter.className} antialiased flex flex-col items-center bg-green-600 `}>
//       {children}
//     </body>
//   );
// }

function Footer() {
  return (
    <div id="footer-bar" className="p-2 flex flex-column w-full object-contain justify-center items-start shrink-0 bg-blue-dark" >
      <div id="container" className="w-full max-width-md flex border border-yellow-600 border-dashed">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20" >
          <Link href="/" className="flex items-center  bg-blue-dark pt-1 text-sm font-medium text-white transition-colors hover:bg-blue-main md:text-2xl">
            <span>Home</span> 
          </Link>
          <Link href="/services" className="flex items-center bg-blue-dark py-1 text-sm font-medium text-white transition-colors hover:bg-blue-main md:text-2xl">
            <span>Our Services</span> 
          </Link>
          <Link href="/contact" className="flex items-center bg-blue-dark py-1 text-sm font-medium text-white transition-colors hover:bg-blue-main md:text-2xl">
            <span>Contact Us</span> 
          </Link>
          <Link href="/" className="flex items-center  bg-blue-dark pt-1 text-sm font-medium text-white transition-colors hover:bg-blue-main md:text-2xl">
            <span>Home</span> 
          </Link>
          <Link href="/services" className="flex items-center bg-blue-dark py-1 text-sm font-medium text-white transition-colors hover:bg-blue-main md:text-2xl">
            <span>Our Services</span> 
          </Link>
          <Link href="/contact" className="flex items-center bg-blue-dark py-1 text-sm font-medium text-white transition-colors hover:bg-blue-main md:text-2xl">
            <span>Contact Us</span> 
          </Link>
        </div>
          {/* <div className="grow " />
          <NavLink text="Home" href="/" />
          <NavLink text="Our Services" href="/services" />
          <NavLink text="Contact Us" href="/contact" /> */}
      </div>
    </div>
  );
}


export default RootLayout;