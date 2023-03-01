import { getProfileData } from 'entities/Profile/model/selectors/getProfileData/getProfileData';
import { getProfileError } from 'entities/Profile/model/selectors/getProfileError/getProfileError';
import { getProfileIsLoading } from 'entities/Profile/model/selectors/getProfileIsLoading/getProfileIsLoading';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { Text } from 'shared/ui/Text/Text';
import classes from './ProfileCard.module.scss';

export interface ProfileCardProps {
  className?: string;
}

export const ProfileCard = ({ className }: ProfileCardProps) => {
  const { t } = useTranslation('profile');
  const data = useSelector(getProfileData);
  const error = useSelector(getProfileError);
  const isLoading = useSelector(getProfileIsLoading);

  return (
    <div className={classNames(classes.profileCard, {}, [className])}>
      <div className={classes.header}>
        <Text title={t('profile')} />
        <Button className={classes.editButton} theme={ButtonTheme.OUTLINE}>
          {t('edit')}
        </Button>
      </div>
      <div className={classes.data}>
        <Input
          value={data?.first}
          placeholder={t('yourName')}
          className={classes.input}
        />
        <Input
          value={data?.lastname}
          placeholder={t('yourLastname')}
          className={classes.input}
        />
      </div>
    </div>
  );
};
