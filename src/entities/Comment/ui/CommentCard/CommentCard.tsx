import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { Avatar } from '@/shared/ui/Avatar';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/Text';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/Skeleton';
import { AppLink as AppLinkDeprecated } from '@/shared/ui/deprecated/AppLink';
import { HStack, VStack } from '@/shared/ui/Stack';
import classes from './CommentCard.module.scss';
import { Comment } from '../../model/types/comment';
import { getRouteProfile } from '@/shared/const/router';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';
import { AppLink } from '@/shared/ui/AppLink';
import { Card } from '@/shared/ui/Card';

export interface CommentCardProps {
  className?: string;
  comment?: Comment;
  isLoading?: boolean;
}

export const CommentCard = memo(({ className, comment, isLoading }: CommentCardProps) => {
  const Skeleton = toggleFeatures({
    name: 'isAppRedesigned',
    off: () => SkeletonDeprecated,
    on: () => SkeletonRedesigned,
  });

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
    <ToggleFeatures
      feature="isAppRedesigned"
      off={
        <VStack
          data-testid="comment-card.content"
          gap="8"
          max
          className={classNames(classes.commentCard, {}, [className])}>
          <AppLinkDeprecated to={getRouteProfile(comment.user.id)} className={classes.header}>
            {comment.user.avatar && <AvatarDeprecated size={30} src={comment.user.avatar} />}
            <TextDeprecated className={classes.username} title={comment.user.username} />
          </AppLinkDeprecated>
          <TextDeprecated text={comment.text} />
        </VStack>
      }
      on={
        <Card max padding="24" border="round" className={className}>
          <VStack data-testid="comment-card.content" gap="8" max>
            <AppLink to={getRouteProfile(comment.user.id)}>
              <HStack gap="8">
                {comment.user.avatar && <Avatar size={30} src={comment.user.avatar} />}
                <Text text={comment.user.username} bold />
              </HStack>
            </AppLink>
            <Text text={comment.text} />
          </VStack>
        </Card>
      }
    />
  );
});
