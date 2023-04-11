import { HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextSize } from 'shared/ui/Text/Text';
import {
  List, ListRowProps, WindowScroller,
} from 'react-virtualized';
import { PAGE_ID } from 'widgets/Page/Page';
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
  virtualized?: boolean;
}

const getSkeletons = (view: ArticleView) => new Array(view === ArticleView.SMALL ? 15 : 3)
  .fill(0)
  .map((item, index) => (
    <ArticleListItemSkeleton className={classes.card} key={index} view={view} />
  ));

export const ArticleList = memo(({
  className, articles, isLoading, view = ArticleView.SMALL, target, virtualized = true,
}: ArticleListProps) => {
  const { t } = useTranslation('article');

  const isBig = view === ArticleView.BIG;
  const itemsPerRow = isBig ? 1 : 4; // TODO: count for small view dynamicaly
  const rowCount = isBig ? articles.length : Math.ceil(articles.length / itemsPerRow);

  const rowRenderer = ({
    index, key, style,
  }: ListRowProps) => {
    const items = [];
    const fromIndex = index * itemsPerRow;
    const toIndex = Math.min(fromIndex + itemsPerRow, articles.length);

    for (let i = fromIndex; i < toIndex; i += 1) {
      items.push(
        <ArticleListItem
          key={`srt+${i}`}
          className={classes.card}
          article={articles[i]}
          view={view}
          target={target}
        />,
      );
    }

    return (
      <div
        key={key}
        style={style}
        className={classes.row}
      >
        {items}
      </div>
    );
  };

  if (!isLoading && !articles.length) {
    return (
      <div className={classNames('', {}, [className, classes[view]])}>
        <Text size={TextSize.L} title={t('articlesNotFound')} />
      </div>
    );
  }

  return (
    <WindowScroller
      onScroll={() => console.log('scroll')}
      scrollElement={document.getElementById(PAGE_ID) as Element}
    >
      {({
        width, height, registerChild, onChildScroll, isScrolling, scrollTop,
      }) => (
        <div ref={registerChild} className={classNames('', {}, [className, classes[view]])}>
          {virtualized
            ? (
              <List
                height={height ?? 700}
                rowCount={rowCount}
                rowHeight={isBig ? 700 : 330}
                rowRenderer={rowRenderer}
                width={width ? width - 80 : 700}
                autoHeight
                onScroll={onChildScroll}
                isScrolling={isScrolling}
                scrollTop={scrollTop}
              />
            )
            : articles.map((item) => (
              <ArticleListItem
                article={item}
                view={view}
                target={target}
                key={item.id}
                className={classes.card}
              />
            ))}

          {isLoading && getSkeletons(view)}
        </div>
      )}
    </WindowScroller>
  );
});
