import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Modal } from 'shared/ui/Modal/Modal';
import classes from './Navbar.module.scss';

interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  const { t } = useTranslation();
  const [isAuthModal, setIsAuthModal] = useState(false);

  const onToggleModal = useCallback(() => {
    setIsAuthModal((prev) => !prev);
  }, []);

  return (
    <div className={classNames(classes.navbar, {}, [className])}>
      <Button theme={ButtonTheme.CLEAR_INVERTED} className={classes.links} onClick={onToggleModal}>
        {t('logIn')}
      </Button>
      <Modal
        isOpen={isAuthModal}
        onClose={onToggleModal}
      >
        {t('lorem')}
      </Modal>
    </div>
  );
}
