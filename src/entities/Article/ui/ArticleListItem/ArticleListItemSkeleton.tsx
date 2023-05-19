import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card';
import { Card as CardRedesigned } from '@/shared/ui/Card';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/Skeleton';
import classes from './ArticleListItem.module.scss';
import { ArticleView } from '../../model/consts/consts';
import { toggleFeatures } from '@/shared/lib/features';

export interface ArticleListItemSkeletonProps {
  className?: string;
  view: ArticleView;
}

export const ArticleListItemSkeleton = memo(({ className, view }: ArticleListItemSkeletonProps) => {
  const Skeleton = toggleFeatures({
    name: 'isAppRedesigned',
    off: () => SkeletonDeprecated,
    on: () => SkeletonRedesigned,
  });
  const Card = toggleFeatures({ name: 'isAppRedesigned', off: () => CardDeprecated, on: () => CardRedesigned });
  const mainClass = toggleFeatures({
    name: 'isAppRedesigned',
    off: () => '',
    on: () => classes.articleListItemRedesigned,
  });

  if (view === ArticleView.BIG) {
    return (
      <div className={classNames(mainClass, {}, [className, classes[view]])}>
        <Card>
          <div className={classes.header}>
            <Skeleton height={30} width={30} border="50%" />
            <Skeleton className={classes.username} height={16} width={150} />
            <Skeleton className={classes.date} height={16} width={150} />
          </div>
          <Skeleton className={classes.title} height={24} width={250} />
          <Skeleton className={classes.image} height={200} />
          <div className={classes.footer}>
            <Skeleton height={36} width={200} />
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className={classNames(mainClass, {}, [className, classes[view]])}>
      <Card>
        <div className={classes.imageWrapper}>
          <Skeleton width={200} height={200} className={classes.image} />
        </div>
        <div className={classes.infoWrapper}>
          <Skeleton width={130} height={16} className={classes.types} />
        </div>
        <Skeleton width={150} height={16} className={classes.title} />
      </Card>
    </div>
  );
});
