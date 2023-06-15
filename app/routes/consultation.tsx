import { IndexSection } from '~/components/index/IndexSection';
import StartupOffice from '~/components/index/consultation/StartupOffice.webp';
import OfficeWhiteboard from '~/components/index/consultation/OfficeWhiteboard.webp';

export const Consultation = () => {
  return (
    <IndexSection bgColor="bg-brand/40">
      <div className="grid auto-cols-auto grid-flow-col items-stretch justify-between gap-6">
        <div className="hidden flex-col justify-around gap-4 md:flex">
          <img src={OfficeWhiteboard} alt="" />
          <img src={StartupOffice} alt="" />
        </div>
        <div className="text-balance">
          <h3 className="mb-14 font-heading text-3xl text-brand">
            Startup Consultation and Team Augmentation
          </h3>
          <div className="font-body text-brand">
            <p className="mb-6 text-brand/80">
              As your partner in frontend web development consultation and team
              augmentation, I provide a comprehensive digital solution. I'll
              guide you in crafting an impactful website and offer my expertise
              to bring your vision to life, ensuring you have a notable web
              presence backed by years of experience.
            </p>
            <h4 className="mb-2 font-bold">Consultation</h4>
            <p className="mb-6 text-brand/80">
              Our frontend consultation service delivers engaging, intuitive web
              designs using the latest trends and technologies. We offer expert
              guidance on design, user experience, and performance optimization,
              aiming to create an interactive digital front that effectively
              converts visitors into customers.
            </p>
            <h4 className="font-bold">Augmentation</h4>
            <p className="mb-2 text-brand/80">
              Our team augmentation service is designed to seamlessly blend with
              your existing setup, providing the additional skills and expertise
              you need to meet project deadlines. Whether you're looking to fill
              a temporary skill gap or need support for a larger project,{' '}
              <strong>Digital Canvas Development</strong> is here to ensure your
              web development initiatives are successful.
            </p>
          </div>
        </div>
      </div>
    </IndexSection>
  );
};
