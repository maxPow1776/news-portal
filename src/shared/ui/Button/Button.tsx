/* eslint-disable no-unused-vars */
import { ButtonHTMLAttributes, ForwardedRef, forwardRef, ReactNode } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import classes from './Button.module.scss';

export type ButtonVariant = 'clear' | 'outline' | 'filled';
export type ButtonColor = 'normal' | 'success' | 'error';
export type ButtonSize = 'm' | 'l' | 'xl';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: ButtonVariant;
  square?: boolean;
  size?: ButtonSize;
  disabled?: boolean;
  children?: ReactNode;
  fullWidth?: boolean;
  color?: ButtonColor;
  addonLeft?: ReactNode;
  addonRight?: ReactNode;
}

export const Button = forwardRef(
  (
    {
      className,
      children,
      variant = 'outline',
      square,
      size = 'm',
      disabled,
      fullWidth,
      addonLeft,
      addonRight,
      color = 'normal',
      ...otherProps
    }: ButtonProps,
    ref: ForwardedRef<HTMLButtonElement>,
  ) => {
    const mods: Mods = {
      [classes.square]: square,
      [classes.disabled]: disabled,
      [classes.fullWidth]: fullWidth,
      [classes.withAddon]: Boolean(addonLeft) || Boolean(addonRight),
    };

    return (
      <button
        {...otherProps}
        ref={ref}
        type="button"
        disabled={disabled}
        className={classNames(classes.button, mods, [className, classes[variant], classes[size], classes[color]])}>
        {addonLeft && <div className={classes.addonLeft}>{addonLeft}</div>}
        {children}
        {addonRight && <div className={classes.addonRight}>{addonRight}</div>}
      </button>
    );
  },
);
