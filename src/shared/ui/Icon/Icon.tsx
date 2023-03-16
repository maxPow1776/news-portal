import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import classes from './Icon.module.scss';

export interface IconProps {
  className?: string;
  Svg: React.VFC<React.SVGProps<SVGSVGElement>>;
}

export const Icon = memo(({ className, Svg }: IconProps) => (
  <Svg className={classNames(classes.icon, {}, [className])} />
));
