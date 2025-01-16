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
    <main className="flex flex-row my-6">
      

{/* LEFT SIDE */}

        <div id="left-side" className="flex flex-col pl-3 w-3/5 md:w-3/5 border border-red-600">

          {/* HEADER TEXT */}
          <div id="desktop-header-text" className="flex flex-col text-black text-5xl md:text-9xl pr-4">
            <span className="pb-4">Electrical</span>
            <span className="pb-6">Services</span>
          </div>

          {/* SUBHEADER TEXT */}
          <div id="desktop-subheader-text" className="flex flex-col text-black text-md pb-4 pr-4 leading-relaxed">
            <span className='text-nowrap'>Residential and Commercial.</span>
            <span className='text-nowrap'>Licensed and Insured.</span>
            <span>Serving New Orleans, Baton Rouge, and in between.</span>
          </div>

          {/* BUTTON GRID */}
          <div id="button-grid" className="grid grid-cols-1 md:grid-cols-2 gap-4 w-100 md:w-3/5 pr-4 py-4">
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

{/* RIGHT SIDE */}

        <div id="right-side-image" className=" w-2/5 sm:w-3/8 md:w-2/5 border border-yellow-600">
          
          {/* IMAGE ON XS SCREENS */}
          <Image
            src="/images/standing_with_tools_cropped_and_cut_vertically.jpeg"
            
            width={200}
            height={350}
            className="block sm:hidden"
            alt="Nigel standing with tools and a multimeter"
          />

          {/* IMAGE ON SM SCREENS */}
          <Image
            src="/images/standing_with_tools_cropped.jpeg"
            width={1000}
            height={760}
            className="hidden sm:block md:hidden"
            alt="Nigel standing with tools and a multimeter"
          />

          {/* IMAGE ON MD and Up SCREENS */}
          <Image
            src="/images/standing_with_tools_cropped.jpeg"
            width={1000}
            height={760}
            className="hidden md:block"
            alt="Nigel standing with tools and a multimeter"
          />
        </div>
       
    
    </main>
  );
}



export default HomePage;
