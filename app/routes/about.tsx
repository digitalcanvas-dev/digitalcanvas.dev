import { useRefManagerContext } from '~/components/index/RefManagerContext';
import { IndexSection } from '~/components/index/IndexSection';

export const About = () => {
  const { getRef } = useRefManagerContext();

  const aboutRef = getRef('about');

  return (
    <IndexSection ref={aboutRef} bgColor="bg-brand/10" border="top">
      <div className="grid w-full grid-flow-row auto-rows-auto items-start justify-stretch gap-14 text-brand md:min-h-[50vh] md:grid-cols-indexLeftHeadingMd">
        <h3 className="self-start justify-self-start align-top font-heading text-3xl">
          About Us
        </h3>
        <div className="text-balance flex flex-col gap-8 self-start justify-self-end font-body font-light text-opacity-80">
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
