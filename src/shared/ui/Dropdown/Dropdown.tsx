import { classNames } from 'shared/lib/classNames/classNames';
import { Menu } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';
import { DropdownDirection } from 'shared/types/ui';
import classes from './Dropdown.module.scss';
import { AppLink } from '../AppLink/AppLink';

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

const mapDirectionClass: Record<DropdownDirection, string> = {
  'top right': classes.optionsTopRight,
  'top left': classes.optionsTopLeft,
  'bottom right': classes.optionsBottomRight,
  'bottom left': classes.optionsBottomLeft,
};

export const Dropdown = ({
  className, items, trigger, direction = 'bottom right',
}: DropdownProps) => {
  const menuClasses = [mapDirectionClass[direction]];

  return (
    <Menu as="div" className={classNames(classes.dropdown, {}, [className])}>
      <Menu.Button className={classes.button}>{trigger}</Menu.Button>
      <Menu.Items className={classNames(classes.menu, {}, menuClasses)}>
        {items.map((item) => {
          const content = ({ active }: {active: boolean}) => (
            <button
              type="button"
              disabled={item.disabled}
              className={classNames(classes.item, { [classes.active]: active })}
              onClick={item.onClick}
            >
              {item.content}
            </button>
          );

          if (item.href) {
            return (
              <Menu.Item as={AppLink} to={item.href} disabled={item.disabled}>
                {content}
              </Menu.Item>
            );
          }

          return (
            <Menu.Item as={Fragment} disabled={item.disabled}>
              {content}
            </Menu.Item>
          );
        })}
      </Menu.Items>
    </Menu>
  );
};
