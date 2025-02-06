// 'use client'


import { clsx } from 'clsx';

// CSS
import '@/app/ui/global.css';
import styles from '@/app/ui/home.module.css';

// Fonts

// Hooks

// Next Components
import { Html, Head, Main, NextScript } from 'next/document';

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
      <head>
        <script
          // strategy="lazyOnload"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS}`}
        />

        <script id="ga-script">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
                `}
        </script>
      </head>
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