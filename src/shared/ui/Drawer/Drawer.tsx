import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { memo, ReactNode } from 'react';
import { useTheme } from 'app/providers/ThemeProvider';
import { useModal } from 'shared/lib/hooks/useModal/useModal';
import { Overlay } from '../Overlay/Overlay';
import classes from './Drawer.module.scss';
import { Portal } from '../Portal/Portal';

interface DrawerProps {
  className?: string;
  children: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  lazy?: boolean;
}

export const Drawer = memo(({
  className, children, onClose, isOpen, lazy,
}: DrawerProps) => {
  const { theme } = useTheme();
  const { isClosing, isMounted, close } = useModal({ isOpen, onClose });

  const mods: Mods = {
    [classes.opened]: isOpen,
    [classes.isClosing]: isClosing,
  };

  if (lazy && !isMounted) {
    return null;
  }

  return (
    <Portal>
      <div className={classNames(classes.drawer, mods, [className, theme, 'app_drawer'])}>
        <Overlay onClick={close} />
        <div
          className={classes.content}
        >
          {children}
        </div>
      </div>
    </Portal>
  );
});
