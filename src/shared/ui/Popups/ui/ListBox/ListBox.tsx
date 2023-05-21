import { Listbox as HListBox } from '@headlessui/react';
import { Fragment, ReactNode, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DropdownDirection } from '@/shared/types/ui';
import { Button } from '../../../Button/Button';
import popupClasses from '../../styles/Popup.module.scss';
import classes from './ListBox.module.scss';
import { mapDirectionClass } from '../../styles/consts';
import { HStack } from '../../../Stack';
import ArrowIcon from '@/shared/assets/icons/arrow-bottom.svg';
import { Icon } from '../../../Icon';

export interface ListBoxItem<T extends string> {
  value: string;
  content: ReactNode;
  disabled?: boolean;
}

interface ListBoxProps<T extends string> {
  items?: ListBoxItem<T>[];
  className?: string;
  value?: T;
  defaultValue?: string;
  onChange: (value: T) => void;
  readonly?: boolean;
  direction?: DropdownDirection;
  label?: string;
}

export const ListBox = <T extends string>({
  items,
  className,
  value,
  defaultValue,
  onChange,
  readonly,
  direction = 'bottom right',
  label,
}: ListBoxProps<T>) => {
  const { t } = useTranslation();
  const optionsClasses = [mapDirectionClass[direction], popupClasses.menu];

  const selectedItem = useMemo(() => items?.find((item) => item.value === value), [items, value]);

  return (
    <HStack gap="4">
      {label && <span>{`${label}>`}</span>}
      <HListBox
        disabled={readonly}
        as="div"
        className={classNames(classes.listbox, {}, [className, popupClasses.popup])}
        value={value}
        onChange={onChange}>
        <HListBox.Button as={Button} disabled={readonly} variant="filled" addonRight={<Icon Svg={ArrowIcon} />}>
          {t(`${selectedItem?.value}`) ?? defaultValue}
        </HListBox.Button>
        <HListBox.Options className={classNames(classes.options, {}, optionsClasses)}>
          {items?.map((item) => (
            <HListBox.Option key={item.value} value={item.value} as={Fragment} disabled={item.disabled}>
              {({ active, selected }) => (
                <li
                  className={classNames(classes.item, {
                    [popupClasses.active]: active,
                    [popupClasses.disabled]: item.disabled,
                    [popupClasses.selected]: selected,
                  })}>
                  {selected}
                  {item.content}
                </li>
              )}
            </HListBox.Option>
          ))}
        </HListBox.Options>
      </HListBox>
    </HStack>
  );
};
