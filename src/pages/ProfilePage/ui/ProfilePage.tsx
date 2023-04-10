import { EditableProfileCard } from 'features/EditableProfileCard';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import { VStack } from 'shared/ui/Stack';
import { Text } from 'shared/ui/Text/Text';
import { Page } from 'widgets/Page/Page';

const ProfilePage = memo(() => {
  const { t } = useTranslation('profile');
  const { id } = useParams<{id: string}>();

  if (!id) {
    return <Text text={t('profileNotFound')} />;
  }

  return (
    <Page className={classNames('', {}, [])}>
      <VStack max gap="16">
        <EditableProfileCard id={id} />
      </VStack>
    </Page>
  );
});

export default ProfilePage;
