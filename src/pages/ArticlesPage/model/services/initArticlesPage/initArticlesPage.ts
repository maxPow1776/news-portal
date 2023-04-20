import { createAsyncThunk } from '@reduxjs/toolkit';
import { SortOrder } from '@/shared/types/index';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { ArticleSortField, ArticleType } from '@/entities/Article';
import { getArticlePageInited } from '../../selectors/articlePageSelectors';
import { articlePageActions } from '../../slices/articlePageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

export const initArticlesPage = createAsyncThunk<void, URLSearchParams, ThunkConfig<string>>(
  'articlesPage/initArticlesPage',
  async (searchParams, {
    getState, dispatch,
  }) => {
    const inited = getArticlePageInited(getState());

    if (!inited) {
      const orderFormUrl = searchParams.get('order') as SortOrder;
      const searchFormUrl = searchParams.get('search');
      const sortFormUrl = searchParams.get('sort') as ArticleSortField;
      const typeFormUrl = searchParams.get('type') as ArticleType;
      if (orderFormUrl) {
        dispatch(articlePageActions.setOrder(orderFormUrl));
      }
      if (searchFormUrl) {
        dispatch(articlePageActions.setSearch(searchFormUrl));
      }
      if (sortFormUrl) {
        dispatch(articlePageActions.setSort(sortFormUrl));
      }
      if (typeFormUrl) {
        dispatch(articlePageActions.setType(typeFormUrl));
      }

      dispatch(articlePageActions.initState());
      dispatch(fetchArticlesList({}));
    }
  },
);
