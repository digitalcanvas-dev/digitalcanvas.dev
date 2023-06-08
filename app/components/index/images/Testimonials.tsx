import { IndexSection } from '~/components/IndexSection';
import { useRefManagerContext } from '~/components/index/RefManagerContext';

interface TestimonialsProps {}

export const Testimonials = ({}: TestimonialsProps) => {
  const { getHTMLElementRef } = useRefManagerContext();

  const testimonialsRef = getHTMLElementRef('testimonials');

  return (
    <IndexSection
      ref={testimonialsRef}
      className="grid grid-flow-row auto-rows-auto items-center justify-center gap-12 md:auto-cols-auto md:grid-flow-col"
    >
      Testimonials
    </IndexSection>
  );
};
