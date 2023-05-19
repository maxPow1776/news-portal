import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import classes from './ArticlesFilters.module.scss';
import { Card } from '@/shared/ui/Card';
import { Input } from '@/shared/ui/Input';
import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';
import { VStack } from '@/shared/ui/Stack';
import { ArticleSortField, ArticleType } from '@/entities/Article';
import { SortOrder } from '@/shared/types/sort';
import SearchIcon from '@/shared/assets/icons/search.svg';
import { Icon } from '@/shared/ui/Icon';

export interface ArticlesFiltersProps {
  className?: string;
  sort: ArticleSortField;
  order: SortOrder;
  type: ArticleType;
  search: string;
  onChangeSearch: (value: string) => void;
  onChangeOrder: (newOrder: SortOrder) => void;
  onChangeSort: (newSort: ArticleSortField) => void;
  onChangeType: (type: ArticleType) => void;
}

export const ArticlesFilters = memo(
  ({
    sort,
    order,
    type,
    search,
    onChangeSearch,
    onChangeOrder,
    onChangeSort,
    onChangeType,
    className,
  }: ArticlesFiltersProps) => {
    const { t } = useTranslation();

    return (
      <Card className={classNames(classes.articlesFilters, {}, [className])} padding="24">
        <VStack gap="16">
          <Input
            value={search}
            onChange={onChangeSearch}
            placeholder={t('search')}
            addonLeft={<Icon Svg={SearchIcon} />}
          />
          <ArticleTypeTabs value={type} onChangeType={onChangeType} className={classes.tabs} />
          <ArticleSortSelector order={order} sort={sort} onChangeOrder={onChangeOrder} onChangeSort={onChangeSort} />
        </VStack>
      </Card>
    );
  },
);
