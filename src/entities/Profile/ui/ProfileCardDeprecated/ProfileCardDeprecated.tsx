import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { CountrySelect } from '@/entities/Country';
import { CurrencySelect } from '@/entities/Currency';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { HStack, VStack } from '@/shared/ui/Stack';
import classes from './ProfileCardDeprecated.module.scss';
import { ProfileCardProps } from '../ProfileCard/ProfileCard';
import { Loader as LoaderDeprecated } from '@/shared/ui/deprecated/Loader';
import { Text as TextDeprecated, TextAlign, TextTheme } from '@/shared/ui/deprecated/Text';

export const ProfileCardDeprecatedError = () => {
  const { t } = useTranslation('profile');

  return (
    <HStack justify="center" max className={classNames(classes.profileCard, {}, [classes.error])}>
      <TextDeprecated
        theme={TextTheme.ERROR}
        title={t('errorUploadProfile')}
        text={t('refreshPage')}
        align={TextAlign.CENTER}
      />
    </HStack>
  );
};

export const ProfileCardDeprecatedLoader = () => {
  return (
    <HStack justify="center" max className={classNames(classes.profileCard, {}, [classes.loading])}>
      <LoaderDeprecated />
    </HStack>
  );
};

export const ProfileCardDeprecated = memo(
  ({
    className,
    data,
    readonly,
    onChangeFirstname,
    onChangeLastname,
    onChangeAge,
    onChangeCity,
    onChangeUsername,
    onChangeAvatar,
    onChangeCurrency,
    onChangeCountry,
  }: ProfileCardProps) => {
    const { t } = useTranslation('profile');

    const mods: Mods = {
      [classes.editing]: !readonly,
    };

    return (
      <VStack gap="16" max className={classNames(classes.profileCardDeprecated, mods, [className])}>
        {data?.avatar && (
          <HStack justify="center" max>
            <AvatarDeprecated src={data?.avatar} alt={data?.avatar} />
          </HStack>
        )}
        <InputDeprecated
          value={data?.first}
          placeholder={t('yourName')}
          onChange={onChangeFirstname}
          readonly={readonly}
          data-testid="profile-card.firstname"
        />
        <InputDeprecated
          value={data?.lastname}
          placeholder={t('yourLastname')}
          onChange={onChangeLastname}
          readonly={readonly}
          data-testid="profile-card.lastname"
        />
        <InputDeprecated value={data?.age} placeholder={t('yourAge')} onChange={onChangeAge} readonly={readonly} />
        <InputDeprecated value={data?.city} placeholder={t('yourCity')} onChange={onChangeCity} readonly={readonly} />
        <InputDeprecated
          value={data?.username}
          placeholder={t('yourUsername')}
          onChange={onChangeUsername}
          readonly={readonly}
        />
        <InputDeprecated
          value={data?.avatar}
          placeholder={t('yourAvatar')}
          onChange={onChangeAvatar}
          readonly={readonly}
        />
        <CurrencySelect value={data?.currency} onChange={onChangeCurrency} readonly={readonly} />
        <CountrySelect value={data?.country} onChange={onChangeCountry} readonly={readonly} />
      </VStack>
    );
  },
);
