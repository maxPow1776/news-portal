import { HTMLAttributes, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import classes from './Card.module.scss';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
}

export const Card = ({ className, children, ...otherProps }: CardProps) => {
  const { t } = useTranslation();

  return (
    <div {...otherProps} className={classNames(classes.card, {}, [className])}>
      {children}
    </div>
  );
};
