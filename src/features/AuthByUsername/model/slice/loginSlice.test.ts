import { loginActions, loginReducer } from './loginSlice';
import { LoginSchema } from '../types/loginSchema';

describe('loginSlice', () => {
  test('test set username', () => {
    const state: DeepPartial<LoginSchema> = { username: 'username' };
    expect(loginReducer(state as LoginSchema, loginActions.setUsername('new username'))).toEqual({ username: 'new username' });
  });
  test('test set password', () => {
    const state: DeepPartial<LoginSchema> = { password: 'password' };
    expect(loginReducer(state as LoginSchema, loginActions.setPassword('new password'))).toEqual({ password: 'new password' });
  });
});
