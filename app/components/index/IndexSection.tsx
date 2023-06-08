import type { PropsWithChildren } from 'react';
import { forwardRef } from 'react';

type Y = 'top' | 'bottom' | 'both';

interface IndexSectionProps {
  bgColor?: string;
  bgOpacity?: number;
  border?: Y;
  // remove margins
  collapse?: Y;
}

/*
For simplicity, if there's no border than we just apply margin to the inner.
 */

type PaddingsMargins = {
  mt: string;
  mb: string;
  mx: string;
  pt: string;
  pb: string;
  px: string;
};

const getBorderProperties = (
  border?: Y,
  collapse?: Y
): {
  hasTopBorder: boolean;
  hasBottomBorder: boolean;
  hasTopCollapse: boolean;
  hasBottomCollapse: boolean;
} => {
  const hasTopBorder = !!border && ['top', 'both'].includes(border);
  const hasBottomBorder = !!border && ['bottom', 'both'].includes(border);

  const hasTopCollapse = !!collapse && ['top', 'both'].includes(collapse);
  const hasBottomCollapse = !!collapse && ['bottom', 'both'].includes(collapse);

  return {
    hasTopBorder,
    hasBottomBorder,
    hasTopCollapse,
    hasBottomCollapse,
  };
};

const getContainerBounds = (
  border?: Y,
  collapse?: Y
): { inner: PaddingsMargins; outer: PaddingsMargins } => {
  const { hasTopBorder, hasBottomBorder, hasTopCollapse, hasBottomCollapse } =
    getBorderProperties(border, collapse);

  const inner = {
    mt: hasTopCollapse
      ? hasTopBorder
        ? 'mt-8'
        : 'mt-0'
      : hasTopBorder
      ? 'mt-24'
      : 'mt-8',
    mb: hasBottomCollapse ? 'mb-0' : hasBottomBorder ? 'mb-8' : 'mb-8',
    mx: 'mx-auto',
    pt: hasTopCollapse
      ? hasTopBorder
        ? 'pt-8'
        : 'pt-0'
      : hasTopBorder
      ? 'pt-8'
      : 'pt-24',
    pb: hasBottomCollapse ? 'pb-0' : hasBottomBorder ? 'pb-8' : 'pb-24',
    px: 'px-0',
  };

  const outer = {
    mt: 'mt-0',
    mb: 'mb-0',
    mx: 'mx-0',
    pt: hasTopBorder ? 'pt-8' : 'pt-0',
    pb: hasBottomBorder ? 'pb-8' : 'pb-0',
    px: 'px-8 md:px-32',
  };

  return {
    inner,
    outer,
  };
};

export const IndexSection = forwardRef<
  HTMLElement,
  PropsWithChildren<IndexSectionProps>
>(({ children, collapse, border, bgColor = 'bg-white' }, ref) => {
  const {
    inner: {
      mt: innerMT,
      mb: innerMB,
      mx: innerMX,
      pt: innerPT,
      pb: innerPB,
      px: innerPX,
    },
    outer: {
      mt: outerMT,
      mb: outerMB,
      pt: outerPT,
      pb: outerPB,
      mx: outerMX,
      px: outerPX,
    },
  } = getContainerBounds(border, collapse);

  const innerStyles = `${innerMT} ${innerMB} ${innerPT} ${innerPB} ${innerMX} ${innerPX}`;
  const outerStyles = `${outerMT} ${outerMB} ${outerPT} ${outerPB} ${outerMX} ${outerPX}`;

  return (
    <section ref={ref} className={`${bgColor} ${outerStyles}`}>
      <div
        className={`max-w-screen-xl ${innerStyles} ${
          border
            ? border === 'top'
              ? 'border-t border-t-brand border-opacity-40'
              : 'border-b border-b-brand border-opacity-40'
            : ''
        }`}
      >
        {children}
      </div>
    </section>
  );
});
