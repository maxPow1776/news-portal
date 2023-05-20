import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { Text as TextDeprecated, TextAlign, TextSize } from '@/shared/ui/deprecated/Text';
import EyeIcon from '@/shared/assets/icons/eye-20-20.svg';
import CalendarIcon from '@/shared/assets/icons/calendar-20-20.svg';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import { HStack, VStack } from '@/shared/ui/Stack';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from '../../model/selectors/articleDetails';
import { articleDetailsReducer } from '../../model/slice/articleDetaisSlice';
import classes from './ArticleDetails.module.scss';
import { renderArticleBlock } from './renderBlock';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';
import { Text } from '@/shared/ui/Text';
import { AppImage } from '@/shared/ui/AppImage';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/Skeleton';

export interface ArticleDetailsProps {
  className?: string;
  id?: string;
}

const reducers: ReducersList = {
  articleDetails: articleDetailsReducer,
};

const ArticleDetailsSkeleton = () => {
  const Skeleton = toggleFeatures({
    name: 'isAppRedesigned',
    off: () => SkeletonDeprecated,
    on: () => SkeletonRedesigned,
  });

  return (
    <>
      <Skeleton className={classes.avatar} width={200} height={200} border="50%" />
      <Skeleton width={300} height={32} />
      <Skeleton width={600} height={24} />
      <Skeleton width="100%" height={200} />
      <Skeleton width="100%" height={200} />
    </>
  );
};

const Deprecated = () => {
  const article = useSelector(getArticleDetailsData);

  return (
    <>
      <HStack justify="center" max>
        <Avatar size={200} src={article?.img} className={classes.avatar} />
      </HStack>
      <VStack gap="4" max data-testid="article-details.info">
        <TextDeprecated title={article?.title} text={article?.subtitle} size={TextSize.L} />
        <HStack gap="8">
          <IconDeprecated Svg={EyeIcon} />
          <TextDeprecated text={String(article?.views)} />
        </HStack>
        <HStack gap="8" className={classes.articleInfo}>
          <IconDeprecated Svg={CalendarIcon} />
          <TextDeprecated text={article?.createdAt} />
        </HStack>
      </VStack>
      {article?.blocks.map(renderArticleBlock)}
    </>
  );
};

const Redesigned = () => {
  const article = useSelector(getArticleDetailsData);
  return (
    <>
      <Text title={article?.title} size="l" bold />
      <Text text={article?.subtitle} />
      <AppImage
        className={classes.image}
        src={article?.img}
        fallback={<SkeletonRedesigned width="100%" height={420} border="16px" />}
      />
      {article?.blocks.map(renderArticleBlock)}
    </>
  );
};

export const ArticleDetails = memo(({ id, className }: ArticleDetailsProps) => {
  const { t } = useTranslation('article');
  const dispatch = useAppDispatch();
  const isLoading = useSelector(getArticleDetailsIsLoading);
  const error = useSelector(getArticleDetailsError);

  useEffect(() => {
    if (__PROJECT__ !== 'storybook') {
      dispatch(fetchArticleById(id));
    }
  }, [dispatch, id]);

  let content;
  if (isLoading) {
    content = <ArticleDetailsSkeleton />;
  } else if (error) {
    content = (
      <ToggleFeatures
        feature="isAppRedesigned"
        off={<TextDeprecated title={t('errorWhileLoadingPage')} align={TextAlign.CENTER} />}
        on={<Text title={t('errorWhileLoadingPage')} align="center" />}
      />
    );
  } else {
    content = <ToggleFeatures feature="isAppRedesigned" off={<Deprecated />} on={<Redesigned />} />;
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <VStack gap="16" max className={classNames(classes.articleDetails, {}, [className])}>
        {content}
      </VStack>
    </DynamicModuleLoader>
  );
});
