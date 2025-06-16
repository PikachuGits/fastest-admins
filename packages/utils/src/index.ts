export { classes, classes_module } from './class-module';
export { createPaletteChannel, hexToRgbChannel, varAlpha } from './color-utils';
export { createRouter } from './react-router-generator';
export { pxToRem, remToPx, setFont } from './typography-utils';
export { unmountGlobalLoading } from './unmount-global-loading';

// export default { unmountGlobalLoading };

export function isEmpty(value: unknown): value is undefined | null | '' | [] | Record<string, never> {
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'string' && value.trim() === '') ||
    (Array.isArray(value) && value.length === 0) ||
    (typeof value === 'object' && !Array.isArray(value) && value !== null && Object.keys(value).length === 0)
  );
}

type StateProps = Record<string, boolean | [boolean, string?]>;

export function mergeClasses(className?: string | (string | undefined | null)[] | null, state?: StateProps): string {
  const base = Array.isArray(className) ? className.filter(Boolean) : className ? [className] : [];

  const dynamic = state
    ? Object.entries(state).flatMap(([key, value]) => {
        if (typeof value === 'boolean') {
          return value ? [key] : [];
        }
        if (Array.isArray(value) && value[0]) {
          return value[1] ? [value[1]] : [key];
        }
        return [];
      })
    : [];

  return [...base, ...dynamic].join(' ');
}
