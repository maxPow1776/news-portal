import {
  ImgHTMLAttributes, ReactElement, memo, useLayoutEffect, useState,
} from 'react';

export interface AppImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
  fallback?: ReactElement;
  errorFallback?: ReactElement;
}

export const AppImage = memo(({
  src, alt = '', fallback, errorFallback, className, ...otherProps
}: AppImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useLayoutEffect(() => {
    const image = new Image();
    image.src = src ?? '';
    image.onload = () => {
      setIsLoading(false);
    };
    image.onerror = () => {
      setIsLoading(false);
      setHasError(true);
    };
  }, [src]);

  if (hasError && errorFallback) {
    return errorFallback;
  }

  if (isLoading && fallback) {
    return fallback;
  }

  return (
    <img {...otherProps} src={src} alt={alt} className={className} />
  );
});
