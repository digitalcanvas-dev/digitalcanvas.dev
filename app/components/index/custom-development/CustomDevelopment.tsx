import { IndexSection } from '~/components/index/IndexSection';
import CustomDevelopmentImg from './LaptopWithCode.webp';

export const CustomDevelopment = () => {
  return (
    <IndexSection bgColor="bg-brand/20">
      <div className="grid grid-flow-row auto-rows-auto items-center justify-between gap-8 sm:gap-20 md:auto-cols-auto md:grid-flow-col">
        <div>
          <h3 className="mb-14 font-heading text-3xl text-brand">
            Custom Web Development
          </h3>
          <div className="font-body font-light text-brand text-opacity-80">
            <p>
              <strong>Digital Canvas Development</strong> can work with you or
              your designers to create or perfect a unique online presence your
              business.
            </p>
            <p>
              Critical software is rarely "set and forget", so we take code
              quality seriously and can write automated tests upon request!
            </p>
          </div>
        </div>
        <div
          className="hidden border border-brand border-opacity-40 py-4 md:block"
          style={{
            marginRight: '20px',
          }}
        >
          <img
            src={CustomDevelopmentImg}
            alt=""
            style={{
              height: 'auto',
              width: 'auto',
              transform: 'translateX(-20px)',
            }}
          />
        </div>
      </div>
    </IndexSection>
  );
};
