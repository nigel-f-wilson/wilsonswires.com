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
    <main className="grid grid-cols-5 grid-rows-[auto min] mt-4 w-full ">
      <div className="col-span-3 h-min" >
        <LeftSideText/>
      </div>
      <div className="col-span-2 row-span-1 sm:row-span-2 h-min" >
        <RightSideImage/>
      </div>
      <div className="col-span-full sm:col-span-3 h-min" >
        <ButtonGrid/>
      </div>
      
      
      

    </main>
  );
}

const LeftSideText: React.FC = ({}) => {
  return (
    <div id="left-side-text" className="flex flex-col pl-3 w-min">

      {/* HEADER TEXT */}
      <div id="desktop-header-text" className="flex flex-col text-black leading-none text-[3.5rem] xs:text-[5rem] sm:text-[6rem] md:text-[8rem] lg:text-[9rem] xl:text-[10rem] xl:pr-4">
        <span className="">Electrical</span>
        <span className="pb-3 md:pb-6">Services</span>
      </div>

      {/* SUBHEADER TEXT */}
      <div id="desktop-subheader-text" className="flex flex-col text-black text-lg md:text-3xl xl:text-3xl pb-4 pr-2 leading-relaxed w-fit">
        
        <span className="pb-3 md:pb-6" >Serving New Orleans and Baton Rouge, from the North Shore to the West Bank and in between.</span>
        <span className="pb-3 md:pb-6">Residential and Commercial. Troubleshooting, Renovation, New Construction, and more. </span>
        <span className='text-nowrap'>Licensed and Insured.</span>
      </div>

    </div>
  );
}

const RightSideImage: React.FC = ({}) => {
  return (
    <div id="right-side-image" className="">
      {/* IMAGE ON XS SCREENS */}
      <Image
        // src="/images/standing_with_multimeter_bg_removed.png"
        src="/images/standing_with_tools_bg_removed_for_narrow_screens.png"
        width={3564}
        height={1523}
        className="block sm:hidden"
        alt="Nigel standing with tools and a multimeter"
      />

      {/* IMAGE ON SM SCREENS */}
      <Image
        // src="/images/standing_with_multimeter_bg_removed.png"
        src="/images/standing_with_tools_bg_removed.png"
        width={3564}
        height={1523}
        className="hidden sm:block md:hidden"
        alt="Nigel standing with tools and a multimeter"
      />

      {/* IMAGE ON MD and Up SCREENS */}
      <Image
        // src="/images/standing_with_multimeter_bg_removed.png"
        src="/images/standing_with_tools_bg_removed.png"
        width={3564}
        height={1523}
        className="hidden md:block"
        alt="Nigel standing with tools and a multimeter"
      />
    </div>
    
  );
}

const ButtonGrid: React.FC = ({}) => {
  return (
    <div id="button-grid" className="grid grid-cols-2 gap-2 p-2">
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
    </div>
    );
}



export default HomePage;
