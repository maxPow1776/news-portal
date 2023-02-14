import { ButtonHTMLAttributes, FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import classes from './Button.module.scss';

export enum ThemeButton {
  CLEAR = 'clear',
  OUTLINE = 'outline'
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ThemeButton;
}

export const Button: FC<ButtonProps> = ({
  className, children, theme, ...otherProps
}) => (
  <button
    type="button"
    {...otherProps}
    className={classNames(classes.button, {}, [className, classes[theme]])}
  >
    {children}
  </button>
);
