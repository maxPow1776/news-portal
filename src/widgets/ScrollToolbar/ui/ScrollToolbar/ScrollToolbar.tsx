import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import classes from './ScrollToolbar.module.scss';
import { VStack } from '@/shared/ui/Stack';
import { ScrollToTop } from '@/features/ScrollToTop';

export interface ScrollToolbarProps {
  className?: string;
}

export const ScrollToolbar = memo(({ className }: ScrollToolbarProps) => {
  return (
    <VStack justify="center" align="center" max className={classNames(classes.scrollToolbar, {}, [className])}>
      <ScrollToTop />
    </VStack>
  );
});
