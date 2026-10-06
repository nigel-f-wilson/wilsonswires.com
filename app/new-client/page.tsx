// My Components
import NewClientForm from '@/app/ui/newClientForm';

interface PageProps {
  // children: React.ReactNode;
}

const NewClientPage: React.FC<PageProps> = ({}) => {
  return (
    <main id="new-client-page" className="flex flex-col">
      {/* HEADER TEXT */}
      <div id="header-text" className="flex justify-center p-8 text-black leading-none text-[3.5rem] sm:text-[6rem] md:text-[8rem] lg:text-[9rem] xl:text-[10rem] xl:pr-4">
        New Client
      </div>
      <NewClientForm />
    </main>
  );
}

export default NewClientPage;
