import { classNames } from 'shared/lib/classNames/classNames';
import { Popover as HPopover } from '@headlessui/react';
import { DropdownDirection } from 'shared/types/ui';
import { ReactNode } from 'react';
import classes from './Popover.module.scss';
import { mapDirectionClass } from '../../styles/consts';
import popupClasses from '../../styles/Popup.module.scss';

export interface PopoverProps {
  className?: string;
  trigger: ReactNode;
  direction?: DropdownDirection;
  children?: ReactNode;
}

export const Popover = ({
  className, trigger, direction = 'bottom right', children,
}: PopoverProps) => {
  const menuClasses = [mapDirectionClass[direction]];

  return (
    <HPopover className={classNames(classes.popover, {}, [className, popupClasses.popup])}>
      <HPopover.Button className={popupClasses.trigger}>{trigger}</HPopover.Button>

      <HPopover.Panel className={classNames(classes.panel, {}, menuClasses)}>
        {children}
      </HPopover.Panel>
    </HPopover>
  );
};
