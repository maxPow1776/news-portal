import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import classes from './NotFoundPage.module.scss';

export interface NotFoundPageProps {
  className?: string;
}

export const NotFoundPage = memo(({ className }: NotFoundPageProps) => {
  const { t } = useTranslation();

  return (
    <div className={classNames(classes.notFoundPage, {}, [className])}>
      {t('pageNotFound')}
    </div>
  );
});
