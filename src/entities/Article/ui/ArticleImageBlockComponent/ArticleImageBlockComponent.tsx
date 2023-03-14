import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import classes from './ArticleImageBlockComponent.module.scss';

export interface ArticleImageBlockComponentProps {
  className?: string;
}

export const ArticleImageBlockComponent = ({ className }: ArticleImageBlockComponentProps) => {
  const { t } = useTranslation();

  return (
    <div className={classNames(classes.articleImageBlockComponent, {}, [className])}>
      {t('')}
    </div>
  );
};
