import Link from 'next/link';

// Demo of using CSS Modules instead of Tailwind.
// See /app/ui/home.module.css for class definitions.
// Use this when you need CSS that is not in the Tailwind utility classes.
import styles from '@/app/ui/home.module.css';

// FONTS
import { inter, lusitana } from '@/app/ui/fonts';

// ICONS
import { EnvelopeIcon, PhoneIcon, WrenchScrewdriverIcon, MapIcon } from '@heroicons/react/24/outline';



type LinkType = "anchor" | "next"

type IconType = "tools" | "phone" | "mail" | "map"


interface IconButtonProps {
  linkType: LinkType;
  label: string;
  href: string;
  icon: IconType;
} 

const IconButton: React.FC<IconButtonProps> = ({linkType, label, href, icon}) => {
  const iconClasses = "w-5 md:w-8"
  let iconWithClasses;
  
  switch (icon) {
    case 'tools':
      iconWithClasses = <WrenchScrewdriverIcon className={iconClasses} />;
      break;
    case 'phone':
      iconWithClasses = <PhoneIcon className={iconClasses} />;
      break;
    case 'mail':
      iconWithClasses = <EnvelopeIcon className={iconClasses} />;
      break;
    case 'map':
      iconWithClasses = <MapIcon className={iconClasses} />;
      break;
    default:
      throw new Error("IconButton received invalid icon prop");
  }



  if (linkType === "anchor") {
    return (
      <a
        href={href}
        className="flex items-center h-full gap-5 self-start rounded-lg bg-blue-main px-6 py-3 text-base font-medium text-white transition-colors hover:bg-blue-400 md:text-2xl"
      >
        {iconWithClasses}<span>{label}</span> 
      </a>
    );
  }
  else if (linkType === "next") {
    return (
      <Link
        href={href}
        className="flex items-center h-full gap-5 self-start rounded-lg bg-blue-main px-6 py-3 text-base font-medium text-white transition-colors hover:bg-blue-400 md:text-2xl"
      >
        {iconWithClasses}<span>{label}</span> 
      </Link>
    );
  }
  else {
    throw new Error("Button received invalid linkType prop");
  }
  
}


export default IconButton;
