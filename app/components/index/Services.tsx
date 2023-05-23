import type { PropsWithChildren } from 'react';
import { IndexSection } from '~/components/IndexSection';

interface ServicesProps {
  id: string;
}

export const Services = ({ id }: PropsWithChildren<ServicesProps>) => {
  return <IndexSection id={id}>Services</IndexSection>;
};
