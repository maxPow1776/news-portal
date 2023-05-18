import { Popover as HPopover } from '@headlessui/react';
import { ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DropdownDirection } from '@/shared/types/ui';
import classes from './Popover.module.scss';
import { mapDirectionClass } from '../../styles/consts';
import popupClasses from '../../styles/Popup.module.scss';

export interface PopoverProps {
  className?: string;
  trigger: ReactNode;
  direction?: DropdownDirection;
  children?: ReactNode;
}

/**
 * @deprecated
 */
export const Popover = ({ className, trigger, direction = 'bottom right', children }: PopoverProps) => {
  const menuClasses = [mapDirectionClass[direction]];

  return (
    <HPopover className={classNames(classes.popover, {}, [className, popupClasses.popup])}>
      <HPopover.Button as="div" className={popupClasses.trigger}>
        {trigger}
      </HPopover.Button>

      <HPopover.Panel className={classNames(classes.panel, {}, menuClasses)}>{children}</HPopover.Panel>
    </HPopover>
  );
};
