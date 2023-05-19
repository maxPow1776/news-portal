import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { ProfileCardProps } from '../ProfileCard/ProfileCard';
import { CountrySelect } from '@/entities/Country';
import { CurrencySelect } from '@/entities/Currency';
import { classNames } from '@/shared/lib/classNames/classNames';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Input } from '@/shared/ui/Input';
import { Card } from '@/shared/ui/Card';
import { Avatar } from '@/shared/ui/Avatar';
import { Skeleton } from '@/shared/ui/Skeleton';
import { Text } from '@/shared/ui/Text';

export const ProfileCardRedesignedError = () => {
  const { t } = useTranslation('profile');
  return (
    <HStack justify="center" max>
      <Text variant="error" title={t('errorUploadProfile')} text={t('refreshPage')} align="center" />
    </HStack>
  );
};

export const ProfileCardRedesignedSkeleton = () => {
  return (
    <Card padding="24" max>
      <VStack gap="32" max>
        <HStack justify="center" max>
          <Skeleton width={120} height={120} border="50%" />
        </HStack>
        <HStack gap="24" max>
          <VStack gap="16" max>
            <Skeleton width="100%" height={38} />
            <Skeleton width="100%" height={38} />
            <Skeleton width="100%" height={38} />
            <Skeleton width="100%" height={38} />
          </VStack>
          <VStack gap="16" max>
            <Skeleton width="100%" height={38} />
            <Skeleton width="100%" height={38} />
            <Skeleton width="100%" height={38} />
            <Skeleton width="100%" height={38} />
          </VStack>
        </HStack>
      </VStack>
    </Card>
  );
};

export const ProfileCardRedesigned = memo(
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

    return (
      <Card padding="24" max className={classNames('', {}, [className])}>
        <VStack gap="32">
          {data?.avatar && (
            <HStack justify="center" max>
              <Avatar size={120} src={data?.avatar} alt={data?.avatar} />
            </HStack>
          )}
          <HStack gap="24" max>
            <VStack gap="16" max>
              <Input
                value={data?.first}
                label={t('yourName')}
                onChange={onChangeFirstname}
                readonly={readonly}
                data-testid="profile-card.firstname"
              />
              <Input
                value={data?.lastname}
                label={t('yourLastname')}
                onChange={onChangeLastname}
                readonly={readonly}
                data-testid="profile-card.lastname"
              />
              <Input value={data?.age} label={t('yourAge')} onChange={onChangeAge} readonly={readonly} />
              <Input value={data?.city} label={t('yourCity')} onChange={onChangeCity} readonly={readonly} />
            </VStack>
            <VStack gap="16" max>
              <Input value={data?.username} label={t('yourUsername')} onChange={onChangeUsername} readonly={readonly} />
              <Input value={data?.avatar} label={t('yourAvatar')} onChange={onChangeAvatar} readonly={readonly} />
              <CurrencySelect value={data?.currency} onChange={onChangeCurrency} readonly={readonly} />
              <CountrySelect value={data?.country} onChange={onChangeCountry} readonly={readonly} />
            </VStack>
          </HStack>
        </VStack>
      </Card>
    );
  },
);
