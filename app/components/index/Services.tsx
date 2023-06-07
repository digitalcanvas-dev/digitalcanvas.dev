import type { PropsWithChildren } from 'react';
import { IndexSection } from '~/components/IndexSection';
import { useRef } from 'react';
import { useRefManagerContext } from '~/components/index/RefManagerContext';

interface ServicesProps {}

const services = [
  {
    title: 'Custom Web Development',
    content: [
      'Digital Canvas Development can create your website or app to exact specifications.',
    ],
  },
  {
    title: 'Site Builder Management',
    content: [
      'We can maintain an existing website on SquareSpace, Wix or any other platform.',
      'Contact us today!',
    ],
  },
  {
    title: 'Technical Consulting',
    content: [
      'Digital Canvas Development specializes in high quality code and modern practices.',
      'Contact us for a free initial consultation!',
    ],
  },
];

const ServiceBlock = ({
  title,
  content,
}: {
  title: string;
  content: string[];
}) => {
  return (
    <div className="rounded-xl bg-white bg-opacity-50 p-4 md:transition-transform md:hover:scale-110">
      <h3 className="font-heading text-teal-950">{title}</h3>
      {content.map((str) => (
        <p className="mb-2 font-body text-teal-900 last-of-type:mb-0" key={str}>
          {str}
        </p>
      ))}
    </div>
  );
};

export const Services = ({}: PropsWithChildren<ServicesProps>) => {
  const { getHTMLElementRef } = useRefManagerContext();

  const servicesRef = getHTMLElementRef('services');

  return (
    <IndexSection className="mb-32 mt-24" ref={servicesRef}>
      <div className="mt-2.5 grid grid-flow-row auto-rows-auto gap-4 md:auto-cols-auto md:grid-flow-col">
        {services.map(({ title, content }) => (
          <ServiceBlock key={title} title={title} content={content} />
        ))}
      </div>
    </IndexSection>
  );
};
