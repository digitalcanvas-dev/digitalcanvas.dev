import type { ForwardedRef, HTMLAttributes, PropsWithChildren } from 'react';
import { forwardRef } from 'react';

interface IndexSectionProps extends HTMLAttributes<HTMLDivElement> {}

export const IndexSection = forwardRef(
  (
    { children, ...rest }: PropsWithChildren<IndexSectionProps>,
    ref: ForwardedRef<HTMLElement>
  ) => {
    return (
      <section {...rest} ref={ref}>
        {children}
      </section>
    );
  }
);
