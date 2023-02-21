import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import classes from './LoginForm.module.scss';

export interface LoginFormProps {
  className?: string;
}

export const LoginForm = ({ className }: LoginFormProps) => {
  const { t } = useTranslation();

  return (
    <div className={classNames(classes.loginForm, {}, [className])}>
      <Input
        type="text"
        className={classes.input}
        placeholder={t('enterUsername')}
        autofocus
      />
      <Input
        type="text"
        className={classes.input}
        placeholder={t('enterPassword')}
      />
      <Button className={classes.loginButton}>
        {t('logIn')}
      </Button>
    </div>
  );
};
