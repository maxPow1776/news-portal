import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { Text as TextDeprecated, TextTheme } from '@/shared/ui/deprecated/Text';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { Text } from '@/shared/ui/Text';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import classes from './LoginForm.module.scss';
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { ToggleFeatures } from '@/shared/lib/features';
import { VStack } from '@/shared/ui/Stack';
import { useForceUpdate } from '@/shared/lib/render/forceUpdate';

export interface LoginFormProps {
  className?: string;
  onSuccess: () => void;
}

const initialReducers: ReducersList = {
  loginForm: loginReducer,
};

const LoginForm = memo(({ className, onSuccess }: LoginFormProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const username = useSelector(getLoginUsername);
  const password = useSelector(getLoginPassword);
  const isLoading = useSelector(getLoginIsLoading);
  const error = useSelector(getLoginError);
  const forceUpdate = useForceUpdate();

  const onChangeUsername = useCallback(
    (value: string) => {
      dispatch(loginActions.setUsername(value));
    },
    [dispatch],
  );

  const onChangePassword = useCallback(
    (value: string) => {
      dispatch(loginActions.setPassword(value));
    },
    [dispatch],
  );

  const onLoginClick = useCallback(async () => {
    const result = await dispatch(loginByUsername({ username, password }));
    if (result.meta.requestStatus === 'fulfilled') {
      onSuccess();
      forceUpdate();
    }
  }, [dispatch, password, username, onSuccess, forceUpdate]);

  return (
    <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount>
      <ToggleFeatures
        feature="isAppRedesigned"
        off={
          <div className={classNames(classes.loginForm, {}, [className])}>
            <TextDeprecated title={t('authorizationForm')} />
            {error && <TextDeprecated text={t('invalidLoginOrPassword')} theme={TextTheme.ERROR} />}
            <InputDeprecated
              type="text"
              value={username}
              className={classes.input}
              placeholder={t('enterUsername')}
              onChange={onChangeUsername}
              autofocus
            />
            <InputDeprecated
              type="text"
              value={password}
              className={classes.input}
              placeholder={t('enterPassword')}
              onChange={onChangePassword}
            />
            <ButtonDeprecated
              theme={ButtonTheme.OUTLINE}
              className={classes.loginButton}
              disabled={isLoading}
              onClick={onLoginClick}>
              {t('logIn')}
            </ButtonDeprecated>
          </div>
        }
        on={
          <VStack gap="16" max className={classNames(classes.loginFormRedesigned, {}, [className])}>
            <Text title={t('authorizationForm')} />
            {error && <Text text={t('invalidLoginOrPassword')} variant="error" />}
            <Input
              type="text"
              value={username}
              placeholder={t('enterUsername')}
              onChange={onChangeUsername}
              autofocus
            />
            <Input type="text" value={password} placeholder={t('enterPassword')} onChange={onChangePassword} />
            <Button className={classes.loginButton} disabled={isLoading} onClick={onLoginClick}>
              {t('logIn')}
            </Button>
          </VStack>
        }
      />
    </DynamicModuleLoader>
  );
});

export default LoginForm;
