import { Menu } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DropdownDirection } from '@/shared/types/ui';
import popupClasses from '../../styles/Popup.module.scss';
import classes from './Dropdown.module.scss';
import { AppLink } from '../../../AppLink/AppLink';
import { mapDirectionClass } from '../../styles/consts';

export interface DropdownItem {
  disabled?: boolean;
  content?: ReactNode;
  onClick?: () => void;
  href?: string;
}

interface DropdownProps {
  className?: string;
  items: DropdownItem[];
  trigger: ReactNode;
  direction?: DropdownDirection;
}

export const Dropdown = ({ className, items, trigger, direction = 'bottom right' }: DropdownProps) => {
  const menuClasses = [mapDirectionClass[direction], popupClasses.menu];

  return (
    <Menu as="div" className={classNames(classes.dropdown, {}, [className, popupClasses.popup])}>
      <Menu.Button className={popupClasses.trigger}>{trigger}</Menu.Button>
      <Menu.Items className={classNames(classes.menu, {}, menuClasses)}>
        {items.map((item, index) => {
          const content = ({ active }: { active: boolean }) => (
            <button
              type="button"
              disabled={item.disabled}
              className={classNames(classes.item, { [popupClasses.active]: active })}
              onClick={item.onClick}>
              {item.content}
            </button>
          );

          if (item.href) {
            return (
              <Menu.Item key={`dropdown=key${index}`} as={AppLink} to={item.href} disabled={item.disabled}>
                {content}
              </Menu.Item>
            );
          }

          return (
            <Menu.Item key={`dropdown=key${index}`} as={Fragment} disabled={item.disabled}>
              {content}
            </Menu.Item>
          );
        })}
      </Menu.Items>
    </Menu>
  );
};
