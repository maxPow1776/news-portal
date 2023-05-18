import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import classes from './Icon.module.scss';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  Svg: React.VFC<React.SVGProps<SVGSVGElement>>;
  inverted?: boolean;
}

/**
 * @deprecated
 */
export const Icon = memo(({ className, Svg, inverted = false, ...otherProps }: IconProps) => (
  <Svg {...otherProps} className={classNames(inverted ? classes.inverted : classes.icon, {}, [className])} />
));
