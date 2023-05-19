import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import classes from './Text.module.scss';

export type TextVariant = 'primary' | 'error' | 'accent';

export type TextAlign = 'right' | 'left' | 'center';

export type TextSize = 's' | 'm' | 'l';

type TextSpace = 'normal' | 'nowrap';

type HeaderTagType = 'h1' | 'h2' | 'h3';

const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
  s: 'h3',
  m: 'h2',
  l: 'h1',
};

export interface TextProps {
  className?: string;
  title?: string;
  text?: string;
  variant?: TextVariant;
  align?: TextAlign;
  size?: TextSize;
  bold?: boolean;
  space?: TextSpace;
  'data-testid'?: string;
}

export const Text = memo(
  ({
    className,
    title,
    text,
    variant = 'primary',
    align = 'left',
    size = 'm',
    bold,
    space = 'normal',
    'data-testid': dataTestId = 'Text',
  }: TextProps) => {
    const HeaderTag = mapSizeToHeaderTag[size];

    const additionalClasses = [className, classes[variant], classes[align], classes[size], classes[space]];

    return (
      <div className={classNames(classes.text, { [classes.bold]: bold }, additionalClasses)}>
        {title && (
          <HeaderTag data-testid={`${dataTestId}.Header`} className={classes.title}>
            {title}
          </HeaderTag>
        )}
        {text && (
          <p data-testid={`${dataTestId}.Paragraph`} className={classes.text}>
            {text}
          </p>
        )}
      </div>
    );
  },
);
