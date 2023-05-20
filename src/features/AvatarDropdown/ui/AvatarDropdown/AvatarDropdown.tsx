import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getUserAuthData, isUserAdmin, isUserManager, userActions } from '@/entities/User';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { Dropdown as DropdownDeprecated } from '@/shared/ui/deprecated/Popups';
import { getRouteAdminPanel, getRouteProfile, getRouteSettings } from '@/shared/const/router';
import { ToggleFeatures } from '@/shared/lib/features';
import { Dropdown } from '@/shared/ui/Popups';
import { Avatar } from '@/shared/ui/Avatar';

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

  const items = [
    ...(isAdminPanelAvailable ? [{ content: t('adminPanel'), href: getRouteAdminPanel() }] : []),
    { content: t('settings'), href: getRouteSettings() },
    { content: t('profile', { ns: 'profile' }), href: getRouteProfile(authData.id) },
    { content: t('logOut'), onClick: onLogout },
  ];

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      off={
        <DropdownDeprecated
          className={classNames('', {}, [className])}
          direction="bottom left"
          trigger={<AvatarDeprecated size={30} src={authData.avatar} fallbackInverted />}
          items={items}
        />
      }
      on={
        <Dropdown
          className={classNames('', {}, [className])}
          direction="bottom left"
          trigger={<Avatar size={40} src={authData.avatar} />}
          items={items}
        />
      }
    />
  );
});
