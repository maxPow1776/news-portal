import {
  getProfileData, getProfileReadonly, profileActions, updateProfileData,
} from 'entities/Profile';
import { getUserAuthData } from 'entities/User';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { HStack } from 'shared/ui/Stack';
import { Text } from 'shared/ui/Text/Text';

export interface PorfilePageHeaderProps {
  className?: string;
}

export const PorfilePageHeader = ({ className }: PorfilePageHeaderProps) => {
  const { t } = useTranslation(['profile', 'translation']);
  const readonly = useSelector(getProfileReadonly);
  const dispatch = useAppDispatch();
  const authData = useSelector(getUserAuthData);
  const profileData = useSelector(getProfileData);
  const canEdit = authData?.id === profileData?.id; // reselect

  const onEdit = useCallback(() => {
    dispatch(profileActions.setReadonly(false));
  }, [dispatch]);

  const onCancelEdit = useCallback(() => {
    dispatch(profileActions.cancelEdit());
  }, [dispatch]);

  const onSave = useCallback(() => {
    dispatch(updateProfileData());
  }, [dispatch]);

  return (
    <HStack justify="between" max className={classNames('', {}, [className])}>
      <Text title={t('profile')} />
      {canEdit && (
        <div>
          {readonly
            ? (
              <Button theme={ButtonTheme.OUTLINE} onClick={onEdit}>
                {t('edit', { ns: 'translation' })}
              </Button>
            )
            : (
              <HStack gap="8">
                <Button theme={ButtonTheme.OUTLINE_RED} onClick={onCancelEdit}>
                  {t('cancel')}
                </Button>
                <Button theme={ButtonTheme.OUTLINE} onClick={onSave}>
                  {t('save')}
                </Button>
              </HStack>
            )}
        </div>
      )}
    </HStack>
  );
};
