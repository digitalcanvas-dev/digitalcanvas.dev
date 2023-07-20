import { useCallback } from 'react';
import { useRefManagerContext } from '~/components/index/RefManagerContext';

export const useScrollToElement = (headerHeight: number) => {
  const { refs, validateKey } = useRefManagerContext();

  const scrollToElement = useCallback(
    (refId: string, noScroll: boolean = false) => {
      if (!validateKey(refId)) {
        console.error(`invalid refId: ${refId}`);
        return;
      }

      window.setTimeout(() => {
        const elRef = refs[refId];

        if (!elRef?.current) {
          return;
        }

        const { top } = elRef?.current?.getBoundingClientRect();

        window.scrollBy({
          top: top - headerHeight,
          behavior: noScroll ? 'auto' : 'smooth',
        });
      }, 0);
    },
    [headerHeight, refs, validateKey],
  );

  return {
    scrollToElement,
  };
};
