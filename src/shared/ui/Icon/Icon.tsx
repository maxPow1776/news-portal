import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import classes from './Icon.module.scss';

export interface IconProps {
  className?: string;
  Svg: React.VFC<React.SVGProps<SVGSVGElement>>;
  inverted?: boolean;
}

export const Icon = memo(({ className, Svg, inverted = false }: IconProps) => (
  <Svg className={classNames(inverted ? classes.inverted : classes.icon, {}, [className])} />
));
