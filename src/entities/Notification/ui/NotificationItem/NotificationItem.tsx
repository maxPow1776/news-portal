import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card, CardTheme } from '@/shared/ui/Card/Card';
import { Text } from '@/shared/ui/Text/Text';
import { Notification } from '../../model/types/notification';
import classes from './NotificationItem.module.scss';

export interface NotificationItemProps {
  className?: string;
  item: Notification;
}

export const NotificationItem = memo(({ className, item }: NotificationItemProps) => {
  const content = (
    <Card theme={CardTheme.OUTLINE} className={classNames(classes.notificationItem, {}, [className])}>
      <Text title={item.title} text={item.description} />
    </Card>
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
