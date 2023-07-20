import { useCallback } from 'react';
import { useRefManagerContext } from '~/components/index/RefManagerContext';
import { useLocation } from '@remix-run/react';

export const useScrollToElement = (headerHeight: number) => {
  const { refs, validateKey } = useRefManagerContext();
  const location = useLocation();

  const scrollToElement = useCallback(
    (refId: string, noScroll: boolean = false) => {
      if (!validateKey(refId)) {
        console.error(`invalid refId: ${refId}`);
        return;
      }

      window.setTimeout(() => {
        const elRef = refs[refId];

        if (elRef?.current) {
          const { top } = elRef?.current?.getBoundingClientRect();
          window.scrollBy({
            top: top - headerHeight,
            behavior: noScroll ? 'auto' : 'smooth',
          });
          location.hash = refId;
          //          elRef.current?.scrollIntoView({ behavior: 'smooth' });
          // window.scrollBy({ top: -headerHeight, behavior: 'smooth' });
        }
      }, 0);
    },
    [headerHeight, refs, validateKey],
  );

  return {
    scrollToElement,
  };
};
