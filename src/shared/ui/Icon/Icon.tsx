import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import classes from './Icon.module.scss';

type SvgProps = Omit<React.SVGProps<SVGSVGElement>, 'onClick'>;

interface IconBaseProps extends SvgProps {
  className?: string;
  Svg: React.VFC<React.SVGProps<SVGSVGElement>>;
}

interface NonClickableIconProps extends IconBaseProps {
  clickable?: false;
}

interface ClickableIconProps extends IconBaseProps {
  clickable: true;
  onClick: () => void;
  'data-testid'?: string;
}

type IconProps = NonClickableIconProps | ClickableIconProps;

export const Icon = memo((props: IconProps) => {
  const { className, Svg, width = 32, height = 32, clickable, ...otherProps } = props;

  const icon = (
    <Svg
      width={width}
      height={height}
      className={classNames(classes.icon, {}, [className])}
      {...otherProps}
      onClick={undefined}
    />
  );

  if (clickable) {
    return (
      <button
        type="button"
        onClick={props.onClick}
        className={classes.button}
        style={{ height, width }}
        data-testid={props['data-testid']}>
        {icon}
      </button>
    );
  }

  return icon;
});
