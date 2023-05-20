import { CSSProperties, useMemo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import classes from './Avatar.module.scss';
import { AppImage } from '../AppImage';
import UserIcon from '../../assets/icons/user-32-32.svg';
import { Icon } from '../Icon';
import { Skeleton } from '../Skeleton';

export interface AvatarProps {
  className?: string;
  src?: string;
  size?: number;
  alt?: string;
}

export const Avatar = ({ className, src, size = 100, alt }: AvatarProps) => {
  const styles = useMemo<CSSProperties>(
    () => ({
      height: size,
      width: size,
    }),
    [size],
  );

  const fallback = <Skeleton width={size} height={size} border="50%" />;

  const errorFallback = <Icon width={size} height={size} Svg={UserIcon} />;

  return (
    <AppImage
      errorFallback={errorFallback}
      fallback={fallback}
      src={src}
      alt={alt}
      style={styles}
      className={classNames(classes.avatar, {}, [className])}
    />
  );
};
