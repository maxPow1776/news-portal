import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { ListBox } from '@/shared/ui/Popups';
import { ListBox as ListBoxDeprecated } from '@/shared/ui/deprecated/Popups';
import { ToggleFeatures, getFeatureFlag, updateFeatureFlag } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getUserAuthData } from '@/entities/User';
import { HStack } from '@/shared/ui/Stack';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Text } from '@/shared/ui/Text';
import { Skeleton } from '@/shared/ui/Skeleton';
import { useForceUpdate } from '@/shared/lib/render/forceUpdate';

export interface UiDesignSwitcherProps {
  className?: string;
}

export const UiDesignSwitcher = memo(({ className }: UiDesignSwitcherProps) => {
  const { t } = useTranslation();
  const isAppRedisigned = getFeatureFlag('isAppRedesigned');
  const dispatch = useAppDispatch();
  const authData = useSelector(getUserAuthData);
  const [isLoading, setIsLoading] = useState(false);
  const forceUpdate = useForceUpdate();

  const items = [
    { content: t('new'), value: 'new' },
    { content: t('old'), value: 'old' },
  ];

  const onChange = async (value: string) => {
    if (authData) {
      setIsLoading(true);
      await dispatch(
        updateFeatureFlag({
          userId: authData.id,
          newFeatures: { isAppRedesigned: value === 'new' },
        }),
      ).unwrap();
      forceUpdate();
    }
  };

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      off={
        <HStack gap="16">
          <TextDeprecated text={t('interfaceVariant')} />
          {isLoading ? (
            <SkeletonDeprecated width={60} height={38} />
          ) : (
            <ListBoxDeprecated
              onChange={onChange}
              items={items}
              value={isAppRedisigned ? 'new' : 'old'}
              className={className}
            />
          )}
        </HStack>
      }
      on={
        <HStack gap="16">
          <Text text={t('interfaceVariant')} />
          {isLoading ? (
            <Skeleton width={100} height={32} border="34px" />
          ) : (
            <ListBox onChange={onChange} items={items} value={isAppRedisigned ? 'new' : 'old'} className={className} />
          )}
        </HStack>
      }
    />
  );
});
