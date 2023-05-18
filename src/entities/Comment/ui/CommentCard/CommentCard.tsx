import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { Text } from '@/shared/ui/deprecated/Text';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';
import { AppLink } from '@/shared/ui/deprecated/AppLink';
import { VStack } from '@/shared/ui/deprecated/Stack';
import classes from './CommentCard.module.scss';
import { Comment } from '../../model/types/comment';
import { getRouteProfile } from '@/shared/const/router';

export interface CommentCardProps {
  className?: string;
  comment?: Comment;
  isLoading?: boolean;
}

export const CommentCard = memo(({ className, comment, isLoading }: CommentCardProps) => {
  if (isLoading) {
    return (
      <VStack
        data-testid="comment-card.loading"
        gap="8"
        max
        className={classNames(classes.commentCard, {}, [className, classes.loading])}>
        <div className={classes.header}>
          <Skeleton height={30} width={30} border="50%" />
          <Skeleton className={classes.username} height={16} width={100} />
        </div>
        <Skeleton height={50} width="100%" />
      </VStack>
    );
  }

  if (!comment) {
    return null;
  }

  return (
    <VStack data-testid="comment-card.content" gap="8" max className={classNames(classes.commentCard, {}, [className])}>
      <AppLink to={getRouteProfile(comment.user.id)} className={classes.header}>
        {comment.user.avatar && <Avatar size={30} src={comment.user.avatar} />}
        <Text className={classes.username} title={comment.user.username} />
      </AppLink>
      <Text text={comment.text} />
    </VStack>
  );
});
