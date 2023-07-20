import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
} from '@tabler/icons-react';
import { Link } from '@remix-run/react';
import LogoLight from '../../public/LogoLight.svg';

export const SiteFooter = () => {
  return (
    <div className="bg-brand px-8 py-10 md:px-32">
      <footer className="mx-auto grid max-w-screen-xl grid-flow-row auto-rows-auto gap-10 text-white/90 md:auto-cols-auto md:grid-flow-col md:justify-between md:gap-20">
        <div className="grid grid-flow-row auto-rows-auto text-xs">
          <img src={LogoLight} alt="" className="mb-4 h-16" />
          <p>
            This site collects anonymized usage statistics that cannot be used
            to identify anyone, it is only for aggregated data to help my
            business. Use an ad blocker to opt out. Read our{' '}
            <Link
              className="underline"
              to="/privacy"
              rel="noopener nofollow"
              target="_blank"
            >
              Privacy Policy
            </Link>{' '}
            for complete information.
          </p>
          <p>
            The images "OfficeWhiteboard" and "StartupOffice" and some text were
            created with generative AI.
          </p>
          <p>Copyright &copy; 2023 Digital Canvas LLC</p>
          <p className="flex flex-row gap-2">
            <a
              href="https://www.linkedin.com/company/digital-canvas-dev/"
              target="_blank"
              rel="noreferrer"
            >
              <IconBrandLinkedin className="text-white" />
            </a>
            <a
              href="https://instagram.com/digitalcanvas.dev"
              target="_blank"
              rel="noreferrer"
            >
              <IconBrandInstagram className="text-white" />
            </a>
            <a
              href="https://facebook.com/digitalcanvasnj"
              target="_blank"
              rel="noreferrer"
            >
              <IconBrandFacebook className="text-white" />
            </a>
          </p>
        </div>
        <div className="text-center md:text-right">
          <h5 className="mb-4 font-body text-lg">Technical Expertise</h5>
          <ul className="font-body text-xs text-white/80 [&>li]:mt-2">
            <li>React</li>
            <li>TypeScript</li>
            <li>JavaScript</li>
            <li>Cybersecurity</li>
            <li>Responsive SPAs</li>
            <li>Modern HTML/CSS</li>
            <li>Browser Extensions</li>
            <li>Remix, Next.JS, Gatsby</li>
            <li>Component Libraries & Design Systems</li>
            <li>Automated testing with Jest & Cypress</li>
          </ul>
        </div>
      </footer>
    </div>
  );
};
