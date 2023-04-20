import { CSSProperties, useMemo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import classes from './Avatar.module.scss';

export interface AvatarProps {
  className?: string;
  src?: string;
  size?: number;
  alt?: string;
}

export const Avatar = ({
  className, src, size, alt,
}: AvatarProps) => {
  const styles = useMemo<CSSProperties>(() => ({
    height: size || 100,
    width: size || 100,
  }), [size]);

  return (
    <img className={classNames(classes.avatar, {}, [className])} src={src} alt={alt} style={styles} />
  );
};
