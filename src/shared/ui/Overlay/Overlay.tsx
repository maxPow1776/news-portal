import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import classes from './Overlay.module.scss';

interface OverlayProps {
  className?: string;
  onClick?: () => void;
}

export const Overlay = memo(({ className, onClick }: OverlayProps) => (
  <div onClick={onClick} className={classNames(classes.overlay, {}, [className])} />
));
