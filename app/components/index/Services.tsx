import type { PropsWithChildren } from 'react';

interface ServicesProps {
  id: string;
  height: string;
}

export const Services = ({ id, height }: PropsWithChildren<ServicesProps>) => {
  return (
    <section id={id} style={{ height }}>
      Services
    </section>
  );
};
