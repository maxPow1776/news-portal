import { HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';
import EyeIcon from 'shared/assets/icons/eye-20-20.svg';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Button } from 'shared/ui/Button/Button';
import { Card } from 'shared/ui/Card/Card';
import { Icon } from 'shared/ui/Icon/Icon';
import { Text } from 'shared/ui/Text/Text';
import { Article, ArticleTextBlock } from '../../model/types/article';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import classes from './ArticleListItem.module.scss';
import { ArticleBlockType, ArticleView } from '../../model/consts/consts';

export interface ArticleListItemProps {
  className?: string;
  article: Article;
  view: ArticleView;
  target?: HTMLAttributeAnchorTarget;
}

export const ArticleListItem = memo(({
  className, article, view, target = '_self',
}: ArticleListItemProps) => {
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
            <AppLink target={target} to={RoutePath.article_details + article.id}>
              <Button>
                {t('readMore')}
              </Button>
            </AppLink>
            {views}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <AppLink
      target={target}
      to={RoutePath.article_details + article.id}
      className={classNames(classes.articleListItem, {}, [className, classes[view]])}
    >
      <Card>
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
    </AppLink>
  );
});
