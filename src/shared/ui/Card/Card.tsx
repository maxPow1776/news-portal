import { HTMLAttributes, ReactNode } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import classes from './Card.module.scss';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
}

export const Card = ({ className, children, ...otherProps }: CardProps) => (
  <div {...otherProps} className={classNames(classes.card, {}, [className])}>
    {children}
  </div>
);
