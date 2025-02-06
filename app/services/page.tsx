import Link from 'next/link';

import type { Metadata } from 'next'


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


// export const metadata: Metadata = {
//   title: '...',
//   description: '...',
// }

interface PageProps {
  // children: React.ReactNode;
} 

const ServicesPage: React.FC<PageProps> = ({}) => {
  return (
    <main id="services-page" className="flex flex-col">
      <div className="grid grid-cols-1 p-4 gap-4 w-full">
        {/* TROUBLESHOOTING */}
        <ServiceCard
          title="Troubleshooting"
          bodyText="You depend on your home's electrical system everyday to cook, keep your home at a comfortable temperature, see at night, and so much more. When something goes wrong with your home's wiring, it is more than just an inconvenience, it is likely a sign that a dangerous situation has arisen. The majority of house fires are started by faulty electrical systems. When your family's safety is on the line, trust Wilson's Wires to set things right. We come prepared, with a full array of diagnostic tools that eliminate the guess work and enable us to pinpoint and resolve electrical problems efficiently. We back all our work with a 100% guarantee. If there is a problem we can't find or fix then there is no charge!"
          bodyTextMobile="Problems with your home's electrical system are more than an inconvenience, they often indicate a dangerous situation has arisen. Trust Wilson's Wires to set things right. We come prepared, with an array of advanced diagnostic tools that eliminate the guess work and enable us to pinpoint and resolve electrical problems efficiently."
          imagePath="/images/stock_panel_testing.jpg"
        />
        {/* LIGHTING INSTALLATION */}
        <ServiceCard
          title="Lighting Installation"
          bodyText="Updating light fixtures is an affordable way to change the feel of a room. From cool and bright lighting in workshops and garages to a warm glow that makes a living room as cozy as can be, Wilson's Wires will help you select and install the ideal lighting fixtures for any space. We can wire up lights to be dimmable and controlled from switches at as many locations as you wish. Weather you need new lights added or just want to replace existing fixtures for a fresh style, Wilson's Wires can help with all your lighting needs."
          bodyTextMobile="Updating light fixtures is an affordable way to change the feel of a room. From cool and bright lighting in workshops and garages to a warm glow that makes a living room as cozy as can be, Wilson's Wires will help you select and install the ideal lighting fixtures for any space. We can wire up lights to be dimmable and controlled from switches at as many locations as you wish. Weather you need new lights added or just want to replace existing fixtures for a fresh style, Wilson's Wires can help with all your lighting needs."
          imagePath="/images/stock_pendant_lights.webp"
        />
        {/* ELECTRIC PANEL UPGRADES */}
        <ServiceCard
          title="Electric Panel Upgrades"
          bodyText="Electric Panels are the first line of defense against electrical fires. Each wire is able to carry a certain amount of power safely, depending on its size. If too many things get plugged into the same circuit and that safe limit is exceeded it will cause a circuit breaker to trip, making sure that the wire does not overheat and start a fire. There are many other reasons a circuit breaker might trip though! Circuit breakers can wear out over time or be damaged by lighting strikes. If a mouse chews a wire or a connection comes loose it can cause a breaker to trip and make it impossible to reset. As annoying as it can be, a circuit breaker that is tripping is doing its job and preventing the problem from becoming much worse. Many older homes are still relying on outdated circuit breakers that do not offer the same protections as modern ones. We have even come across some homes still relying on fuse panels, like the one pictured here, which were installed in the 1950s or earlier! If you aren't sure about your home's electric panel, now might be a good time to have a routine maintenance inspection done. Call Wilson's Wires for peace of mind."
          bodyTextMobile="Electric Panels are the first line of defense against fires. If too many things get plugged into the same circuit, a mouse chews a wire, or a connection comes loose it will cause a circuit breaker to trip, making sure that wire does not overheat and start a fire. Circuit breakers wear out over time and older ones do not offer the same protections as modern ones. If you aren't sure how old your home's electric panel is, or if it has fuses like those in the picture, now is the time call Wilson's Wires for a routine inspection."
          imagePath="/images/edison_fuse_panel.jpeg"
        />
        {/* GENERATORS */}
        <ServiceCard
          title="Generators"
          bodyText="In the gulf south, where hurricanes are a common occurrence, generators can save you a lot of money and enable you to stay in your home during prolonged power outages. Generators may seem expensive, but when you consider the value of a refrigerator full of food and the cost of hotel rooms the net savings are clear. Whether you want to install a pad-mounted whole home generator that comes on automatically when it is needed, or simply a receptacle that will allow you to power your home with a portable generator, proper installation is vital for safety. Improperly installed generators can feed power back onto the grid during outages, creating a potentially deadly situation for the crews working to restore downed lines. Call Wilson's Wires today to ensure that you can stay safe and comfortable in your own home next hurricane season!"
          bodyTextMobile="Generators can save you a lot of money and enable you to stay in your home during prolonged power outages that often happen during hurricane season. Improperly installed generators can feed power back onto the grid during outages, creating a potentially deadly situation for the crews working to restore downed lines. Whether you want a permanent whole home generator or simply a way to connect a portable generator, call Wilson's Wires today to keep the power on no matter what happens!"
          imagePath="/images/stock_portable_generator.jpg"
        />
        {/* NEW CONSTRUCTION */}
        <ServiceCard
          title="New Construction & Temp Poles"
          bodyText="Did you know the National Electrical Code gets updated every three years? While the basics of how our electrical grid works have not changed much in 100 years, the wires and devices that get installed in homes have changed a lot as safer technologies have been invented. Wiring a new home requires staying on top of the latest changes and additions to the code. If you are a developer looking to build a new home, Wilson's Wires can help you from start to finish. We can pull the permits you will need to get temporary power during construction, coordinate open-wall and final inspections, and get Entergy out for the final hookup. We are highly responsive, making it easy for general contractors to manage the logistics of getting different trades on site in the right order."
          bodyTextMobile="Wiring a new home requires staying on top of the latest changes to the National Electrical Code. If you are a developer looking to build a new home, Wilson's Wires can help you from start to finish. We handle permitting, temporary power, and inspections. We are highly responsive, making it easy for general contractors to manage the complex logistics of getting different trades on site in the right order."
          imagePath="/images/stock_new_construction.jpg"
        />
        {/* RENOVATIONS & ADDITIONS */}
        <ServiceCard
          title="Renovations & Additions"
          bodyText="Remodelling a kitchen or bathroom? Adding on a porch or garage? Every home will "
          bodyTextMobile="TODO"
          imagePath="/images/stock_remodel.jpg"
        />
        {/* PERMITS & CODE INSPECTIONS */}
        <ServiceCard
          title="Permits & Code Inspections"
          bodyText="Working with the Office of Safety and Permits is never easy. It is hard to know what paperwork you need to file, and even once you get that straight you will often end up waiting a long time to get a response. Wilson's Wires is happy to serve as your guide to this system and when time is of the essence, we will advocate for you by going to City Hall in person and making sure that your permit applications don't get lost in the shuffle. Once a permit is approved, we work with "
          bodyTextMobile="TODO"
          imagePath="/images/stock_smart_meter.jpg"
        />
        {/* EV CHARGERS */}
        <ServiceCard
          title="EV Charging Stations"
          bodyText="Electric Vehicles are the way of the future! But filling up their batteries takes longer than filling up a gas tank. In fact, charging electric batteries too fast will damage them. If you are going to invest in an electric car, one of the best ways to protect that investment is to install a smart charger at home so that you can recharge the battery at the optimal speed. Wilson's Wires is experienced in the installation of EV charging stations compatible with Tesla, Kia, Nissan, Ford, Chevy, BMW, Mercedes Benz, Porsche, and Volkswagen. Call today to get a quote for the installation of a Level 2 smart charger and roll into the future free of the gas pump."
          bodyTextMobile="Did you know that recharging batteries too fast will reduce their lifespan? If you are ready to roll into the future in an Electric Vehicle, one of the best ways to protect your investment is to install a Level 2 smart charger at home so that you can recharge the battery at the optimal speed. Wilson's Wires installs EV charging stations compatible with Tesla, Kia, Nissan, Ford, Chevy, BMW, and more!"
          imagePath="/images/stock_ev_charger.jpg"
        />
        {/* SMOKE ALARMS */}
        <ServiceCard
          title="Smoke Detectors"
          bodyText="Installing smoke alarms are one of the simplest ways to protect your house and those living there. The National Fire Protection Association has required smoke alarms in all residential structures since 1976, but many older homes have never been updated. While having smoke alarms with battery backup is a great idea, smoke alarms that run on batteries alone create another chore and many tenants will simply take them down when the batteries get low and they start emitting annoying chirps to warn of this fact. The best solution is install smoke alarms which are wired into your homes electrical system so that the batteries don't get drained. Call Wilson's Wires today for a free estimate and peace of mind."
          bodyTextMobile="Installing smoke alarms are one of the simplest ways to protect your house and those living there. The NFPA has required smoke alarms in all residential structures since 1976, but many older homes have never been updated. The best smoke alarms have battery backup but are also wired directly into your home's electrical system so that the batteries don't get drained. Call Wilson's Wires today for a free estimate and peace of mind."
          imagePath="/images/stock_smoke_detector.jpg"
        />
        {/* WHOLE HOME SURGE PROTECTION */}
        <ServiceCard
          title="Whole Home Surge Protection"
          bodyText="When most people think of a &ldquo;surge protector&rdquo; they think of a device like that in the picture and they imagine that its main purpose is to be able to plug many devices into a single outlet, but this is not the case! A residential electrical system normally operates at 120 volts, but when lightning strikes power lines or outages occur for a variety of other reasons it can cause that voltage to momentarily spike. This can damage any electrical appliance that is plugged in at the time but sensitive electronics such as computers are especially vulnerable, and these days computer chips are found inside almost every appliance in your home. What many home owners don't realize is that you don't need a surge protector at every outlet where you have sensitive electronics plugged in, there are devices available that are installed at your electrical panel that protect your whole home from power surges. In fact, beginning with the 2020 edition of the National Electrical Code, whole-home surge protectors are required. Call Wilson's Wires today to learn how you can prevent costly damage to the electronics in your home with a whole-home surge protector today!"
          bodyTextMobile="When most people think of a &ldquo;surge protector&rdquo; they think of a device like that in the picture, a special power strip that protects sensitive electronics from voltage spikes caused by lightning strikes and power outages. Many home owners don't realize is that you don't need a surge protector at each outlet, there are devices that can be installed in your electrical panel that protect your whole home from power surges. Call Wilson's Wires today to learn how you can prevent costly damage to the electronics in your home with a whole-home surge protector today!"
          imagePath="/images/stock_surge_protector.png"
        />
        {/* APPLIANCE REPAIR */}
        <ServiceCard
          title="Appliance Repair"
          bodyText="Washers, dryers, electric stoves, furnaces, air-conditioners, attic fans, refrigerators, garage door openers, and more. When you own a home, there are so many things that can go wrong, and replacing appliances can be very expensive! Just getting these large items in and out of your home is a lot of work. Often, appliances can be repaired on-site at a huge cost savings. If you have an electric dryer that spins but doesn't get hot, we can help! If you have a furnace or stove that has gas but won't ignite, we can help! If the blower motor in your A/C or the motor in your attic fan won't spin, we can help! Almost every home appliance has some electrical components within it. At Wilson's Wires we love solving the kind of puzzles that get major appliances working again and divert unnecessary waste from landfills. We also offer competitive rates on the installation of new heavy-duty outlets for customers who are switching from gas appliances to electric."
          bodyTextMobile="Washers, dryers, electric stoves, furnaces, air-conditioners, attic fans, refrigerators, garage door openers, and more. Almost every appliance has some electrical components within it. At Wilson's Wires we love solving the puzzles that get major appliances working again and divert waste from landfills. We also offer competitive rates on the installation of new heavy-duty outlets for customers who are switching from gas appliances to electric."
          imagePath="/images/stock_appliance_repair.jpg"
        />
        {/* MINI SPLIT INSTALLATION */}
        <ServiceCard
          title="Mini-Split Installation"
          bodyText="Living in the Gulf South, it is very important to be able to keep your home cool and dehumidified during the long summer. This is not only a matter of comfort, but is also essential to keeping you and your belongings safe from harmful mold. Even though our winters are short, they can feel terribly cold due to the high humidity. Mini-splits are a type of heat pump that can cool or heat your home very efficiently. They are more visually appealing than window air-conditioners and they don't block your windows, meaning you can still enjoy a refreshing breeze when it is nice outside. Because mini splits can work in reverse to heat your home, they will free you from relying on traditional space heaters which pose a fire hazard and are a common cause of overloaded circuits in old homes that were not originally intended to be heated with electricity. They also give you the ability to control the temperature of each room of your house independently. Call today for more info on mini split installation."
          bodyTextMobile="Keeping your home cool and dehumidified is not only a matter of comfort, it is also essential to keeping you and your belongings safe from harmful mold. Mini-splits can heat and cool your home very efficiently, while being safer and more visually appealing than window air-conditioners and traditional space heaters. Call today for more info on mini split installation."
          imagePath="/images/stock_mini_split_indoor.jpg"
        />
        {/* CEILING FAN INSTALLATION */}
        <ServiceCard
          title="Ceiling Fan Installation"
          bodyText="Ceiling fans are a simple and cost effective way to provide air circulation which makes air conditioners operate more efficiently and makes a room comfortable even without air conditioning throughout much more of the year. Their benefits are especially strong in old New Orleans houses with high ceilings. Whether you have a wobbly fan that just needs rebalanced or you want a fan replaced with a more stylish one, Wilson's Wires is happy to help. Call today to bring the breeze inside!"
          bodyTextMobile="Ceiling fans are a simple and cost effective way to provide air circulation which makes air conditioners operate more efficiently and makes a room comfortable even without air conditioning throughout much more of the year. Their benefits are especially strong in old New Orleans houses with high ceilings. Call Wilson's Wires today to bring the breeze inside!"
          imagePath="/images/iStock-ceiling-fan-install.jpg"
        />
        {/* GFCI PROTECTION */}
        <ServiceCard
          title="GFCI Protection"
          bodyText="Ground Fault Circuit Interrupting outlets were first required by the National Electrical Code in 1971. Their use corresponded with a dramatic decrease in the number of people being shocked and electrocuted each year. As a result, the number of places throughout the home where they are required has been extended substantially since they were first introduced. Still, many old homes do not adequately take advantage of this simple yet life-saving technology. The ground wire in an electrical circuit is the emergency back up system. It provides power a safe route back to the service panel in case a live wire comes into contact with something it should not. Under normal circumstances, the ground wire should not be carrying electricity, but if it is this will not cause a standard circuit breaker to trip. That's where GFCIs come in. They detect when power is leaking and the emergency back up system is being used and when it is they shut down the circuit. This is especially important in kitchens, bathrooms, garages, and any area where electrical outlets may be exposed to moisture. If you have outlets that are not GFCI protected but should be we can help! If you have GFCI outlets that are tripping and won't reset, we can figure out why and get power restored!"
          bodyTextMobile="Ground Fault Circuit Interrupting outlets were first required by the National Electrical Code in 1971. Their use corresponded with a dramatic decrease in the number of people being shocked and electrocuted each year. As a result, the number of places throughout the home where they are required has been extended substantially since they were first introduced. They are especially important in kitchens, bathrooms, garages, and any area where electrical outlets may be exposed to moisture. If you have GFCI outlets that are tripping or outlets that are not not GFCI protected but should be we can help!"
          imagePath="/images/stock_gfci_on_kitchen_counter.jpg"
        />
        {/* OFF-GRID SOLAR */}
        <ServiceCard
          title="Off-Grid Solar Panels"
          bodyText="Before learning to work on grid-tied homes and businesses and becoming a licensed electrician, Nigel, the founder of Wilson's Wires, lived off-grid. He relied on rain-catch systems for all the water he used and generated 100% of his own electricity from the sun with a solar panel array on the roof of a tiny house he designed and built. The design of off grid solar power solutions is a unique specialty, quite different from the installation of grid-tied systems. Correctly sizing and connecting battery banks, charge controllers, and inverters is something most residential electricians have no experience with. If you need power in a remote area, on the roof of a tiny house or camper van, or even for a small farm in the city, call Wilson's Wires and have experience on your side!"
          bodyTextMobile="Before becoming a licensed electrician, the founder of Wilson's Wires, lived off-grid and generated all of his own electricity with a solar panel array on the roof of a tiny house he built. The design of off grid solar power solutions for tiny homes and campers is a unique specialty and is something most residential electricians have no experience with. If you need power in a remote area, call Wilson's Wires and have experience on your side!"
          imagePath="/images/stock_solar_panels.jpg"
        />
      </div>
      
    </main>
  );
}

