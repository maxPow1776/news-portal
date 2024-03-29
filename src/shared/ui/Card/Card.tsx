import { HTMLAttributes, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import classes from './Card.module.scss';

export type CardVariant = 'normal' | 'outline' | 'light';
export type CardPaddings = '0' | '8' | '16' | '24';
export type CardBorder = 'round' | 'regular' | 'partial';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
  variant?: CardVariant;
  max?: boolean;
  padding?: CardPaddings;
  border?: CardBorder;
  fullHeight?: boolean;
}

const mapPaddingToClass: Record<CardPaddings, string> = {
  '0': 'gap_0',
  '8': 'gap_8',
  '16': 'gap_16',
  '24': 'gap_24',
};

export const Card = ({
  className,
  children,
  variant = 'normal',
  max,
  padding = '8',
  border = 'regular',
  fullHeight,
  ...otherProps
}: CardProps) => {
  const paddingClass = mapPaddingToClass[padding];

  return (
    <div
      {...otherProps}
      className={classNames(classes.card, { [classes.max]: max, [classes.fullHeight]: fullHeight }, [
        className,
        classes[variant],
        classes[paddingClass],
        classes[border],
      ])}>
      {children}
    </div>
  );
};
