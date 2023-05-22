import type { HTMLAttributes, PropsWithChildren } from 'react';

interface IndexSectionProps extends HTMLAttributes<HTMLDivElement> {
  id: string;
  height: string;
}

export const IndexSection = ({
  id,
  height,
  children,
  ...rest
}: PropsWithChildren<IndexSectionProps>) => {
  return (
    <section id={id} style={{ height }} {...rest}>
      {children}
    </section>
  );
};
