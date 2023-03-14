import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import classes from './ArticleTextBlockComponent.module.scss';

export interface ArticleTextBlockComponentProps {
  className?: string;
}

export const ArticleTextBlockComponent = ({ className }: ArticleTextBlockComponentProps) => {
  const { t } = useTranslation();

  return (
    <div className={classNames(classes.articleTextBlockComponent, {}, [className])}>
      {t('')}
    </div>
  );
};
