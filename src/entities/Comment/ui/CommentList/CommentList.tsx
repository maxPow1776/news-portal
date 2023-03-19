import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';
import { CommentCard } from '../CommentCard/CommentCard';
import classes from './CommentList.module.scss';
import { Comment } from '../../model/types/comment';

export interface CommentListProps {
  className?: string;
  comments?: Comment[];
  isLoading?: boolean;
}

export const CommentList = memo(({ className, comments, isLoading }: CommentListProps) => {
  const { t } = useTranslation();

  return (
    <div className={classNames('', {}, [className])}>
      {comments?.length
        ? comments.map((comment) => (
          <CommentCard className={classes.comment} comment={comment} isLoading={isLoading} />
        ))
        : <Text text={t('noComments')} />}
    </div>
  );
});
