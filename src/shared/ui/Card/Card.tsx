import { HTMLAttributes, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import classes from './Card.module.scss';

export enum CardTheme {
  NORMAL = 'normal',
  OUTLINE = 'outline'
}

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
  theme?: CardTheme;
}

export const Card = ({
  className, children, theme = CardTheme.NORMAL, ...otherProps
}: CardProps) => (
  <div {...otherProps} className={classNames(classes.card, {}, [className, classes[theme]])}>
    {children}
  </div>
);
