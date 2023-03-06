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

export interface TextProps {
  className?: string;
  title?: string;
  text?: string;
  theme?: TextTheme;
  align?: TextAlign;
}

export const Text = memo(({
  className, title, text, theme = TextTheme.PRIMARY, align = TextAlign.LEFT,
}: TextProps) => {
  const mods: Mods = {
    [classes[theme]]: true,
    [classes[align]]: true,
  };

  return (
    <div className={classNames(classes.text, mods, [className])}>
      {title && <p className={classes.title}>{title}</p>}
      {text && <p className={classes.text}>{text}</p>}
    </div>
  );
});
