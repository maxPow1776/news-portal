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
import { Text } from 'shared/ui/Text/Text';
import classes from './PorfilePageHeader.module.scss';

export interface PorfilePageHeaderProps {
  className?: string;
}

export const PorfilePageHeader = ({ className }: PorfilePageHeaderProps) => {
  const { t } = useTranslation('profile');
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
    <div className={classNames(classes.porfilePageHeader, {}, [className])}>
      <Text title={t('profile')} />
      {canEdit && (
        <div className={classes.buttonsWrapper}>
          {readonly
            ? (
              <Button className={classes.editButton} theme={ButtonTheme.OUTLINE} onClick={onEdit}>
                {t('edit')}
              </Button>
            )
            : (
              <>
                <Button className={classes.editButton} theme={ButtonTheme.OUTLINE_RED} onClick={onCancelEdit}>
                  {t('cancel')}
                </Button>
                <Button className={classes.saveButton} theme={ButtonTheme.OUTLINE} onClick={onSave}>
                  {t('save')}
                </Button>
              </>
            )}
        </div>
      )}
    </div>
  );
};
