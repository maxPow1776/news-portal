import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card as CardDeprecated, CardTheme } from '@/shared/ui/deprecated/Card';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Notification } from '../../model/types/notification';
import classes from './NotificationItem.module.scss';
import { ToggleFeatures } from '@/shared/lib/features';
import { Card } from '@/shared/ui/Card';
import { Text } from '@/shared/ui/Text';

export interface NotificationItemProps {
  className?: string;
  item: Notification;
}

export const NotificationItem = memo(({ className, item }: NotificationItemProps) => {
  const content = (
    <ToggleFeatures
      feature="isAppRedesigned"
      off={
        <CardDeprecated theme={CardTheme.OUTLINE} className={classNames(classes.notificationItem, {}, [className])}>
          <TextDeprecated title={item.title} text={item.description} />
        </CardDeprecated>
      }
      on={
        <Card variant="outline" className={classNames(classes.notificationItem, {}, [className])}>
          <Text title={item.title} text={item.description} />
        </Card>
      }
    />
  );

  if (item.href) {
    return (
      <a className={classes.link} target="_blank" href={item.href} rel="noreferrer">
        {content}
      </a>
    );
  }

  return content;
});
