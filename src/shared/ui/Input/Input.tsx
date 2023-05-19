import React, { InputHTMLAttributes, memo, MutableRefObject, ReactNode, useEffect, useRef, useState } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import classes from './Input.module.scss';
import { HStack } from '../Stack';
import { Text } from '../Text';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'size'>;

type InputSize = 's' | 'm' | 'l';

interface InputProps extends HTMLInputProps {
  className?: string;
  value?: string | number;
  label?: string;
  onChange?: (value: string) => void;
  autofocus?: boolean;
  readonly?: boolean;
  addonLeft?: ReactNode;
  addonRight?: ReactNode;
  size?: InputSize;
}

export const Input = memo(
  ({
    className,
    value,
    label,
    onChange,
    type = 'text',
    placeholder,
    autofocus,
    readonly,
    addonLeft,
    addonRight,
    size = 'm',
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

    const input = (
      <div className={classNames(classes.inputWrapper, mods, [className, classes[size]])}>
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

    if (label) {
      return (
        <HStack gap="8" max>
          <Text space="nowrap" text={label} />
          {input}
        </HStack>
      );
    }

    return input;
  },
);
