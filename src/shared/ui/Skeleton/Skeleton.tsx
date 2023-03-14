import { CSSProperties, memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import classes from './Skeleton.module.scss';

export interface SkeletonProps {
  className?: string;
  height?: string | number;
  width?: string | number;
  border?: string;
}

export const Skeleton = memo(({
  className, width, height, border,
}: SkeletonProps) => {
  const style: CSSProperties = {
    width,
    height,
    borderRadius: border,
  };

  return (
    <div className={classNames(classes.skeleton, {}, [className])} style={style} />
  );
});
