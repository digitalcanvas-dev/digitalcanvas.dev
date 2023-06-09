import StartupOffice from '~/components/index/images/services/StartupOffice.jpg';
import OfficeWhiteboard from '~/components/index/images/services/OfficeWhiteboard.jpg';
import { IndexSection } from '~/components/index/IndexSection';

interface ConsultationProps {}

const StockImageWrapper = ({
  imgSrc,
  pos,
  heightPx,
}: {
  imgSrc: string;
  pos: 'left' | 'right';
  heightPx: number;
}) => {
  const rightPos = pos === 'right';

  const radiusStyles = rightPos
    ? {
        borderTopLeftRadius: `${Math.round(heightPx / 2)}px`,
        borderBottomLeftRadius: `${Math.round(heightPx / 2)}px`,
      }
    : {
        borderTopRightRadius: `${Math.round(heightPx / 2)}px`,
        borderBottomRightRadius: `${Math.round(heightPx / 2)}px`,
      };

  const borderClassName = `border-${rightPos ? 'r' : 'l'}-0`;

  return (
    <div
      className={`border ${borderClassName} border-brand`}
      style={{
        ...radiusStyles,
        height: `${heightPx - 2}px`,
        transform: `translate(${rightPos ? '0' : '72'}px)`,
      }}
    >
      <div
        className={`border ${borderClassName} border-brand`}
        style={{
          ...radiusStyles,
          height: `${heightPx - 2}px`,
          transform: `translate(${rightPos ? '25' : '-25'}px)`,
        }}
      >
        <div
          style={{
            ...radiusStyles,
            marginTop: -2,
            backgroundImage: `url(${imgSrc})`,
            backgroundSize: 'contain',
            height: heightPx,
            width: (heightPx * 17) / 9,
            transform: `translate(${rightPos ? '47' : '-47'}px)`,
          }}
        />
      </div>
    </div>
  );
};

export const Consultation = ({}: ConsultationProps) => {
  return (
    <IndexSection bgColor="bg-brand/40">
      <div className="grid auto-cols-auto grid-flow-col items-center justify-between gap-60">
        <div className="hidden flex-col gap-4 md:flex">
          <StockImageWrapper
            imgSrc={OfficeWhiteboard}
            pos="left"
            heightPx={190}
          />
          <StockImageWrapper
            imgSrc={StartupOffice}
            pos="right"
            heightPx={190}
          />
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
