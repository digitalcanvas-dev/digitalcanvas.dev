import type { HTMLAttributes, PropsWithChildren } from 'react';

interface IndexSectionProps extends HTMLAttributes<HTMLDivElement> {
  id: string;
}

export const IndexSection = ({
  id,
  children,
  ...rest
}: PropsWithChildren<IndexSectionProps>) => {
  return (
    <section id={id} {...rest}>
      {children}
    </section>
  );
};
