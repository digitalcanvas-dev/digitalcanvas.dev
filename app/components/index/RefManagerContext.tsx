import { createContext, useContext, useState } from 'react';
import type { PropsWithChildren, RefObject } from 'react';

interface AllRefs {
  HTMLElement: Record<string, RefObject<HTMLElement>>;
  HTMLHeadingElement: Record<string, RefObject<HTMLHeadingElement>>;
}

interface RefManagerContextValue {
  registerRefs: (
    htmlElementRefs: Record<string, RefObject<HTMLElement>>,
    htmlHeadingElementRefs: Record<string, RefObject<HTMLHeadingElement>>
  ) => void;
  getHTMLElementRef: (key: string) => RefObject<HTMLElement> | null;
  getHTMLHeadingElementRef: (
    key: string
  ) => RefObject<HTMLHeadingElement> | null;
}
export const RefManagerContext = createContext<RefManagerContextValue>({
  registerRefs: () => {
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
    htmlHeadingElementRefs: Record<string, RefObject<HTMLHeadingElement>>
  ) => {
    setRefs({
      HTMLElement: htmlElementRefs,
      HTMLHeadingElement: htmlHeadingElementRefs,
    });
  };

  const getHTMLElementRef = (key: string): RefObject<HTMLElement> | null => {
    return refs['HTMLElement']?.[key] ?? null;
  };

  const getHTMLHeadingElementRef = (
    key: string
  ): RefObject<HTMLHeadingElement> | null => {
    return refs['HTMLHeadingElement']?.[key] ?? null;
  };

  const contextValue: RefManagerContextValue = {
    registerRefs,
    getHTMLElementRef,
    getHTMLHeadingElementRef,
  };

  return <RefManagerContext.Provider value={contextValue} {...rest} />;
};

export const useRefManagerContext = () => useContext(RefManagerContext);
