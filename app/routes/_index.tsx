import { SiteHeader } from '~/components/SiteHeader';
import { rem } from '@mantine/core';
import { About } from '~/components/index/About';
import { Services } from '~/components/index/Services';

const enum Section {
  'about' = 'about',
  'services' = 'services',
  'testimonials' = 'testimonials',
  'contact' = 'contact',
}

const HEADER_HEIGHT = rem(60);

const links = [
  {
    link: `${Section.about}`,
    label: 'About',
  },
  {
    link: `${Section.services}`,
    label: 'Services',
  },
  {
    link: `${Section.testimonials}`,
    label: 'Testimonials',
  },
];

const mainCta = {
  link: `${Section.contact}`,
  label: 'Contact',
};

const sectionHeight = `calc(100vh - ${HEADER_HEIGHT})`;

const Index = () => (
  <>
    <SiteHeader links={links} headerHeight={HEADER_HEIGHT} mainCta={mainCta} />
    <About id={Section.about} height={sectionHeight} />
    <Services id={Section.services} height={sectionHeight} />
    <section
      id={Section.testimonials}
      style={{
        height: sectionHeight,
      }}
    >
      Testimonials
    </section>
    <section
      id={Section.contact}
      style={{
        height: sectionHeight,
      }}
    >
      Contact
    </section>
  </>
);
export default Index;
