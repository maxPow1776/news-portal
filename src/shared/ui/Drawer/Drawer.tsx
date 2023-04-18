import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { memo, ReactNode } from 'react';
import { useTheme } from 'app/providers/ThemeProvider';
import { Overlay } from '../Overlay/Overlay';
import classes from './Drawer.module.scss';
import { Portal } from '../Portal/Portal';

interface DrawerProps {
    className?: string;
    children: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
}

export const Drawer = memo(({
  className, children, onClose, isOpen,
}: DrawerProps) => {
  const { theme } = useTheme();

  const mods: Mods = {
    [classes.opened]: isOpen,
  };

  return (
    <Portal>
      <div className={classNames(classes.drawer, mods, [className, theme, 'app_drawer'])}>
        <Overlay onClick={onClose} />
        <div
          className={classes.content}
        >
          {children}
        </div>
      </div>
    </Portal>
  );
});
