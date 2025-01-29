export type NextServerComponent<T, S extends 'async' | 'sync' = 'async'> = (
  props: T
) => S extends 'async' ? Promise<JSX.Element> : JSX.Element;
