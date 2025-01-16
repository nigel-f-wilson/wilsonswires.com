'use client'

// CSS
import '@/app/ui/global.css';


// Hooks
import { usePathname } from 'next/navigation'

// Next Components
import Link from 'next/link';

// My Components
import Logo from '@/app/ui/logo';


const Navbar: React.FC = ({}) => {
  const pathname = usePathname() 
  return (
    <div id="header-bar" className="p-2 flex w-full h-24 md:h-36 object-contain justify-center items-start shrink-0 bg-blue-dark" >
      <div id="container" className="w-full h-full flex border border-yellow-600 border-dashed">
        <Logo />
        <div className="grow" />
        <div className="flex flex-col justify-between">
          <a
            href="tel:504-323-4935"
            className="text-2xl sm:text-3xl md:text-4xl font-medium text-white transition-colors hover:bg-blue-400"
          >
            504-323-4935
          </a>
          <div className="flex flex-row items-start" >
            <NavLink text="Home" href="/" currentPathname={pathname} />
            <NavLink text="Our Services" href="/services" currentPathname={pathname} />
            <NavLink text="Contact Us" href="/contact" currentPathname={pathname} />
          </div>
        </div>
      </div>
    </div>
  );
}

interface NavLinkProps {
  text: string;
  href: string; 
  currentPathname: string;
}

const NavLink: React.FC<NavLinkProps> = ({text, href, currentPathname}) => {
  const pathname = usePathname()
  if (currentPathname !== href) {
    return (
      <Link
        href={href}      
        className="flex items-center self-end rounded-lg bg-blue-dark pr-4 md:pr-8 pt-2 text-sm md:text-2xl font-medium text-white transition-colors hover:bg-blue-main"
      >
        <span>{text}</span> 
      </Link>
    );
  }
}

export default Navbar;