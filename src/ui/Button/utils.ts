import type { ButtonSize, ButtonVariant } from './types';
import {
  BUTTON_SIZE_CLASSES,
  BASE_BUTTON_CLASSES,
  VARIANT_CLASSES,
  BORDER_RADIUS_CLASSES,
  FULL_CLASSES,
} from './constants';

export const getButtonClasses = (
  size: ButtonSize,
  variant: ButtonVariant,
  rounded: boolean,
  full: boolean
): string => {
  const sizeClass = BUTTON_SIZE_CLASSES[size];
  const variantClasses = VARIANT_CLASSES[variant];
  const borderRadiusClass = rounded ? BORDER_RADIUS_CLASSES.rounded : BORDER_RADIUS_CLASSES.default;
  const fullClass = full ? FULL_CLASSES : '';

  return `${BASE_BUTTON_CLASSES} ${sizeClass} ${variantClasses.bg} ${borderRadiusClass} ${variantClasses.text} ${fullClass}`;
};
