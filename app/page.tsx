import Link from 'next/link';

// Demo of using CSS Modules instead of Tailwind.
// See /app/ui/home.module.css for class definitions.
// Use this when you need CSS that is not in the Tailwind utility classes.
import styles from '@/app/ui/home.module.css';

// fonts
import { inter, lusitana } from '@/app/ui/fonts';

// icons
// import { EnvelopeIcon, PhoneIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/outline';

// images
import Image from 'next/image';

// components
import IconButton from "@/app/ui/iconButton"

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
          
          <IconButton 
            linkType='next'
            label="What We Can Do For You"
            href="/services"
            icon="tools"
          />
          <IconButton 
            linkType='anchor'
            label="Call Now"
            href="tel:504-323-4935"
            icon="phone"
          />
          <IconButton 
            linkType='next'
            label="Email Us"
            href="/contact"
            icon="mail"
          />
          {/* <Button className=''>
            <PhoneIcon />
            Test Button
          </Button> */}
        </div>
        <div id="desktop-header-image" className="flex text-black border border-red-500">
        </div>
       
      </div>
    </main>
  );
}



export default HomePage;
