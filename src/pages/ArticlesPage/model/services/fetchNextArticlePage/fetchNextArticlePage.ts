import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import {
  getArticlePageHasMore, getArticlePageIsLoading, getArticlePageNum,
} from '../../selectors/articlePageSelectors';
import { articlePageActions } from '../../slices/articlePageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

export const fetchNextArticlePage = createAsyncThunk<void, void, ThunkConfig<string>>(
  'articlesPage/fetchNextArticlePage',
  async (_, {
    getState, dispatch,
  }) => {
    const hasMore = getArticlePageHasMore(getState());
    const page = getArticlePageNum(getState());
    const isLoading = getArticlePageIsLoading(getState());

    if (hasMore && !isLoading) {
      dispatch(articlePageActions.setPage(page + 1));
      dispatch(fetchArticlesList({
        page: page + 1,
      }));
    }
  },
);
