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
      
      <div id="body-wrapper" className="mt-6 flex grow md:flex-row">
        <div id="left-side" className="flex flex-col w-3/4 md:w-2/5">
          <div id="desktop-header-text" className="flex flex-col text-black text-6xl md:text-9xl pr-4">
            <span className="pb-4">Electrical</span>
            <span className="pb-6">Services</span>
          </div>
          <div id="desktop-subheader-text" className="flex flex-col text-black text-3xl pb-4 pr-4 leading-relaxed">
            <span>Residential and Commercial</span>
            <span>Serving New Orleans to Baton Rouge</span>
            <span>Licensed and Insured</span>
          </div>
          <div id="button-grid" className="grid grid-cols-2 gap-4 pr-4 py-4">
            <IconButton 
              linkType='next'
              label="What We Do"
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
              label="Service Area"
              href="/where-we-work"
              icon="map"
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
        </div>
        <div id="right-side-image" className="flex items-center justify-center  w-1/4 md:w-3/5">
          {/* Add Hero Images Here */}
          <Image
            src="/images/standing_with_tools_cropped.jpeg"
            width={1000}
            height={760}
            className="hidden md:block"
            alt="Nigel standing with tools and a multimeter"
          />
          <Image
            src="/images/standing_with_tools_cropped.jpeg"
            width={560}
            height={620}
            className="block md:hidden"
            alt="Nigel standing with tools and a multimeter"
          />
          {/* <Image
            src="/images/standing_with_multimeter_cropped.jpeg"
            width={1000}
            height={760}
            className="hidden md:block"
            alt="Nigel standing with tools and a multimeter"
          /> */}
          {/* <Image
            src="/standing_with_multimeter_cropped.jpeg"
            width={560}
            height={620}
            className="images/block md:hidden"
            alt="Nigel standing with tools and a multimeter"
          /> */}
        </div>
       
      </div>
    </main>
  );
}



export default HomePage;
