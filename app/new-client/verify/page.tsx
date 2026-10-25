// My Components
import VerifyEmailForm from '@/app/ui/verifyEmailForm';

interface PageProps {
  searchParams: Promise<{ token?: string | string[] }>;
}

// The page that the link in the confirmation email opens.
const VerifyEmailPage = async ({ searchParams }: PageProps) => {
  const { token } = await searchParams;
  return (
    <main id="verify-email-page" className="flex flex-col">
      {/* HEADER TEXT */}
      <div id="header-text" className="flex justify-center p-8 text-black text-center leading-none text-[3rem] sm:text-[5rem] md:text-[6rem] lg:text-[7rem]">
        Confirm Email
      </div>
      <VerifyEmailForm token={typeof token === 'string' ? token : ""} />
    </main>
  );
}

export default VerifyEmailPage;
