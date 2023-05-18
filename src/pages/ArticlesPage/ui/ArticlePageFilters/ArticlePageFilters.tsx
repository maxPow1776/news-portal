import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/deprecated/Card';
import { Input } from '@/shared/ui/deprecated/Input';

import classes from './ArticlePageFilters.module.scss';
import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';
import { ViewSelectorContainer } from '../ViewSelectorContainer/ViewSelectorContainer';
import { useArticlesFilters } from '../../lib/hooks/useArticlesFilters';

export interface ArticlePageFiltersProps {
  className?: string;
}

export const ArticlePageFilters = memo(({ className }: ArticlePageFiltersProps) => {
  const { t } = useTranslation();
  const { order, sort, onChangeOrder, onChangeSort, search, onChangeSearch, type, onChangeType } = useArticlesFilters();

  return (
    <div className={classNames('', {}, [className])}>
      <div className={classes.sortWrapper}>
        <ArticleSortSelector order={order} sort={sort} onChangeOrder={onChangeOrder} onChangeSort={onChangeSort} />
        <ViewSelectorContainer />
      </div>
      <Card className={classes.search}>
        <Input value={search} onChange={onChangeSearch} placeholder={t('search')} />
      </Card>
      <ArticleTypeTabs value={type} onChangeType={onChangeType} className={classes.tabs} />
    </div>
  );
});
