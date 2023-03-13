import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import classes from './ArticleDetailsPage.module.scss';

export interface ArticleDetailsPageProps {
  className?: string;
}

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
  const { t } = useTranslation('article');

  return (
    <div className={classNames(classes.articleDetailsPage, {}, [className])}>
      {t('articleDetailsPage')}
    </div>
  );
};

export default memo(ArticleDetailsPage);
