import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import classes from './ArticleCodeBlockComponent.module.scss';

export interface ArticleCodeBlockComponentProps {
  className?: string;
}

export const ArticleCodeBlockComponent = ({ className }: ArticleCodeBlockComponentProps) => {
  const { t } = useTranslation();

  return (
    <div className={classNames(classes.articleCodeBlockComponent, {}, [className])}>
      {t('')}
    </div>
  );
};
