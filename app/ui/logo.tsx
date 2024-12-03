// images
import Image from 'next/image';

export default function Logo() {
    return (
        <Image
          src="/WW-established-date-logo.png"
          width={1194}
          height={930}
          alt="Wilson's Wires Logo"
          className="block object-contain w-auto justify-self-start"
          priority
        />
    );
  }
