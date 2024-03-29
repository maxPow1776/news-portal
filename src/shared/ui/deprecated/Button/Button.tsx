/* eslint-disable no-unused-vars */
import { ButtonHTMLAttributes, memo, ReactNode } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import classes from './Button.module.scss';

export enum ButtonTheme {
  CLEAR = 'clear',
  CLEAR_INVERTED = 'clearInverted',
  OUTLINE = 'outline',
  OUTLINE_RED = 'outlineRed',
  BACKGROUND = 'background',
  BACKGROUND_INVERTED = 'backgroundInverted',
}

export enum ButtonSize {
  M = 'size_m',
  L = 'size_l',
  XL = 'size_xl',
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ButtonTheme;
  square?: boolean;
  size?: ButtonSize;
  disabled?: boolean;
  children?: ReactNode;
  fullWidth?: boolean;
}

/**
 * @deprecated
 */
export const Button = memo(
  ({
    className,
    children,
    theme = ButtonTheme.OUTLINE,
    square,
    size = ButtonSize.M,
    disabled,
    fullWidth,
    ...otherProps
  }: ButtonProps) => {
    const mods: Mods = {
      [classes.square]: square,
      [classes[size]]: true,
      [classes.disabled]: disabled,
      [classes.fullWidth]: fullWidth,
    };

    return (
      <button
        {...otherProps}
        type="button"
        disabled={disabled}
        className={classNames(classes.button, mods, [className, classes[theme]])}>
        {children}
      </button>
    );
  },
);
