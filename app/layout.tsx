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
import Footer from './ui/footer';

interface LayoutProps {
  children: React.ReactNode;
} 


// ROOT LAYOUT 

const RootLayout: React.FC<LayoutProps> = ({children}) => {
  return (
    <html lang="en">
      <body className={`flex flex-col items-center bg-blue-light ${styles.body} antialiased`}>
        <Navbar/>

        <Body children={children} />

        <Footer />
      </body>
    </html>
  );
}


interface BodyProps {
  children: React.ReactNode;
} 

const Body: React.FC<BodyProps> = ({children}) => {
  return (
    <div id="container" className={`${styles.body} max-w-6xl`}>
      {children}
    </div>
  );
}


export default RootLayout;