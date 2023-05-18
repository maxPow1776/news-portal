import { ReactElement, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import classes from './StickyContentLayout.module.scss';

export interface StickyContentLayoutProps {
  className?: string;
  left?: ReactElement;
  content: ReactElement;
  right?: ReactElement;
}

export const StickyContentLayout = memo(({ className, left, content, right }: StickyContentLayoutProps) => {
  return (
    <div className={classNames(classes.stickyContentLayout, {}, [className])}>
      {left && <div className={classes.left}>{left}</div>}
      <div className={classes.content}>{content}</div>
      {right && <div className={classes.right}>{right}</div>}
    </div>
  );
});
