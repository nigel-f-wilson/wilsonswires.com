'use client'

// CSS
import '@/app/ui/global.css';

// ICONS
import { Bars3Icon } from '@heroicons/react/24/outline';

// Hooks
import { usePathname } from 'next/navigation'

// Next Components
import Link from 'next/link';

// My Components
import Logo from '@/app/ui/logo';


const Navbar: React.FC = ({}) => {
  const pathname = usePathname() 
  return (
    <div id="header-bar" className="text-white p-2 flex w-full h-24 md:h-36 object-contain justify-center items-start shrink-0 bg-blue-dark" >
      <div id="container" className="w-full max-w-6xl h-full flex">
        <Logo />
        <div id="growing spacer" className="grow" />
        <div id="phone and buttons" className="flex flex-col justify-between">
          <a
            href="tel:504-323-4935"
            className="text-3xl md:text-5xl pt-2 font-medium  transition-colors hover:bg-blue-400"
          >
            504-323-4935
          </a>
          <div className="flex flex-row items-start" >
            <NavLink text="Home" href="/" currentPathname={pathname} />
            <NavLink text="Our Services" href="/services" currentPathname={pathname} />
            <NavLink text="Contact Us" href="/contact" currentPathname={pathname} />
          </div>

          {/* <Bars3Icon className="transition-colors hover:bg-blue-400 md:text-2xl w-5 md:w-8" /> */}
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
        className="flex items-center self-end rounded-lg bg-blue-dark 
          pr-4 md:pr-8 pt-2 
          text-lg md:text-3xl 
          font-medium text-white transition-colors hover:bg-blue-main"
      >
        <span>{text}</span> 
      </Link>
    );
  }
}

export default Navbar;