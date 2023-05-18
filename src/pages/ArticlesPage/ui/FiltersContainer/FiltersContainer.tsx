import { memo } from 'react';
import { ArticlesFilters } from '@/widgets/ArticlesFilters';
import { useArticlesFilters } from '../../lib/hooks/useArticlesFilters';

export interface FiltersContainerProps {
  className?: string;
}

export const FiltersContainer = memo(({ className }: FiltersContainerProps) => {
  const { order, sort, onChangeOrder, onChangeSort, search, onChangeSearch, type, onChangeType } = useArticlesFilters();

  return (
    <ArticlesFilters
      className={className}
      order={order}
      sort={sort}
      onChangeOrder={onChangeOrder}
      onChangeSort={onChangeSort}
      search={search}
      onChangeSearch={onChangeSearch}
      type={type}
      onChangeType={onChangeType}
    />
  );
});
