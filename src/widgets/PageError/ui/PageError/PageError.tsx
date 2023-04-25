import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '@/shared/ui/Button/Button';
import classes from './PageError.module.scss';

export interface PageErrorProps {
  className?: string;
}

export const PageError = ({ className }: PageErrorProps) => {
  const { t } = useTranslation();

  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <div className={classNames(classes.pageError, {}, [className])}>
      <p>{t('unexpectedError')}</p>
      <Button onClick={reloadPage}>{t('refreshPage')}</Button>
    </div>
  );
};
