/* eslint-disable no-unused-vars */
import { ButtonHTMLAttributes, memo, ReactNode } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import classes from './Button.module.scss';

export type ButtonVariant = 'clear' | 'outline' | 'filled';
export type ButtonSize = 'm' | 'l' | 'xl';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: ButtonVariant;
  square?: boolean;
  size?: ButtonSize;
  disabled?: boolean;
  children?: ReactNode;
  fullWidth?: boolean;
}

export const Button = memo(
  ({
    className,
    children,
    variant = 'outline',
    square,
    size = 'm',
    disabled,
    fullWidth,
    ...otherProps
  }: ButtonProps) => {
    const mods: Mods = {
      [classes.square]: square,
      [classes.disabled]: disabled,
      [classes.fullWidth]: fullWidth,
    };

    return (
      <button
        {...otherProps}
        type="button"
        disabled={disabled}
        className={classNames(classes.button, mods, [className, classes[variant], classes[size]])}>
        {children}
      </button>
    );
  },
);
