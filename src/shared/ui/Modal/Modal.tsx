import { ReactNode } from 'react';
import { useTheme } from '@/app/providers/ThemeProvider';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import { useModal } from '@/shared/lib/hooks/useModal/useModal';
import { Overlay } from '../Overlay/Overlay';
import { Portal } from '../Portal/Portal';
import classes from './Modal.module.scss';

export interface ModalProps {
  className?: string;
  children?: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  lazy?: boolean;
}

const ANIMATION_DELAY = 300;

export const Modal = ({
  className, children, isOpen, onClose, lazy,
}: ModalProps) => {
  const { theme } = useTheme();
  const { isClosing, isMounted, close } = useModal({ isOpen, onClose, animationDelay: ANIMATION_DELAY });

  const mods: Mods = {
    [classes.opened]: isOpen,
    [classes.isClosing]: isClosing,
  };

  if (lazy && !isMounted) {
    return null;
  }

  return (
    <Portal>
      <div className={classNames(classes.modal, mods, [className, theme, 'app_modal'])}>
        <Overlay onClick={close} />
        <div className={classes.content}>
          {children}
        </div>
      </div>
    </Portal>
  );
};
