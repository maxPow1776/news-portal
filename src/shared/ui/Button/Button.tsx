import { ButtonHTMLAttributes, FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import classes from './Button.module.scss';

export enum ThemeButton {
  CLEAR = 'clear'
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ThemeButton;
}

export const  Button: FC<ButtonProps> = ({ className, children, theme = ThemeButton.CLEAR, ...otherProps }) => {
  return (
    <button
      {...otherProps}
      className={classNames(classes.button, {}, [className, classes[theme]])}
    >
      {children}
    </button>
  );
};
