import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import classes from './ArticleAdditionalInfo.module.scss';
import { User } from '@/entities/User';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Avatar } from '@/shared/ui/Avatar';
import { Text } from '@/shared/ui/Text';
import { Button } from '@/shared/ui/Button';

export interface ArticleAdditionalInfoProps {
  className?: string;
  author: User;
  createdAt: string;
  views: number;
  onEdit: () => void;
}

export const ArticleAdditionalInfo = memo(
  ({ className, author, createdAt, onEdit, views }: ArticleAdditionalInfoProps) => {
    const { t } = useTranslation();

    return (
      <VStack gap="32" className={classNames(classes.articleAdditionalInfo, {}, [className])}>
        <HStack gap="8">
          <Avatar src={author.avatar} size={32} />
          <Text text={author.username} bold />
          <Text text={createdAt} />
        </HStack>
        <Button onClick={onEdit}>{t('edit')}</Button>
        <Text text={t('{{count}} view', { count: views })} />
      </VStack>
    );
  },
);
