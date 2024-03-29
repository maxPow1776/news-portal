import { FC, Suspense, lazy } from 'react';
import { ArticleRatingProps } from './ArticleRating';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';

const ArticleRatingLazy = lazy<FC<ArticleRatingProps>>(() => import('./ArticleRating'));

export const ArticleRatingAsync = (props: ArticleRatingProps) => (
  <Suspense fallback={<Skeleton width="100%" height="140px" />}>
    <ArticleRatingLazy {...props} />
  </Suspense>
);
