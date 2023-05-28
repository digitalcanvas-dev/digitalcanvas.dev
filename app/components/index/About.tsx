import { IndexSection } from '~/components/IndexSection';
import { useRefManagerContext } from '~/components/index/RefManagerContext';
import logo from '../../../public/dcdLogo.svg';

interface AboutProps {
  id: string;
}

export const About = ({ id }: AboutProps) => {
  const { getHTMLImgElementRef } = useRefManagerContext();

  const titleLogoRef = getHTMLImgElementRef('titleLogo');

  return (
    <IndexSection
      id={id}
      className="grid h-screen grid-flow-row auto-rows-auto items-center justify-center gap-12 md:auto-cols-auto md:grid-flow-col"
    >
      <img
        src={logo}
        className="h-24 self-end justify-self-center md:self-center"
        alt=""
        ref={titleLogoRef}
      />
      <div className="flex flex-col gap-8 text-lg">
        <p>
          Specializing in the unique needs of both businesses and startups,{' '}
          <strong>Digital Canvas Development</strong> provides tailored
          solutions in custom software development and consulting.
        </p>
        <p>
          Whether you need a new or updated website, or you're looking for
          someone with over 10 years' of experience to coordinate with an
          existing team, <strong>Digital Canvas Development</strong> can help!
        </p>
      </div>
    </IndexSection>
  );
};
