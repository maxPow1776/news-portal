import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { SortOrder } from '@/shared/types/sort';
import { Select, SelectOption } from '@/shared/ui/deprecated/Select';
import classes from './ArticleSortSelector.module.scss';
import { ArticleSortField } from '@/entities/Article';
import { ToggleFeatures } from '@/shared/lib/features';
import { ListBox } from '@/shared/ui/Popups';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

export interface ArticleSortSelectorProps {
  className?: string;
  sort: ArticleSortField;
  order: SortOrder;
  onChangeOrder: (newOrder: SortOrder) => void;
  onChangeSort: (newSort: ArticleSortField) => void;
}

export const ArticleSortSelector = memo(
  ({ className, sort, order, onChangeOrder, onChangeSort }: ArticleSortSelectorProps) => {
    const { t } = useTranslation();

    const orderOptions = useMemo<SelectOption<SortOrder>[]>(
      () => [
        {
          value: 'asc',
          content: t('ascending'),
        },
        {
          value: 'desc',
          content: t('descending'),
        },
      ],
      [t],
    );

    const sortFieldOptions = useMemo<SelectOption<ArticleSortField>[]>(
      () => [
        {
          value: ArticleSortField.CREATED,
          content: t('creationDate'),
        },
        {
          value: ArticleSortField.TITLE,
          content: t('title'),
        },
        {
          value: ArticleSortField.VIEWS,
          content: t('views'),
        },
      ],
      [t],
    );

    return (
      <ToggleFeatures
        feature="isAppRedesigned"
        off={
          <div className={classNames(classes.articleSortSelector, {}, [className])}>
            <Select value={sort} onChange={onChangeSort} options={sortFieldOptions} label={t('sortBy')} />
            <Select
              className={classes.order}
              value={order}
              onChange={onChangeOrder}
              options={orderOptions}
              label={t('by')}
            />
          </div>
        }
        on={
          <div className={classNames('', {}, [className])}>
            <VStack gap="8">
              <Text text={t('sortBy')} />
              <ListBox value={sort} onChange={onChangeSort} items={sortFieldOptions} />
              <ListBox value={order} onChange={onChangeOrder} items={orderOptions} />
            </VStack>
          </div>
        }
      />
    );
  },
);
