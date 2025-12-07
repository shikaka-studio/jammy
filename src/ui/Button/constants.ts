import type { ButtonSize, ButtonVariant } from './types';

export const BASE_BUTTON_CLASSES = 'flex items-center justify-center font-semibold cursor-pointer';

export const BUTTON_SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-base',
  lg: 'h-14 px-8 text-lg',
};

export const VARIANT_CLASSES: Record<ButtonVariant, { bg: string; text: string }> = {
  primary: {
    bg: 'bg-primary',
    text: 'text-gray-900',
  },
  secondary: {
    bg: 'bg-primary/10 border border-gray-700',
    text: 'text-white',
  },
};

export const BORDER_RADIUS_CLASSES = {
  rounded: 'rounded-full',
  default: 'rounded-xl',
};

export const FULL_CLASSES = 'w-full';
