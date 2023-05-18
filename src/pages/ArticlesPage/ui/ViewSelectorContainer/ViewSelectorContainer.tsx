import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getArticlePageView } from '../../model/selectors/articlePageSelectors';
import { ArticleView } from '@/entities/Article';
import { articlePageActions } from '../../model/slices/articlePageSlice';
import { ArticleViewSelector } from '@/features/ArticleViewSelector';

export interface ViewSelectorContainerProps {
  className?: string;
}

export const ViewSelectorContainer = memo(({ className }: ViewSelectorContainerProps) => {
  const dispatch = useAppDispatch();
  const view = useSelector(getArticlePageView);
  const onChangeView = useCallback(
    (view: ArticleView) => {
      dispatch(articlePageActions.setView(view));
    },
    [dispatch],
  );

  return <ArticleViewSelector className={className} view={view} onViewClick={onChangeView} />;
});
