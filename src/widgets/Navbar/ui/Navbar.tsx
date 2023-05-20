import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import { LoginModal } from '@/features/AuthByUsername';
import { AvatarDropdown } from '@/features/AvatarDropdown';
import { NotificationButton } from '@/features/NotificationButton';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from '@/shared/ui/deprecated/AppLink';
import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { HStack } from '@/shared/ui/Stack';
import { Text, TextTheme } from '@/shared/ui/deprecated/Text';
import classes from './Navbar.module.scss';
import { getRouteArticleCreate } from '@/shared/const/router';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';
import { Button } from '@/shared/ui/Button';

interface NavbarProps {
  className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
  const { t } = useTranslation(['translation', 'profile']);
  const [isAuthModal, setIsAuthModal] = useState(false);
  const authData = useSelector(getUserAuthData);

  const onCloseModal = useCallback(() => {
    setIsAuthModal(false);
  }, []);

  const onShowModal = useCallback(() => {
    setIsAuthModal(true);
  }, []);

  const mainClass = toggleFeatures({
    name: 'isAppRedesigned',
    off: () => classes.navbar,
    on: () => classes.navbarRedesigned,
  });

  if (authData) {
    return (
      <ToggleFeatures
        feature="isAppRedesigned"
        off={
          <header className={classNames(mainClass, {}, [className])}>
            <Text className={classes.appName} title={t('appName')} theme={TextTheme.INVERTED} />
            <AppLink to={getRouteArticleCreate()} theme={AppLinkTheme.SECONDARY}>
              {t('createArticle')}
            </AppLink>
            <HStack gap="16" className={classes.actions}>
              <NotificationButton />
              <AvatarDropdown />
            </HStack>
          </header>
        }
        on={
          <header className={classNames(mainClass, {}, [className])}>
            <HStack gap="16" className={classes.actions}>
              <NotificationButton />
              <AvatarDropdown />
            </HStack>
          </header>
        }
      />
    );
  }

  return (
    <header className={classNames(mainClass, {}, [className])}>
      <ToggleFeatures
        feature="isAppRedesigned"
        off={
          <ButtonDeprecated theme={ButtonTheme.CLEAR_INVERTED} className={classes.links} onClick={onShowModal}>
            {t('logIn')}
          </ButtonDeprecated>
        }
        on={
          <Button className={classes.links} onClick={onShowModal}>
            {t('logIn')}
          </Button>
        }
      />
      {isAuthModal && <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />}
    </header>
  );
});
