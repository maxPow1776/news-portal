import { HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';
import EyeIcon from '@/shared/assets/icons/eye-20-20.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink } from '@/shared/ui/deprecated/AppLink';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { Button } from '@/shared/ui/deprecated/Button';
import { Card } from '@/shared/ui/deprecated/Card';
import { Icon } from '@/shared/ui/deprecated/Icon';
import { Text } from '@/shared/ui/deprecated/Text';
import { Article, ArticleTextBlock } from '../../model/types/article';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import classes from './ArticleListItem.module.scss';
import { ArticleBlockType, ArticleView } from '../../model/consts/consts';
import { getRouteArticleDetails } from '@/shared/const/router';
import { AppImage } from '@/shared/ui/AppImage';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';

export interface ArticleListItemProps {
  className?: string;
  article: Article;
  view: ArticleView;
  target?: HTMLAttributeAnchorTarget;
}

export const ArticleListItem = memo(({ className, article, view, target = '_self' }: ArticleListItemProps) => {
  const { t } = useTranslation();

  const types = <Text className={classes.types} text={article.type.join(', ')} />;
  const views = (
    <>
      <Text className={classes.views} text={String(article.views)} />
      <Icon Svg={EyeIcon} />
    </>
  );

  if (view === ArticleView.BIG) {
    const textBlock = article.blocks.find((block) => block.type === ArticleBlockType.TEXT) as ArticleTextBlock;
    return (
      <div
        data-testid="article-list-item"
        className={classNames(classes.articleListItem, {}, [className, classes[view]])}>
        <Card>
          <div className={classes.header}>
            <Avatar size={30} src={article.user.avatar} />
            <Text className={classes.username} text={article.user.username} />
            <Text className={classes.date} text={article.createdAt} />
          </div>
          <Text className={classes.title} title={article.title} />
          {types}
          <AppImage
            className={classes.image}
            alt={article.title}
            src={article.img}
            fallback={<Skeleton width="100%" height={250} />}
          />
          {textBlock && <ArticleTextBlockComponent className={classes.textBlock} block={textBlock} />}
          <div className={classes.footer}>
            <AppLink target={target} to={getRouteArticleDetails(article.id)}>
              <Button>{t('readMore')}</Button>
            </AppLink>
            {views}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <AppLink
      data-testid="article-list-item"
      target={target}
      to={getRouteArticleDetails(article.id)}
      className={classNames(classes.articleListItem, {}, [className, classes[view]])}>
      <Card>
        <div className={classes.imageWrapper}>
          <AppImage
            className={classes.image}
            alt={article.title}
            src={article.img}
            fallback={<Skeleton width={200} height={200} />}
          />
          <Text className={classes.date} text={article.createdAt} />
        </div>
        <div className={classes.infoWrapper}>
          {types}
          {views}
        </div>
        <Text className={classes.title} text={article.title} />
      </Card>
    </AppLink>
  );
});
