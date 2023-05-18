import { memo, ReactNode, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '../Card/Card';
import classes from './Tabs.module.scss';
import { Flex, FlexDirection } from '../Stack/Flex/Flex';

export interface TabItem {
  value: string;
  content: ReactNode;
}

export interface TabsProps {
  className?: string;
  tabs: TabItem[];
  value: string;
  onTabClick: (tab: TabItem) => void;
  direction?: FlexDirection;
}

export const Tabs = memo(({ className, tabs, value, onTabClick, direction = 'row' }: TabsProps) => {
  const clickHandle = useCallback(
    (tab: TabItem) => () => {
      onTabClick(tab);
    },
    [onTabClick],
  );

  return (
    <Flex direction={direction} gap="8" align="start" className={classNames(classes.tabs, {}, [className])}>
      {tabs.map((tab) => (
        <Card
          className={classes.tab}
          key={tab.value}
          variant={tab.value === value ? 'light' : 'normal'}
          onClick={clickHandle(tab)}
          border="round">
          {tab.content}
        </Card>
      ))}
    </Flex>
  );
});
