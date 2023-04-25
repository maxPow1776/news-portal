import { ChangeEvent, useMemo } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import classes from './Select.module.scss';

export interface SelectOption<T extends string> {
  value: T;
  content: string;
}

export interface SelectProps<T extends string> {
  className?: string;
  label?: string;
  options?: SelectOption<T>[];
  value?: T;
  onChange?: (value: T) => void;
  readonly?: boolean;
}

export const Select = <T extends string>({
  className, label, options, value, onChange, readonly,
}: SelectProps<T>) => {
  const optionsList = useMemo(() => options?.map((opt) => (
    <option className={classes.option} value={opt.value} key={opt.value}>{opt.content}</option>
  )), [options]);

  const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value as T);
  };

  const mods: Mods = {
    [classes.readonly]: readonly,
  };

  return (
    <div className={classNames(classes.wrapper, mods, [className])}>
      {label && <span className={classes.label}>{`${label}>`}</span>}
      <select className={classes.select} value={value} onChange={onChangeHandler} disabled={readonly}>
        {optionsList}
      </select>
    </div>
  );
};
