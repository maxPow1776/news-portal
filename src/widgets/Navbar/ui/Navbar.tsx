import {
  getUserAuthData, isUserAdmin, isUserManager, userActions,
} from 'entities/User';
import { LoginModal } from 'features/AuthByUsername';
import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { Dropdown } from 'shared/ui/Dropdown/Dropdown';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import classes from './Navbar.module.scss';

interface NavbarProps {
  className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
  const { t } = useTranslation(['translation', 'profile']);
  const [isAuthModal, setIsAuthModal] = useState(false);
  const authData = useSelector(getUserAuthData);
  const dispatch = useDispatch();
  const isAdmin = useSelector(isUserAdmin);
  const isManager = useSelector(isUserManager);

  const onCloseModal = useCallback(() => {
    setIsAuthModal(false);
  }, []);

  const onShowModal = useCallback(() => {
    setIsAuthModal(true);
  }, []);

  const onLogout = useCallback(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  const isAdminPanelAvailable = isAdmin || isManager;

  if (authData) {
    return (
      <header className={classNames(classes.navbar, {}, [className])}>
        <Text className={classes.appName} title={t('appName')} theme={TextTheme.INVERTED} />
        <AppLink to={RoutePath.article_create} theme={AppLinkTheme.SECONDARY}>
          {t('createArticle')}
        </AppLink>
        <Dropdown
          className={classes.dropdown}
          direction="bottom left"
          trigger={<Avatar size={30} src={authData.avatar} />}
          items={[
            ...(isAdminPanelAvailable
              ? [{ content: t('adminPanel'), href: RoutePath.admin_panel }]
              : []),
            { content: t('profile', { ns: 'profile' }), href: RoutePath.profile + authData.id },
            { content: t('logOut'), onClick: onLogout },
          ]}
        />
      </header>
    );
  }

  return (
    <header className={classNames(classes.navbar, {}, [className])}>
      <Button theme={ButtonTheme.CLEAR_INVERTED} className={classes.links} onClick={onShowModal}>
        {t('logIn')}
      </Button>
      {isAuthModal && (
        <LoginModal
          isOpen={isAuthModal}
          onClose={onCloseModal}
        />
      )}
    </header>
  );
});
