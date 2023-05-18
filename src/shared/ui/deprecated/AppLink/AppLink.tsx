import { memo, ReactNode } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import classes from './AppLink.module.scss';

export enum AppLinkTheme {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  RED = 'red',
}

export interface AppLinkProps extends LinkProps {
  className?: string;
  theme?: AppLinkTheme;
  children?: ReactNode;
}

/**
 * @deprecated
 */
export const AppLink = memo(
  ({ to, className, children, theme = AppLinkTheme.PRIMARY, ...otherProps }: AppLinkProps) => (
    <Link to={to} className={classNames(classes.appLink, {}, [className, classes[theme]])} {...otherProps}>
      {children}
    </Link>
  ),
);
