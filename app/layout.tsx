'use client'
import { clsx } from 'clsx';

// CSS
import '@/app/ui/global.css';
import styles from '@/app/ui/home.module.css';

// Fonts

// Hooks

// Next Components

// My Components
import Navbar from './ui/navbar';
import Footer from './ui/footer';

interface LayoutProps {
  children: React.ReactNode;
} 


// ROOT LAYOUT 

const RootLayout: React.FC<LayoutProps> = ({children}) => {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`flex flex-col justify-between bg-blue-light ${styles.body} antialiased min-h-[100vh]`}>
        <Navbar/>

        <div id="container" className="max-w-6xl min-h-[75vh] pb-8" > 
          {children}
        </div>

        <Footer  />
        
      </body>
    </html>
  );
}


interface BodyProps {
  children: React.ReactNode;
} 

const Body: React.FC<BodyProps> = ({children}) => {
  return (
    <>
      {children} 
    </>
  );
}


export default RootLayout;