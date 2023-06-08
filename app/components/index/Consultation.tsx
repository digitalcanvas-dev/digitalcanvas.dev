import img1 from '~/components/index/images/services/img1.png';
import img2 from '~/components/index/images/services/img2.png';
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
    <IndexSection bgColor="brand" bgOpacity={40}>
      <div className="grid auto-cols-auto grid-flow-col items-center justify-between gap-60">
        <div className="hidden flex-col gap-4 md:flex">
          <StockImageWrapper imgSrc={img2} pos="left" heightPx={190} />
          <StockImageWrapper imgSrc={img1} pos="right" heightPx={190} />
        </div>
        <div>
          <h3 className="text-balance mb-1 font-heading text-3xl text-brand">
            Startup Consultation and Team Augmentation
          </h3>
          <div className="text-balance font-body text-brand text-opacity-80">
            <p className="">
              We can work with your existing team to meet your deadlines or
              exceed your goals.
            </p>
            <p>Second paragraph</p>
          </div>
        </div>
      </div>
    </IndexSection>
  );
};
