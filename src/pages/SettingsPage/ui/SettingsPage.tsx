import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';
import { VStack } from '@/shared/ui/Stack';
import { UiDesignSwitcher } from '@/features/UiDesignSwitcher';
import { Text } from '@/shared/ui/Text';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { ToggleFeatures } from '@/shared/lib/features';

interface SettingsPageProps {
  className?: string;
}

const SettingsPage = memo(({ className }: SettingsPageProps) => {
  const { t } = useTranslation();

  return (
    <Page>
      <VStack gap="16">
        <ToggleFeatures
          feature="isAppRedesigned"
          off={<TextDeprecated title={t('userSettings')} />}
          on={<Text title={t('userSettings')} />}
        />
        <UiDesignSwitcher />
      </VStack>
    </Page>
  );
});

export default SettingsPage;
