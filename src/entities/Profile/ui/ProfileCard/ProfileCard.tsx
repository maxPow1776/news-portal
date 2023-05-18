import { useTranslation } from 'react-i18next';
import { Country, CountrySelect } from '@/entities/Country';
import { Currency, CurrencySelect } from '@/entities/Currency';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { Input } from '@/shared/ui/deprecated/Input';
import { Loader } from '@/shared/ui/deprecated/Loader';
import { Text, TextAlign, TextTheme } from '@/shared/ui/deprecated/Text';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Profile } from '../../model/types/profile';
import classes from './ProfileCard.module.scss';

export interface ProfileCardProps {
  className?: string;
  data?: Profile;
  isLoading?: boolean;
  error?: string;
  readonly?: boolean;
  onChangeFirstname?: (value: string) => void;
  onChangeLastname?: (value: string) => void;
  onChangeAge?: (value: string) => void;
  onChangeCity?: (value: string) => void;
  onChangeUsername?: (value: string) => void;
  onChangeAvatar?: (value: string) => void;
  onChangeCurrency?: (currency: Currency) => void;
  onChangeCountry?: (country: Country) => void;
}

export const ProfileCard = ({
  className,
  data,
  isLoading,
  error,
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

  if (isLoading) {
    return (
      <HStack justify="center" max className={classNames(classes.profileCard, {}, [className, classes.loading])}>
        <Loader />
      </HStack>
    );
  }

  if (error) {
    return (
      <HStack justify="center" max className={classNames(classes.profileCard, {}, [className, classes.error])}>
        <Text
          theme={TextTheme.ERROR}
          title={t('errorUploadProfile')}
          text={t('refreshPage')}
          align={TextAlign.CENTER}
        />
      </HStack>
    );
  }

  const mods: Mods = {
    [classes.editing]: !readonly,
  };

  return (
    <VStack gap="16" max className={classNames(classes.profileCard, mods, [className])}>
      {data?.avatar && (
        <HStack justify="center" max>
          <Avatar src={data?.avatar} alt={data?.avatar} />
        </HStack>
      )}
      <Input
        value={data?.first}
        placeholder={t('yourName')}
        onChange={onChangeFirstname}
        readonly={readonly}
        data-testid="profile-card.firstname"
      />
      <Input
        value={data?.lastname}
        placeholder={t('yourLastname')}
        onChange={onChangeLastname}
        readonly={readonly}
        data-testid="profile-card.lastname"
      />
      <Input value={data?.age} placeholder={t('yourAge')} onChange={onChangeAge} readonly={readonly} />
      <Input value={data?.city} placeholder={t('yourCity')} onChange={onChangeCity} readonly={readonly} />
      <Input value={data?.username} placeholder={t('yourUsername')} onChange={onChangeUsername} readonly={readonly} />
      <Input value={data?.avatar} placeholder={t('yourAvatar')} onChange={onChangeAvatar} readonly={readonly} />
      <CurrencySelect value={data?.currency} onChange={onChangeCurrency} readonly={readonly} />
      <CountrySelect value={data?.country} onChange={onChangeCountry} readonly={readonly} />
    </VStack>
  );
};
