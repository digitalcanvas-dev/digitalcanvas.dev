import { IndexSection } from '~/components/index/IndexSection';
import CustomDevelopmentImg from '~/components/index/custom-development/LaptopWithCode.webp';

export const CustomDevelopment = () => {
  return (
    <IndexSection bgColor="bg-brand/20">
      <div className="grid grid-flow-row auto-rows-auto items-center justify-between gap-8 sm:gap-20 md:auto-cols-auto md:grid-flow-col">
        <div>
          <h3 className="mb-14 font-heading text-3xl text-brand font-light">
            Custom Web Development
          </h3>
          <div className="font-body font-light text-brand">
            <p>
              <strong>Digital Canvas Development</strong> can work with you or
              your designers to create or perfect a unique online presence for
              your business.
            </p>
            <p>
              If you're looking for a polished custom-tailored web-based app or
              extension, we can help with that too!
            </p>
            <p>
              Critical software is rarely "set and forget", so we take code
              quality and readability seriously.
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
