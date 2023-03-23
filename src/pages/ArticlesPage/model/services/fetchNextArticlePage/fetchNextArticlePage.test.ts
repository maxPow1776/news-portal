import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';
import { fetchNextArticlePage } from './fetchNextArticlePage';

jest.mock('../fetchArticlesList/fetchArticlesList');

describe('fetchNextArticlePage', () => {
  test('success', async () => {
    const thunk = new TestAsyncThunk(fetchNextArticlePage, {
      articlePage: {
        page: 2,
        ids: [],
        entities: {},
        limit: 5,
        isLoading: false,
        hasMore: true,
      },
    });
    await thunk.callThunk();
    expect(thunk.dispatch).toHaveBeenCalledTimes(4);
    expect(fetchArticlesList).toBeCalledWith({ page: 3 });
  });
  test('fetchArticlesList not called', async () => {
    const thunk = new TestAsyncThunk(fetchNextArticlePage, {
      articlePage: {
        page: 2,
        ids: [],
        entities: {},
        limit: 5,
        isLoading: false,
        hasMore: false,
      },
    });
    await thunk.callThunk();
    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(fetchArticlesList).not.toHaveBeenCalled();
  });
  test('fetchArticlesList not called when isLoading', async () => {
    const thunk = new TestAsyncThunk(fetchNextArticlePage, {
      articlePage: {
        page: 2,
        ids: [],
        entities: {},
        limit: 5,
        isLoading: true,
        hasMore: true,
      },
    });
    await thunk.callThunk();
    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(fetchArticlesList).not.toHaveBeenCalled();
  });
});
