import { IconArrowNarrowRight } from '@tabler/icons-react';
import { useRefManagerContext } from '~/components/index/RefManagerContext';
import { IndexSection } from '~/components/index/IndexSection';

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
      <section className="grid h-screen grid-flow-row auto-rows-auto items-center justify-center gap-12">
        <div className="flex flex-col gap-8 text-lg">
          <h3 className="font-heading font-bold text-brand">
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
            className="flex cursor-pointer auto-rows-auto items-center self-end font-body text-brand hover:underline"
          >
            Contact us now <IconArrowNarrowRight className="text-highlight" />
          </span>
        </div>
      </section>
    </IndexSection>
  );
};
