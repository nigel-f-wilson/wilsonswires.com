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
import Container from '@/app/ui/container';

interface LayoutProps {
  children: React.ReactNode;
} 

const RootLayout: React.FC<LayoutProps> = ({children}) => {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased flex flex-col items-center bg-blue-light ${styles.body}`}>
        <Navbar/>

        <Header children={children} />

        
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
      <Container>
        {children}
      </Container>
      <span className="text-red-500">Electrical Services Greater New Orleans</span>
    </header>
  );
}

// interface BodyProps {
//   children: React.ReactNode;
// } 

// const Body: React.FC<BodyProps> = ({children}) => {
//   return (
//     <body className={`${inter.className} antialiased flex flex-col items-center bg-blue-light `}>
//       {children}
//     </body>
//   );
// }

function Navbar() {
  const pathname = usePathname()
  return (
    <div id="header-bar" className="flex w-full h-24 md:h-36 object-contain justify-center items-start shrink-0 bg-blue-dark" >
      <Container>
        <Logo />
        <div className="grow " />
        <NavLink text="Home" href="/" />
        <NavLink text="Our Services" href="/services" />
        <NavLink text="Contact Us" href="/contact" />
      </Container>
    </div>
  );
}

interface NavLinkProps {
  text: string;
  href: string; 
}

const NavLink: React.FC<NavLinkProps> = ({text, href}) => {
  const pathname = usePathname()
  if (pathname !== href) {
    return (
      <Link
        href={href}      
        className="flex items-center self-end rounded-lg bg-blue-dark px-4 md:px-8 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-main md:text-2xl"
      >
        <span>{text}</span> 
      </Link>
    );
  }
}

export default RootLayout;