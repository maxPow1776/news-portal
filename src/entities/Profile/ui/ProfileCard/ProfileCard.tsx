import { useTranslation } from 'react-i18next';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { Profile } from '../../model/types/profile';
import { ToggleFeatures } from '@/shared/lib/features';
import {
  ProfileCardDeprecated,
  ProfileCardDeprecatedError,
  ProfileCardDeprecatedLoader,
} from '../ProfileCardDeprecated/ProfileCardDeprecated';
import {
  ProfileCardRedisigned,
  ProfileCardRedisignedError,
  ProfileCardRedisignedSkeleton,
} from '../ProfileCardRedisigned/ProfileCardRedisigned';

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

export const ProfileCard = (props: ProfileCardProps) => {
  const { className, isLoading, error } = props;
  const { t } = useTranslation('profile');

  if (isLoading) {
    return (
      <ToggleFeatures
        feature="isAppRedisigned"
        off={<ProfileCardDeprecatedLoader />}
        on={<ProfileCardRedisignedSkeleton />}
      />
    );
  }

  if (error) {
    return (
      <ToggleFeatures
        feature="isAppRedisigned"
        off={<ProfileCardDeprecatedError />}
        on={<ProfileCardRedisignedError />}
      />
    );
  }

  return (
    <ToggleFeatures
      feature="isAppRedisigned"
      off={<ProfileCardDeprecated {...props} />}
      on={<ProfileCardRedisigned {...props} />}
    />
  );
};
