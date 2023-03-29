import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page/Page';
import classes from './AtricleEditPage.module.scss';

export interface AtricleEditPageProps {
  className?: string;
}

const AtricleEditPage = memo(({ className }: AtricleEditPageProps) => {
  const { t } = useTranslation();
  const { id } = useParams<{id: string}>();
  const isEdit = Boolean(id);

  return (
    // eslint-disable-next-line i18next/no-literal-string
    <Page className={classNames(classes.atricleEditPage, {}, [className])}>
      {isEdit ? `edit article ${id}` : 'create article'}
    </Page>
  );
});

export default AtricleEditPage;
