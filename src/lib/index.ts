/** ShadNG Icons - main exports. */

export { SngIcon } from './components/sng-icon/sng-icon.component';

export type { IconData } from './icons/icon-data.interface';
export type { RegularIconName, SolidIconName, IconName, IconType, IconNameForType, IconSelection } from './icons/icon-types';

export * from './icons/regular';
export * from './icons/solid';

import type { IconData } from './icons/icon-data.interface';

export interface SngIconProps {
  icon?: IconData;
  size?: number | string;
  alt?: string | null;
  strokeWeight?: string | number;
  svgClass?: string;
}

export const SNG_ICON_SIZES = {
  xs: '0.75rem', sm: '1rem', md: '1.25rem', lg: '1.5rem', xl: '2rem', '2xl': '2.5rem', '3xl': '3rem',
  '3': '0.75rem', '4': '1rem', '5': '1.25rem', '6': '1.5rem', '7': '1.75rem', '8': '2rem', '10': '2.5rem', '12': '3rem', '16': '4rem', '20': '5rem', '24': '6rem',
} as const;

export type SngIconSizeKey = keyof typeof SNG_ICON_SIZES;
export type SngIconSizeValue = typeof SNG_ICON_SIZES[SngIconSizeKey];
