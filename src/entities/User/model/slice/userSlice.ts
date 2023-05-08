import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { USER_LOCALSTORAGE_KEY } from '../../../../shared/const/localStorage';
import { User, UserSchema } from '../types/user';
import { setFeatureFlags } from '@/shared/lib/features';

const initialState: UserSchema = {
  _inited: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<User>) => {
      state.authData = action.payload;
      setFeatureFlags(action.payload.features);
    },
    initAuthData: (state) => {
      const user = localStorage.getItem(USER_LOCALSTORAGE_KEY);
      if (user) {
        const userJson = JSON.parse(user) as User;
        state.authData = userJson;
        setFeatureFlags(userJson.features);
      }
      state._inited = true;
    },
    logout: (state) => {
      state.authData = undefined;
      localStorage.removeItem(USER_LOCALSTORAGE_KEY);
    },
  },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
