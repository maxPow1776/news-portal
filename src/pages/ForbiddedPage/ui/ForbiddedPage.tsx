import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from 'widgets/Page/Page';

export const ForbiddedPage = memo(() => {
  const { t } = useTranslation();

  return (
    <Page>
      {t('accessIsDenied')}
    </Page>
  );
});
