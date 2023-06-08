import { useRefManagerContext } from '~/components/index/RefManagerContext';
import { IndexSection } from '~/components/index/IndexSection';

interface TestimonialsProps {}

export const Testimonials = ({}: TestimonialsProps) => {
  const { getHTMLElementRef } = useRefManagerContext();

  const testimonialsRef = getHTMLElementRef('testimonials');

  return (
    <IndexSection ref={testimonialsRef} bgColor="brand">
      <div className="grid grid-flow-row auto-rows-auto justify-between gap-12 md:auto-cols-auto md:grid-flow-col">
        <h3 className="font-heading text-3xl text-white">Testimonials</h3>
        <div>content here</div>
      </div>
    </IndexSection>
  );
};
