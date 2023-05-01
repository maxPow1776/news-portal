import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';

export const ForbiddedPage = memo(() => {
  const { t } = useTranslation();

  return (
    <Page data-testid="forbidden-page">
      {t('accessIsDenied')}
    </Page>
  );
});
