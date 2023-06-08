import { IndexSection } from '~/components/IndexSection';
import { useRefManagerContext } from '~/components/index/RefManagerContext';

interface AboutProps {}

export const About = ({}: AboutProps) => {
  const { getHTMLElementRef } = useRefManagerContext();

  const aboutRef = getHTMLElementRef('about');

  return (
    <IndexSection
      ref={aboutRef}
      className="bg-brand bg-opacity-10 px-8 py-16 md:min-h-[50vh] md:px-32 md:py-24"
    >
      <div className="border-t-1 grid w-full grid-flow-row items-start justify-stretch gap-20 border-t border-t-brand pt-10 text-brand md:mx-auto md:max-w-screen-xl md:grid-flow-col md:gap-60">
        <h3 className="self-start justify-self-start align-top font-heading text-3xl">
          About Us
        </h3>
        <div className="flex flex-col gap-8 self-start justify-self-end font-body text-opacity-80">
          <p>
            After over 13 years in different technical fields including
            advertising, finance, education technology, and cyber security,{' '}
            <strong>Simon Goldin</strong> launched{' '}
            <strong>Digital Canvas Development</strong> to help small businesses
            and startups leverage their technology and people to provide the
            best products and user experiences possible.
          </p>
          <p>
            <strong>Digital Canvas Development</strong> is based in New Jersey
            and provides services globally.
          </p>
        </div>
      </div>
    </IndexSection>
  );
};
