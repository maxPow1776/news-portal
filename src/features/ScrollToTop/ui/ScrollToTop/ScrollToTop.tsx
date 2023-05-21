import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import classes from './ScrollToTop.module.scss';
import { Icon } from '@/shared/ui/Icon';
import CircleIcon from '@/shared/assets/icons/circle-up.svg';

export interface ScrollToTopProps {
  className?: string;
}

export const ScrollToTop = memo(({ className }: ScrollToTopProps) => {
  const onClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Icon
      Svg={CircleIcon}
      width={32}
      height={32}
      clickable
      onClick={onClick}
      className={classNames(classes.scrollToTop, {}, [className])}
    />
  );
});
