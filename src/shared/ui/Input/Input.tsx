import React, { InputHTMLAttributes, memo, MutableRefObject, ReactNode, useEffect, useRef, useState } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import classes from './Input.module.scss';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>;

interface InputProps extends HTMLInputProps {
  className?: string;
  value?: string | number;
  onChange?: (value: string) => void;
  autofocus?: boolean;
  readonly?: boolean;
  addonLeft?: ReactNode;
  addonRight?: ReactNode;
}

export const Input = memo(
  ({
    className,
    value,
    onChange,
    type = 'text',
    placeholder,
    autofocus,
    readonly,
    addonLeft,
    addonRight,
    ...otherProps
  }: InputProps) => {
    const [isFocused, setIsFocused] = useState(false);
    const ref = useRef() as MutableRefObject<HTMLInputElement>;

    useEffect(() => {
      if (autofocus) {
        setIsFocused(true);
        ref.current?.focus();
      }
    }, [autofocus]);

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value);
    };

    const onBlur = () => {
      setIsFocused(false);
    };

    const onFocus = () => {
      setIsFocused(true);
    };

    const mods: Mods = {
      [classes.readonly]: readonly,
      [classes.focused]: isFocused,
      [classes.withAddonLeft]: Boolean(addonLeft),
      [classes.withAddonRight]: Boolean(addonRight),
    };

    return (
      <div className={classNames(classes.inputWrapper, mods, [className])}>
        {addonLeft && <div className={classes.addonLeft}>{addonLeft}</div>}
        <input
          {...otherProps}
          ref={ref}
          type={type}
          value={value}
          onChange={onChangeHandler}
          className={classes.input}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          readOnly={readonly}
        />
        {addonRight && <div className={classes.addonRight}>{addonRight}</div>}
      </div>
    );
  },
);
