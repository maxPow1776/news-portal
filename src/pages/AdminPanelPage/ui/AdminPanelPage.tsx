import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';

const AdminPanelPage = memo(() => {
  const { t } = useTranslation();

  return (
    <Page data-testid="admin-panel-page">
      {t('adminPanel')}
    </Page>
  );
});

export default AdminPanelPage;
