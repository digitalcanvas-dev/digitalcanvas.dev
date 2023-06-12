import { IconArrowNarrowRight } from '@tabler/icons-react';
import { useRefManagerContext } from '~/components/index/RefManagerContext';
import { IndexSection } from '~/components/index/IndexSection';
import Splash from './Hero2.webp';
import LogoEffect from './Hero.png';

const scrollTo = (targetElement?: HTMLElement | null) => {
  if (!targetElement) {
    return null;
  }
  targetElement.scrollIntoView({ behavior: 'smooth' });
};

export const Hero = () => {
  const { getHTMLElementRef } = useRefManagerContext();

  const contactRef = getHTMLElementRef('contact');

  return (
    <IndexSection collapseX="left" collapseY="both">
      <div
        className="hidden md:block"
        style={{
          backgroundImage: `url(${Splash})`,
          backgroundSize: 'cover',
          backgroundPosition: 'bottom center',
          position: 'absolute',
          height: '100%',
          // 100vw * indexLeftHeading ratio - 8rem left padding
          width: 'calc((100vw * 0.4) - 8rem)',
          left: 0,
        }}
      />
      <div className="mx-auto mt-20 grid max-w-screen-2xl grid-cols-1 content-between justify-start gap-14 px-8 md:mt-0 md:grid-cols-indexLeftHeadingMd md:px-32">
        <div className="hidden md:block" />
        <div className="col-span-2 grid grid-flow-row auto-rows-auto content-center items-center justify-start gap-4 md:col-span-1">
          <img src={LogoEffect} alt="" className="mx-auto mb-8 md:my-20" />
          <h3 className="font-heading text-3xl font-bold text-brand">
            Your Dedicated Partner for Custom Web Development
          </h3>
          <p className="font-body font-light text-brand">
            We specialize in working with small businesses and startups,
            crafting unique, user-friendly websites tailored specifically to
            your needs. <strong>Digital Canvas Development</strong> understands
            that your digital presence should be as unique as your business, and
            we're committed to making that a reality. We offer affordable,
            custom-made solutions to amplify your business growth. With{' '}
            <strong>Digital Canvas Development</strong>, watch as your vision
            transforms into an engaging digital experience.
          </p>
          <span
            onClick={() => scrollTo(contactRef?.current)}
            className="mb-20 mt-4 flex cursor-pointer auto-rows-auto items-center gap-2 justify-self-start font-body text-2xl text-brand hover:underline md:mb-40"
          >
            Contact us now <IconArrowNarrowRight className="text-highlight" />
          </span>
        </div>
      </div>
    </IndexSection>
  );
};
