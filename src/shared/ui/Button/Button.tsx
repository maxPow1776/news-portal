import { ButtonHTMLAttributes, FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import classes from './Button.module.scss';

export enum ButtonTheme {
  CLEAR = 'clear',
  OUTLINE = 'outline',
  BACKGROUND = 'background',
  BACKGROUND_INVERTED = 'backgroundInverted'
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
}

export const Button: FC<ButtonProps> = ({
  className, children, theme, square, size = ButtonSize.M, ...otherProps
}) => {
  const mods: Record<string, boolean> = { [classes.square]: square, [classes[size]]: true };

  return (
    <button
      type="button"
      {...otherProps}
      className={classNames(classes.button, mods, [className, classes[theme]])}
    >
      {children}
    </button>
  );
};
