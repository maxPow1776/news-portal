import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ArticleListItemProps } from '../ArticleListItem';
import EyeIcon from '@/shared/assets/icons/eye.svg';
import { getRouteArticleDetails } from '@/shared/const/router';
import { AppImage } from '@/shared/ui/AppImage';
import { ArticleBlockType, ArticleView } from '../../../model/consts/consts';
import { ArticleTextBlock } from '../../../model/types/article';
import { Text } from '@/shared/ui/Text';
import { Icon } from '@/shared/ui/Icon';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Card } from '@/shared/ui/Card';
import { Avatar } from '@/shared/ui/Avatar';
import { Skeleton } from '@/shared/ui/Skeleton';
import { AppLink } from '@/shared/ui/AppLink';
import { Button } from '@/shared/ui/Button';
import classes from './ArticleListItemRedesigned.module.scss';

export interface ArticleListItemRedesignedProps {
  className?: string;
}

export const ArticleListItemRedesigned = memo(
  ({ className, article, view, target = '_self' }: ArticleListItemProps) => {
    const { t } = useTranslation();

    const userInfo = (
      <>
        <Avatar size={32} src={article.user.avatar} />
        <Text bold text={article.user.username} />
      </>
    );
    const views = (
      <HStack gap="8">
        <Icon Svg={EyeIcon} />
        <Text text={String(article.views)} />
      </HStack>
    );

    if (view === ArticleView.BIG) {
      const textBlock = article.blocks.find((block) => block.type === ArticleBlockType.TEXT) as ArticleTextBlock;
      return (
        <Card
          data-testid="article-list-item"
          className={classNames('', {}, [className, classes[view]])}
          // max
          padding="24">
          <VStack max gap="16">
            <HStack gap="8" max>
              <Avatar size={32} src={article.user.avatar} />
              <Text text={article.user.username} bold />
              <Text text={article.createdAt} />
            </HStack>
            <Text title={article.title} bold />
            <Text title={article.subtitle} size="s" />
            <AppImage
              className={classes.image}
              alt={article.title}
              src={article.img}
              fallback={<Skeleton width="100%" height={250} />}
            />
            {textBlock?.paragraphs && (
              <Text className={classes.textBlock} text={textBlock.paragraphs.slice(0, 2).join(' ')} />
            )}
            <HStack max justify="between">
              <AppLink target={target} to={getRouteArticleDetails(article.id)}>
                <Button>{t('readMore')}</Button>
              </AppLink>
              {views}
            </HStack>
          </VStack>
        </Card>
      );
    }

    return (
      <AppLink
        data-testid="ArticleListItem"
        target={target}
        to={getRouteArticleDetails(article.id)}
        className={classNames('', {}, [className, classes[view]])}>
        <Card className={classes.card} border="round" padding="0">
          <AppImage
            fallback={<Skeleton width="100%" height={200} />}
            alt={article.title}
            src={article.img}
            className={classes.img}
          />
          <VStack className={classes.info} gap="4">
            <Text title={article.title} className={classes.title} />
            <VStack gap="4" className={classes.footer} max>
              <HStack justify="between" max>
                <Text text={article.createdAt} className={classes.date} />
                {views}
              </HStack>
              <HStack className={classes.avatar} gap="4">
                {userInfo}
              </HStack>
            </VStack>
          </VStack>
        </Card>
      </AppLink>
    );
  },
);
