import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { getLoginState } from '../../model/selectors/getLoginState/getLoginState';
import { loginActions } from '../../model/slice/loginSlice';
import classes from './LoginForm.module.scss';

export interface LoginFormProps {
  className?: string;
}

export const LoginForm = memo(({ className }: LoginFormProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const {
    username, password, error, isLoading,
  } = useSelector(getLoginState);

  const onChangeUsername = useCallback((value: string) => {
    dispatch(loginActions.setUsername(value));
  }, [dispatch]);

  const onChangePassword = useCallback((value: string) => {
    dispatch(loginActions.setPassword(value));
  }, [dispatch]);

  const onLoginClick = useCallback(() => {
    dispatch(loginByUsername({ username, password }));
  }, [dispatch, password, username]);

  return (
    <div className={classNames(classes.loginForm, {}, [className])}>
      <Text title={t('authorizationForm')} />
      {error && <Text text={t('invalidLoginOrPassword')} theme={TextTheme.ERROR} />}
      <Input
        type="text"
        value={username}
        className={classes.input}
        placeholder={t('enterUsername')}
        onChange={onChangeUsername}
        autofocus
      />
      <Input
        type="text"
        value={password}
        className={classes.input}
        placeholder={t('enterPassword')}
        onChange={onChangePassword}
      />
      <Button theme={ButtonTheme.OUTLINE} className={classes.loginButton} disabled={isLoading} onClick={onLoginClick}>
        {t('logIn')}
      </Button>
    </div>
  );
});
