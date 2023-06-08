import LogoLight from '../../public/LogoLight.svg';

interface FooterProps {}

export const SiteFooter = ({}: FooterProps) => {
  return (
    <footer className="mx-auto grid w-full max-w-screen-xl auto-cols-auto grid-flow-col justify-between bg-brand px-8 py-16 text-white/80 md:px-32">
      <div className="grid grid-flow-row auto-rows-auto gap-8">
        <img src={LogoLight} alt="" className="h-16" />
        <p className="mb-4 text-xs">Copyright &copy; 2023 Digital Canvas LLC</p>
        <p className="text-xs">
          This site collects anonymized usage statistics that cannot be used to
          identify anyone, only for aggregated data to help my business.
          <br />
          Use an adblocker to opt out.
        </p>
      </div>
    </footer>
  );
};
