import type { ButtonSize, ButtonVariant } from './types';

export const BASE_BUTTON_CLASSES = 'flex items-center justify-center font-semibold cursor-pointer';

export const BUTTON_SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-base',
  lg: 'h-14 px-8 text-lg',
};

export const VARIANT_CLASSES: Record<ButtonVariant, { bg: string; text: string }> = {
  primary: {
    bg: 'bg-primary hover:bg-primary-dark transition-colors',
    text: 'text-gray-900',
  },
  secondary: {
    bg: 'bg-background/60 hover:bg-background/80 border border-background-elevated-4 transition-colors',
    text: 'text-white',
  },
};

export const BORDER_RADIUS_CLASSES = {
  rounded: 'rounded-full',
  default: 'rounded-lg',
};

export const FULL_CLASSES = 'w-full';
