import { IndexSection } from '~/components/IndexSection';
import { useRefManagerContext } from '~/components/index/RefManagerContext';

interface AboutProps {}

export const About = ({}: AboutProps) => {
  const { getHTMLElementRef } = useRefManagerContext();

  const aboutRef = getHTMLElementRef('about');

  return (
    <IndexSection
      ref={aboutRef}
      className="grid h-screen grid-flow-row auto-rows-auto items-center justify-center gap-12 md:auto-cols-auto md:grid-flow-col"
    >
      About
    </IndexSection>
  );
};
