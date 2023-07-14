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
type HTMLHeadingElementNames = never;

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

const AllKeys: string[] = [
  'main',
  'header',
  'contact',
  'services',
  'about',
  'testimonials',
  'titleLogo',
];

interface RefManagerContextValue {
  registerRefs: (allRefs: AllRefs) => void;
  getRef: <T extends keyof AllRefs>(key: T) => AllRefs[T] | null;
  validateKey: (s: string) => s is keyof AllRefs;
  refs: AllRefs;
}

export const RefManagerContext = createContext<RefManagerContextValue>({
  registerRefs: () => {
    throw new Error('Not implemented.');
  },
  getRef: () => {
    throw new Error('Not implemented.');
  },
  validateKey: (s: string): s is keyof AllRefs => {
    throw new Error('Not implemented');
  },
  refs: {
    services: { current: null },
    contact: { current: null },
    about: { current: null },
    header: { current: null },
    main: { current: null },
    testimonials: { current: null },
    titleLogo: { current: null },
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

  const validateKey = (
    s: string,
  ): s is HTMLElementNames | HTMLImageElementNames | HTMLHeadingElementNames =>
    AllKeys.includes(s);

  const contextValue: RefManagerContextValue = {
    registerRefs,
    getRef,
    validateKey,
    refs,
  };

  return <RefManagerContext.Provider value={contextValue} {...rest} />;
};

export const useRefManagerContext = () => useContext(RefManagerContext);
