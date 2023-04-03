import { memo } from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import classes from './Text.module.scss';

export enum TextTheme {
  PRIMARY = 'primary',
  INVERTED = 'inverted',
  ERROR = 'error'
}

export enum TextAlign {
  RIGHT = 'right',
  LEFT = 'left',
  CENTER = 'center'
}

export enum TextSize {
  S = 'size_s',
  M = 'size_m',
  L = 'size_l',
}

type HeaderTagType = 'h1' | 'h2' | 'h3';

const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
  [TextSize.S]: 'h3',
  [TextSize.M]: 'h2',
  [TextSize.L]: 'h1',
};

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

  const HeaderTag = mapSizeToHeaderTag[size];

  return (
    <div className={classNames(classes.text, mods, [className])}>
      {title && <HeaderTag className={classes.title}>{title}</HeaderTag>}
      {text && <p className={classes.text}>{text}</p>}
    </div>
  );
});
