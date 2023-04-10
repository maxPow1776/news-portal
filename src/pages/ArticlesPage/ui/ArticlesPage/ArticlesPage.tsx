import { memo, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Page } from 'widgets/Page/Page';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { articlePageReducer } from '../../model/slices/articlePageSlice';
import { ArticleInfiniteList } from '../ArticleInfiniteList/ArticleInfiniteList';
import { ArticlePageFilters } from '../ArticlePageFilters/ArticlePageFilters';
import classes from './ArticlesPage.module.scss';
import { fetchNextArticlePage } from '../../model/services/fetchNextArticlePage/fetchNextArticlePage';

export interface ArticlesPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articlePage: articlePageReducer,
};

const ArticlesPage = ({ className }: ArticlesPageProps) => {
  const dispatch = useAppDispatch();

  const onLoadNextPage = useCallback(() => {
    dispatch(fetchNextArticlePage());
  }, [dispatch]);

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      <Page onScrollEnd={onLoadNextPage} className={classNames(classes.articlesPage, {}, [className])}>
        <ArticlePageFilters />
        <ArticleInfiniteList className={classes.list} />
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticlesPage);
