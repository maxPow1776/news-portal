import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page/Page';
import { StarRating } from '@/shared/ui/StarRating/StarRating';
import { RatingCard } from '@/entities/Rating';

const MainPage = memo(() => {
  const { t } = useTranslation('main');

  return (
    <Page>
      {t('mainPage')}
      <RatingCard title={t('howDoYouLikeTheArticle')} feedbackTitle={t('leaveYourFeedback')} hasFeedback />
    </Page>
  );
});

export default MainPage;
