import { createContext, useContext, useState } from 'react';
import type { PropsWithChildren, RefObject } from 'react';

interface AllRefs {
  HTMLElement: Record<string, RefObject<HTMLElement>>;
  HTMLImgElement: Record<string, RefObject<HTMLImageElement>>;
  HTMLHeadingElement: Record<string, RefObject<HTMLHeadingElement>>;
}

interface RefManagerContextValue {
  registerRefs: (
    htmlElementRefs: Record<string, RefObject<HTMLElement>>,
    htmlHeadingElementRefs: Record<string, RefObject<HTMLHeadingElement>>,
    htmlImgElementRefs: Record<string, RefObject<HTMLImageElement>>
  ) => void;
  getHTMLImgElementRef: (key: string) => RefObject<HTMLImageElement> | null;
  getHTMLElementRef: (key: string) => RefObject<HTMLElement> | null;
  getHTMLHeadingElementRef: (
    key: string
  ) => RefObject<HTMLHeadingElement> | null;
}
export const RefManagerContext = createContext<RefManagerContextValue>({
  registerRefs: () => {
    throw new Error('Not implemented.');
  },
  getHTMLImgElementRef: () => {
    throw new Error('Not implemented.');
  },
  getHTMLElementRef: () => {
    throw new Error('Not implemented.');
  },
  getHTMLHeadingElementRef: () => {
    throw new Error('Not implemented.');
  },
});

export const RefManagerContextProvider = ({
  refs: refsProp,
  ...rest
}: PropsWithChildren<{ refs: AllRefs }>) => {
  const [refs, setRefs] = useState<AllRefs>(refsProp);

  const registerRefs = (
    htmlElementRefs: Record<string, RefObject<HTMLElement>>,
    htmlHeadingElementRefs: Record<string, RefObject<HTMLHeadingElement>>,
    htmlImgElementRefs: Record<string, RefObject<HTMLImageElement>>
  ) => {
    setRefs({
      HTMLElement: htmlElementRefs,
      HTMLHeadingElement: htmlHeadingElementRefs,
      HTMLImgElement: htmlImgElementRefs,
    });
  };

  const getHTMLElementRef = (key: string): RefObject<HTMLElement> | null => {
    return refs['HTMLElement']?.[key] ?? null;
  };

  const getHTMLImgElementRef = (
    key: string
  ): RefObject<HTMLImageElement> | null => {
    return refs['HTMLImgElement']?.[key] ?? null;
  };

  const getHTMLHeadingElementRef = (
    key: string
  ): RefObject<HTMLHeadingElement> | null => {
    return refs['HTMLHeadingElement']?.[key] ?? null;
  };

  const contextValue: RefManagerContextValue = {
    registerRefs,
    getHTMLElementRef,
    getHTMLImgElementRef,
    getHTMLHeadingElementRef,
  };

  return <RefManagerContext.Provider value={contextValue} {...rest} />;
};

export const useRefManagerContext = () => useContext(RefManagerContext);
