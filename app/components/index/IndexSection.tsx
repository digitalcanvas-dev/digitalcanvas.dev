import type { PropsWithChildren } from 'react';
import { forwardRef } from 'react';

type Y = 'top' | 'bottom' | 'both';
type X = 'left' | 'right' | 'both';

interface IndexSectionProps {
  bgColor?: string;
  border?: Y;
  // remove margins
  collapseY?: Y;
  collapseX?: X;
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
  collapseY?: Y,
): {
  hasTopBorder: boolean;
  hasBottomBorder: boolean;
  hasTopCollapse: boolean;
  hasBottomCollapse: boolean;
} => {
  const hasTopBorder = !!border && ['top', 'both'].includes(border);
  const hasBottomBorder = !!border && ['bottom', 'both'].includes(border);

  const hasTopCollapse = !!collapseY && ['top', 'both'].includes(collapseY);
  const hasBottomCollapse =
    !!collapseY && ['bottom', 'both'].includes(collapseY);

  return {
    hasTopBorder,
    hasBottomBorder,
    hasTopCollapse,
    hasBottomCollapse,
  };
};

const getContainerBounds = (
  border?: Y,
  collapseY?: Y,
  collapseX?: X,
): { inner: PaddingsMargins; outer: PaddingsMargins } => {
  const { hasTopBorder, hasBottomBorder, hasTopCollapse, hasBottomCollapse } =
    getBorderProperties(border, collapseY);

  const inner = {
    mt: hasTopCollapse
      ? hasTopBorder
        ? 'mt-8'
        : 'mt-0'
      : hasTopBorder
      ? 'mt-14 md:mt-24'
      : 'mt-0',
    mb: hasBottomCollapse
      ? hasBottomBorder
        ? 'mb-8'
        : 'mb-0'
      : hasBottomBorder
      ? 'mb-14 md:mb-24'
      : 'mb-0',
    mx: 'mx-auto',
    pt: hasTopCollapse
      ? hasTopBorder
        ? 'pt-8'
        : 'pt-0'
      : hasTopBorder
      ? 'pt-8'
      : 'pt-16 md:pt-32',
    pb: hasBottomCollapse
      ? hasBottomBorder
        ? 'pb-8'
        : 'pb-0'
      : hasBottomBorder
      ? 'pb-8'
      : 'pb-16 md:pb-32',
    px: 'px-0 md:px-0',
  };

  const outer = {
    mt: 'mt-0',
    mb: 'mb-0',
    mx: 'mx-0',
    pt: hasTopBorder ? 'pt-8' : 'pt-0',
    pb: hasBottomBorder ? 'pb-8' : 'pb-0',
    px: collapseX ? 'px-0 md:px-0' : 'px-8 md:px-32',
  };

  return {
    inner,
    outer,
  };
};

export const IndexSection = forwardRef<
  HTMLElement,
  PropsWithChildren<IndexSectionProps>
>(({ children, collapseY, collapseX, border, bgColor = 'bg-white' }, ref) => {
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
  } = getContainerBounds(border, collapseY, collapseX);

  const innerStyles = `${innerMT} ${innerMB} ${innerPT} ${innerPB} ${innerMX} ${innerPX}`;
  const outerStyles = `${outerMT} ${outerMB} ${outerPT} ${outerPB} ${outerMX} ${outerPX} relative`;

  return (
    <section ref={ref} className={`${bgColor} ${outerStyles}`}>
      <div
        className={`${collapseX ? '' : 'max-w-screen-xl'} ${innerStyles} ${
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
