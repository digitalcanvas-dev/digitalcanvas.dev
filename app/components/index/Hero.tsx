import { IconArrowNarrowRight } from '@tabler/icons-react';
import { useRefManagerContext } from '~/components/index/RefManagerContext';
import { IndexSection } from '~/components/index/IndexSection';
import Splash from '~/components/index/images/Splash3.jpg';

interface HeroProps {}

const scrollTo = (targetElement?: HTMLElement | null) => {
  if (!targetElement) {
    return null;
  }
  targetElement.scrollIntoView({ behavior: 'smooth' });
};

export const Hero = ({}: HeroProps) => {
  const { getHTMLElementRef } = useRefManagerContext();

  const contactRef = getHTMLElementRef('contact');

  return (
    <IndexSection>
      <div
        className="grid content-between justify-start gap-12"
        style={{ gridTemplateColumns: 'auto 1fr' }}
      >
        <div className="col-span-2 grid grid-flow-row auto-rows-auto content-center items-center justify-start gap-12 md:col-span-1">
          <h3 className="font-heading text-3xl font-bold text-brand">
            Pixels to Masterpieces: Unleashing the Digital Canvas
          </h3>
          <p className="font-body font-light text-brand">
            In the realm of art and design, traditional canvases have long been
            a staple for creators to express their imagination. However, with
            the advent of technology, a new medium has emerged — the digital
            canvas.
          </p>
          <span
            onClick={() => scrollTo(contactRef?.current)}
            className="mt-16 flex cursor-pointer auto-rows-auto justify-self-end font-body text-lg text-brand hover:underline"
          >
            Contact us now <IconArrowNarrowRight className="text-highlight" />
          </span>
        </div>
        <img src={Splash} alt="" className="hidden max-w-sm md:block" />
      </div>
    </IndexSection>
  );
};
