import Link from 'next/link';
import Head from 'next/head';

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
    <main className="flex flex-col stretch ">
      <div className="grid grid-cols-5 grid-rows-[min auto] mt-4 w-full">
        <div className="col-span-3 h-min pl-2" >
          <LeftSideText/>
        </div>
        <div className="col-span-2 row-span-1 xs:row-span-3 h-min" >
          <RightSideImage/>
        </div>
        <div className="col-span-full xs:col-span-3 h-min p-2 md:py-4" >
          <ButtonGrid/>
        </div>

        
        
      </div>
      <div id="customer-testimony">

      </div>
      <section id="service-area" className="flex flex-col p-2 text-black leading-none text-[2rem] sm:text-[2.5rem] md:text-[3.5rem] lg:text-[5rem]  w-full">
        {/* SUBHEADER TEXT */}
        <span className="pb-3">Service Area</span>
        <a href="https://maps.app.goo.gl/hAhheN86wLPWfpz97" target="_blank" >
          <Image
            src="/images/service_area_map.png"
            width={1560}
            height={1560}
            className="rounded-lg lg:rounded-xl"
            alt="Map of where we work."
          /> 
        </a>
        
      </section>

    </main>
  );
}

const LeftSideText: React.FC = ({}) => {
  return (
    <div id="left-side-text" className="flex flex-col w-min">

      {/* HEADER TEXT */}
      <div id="desktop-header-text" className="flex flex-col text-black leading-none text-[3.5rem] sm:text-[6rem] md:text-[8rem] lg:text-[9rem] xl:pr-4">
        <span className="">Electrical</span>
        <span className="pb-3 md:pb-6">Services</span>
      </div>

      {/* BODY TEXT */}
      <div id="desktop-body-text" className="flex flex-col font-medium text-black text-xl md:text-3xl xl:text-3xl pb-4 pr-2 w-fit">
        
        <span className="pb-3 md:pb-6 " >Serving New Orleans and Baton Rouge. From the North Shore to the West Bank and everywhere between.</span>
        <span className="pb-3 md:pb-6">Residential and Commercial.</span>
        <span className="pb-3 md:pb-6">New Construction, Renovations, Troubleshooting, and more. </span>
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
        width={356}
        height={152}
        className="block sm:hidden"
        alt="Nigel standing with tools and a multimeter"
      />

      {/* IMAGE ON SM SCREENS */}
      <Image
        // src="/images/standing_with_multimeter_bg_removed.png"
        src="/images/standing_with_tools_bg_removed.png"
        width={1188}
        height={508}
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
    <div id="button-grid" className="grid grid-cols-2 gap-2 w-full">
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
        href="#service-area"
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
