import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import classes from './Flex.module.scss';

export type FlexJustify = 'start' | 'center' | 'end' | 'between';
export type FlexAlign = 'start' | 'center' | 'end';
export type FlexDirection = 'row' | 'column';
export type FlexGap = '4' | '8' | '16' | '32';

const justifyClasses: Record<FlexJustify, string> = {
  start: classes.justifyStart,
  center: classes.justifyCenter,
  end: classes.justifyEnd,
  between: classes.justifyBetween,
};

const alignClasses: Record<FlexAlign, string> = {
  start: classes.alignStart,
  center: classes.alignCenter,
  end: classes.alignEnd,
};

const directionClasses: Record<FlexDirection, string> = {
  row: classes.directionRow,
  column: classes.directionColumn,
};

const gapClasses: Record<FlexGap, string> = {
  4: classes.gap4,
  8: classes.gap8,
  16: classes.gap16,
  32: classes.gap32,
};

type DivProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export interface FlexProps extends DivProps {
  className?: string;
  children: ReactNode;
  justify?: FlexJustify;
  align?: FlexAlign;
  direction?: FlexDirection;
  gap?: FlexGap;
  max?: boolean;
}

/**
 * @deprecated
 */
export const Flex = ({
  className,
  children,
  justify = 'start',
  align = 'center',
  direction = 'row',
  gap,
  max,
  ...otherProps
}: FlexProps) => {
  const additionalClasses = [
    className,
    justifyClasses[justify],
    alignClasses[align],
    directionClasses[direction],
    gap && gapClasses[gap],
  ];

  const mods: Mods = {
    [classes.max]: max,
  };

  return (
    <div {...otherProps} className={classNames(classes.flex, mods, additionalClasses)}>
      {children}
    </div>
  );
};
