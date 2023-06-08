interface FooterProps {}

export const SiteFooter = ({}: FooterProps) => {
  return (
    <footer className="w-full border-t-2 border-t-teal-100 bg-teal-800 bg-opacity-60 p-8 text-teal-50 md:px-32">
      <p className="mb-4">Copyright &copy; 2023 Digital Canvas LLC</p>
      <p className="text-xs">
        This site collects anonymized usage statistics that cannot be used to
        identify anyone, only for aggregated data to help my business.
        <br />
        Use an adblocker to opt out.
      </p>
    </footer>
  );
};
