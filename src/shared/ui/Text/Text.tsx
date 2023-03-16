import { memo } from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import classes from './Text.module.scss';

export enum TextTheme {
  PRIMARY = 'primary',
  ERROR = 'error'
}

export enum TextAlign {
  RIGHT = 'right',
  LEFT = 'left',
  CENTER = 'center'
}

export enum TextSize {
  M = 'size_m',
  L = 'size_l',
}

export interface TextProps {
  className?: string;
  title?: string;
  text?: string;
  theme?: TextTheme;
  align?: TextAlign;
  size?: TextSize;
}

export const Text = memo(({
  className, title, text, theme = TextTheme.PRIMARY, align = TextAlign.LEFT, size = TextSize.M,
}: TextProps) => {
  const mods: Mods = {
    [classes[theme]]: true,
    [classes[align]]: true,
    [classes[size]]: true,
  };

  return (
    <div className={classNames(classes.text, mods, [className])}>
      {title && <p className={classes.title}>{title}</p>}
      {text && <p className={classes.text}>{text}</p>}
    </div>
  );
});
