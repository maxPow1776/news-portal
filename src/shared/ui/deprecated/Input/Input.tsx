import React, { InputHTMLAttributes, memo, MutableRefObject, useEffect, useRef, useState } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import classes from './Input.module.scss';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>;

interface InputProps extends HTMLInputProps {
  className?: string;
  value?: string | number;
  onChange?: (value: string) => void;
  autofocus?: boolean;
  readonly?: boolean;
}

/**
 * @deprecated
 */
export const Input = memo(
  ({ className, value, onChange, type = 'text', placeholder, autofocus, readonly, ...otherProps }: InputProps) => {
    const [isFocused, setIsFocused] = useState(false);
    const [carriagePosition, setCarriagePosition] = useState(0);
    const ref = useRef() as MutableRefObject<HTMLInputElement>;

    const isCarriageVisible = isFocused && !readonly;

    useEffect(() => {
      if (autofocus) {
        setIsFocused(true);
        ref.current?.focus();
      }
    }, [autofocus]);

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value);
      setCarriagePosition(e.target.value.length);
    };

    const onBlur = () => {
      setIsFocused(false);
    };

    const onFocus = () => {
      setIsFocused(true);
    };

    const onSelect = (e: any) => {
      setCarriagePosition(e?.target?.selectionStart || 0);
    };

    const mods: Mods = {
      [classes.readonly]: readonly,
    };

    return (
      <div className={classNames(classes.inputWrapper, mods, [className])}>
        {placeholder && <div className={classes.placeholder}>{`${placeholder}>`}</div>}
        <div className={classes.carriageWrapper}>
          <input
            {...otherProps}
            ref={ref}
            type={type}
            value={value}
            onChange={onChangeHandler}
            className={classes.input}
            onFocus={onFocus}
            onBlur={onBlur}
            onSelect={onSelect}
            readOnly={readonly}
          />
          {isCarriageVisible && <span className={classes.carriage} style={{ left: `${carriagePosition * 8.8}px` }} />}
        </div>
      </div>
    );
  },
);
