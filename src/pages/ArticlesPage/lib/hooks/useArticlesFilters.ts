import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
  getArticlePageOrder,
  getArticlePageSearch,
  getArticlePageSort,
  getArticlePageType,
} from '../../model/selectors/articlePageSelectors';
import { SortOrder } from '@/shared/types/sort';
import { articlePageActions } from '../../model/slices/articlePageSlice';
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce';
import { ArticleSortField, ArticleType } from '@/entities/Article';

export function useArticlesFilters() {
  const dispatch = useAppDispatch();
  const order = useSelector(getArticlePageOrder);
  const sort = useSelector(getArticlePageSort);
  const search = useSelector(getArticlePageSearch);
  const type = useSelector(getArticlePageType);

  const fetchData = useCallback(() => {
    dispatch(fetchArticlesList({ replace: true }));
  }, [dispatch]);

  const debouncedFetchData = useDebounce(fetchData, 500);

  const onChangeOrder = useCallback(
    (order: SortOrder) => {
      dispatch(articlePageActions.setOrder(order));
      dispatch(articlePageActions.setPage(1));
      fetchData();
    },
    [dispatch, fetchData],
  );

  const onChangeSort = useCallback(
    (sort: ArticleSortField) => {
      dispatch(articlePageActions.setSort(sort));
      dispatch(articlePageActions.setPage(1));
      fetchData();
    },
    [dispatch, fetchData],
  );

  const onChangeSearch = useCallback(
    (search: string) => {
      dispatch(articlePageActions.setSearch(search));
      dispatch(articlePageActions.setPage(1));
      debouncedFetchData();
    },
    [dispatch, debouncedFetchData],
  );

  const onChangeType = useCallback(
    (value: ArticleType) => {
      dispatch(articlePageActions.setType(value));
      dispatch(articlePageActions.setPage(1));
      fetchData();
    },
    [dispatch, fetchData],
  );

  return {
    // view,
    sort,
    order,
    search,
    type,
    // onChangeView,
    onChangeSort,
    onChangeOrder,
    onChangeSearch,
    onChangeType,
  };
}