// We take craftsmanship seriously because when it comes to electrical work neatness and safety go hand in hand. 
          

interface ServiceCardProps {
  title: string;
  bodyText: String;
  bodyTextMobile: string;
  imagePath: string;
} 

const ServiceCard: React.FC<ServiceCardProps> = ({title, bodyText, bodyTextMobile, imagePath}) => {
  return (
    <div id="service-card" className="max-w-4xl bg-white rounded-md px-3 md:px-5 py-2 md:py-4">
      {/* CARD TITLE */}
      <div id="title" className="block sm:hidden text-3xl mb-1 md:mb-2">
        {title}
      </div>

      {/* IMAGE */}
      <div id="service-area" className="w-2/5 md:w-4/9 aspect-square mr-3 md:mr-5 float-left">
        <Image
          src={imagePath}
          width={1560}
          height={1560}
          className="rounded-lg"
          alt="Where we are located in New Orleans"
        /> 
      </div>

      {/* TITLE */}
      <div id="title" className="hidden sm:block text-3xl mb-1 md:mb-2">
        {title}
      </div>
      
      {/* BODY TEXT */}
      <div id="desktop-body-text" className="hidden sm:block text-md text-justify hyphens-auto">
        {bodyText}
      </div>
      <div id="mobile-body-text" className="block sm:hidden text-sm text-justify hyphens-auto">
        {bodyTextMobile}
      </div>

    </div>
  );
}


export default ServicesPage;
