import Link from 'next/link';

// Demo of using CSS Modules instead of Tailwind.
// See /app/ui/home.module.css for class definitions.
// Use this when you need CSS that is not in the Tailwind utility classes.
import styles from '@/app/ui/home.module.css';

// fonts
import { inter, lusitana } from '@/app/ui/fonts';

// icons
import { PhoneIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/outline';

// images
import Image from 'next/image';

interface PageProps {
  // children: React.ReactNode;
} 

const HomePage: React.FC<PageProps> = ({}) => {
  return (
    <main className="flex min-h-screen flex-col ">
      
      <div className="mt-6 flex grow flex-col md:flex-row">
        <div id="desktop-header-text" className="flex flex-col text-black text-7xl">
          <span className="text-black pb-4">Electrical Services in</span>
          <span className="text-black pb-8">Greater New Orleans</span>
          <Button 
            label="Call Now"
            href="tel:504-323-4935"
            icon={<PhoneIcon/>}
          />
          <Button 
            label="What We Can Do For You"
            href="tel:504-323-4935"
            icon={<WrenchScrewdriverIcon/>}
          />
        </div>
        <div id="desktop-header-image" className="flex text-black border border-red-500">
        </div>
       
      </div>
    </main>
  );
}

type LinkType = "anchor" | "next"

interface ButtonProps {
  linkType: LinkType;
  label: string;
  href: string;
  icon: React.ReactNode;
} 

const Button: React.FC<ButtonProps> = ({label, href, icon}) => {
  const iconClasses = "w-5 md:w-8"
  
  return (
    <a
      href="tel:504-323-4935"
      className="flex items-center gap-5 self-start rounded-lg bg-blue-main px-6 py-3 text-base font-medium text-white transition-colors hover:bg-blue-400 md:text-2xl"
    >
      <PhoneIcon className={iconClasses} /><span>504-323-4935</span> 
    </a>
  );
}


export default HomePage;
