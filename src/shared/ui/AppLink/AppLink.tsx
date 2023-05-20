import { memo, ReactNode } from 'react';
import { LinkProps, NavLink } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import classes from './AppLink.module.scss';

export type AppLinkVariant = 'primary' | 'red';

export interface AppLinkProps extends LinkProps {
  className?: string;
  variant?: AppLinkVariant;
  children?: ReactNode;
  activeClassName?: string;
}

export const AppLink = memo(
  ({ to, className, children, variant = 'primary', activeClassName = '', ...otherProps }: AppLinkProps) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        classNames(classes.appLink, { [activeClassName]: isActive }, [className, classes[variant]])
      }
      {...otherProps}>
      {children}
    </NavLink>
  ),
);
