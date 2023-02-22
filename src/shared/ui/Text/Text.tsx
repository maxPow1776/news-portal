import { classNames } from 'shared/lib/classNames/classNames';
import classes from './Text.module.scss';

export enum TextTheme {
  PRIMARY = 'primary',
  ERROR = 'error'
}

export interface TextProps {
  className?: string;
  title?: string;
  text?: string;
  theme?: TextTheme;
}

export const Text = ({
  className, title, text, theme = TextTheme.PRIMARY,
}: TextProps) => (
  <div className={classNames(classes.text, { [classes[theme]]: true }, [className])}>
    {title && <p className={classes.title}>{title}</p>}
    {text && <p className={classes.text}>{text}</p>}
  </div>
);
