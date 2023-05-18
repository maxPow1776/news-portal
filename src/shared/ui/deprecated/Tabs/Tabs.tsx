import { memo, ReactNode, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card, CardTheme } from '../Card/Card';
import classes from './Tabs.module.scss';

export interface TabItem {
  value: string;
  content: ReactNode;
}

export interface TabsProps {
  className?: string;
  tabs: TabItem[];
  value: string;
  onTabClick: (tab: TabItem) => void;
}

/**
 * @deprecated
 */
export const Tabs = memo(({ className, tabs, value, onTabClick }: TabsProps) => {
  const clickHandle = useCallback(
    (tab: TabItem) => () => {
      onTabClick(tab);
    },
    [onTabClick],
  );

  return (
    <div className={classNames(classes.tabs, {}, [className])}>
      {tabs.map((tab) => (
        <Card
          className={classes.tab}
          key={tab.value}
          theme={tab.value === value ? CardTheme.NORMAL : CardTheme.OUTLINE}
          onClick={clickHandle(tab)}>
          {tab.content}
        </Card>
      ))}
    </div>
  );
});
