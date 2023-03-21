import { memo, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Icon } from 'shared/ui/Icon/Icon';
import { Text } from 'shared/ui/Text/Text';
import EyeIcon from 'shared/assets/icons/eye-20-20.svg';
import { Card } from 'shared/ui/Card/Card';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Button } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import {
  Article, ArticleBlockType, ArticleTextBlock, ArticleView,
} from '../../model/types/article';
import classes from './ArticleListItem.module.scss';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';

export interface ArticleListItemProps {
  className?: string;
  article: Article;
  view: ArticleView;
}

export const ArticleListItem = memo(({ className, article, view }: ArticleListItemProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const types = <Text className={classes.types} text={article.type.join(', ')} />;
  const views = (
    <>
      <Text className={classes.views} text={String(article.views)} />
      <Icon Svg={EyeIcon} />
    </>
  );

  const onOpenArticle = useCallback(() => {
    navigate(RoutePath.article_details + article.id);
  }, [article.id, navigate]);

  if (view === ArticleView.BIG) {
    const textBlock = article.blocks.find((block) => block.type === ArticleBlockType.TEXT) as ArticleTextBlock;
    return (
      <div className={classNames(classes.articleListItem, {}, [className, classes[view]])}>
        <Card>
          <div className={classes.header}>
            <Avatar size={30} src={article.user.avatar} />
            <Text className={classes.username} text={article.user.username} />
            <Text className={classes.date} text={article.createdAt} />
          </div>
          <Text className={classes.title} title={article.title} />
          {types}
          <img className={classes.image} alt={article.title} src={article.img} />
          {textBlock && (
            <ArticleTextBlockComponent className={classes.textBlock} block={textBlock} />
          )}
          <div className={classes.footer}>
            <Button onClick={onOpenArticle}>
              {t('readMore')}
            </Button>
            {views}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className={classNames(classes.articleListItem, {}, [className, classes[view]])}>
      <Card onClick={onOpenArticle}>
        <div className={classes.imageWrapper}>
          <img className={classes.image} alt={article.title} src={article.img} />
          <Text className={classes.date} text={article.createdAt} />
        </div>
        <div className={classes.infoWrapper}>
          {types}
          {views}
        </div>
        <Text className={classes.title} text={article.title} />
      </Card>
    </div>
  );
});
