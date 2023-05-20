import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { HStack } from '@/shared/ui/Stack';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/Text';
import { profileActions } from '../../model/slice/profileSlice';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';
import { ToggleFeatures } from '@/shared/lib/features';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';

export interface EditableProfileCardHeaderProps {
  className?: string;
}

export const EditableProfileCardHeader = ({ className }: EditableProfileCardHeaderProps) => {
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
    <ToggleFeatures
      feature="isAppRedesigned"
      off={
        <HStack justify="between" max className={classNames('', {}, [className])}>
          <TextDeprecated title={t('profile')} />
          {canEdit && (
            <div>
              {readonly ? (
                <ButtonDeprecated
                  theme={ButtonTheme.OUTLINE}
                  onClick={onEdit}
                  data-testid="EditableProfileCardHeader.EditButton">
                  {t('edit', { ns: 'translation' })}
                </ButtonDeprecated>
              ) : (
                <HStack gap="8">
                  <ButtonDeprecated
                    theme={ButtonTheme.OUTLINE_RED}
                    onClick={onCancelEdit}
                    data-testid="EditableProfileCardHeader.CancelButton">
                    {t('cancel')}
                  </ButtonDeprecated>
                  <ButtonDeprecated
                    theme={ButtonTheme.OUTLINE}
                    onClick={onSave}
                    data-testid="EditableProfileCardHeader.SaveButton">
                    {t('save')}
                  </ButtonDeprecated>
                </HStack>
              )}
            </div>
          )}
        </HStack>
      }
      on={
        <Card max padding="24" border="partial">
          <HStack justify="between" max className={classNames('', {}, [className])}>
            <Text title={t('profile')} />
            {canEdit && (
              <div>
                {readonly ? (
                  <Button onClick={onEdit} data-testid="EditableProfileCardHeader.EditButton">
                    {t('edit', { ns: 'translation' })}
                  </Button>
                ) : (
                  <HStack gap="8">
                    <Button color="error" onClick={onCancelEdit} data-testid="EditableProfileCardHeader.CancelButton">
                      {t('cancel')}
                    </Button>
                    <Button color="success" onClick={onSave} data-testid="EditableProfileCardHeader.SaveButton">
                      {t('save')}
                    </Button>
                  </HStack>
                )}
              </div>
            )}
          </HStack>
        </Card>
      }
    />
  );
};
