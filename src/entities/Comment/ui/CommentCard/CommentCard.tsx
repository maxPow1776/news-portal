import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Text } from 'shared/ui/Text/Text';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import classes from './CommentCard.module.scss';
import { Comment } from '../../model/types/comment';

export interface CommentCardProps {
  className?: string;
  comment?: Comment;
  isLoading?: boolean;
}

export const CommentCard = memo(({ className, comment, isLoading }: CommentCardProps) => {
  if (isLoading) {
    return (
      <div className={classNames(classes.commentCard, {}, [className, classes.loading])}>
        <div className={classes.header}>
          <Skeleton height={30} width={30} border="50%" />
          <Skeleton className={classes.username} height={16} width={100} />
        </div>
        <Skeleton className={classes.text} height={50} width="100%" />
      </div>
    );
  }

  if (!comment) {
    return null;
  }

  return (
    <div className={classNames(classes.commentCard, {}, [className])}>
      <AppLink to={RoutePath.profile + comment.user.id} className={classes.header}>
        {comment.user.avatar && <Avatar size={30} src={comment.user.avatar} />}
        <Text className={classes.username} title={comment.user.username} />
      </AppLink>
      <Text className={classes.text} text={comment.text} />
    </div>
  );
});
