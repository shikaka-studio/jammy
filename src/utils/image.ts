/**
 * Creates a placeholder image URL with text
 */
export const createPlaceholderImage = (text: string, size = '300x300'): string =>
  `https://placehold.co/${size}/231a30/ffffff?text=${encodeURIComponent(text)}`;

/**
 * Creates an image error handler that sets a fallback placeholder image
 */
export const createImageErrorHandler = (fallbackText: string, size = '300x300') =>
  (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = createPlaceholderImage(fallbackText, size);
  };
