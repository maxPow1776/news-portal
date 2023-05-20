import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ArticleList } from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/Stack';
import { Text as TextDeprecated, TextSize } from '@/shared/ui/deprecated/Text';
import { useArticlesRecommendationsList } from '../../api/articleRecommendationsApi';
import { ToggleFeatures } from '@/shared/lib/features';
import { Text } from '@/shared/ui/Text';

interface ArticleRecommendationsListProps {
  className?: string;
}

export const ArticleRecommendationsList = memo(({ className }: ArticleRecommendationsListProps) => {
  const { t } = useTranslation('article');
  const { data: articles, isLoading, error } = useArticlesRecommendationsList(4);

  if (isLoading || error || !articles) {
    return null;
  }

  return (
    <VStack data-testid="article-recommendation-list" gap="8" className={classNames('', {}, [className])}>
      <ToggleFeatures
        feature="isAppRedesigned"
        off={<TextDeprecated size={TextSize.L} title={t('recommendations')} />}
        on={<Text size="l" title={t('recommendations')} />}
      />
      <ArticleList target="_blank" articles={articles} />
    </VStack>
  );
});
