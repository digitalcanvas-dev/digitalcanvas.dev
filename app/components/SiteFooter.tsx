interface FooterProps {}

export const SiteFooter = ({}: FooterProps) => {
  return (
    <footer className="w-full bg-brand p-8 text-white md:py-32">
      <div className="mx-auto max-w-screen-xl">
        <p className="mb-4">Copyright &copy; 2023 Digital Canvas LLC</p>
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
