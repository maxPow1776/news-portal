import { memo, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import CopyIcon from 'shared/assets/icons/copy-20-20.svg';
import { Button, ButtonTheme } from '../Button/Button';
import classes from './Code.module.scss';

export interface CodeProps {
  className?: string;
  text: string;
}

export const Code = memo(({ className, text }: CodeProps) => {
  const onCopy = useCallback(() => {
    navigator.clipboard.writeText(text);
  }, [text]);

  return (
    <pre className={classNames(classes.code, {}, [className])}>
      <Button className={classes.copyButton} theme={ButtonTheme.CLEAR} onClick={onCopy}>
        <CopyIcon className={classes.copyIcon} />
      </Button>
      <code>
        {text}
      </code>
    </pre>
  );
});
