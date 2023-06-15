import { createContext, useContext, useState } from 'react';
import type { PropsWithChildren, RefObject } from 'react';

type HTMLElementNames =
  | 'main'
  | 'header'
  | 'contact'
  | 'services'
  | 'about'
  | 'testimonials';
type HTMLImageElementNames = 'titleLogo';
type HTMLHeadingElementNames = 'title' | 'contactTitle';

type HTMLElementRefObject = RefObject<HTMLElement>;
type HTMLImageElementRefObject = RefObject<HTMLImageElement>;
type HTMLHeadingElementRefObject = RefObject<HTMLHeadingElement>;

type HTMLElementRefs = Record<HTMLElementNames, HTMLElementRefObject>;
type HTMLImageElementRefs = Record<
  HTMLImageElementNames,
  HTMLImageElementRefObject
>;
type HTMLHeadingElementRefs = Record<
  HTMLHeadingElementNames,
  HTMLHeadingElementRefObject
>;

type AllRefs = HTMLElementRefs & HTMLImageElementRefs & HTMLHeadingElementRefs;

interface RefManagerContextValue {
  registerRefs: (allRefs: AllRefs) => void;
  getRef: <T extends keyof AllRefs>(key: T) => AllRefs[T] | null;
}

export const RefManagerContext = createContext<RefManagerContextValue>({
  registerRefs: () => {
    throw new Error('Not implemented.');
  },
  getRef: () => {
    throw new Error('Not implemented.');
  },
});

export const RefManagerContextProvider = ({
  refs: refsProp,
  ...rest
}: PropsWithChildren<{ refs: AllRefs }>) => {
  const [refs, setRefs] = useState<AllRefs>(refsProp);

  const registerRefs = (allRefs: AllRefs) => {
    setRefs(allRefs);
  };

  const getRef = <T extends keyof AllRefs>(key: T): AllRefs[T] | null => {
    return refs[key] ?? null;
  };

  const contextValue: RefManagerContextValue = {
    registerRefs,
    getRef,
  };

  return <RefManagerContext.Provider value={contextValue} {...rest} />;
};

export const useRefManagerContext = () => useContext(RefManagerContext);
