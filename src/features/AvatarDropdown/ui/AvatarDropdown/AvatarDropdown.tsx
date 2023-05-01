import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  getUserAuthData, isUserAdmin, isUserManager, userActions,
} from '@/entities/User';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Avatar } from '@/shared/ui/Avatar';
import { Dropdown } from '@/shared/ui/Popups';
import { getRouteAdminPanel, getRouteProfile } from '@/shared/const/router';

export interface AvatarDropdownProps {
  className?: string;
}

export const AvatarDropdown = memo(({ className }: AvatarDropdownProps) => {
  const { t } = useTranslation(['translation', 'profile']);
  const dispatch = useAppDispatch();
  const isAdmin = useSelector(isUserAdmin);
  const isManager = useSelector(isUserManager);
  const authData = useSelector(getUserAuthData);

  const onLogout = useCallback(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  const isAdminPanelAvailable = isAdmin || isManager;

  if (!authData) {
    return null;
  }

  return (
    <Dropdown
      className={classNames('', {}, [className])}
      direction="bottom left"
      trigger={<Avatar size={30} src={authData.avatar} fallbackInverted />}
      items={[
        ...(isAdminPanelAvailable
          ? [{ content: t('adminPanel'), href: getRouteAdminPanel() }]
          : []),
        { content: t('profile', { ns: 'profile' }), href: getRouteProfile(authData.id) },
        { content: t('logOut'), onClick: onLogout },
      ]}
    />
  );
});
