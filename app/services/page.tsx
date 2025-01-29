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

const ServicesPage: React.FC<PageProps> = ({}) => {
  return (
    <main id="services-page" className="flex flex-col">
      <div className="grid grid-cols-1 p-4 w-full border border-red-500">
        <ServiceCard
          title="Troubleshooting"
          bodyText="You depend on your home's electrical system everyday. It enables you to cook, keep your home at a comfortable temperature, see at night, and so much more. When something goes wrong with your home's wiring, it is more than just an inconvenience, it is likely a sign that a dangerous situation has arisen. The majority of house fires are started by faulty electrical systems. When your family's safety is on the line, trust Wilson's Wires to set things right. We come prepared with a full array of diagnostic tools that eliminate the guess work and enable us to pinpoint electrical problems efficiently. We back all our work with a 100% guarantee. If there is a problem with your home that we can't find or fix then there is no charge! &n; Wilson's Wires is a worker-owned company. "
          bodyTextMobile="Problems with your home's electrical system are more than an inconvenience, they often indicate a dangerous situation has arisen. Trust Wilson's Wires to set things right. We come prepared with a full array of diagnostic tools that eliminate the guess work and enable us to pinpoint and resolve electrical problems efficiently."
          imagePath="/images/iStock-panel-testing.jpg"
        />
      </div>
      
    </main>
  );
}

// We take craftsmanship seriously because when it comes to electrical work neatness and safety go hand in hand. 
          

interface ServiceCardProps {
  title: string;
  bodyText: string;
  bodyTextMobile: string;
  imagePath: string;
} 

const ServiceCard: React.FC<ServiceCardProps> = ({title, bodyText, bodyTextMobile, imagePath}) => {
  return (
    <div id="service-card" className="grid grid-cols-[35%_65%] bg-white rounded-md gap-2 px-3 py-2">
      {/* TITLE */}
      <div id="title" className="grid-row-start-1 col-span-2 text-3xl">
        {title}
      </div>

      {/* IMAGE */}
      <div id="service-area" className=" aspect-square">
        <Image
          src={imagePath}
          width={1560}
          height={1560}
          className="rounded-lg"
          alt="Where we are located in New Orleans"
        /> 
      </div>

      
      {/* BODY TEXT */}
      <div id="desktop-body-text" className="hidden sm:block">
        {bodyText}
      </div>
      <div id="mobile-body-text" className="block sm:hidden">
        {bodyTextMobile}
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
    <div id="button-grid" className="grid grid-cols-2 gap-2">
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



export default ServicesPage;
