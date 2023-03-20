import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { ValidateProfileError } from '../../types/profile';
import { updateProfileData } from './updateProfileData';

const data = {
  id: '1',
  first: 'first',
  lastname: 'lastname',
  age: 22,
  country: Country.Russia,
  username: 'username',
  city: 'city',
  currency: Currency.RUB,
};

describe('updateProfileData', () => {
  test('success', async () => {
    const thunk = new TestAsyncThunk(updateProfileData, {
      profile: {
        form: data,
      },
    });
    thunk.api.put.mockReturnValue(Promise.resolve({ data }));
    const result = await thunk.callThunk();
    expect(thunk.api.put).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(data);
  });
  test('error', async () => {
    const thunk = new TestAsyncThunk(updateProfileData, {
      profile: {
        form: data,
      },
    });
    thunk.api.put.mockReturnValue(Promise.resolve({ status: 403 }));
    const result = await thunk.callThunk();
    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toEqual([ValidateProfileError.SERVER_ERROR]);
  });
  test('validation error', async () => {
    const thunk = new TestAsyncThunk(updateProfileData, {
      profile: {
        form: { ...data, lastname: '' },
      },
    });
    const result = await thunk.callThunk();
    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toEqual([ValidateProfileError.INCORRECT_USER_DATA]);
  });
});
