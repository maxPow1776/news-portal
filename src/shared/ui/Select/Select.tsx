import { ChangeEvent, memo, useMemo } from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import classes from './Select.module.scss';

export interface SelectOption {
  value: string;
  content: string;
}

export interface SelectProps {
  className?: string;
  label?: string;
  options?: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  readonly?: boolean;
}

export const Select = memo(({
  className, label, options, value, onChange, readonly,
}: SelectProps) => {
  const optionsList = useMemo(() => options?.map((opt) => (
    <option className={classes.option} value={opt.value} key={opt.value}>{opt.content}</option>
  )), [options]);

  const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value);
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
});
