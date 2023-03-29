import { HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { Article, ArticleView } from '../../model/types/article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
import classes from './ArticleList.module.scss';

export interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView;
  target?: HTMLAttributeAnchorTarget;
}

const getSkeletons = (view: ArticleView) => new Array(view === ArticleView.SMALL ? 15 : 3)
  .fill(0)
  .map((item, index) => (
    <ArticleListItemSkeleton className={classes.card} key={index} view={view} />
  ));

export const ArticleList = memo(({
  className, articles, isLoading, view = ArticleView.SMALL, target,
}: ArticleListProps) => {
  const { t } = useTranslation('article');

  const renderArticle = (article: Article) => (
    <ArticleListItem key={article.id} className={classes.card} article={article} view={view} target={target} />
  );

  if (!isLoading && !articles.length) {
    return (
      <div className={classNames('', {}, [className, classes[view]])}>
        <Text size={TextSize.L} title={t('articlesNotFound')} />
      </div>
    );
  }

  return (
    <div className={classNames('', {}, [className, classes[view]])}>
      {articles.length > 0
        ? articles.map(renderArticle)
        : null}
      {isLoading && getSkeletons(view)}
    </div>
  );
});
