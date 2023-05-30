import { IndexSection } from '~/components/IndexSection';
import { useRefManagerContext } from '~/components/index/RefManagerContext';
import logo from '../../../public/dcdLogo.svg';

interface AboutProps {
  id: string;
}

export const About = ({ id }: AboutProps) => {
  const { getHTMLImgElementRef } = useRefManagerContext();

  const titleLogoRef = getHTMLImgElementRef('titleLogo');

  return (
    <IndexSection
      id={id}
      className="grid h-screen grid-flow-row auto-rows-auto items-center justify-center gap-12 md:auto-cols-auto md:grid-flow-col"
    >
      <img
        src={logo}
        className="h-24 self-end justify-self-center md:self-center"
        alt=""
        ref={titleLogoRef}
      />
      <div className="flex flex-col gap-8 text-lg">
        <p>
          In the dynamic landscape of modern business and emerging startups,
          your unique needs deserve personalized attention.{' '}
          <strong>Digital Canvas Development</strong> specializes in creating
          tailor-made software solutions that not only answer your challenges
          but also stimulate growth and innovation.
        </p>
        <p>
          Seeking a fresh, contemporary website to reflect your brand's
          personality? Need to update an existing site to stay ahead in the
          digital race? Look no further and schedule a free consultation today!
        </p>
      </div>
    </IndexSection>
  );
};
