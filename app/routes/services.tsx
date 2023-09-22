import { useRefManagerContext } from '~/components/index/RefManagerContext';
import CustomDevelopment from '~/components/index/services/CustomDevelopment.svg';
import TestingDebugging from '~/components/index/services/TestingDebugging.svg';
import Consulting from '~/components/index/services/Consulting.svg';
import TeamAugmentation from '~/components/index/services/TeamAugementation.svg';
import CustomServices from '~/components/index/services/CustomServices.svg';
import { IndexSection } from '~/components/index/IndexSection';

const services = [
  {
    title: 'Custom Web Development',
    content:
      'We can build to exact specifications and will exceed your expectations.',
    icon: CustomDevelopment,
  },
  {
    title: 'Testing & Debugging',
    content:
      'Automated testing is available to future-proof our work and make debugging easier.',
    icon: TestingDebugging,
  },
  {
    title: 'Technical Consulting',
    content:
      'Digital Canvas Development specializes in high quality code and modern practices.',
    icon: Consulting,
  },
  {
    title: 'Team Augmentation',
    content:
      'We can work with an existing team and processes to help meet your goals and deadlines.',
    icon: TeamAugmentation,
  },
  {
    title: 'Custom Services',
    content:
      'Are accessibility, developer experience, or something else on your mind? Let us know!',
    icon: CustomServices,
  },
];

const ServiceBlock = ({
  title,
  content,
  icon,
}: {
  title: string;
  content: string;
  icon?: string;
}) => {
  return (
    <div className="grid grid-flow-row auto-rows-auto justify-items-center gap-4 p-4 md:transition-transform md:hover:scale-110 w-1/3">
      {icon ? <img src={icon} alt="" /> : null}
      <h3 className="text-center font-heading text-brand">{title}</h3>
      <p className="text-balance text-center font-body font-light text-brand last-of-type:mb-0">
        {content}
      </p>
    </div>
  );
};

export const Services = () => {
  const {
    refs: { services: servicesRef },
  } = useRefManagerContext();

  return (
    <IndexSection ref={servicesRef}>
      <div className="border-b-1 mb-10 grid w-full grid-flow-row auto-rows-auto items-start justify-stretch gap-14 border-b border-b-brand border-opacity-40 pb-10 text-brand md:grid-cols-indexLeftHeadingMd">
        <h3 className="font-heading text-3xl">Services</h3>
        <div className="self-start justify-self-end font-body font-light">
          <p>
            <strong>Digital Canvas Development</strong> specializes in working
            with small business and software-as-a-service startups. We offer a
            wide range of services that can be custom tailored to your needs.
          </p>
          <p>
            While our tech stack is always evolving, the <strong>React</strong>{' '}
            and <strong>TypeScript</strong> ecosystem is our specialty.
          </p>
        </div>
      </div>
      <div className="mt-2.5 flex flex-row gap-10 w-full flex-wrap items-start justify-center">
        {services.map(({ title, content, icon }) => (
          <ServiceBlock
            key={title}
            title={title}
            content={content}
            icon={icon}
          />
        ))}
      </div>
    </IndexSection>
  );
};
