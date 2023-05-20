import type { V2_MetaFunction } from "@remix-run/node";
import { SiteHeader } from "~/components/SiteHeader";
import { rem } from "@mantine/core";

export const meta: V2_MetaFunction = () => [
  { title: "Digital Canvas Development" },
];

const enum Section {
  "about" = "about",
  "services" = "services",
  "testimonials" = "testimonials",
  "contact" = "contact",
}

const HEADER_HEIGHT = rem(60);

const links = [
  {
    link: `#${Section.about}`,
    label: "About",
  },
  {
    link: `#${Section.services}`,
    label: "Services",
  },
  {
    link: `#${Section.testimonials}`,
    label: "Testimonials",
  },
];

const mainCta = {
  link: `#${Section.contact}`,
  label: "Contact",
};

export default function Index() {
  return (
    <>
      <SiteHeader
        links={links}
        headerHeight={HEADER_HEIGHT}
        mainCta={mainCta}
      />
      <section
        id={Section.about}
        style={{ height: `calc(100vh - ${HEADER_HEIGHT})` }}
      >
        About
      </section>
      <section
        id={Section.services}
        style={{
          height: "100vh",
        }}
      >
        Services
      </section>
      <section
        id={Section.testimonials}
        style={{
          height: "100vh",
        }}
      >
        Testimonials
      </section>
      <section
        id={Section.contact}
        style={{
          height: "100vh",
        }}
      >
        Contact
      </section>
    </>
  );
}
