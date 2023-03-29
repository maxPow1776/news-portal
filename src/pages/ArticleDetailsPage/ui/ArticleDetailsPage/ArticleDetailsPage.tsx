import { ArticleDetails, ArticleList } from 'entities/Article';
import { CommentList } from 'entities/Comment';
import { AddCommentForm } from 'features/AddCommentForm';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Button } from 'shared/ui/Button/Button';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { Page } from 'widgets/Page/Page';
import { articleDetailsPageReducer } from '../../model/slices';
import { getArticleRecommendationsIsLoading } from '../../model/selectors/recommendations';
import { getArticleCommentsIsLoading } from '../../model/selectors/comment';
import { addCommentForArticle } from '../../model/services/addCommetForArticle/addCommentForArticle';
import {
  fetchArticleRecommendations,
} from '../../model/services/fetchArticleRecommendations/fetchArticleRecommendations';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { getArticleComments } from '../../model/slices/ArticleDetailsCommentsSlice';
import { getArticleRecommendations } from '../../model/slices/articleDetailsPageRecommendationsSlice';
import classes from './ArticleDetailsPage.module.scss';

export interface ArticleDetailsPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
  const { t } = useTranslation('article');
  const { id } = useParams<{id: string}>();
  const comments = useSelector(getArticleComments.selectAll);
  const recommendations = useSelector(getArticleRecommendations.selectAll);
  const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
  const recommendationsIsLoading = useSelector(getArticleRecommendationsIsLoading);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSendComment = useCallback((text: string) => {
    dispatch(addCommentForArticle(text));
  }, [dispatch]);

  const onBackToList = useCallback(() => {
    navigate(RoutePath.articles);
  }, [navigate]);

  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleId(id));
    dispatch(fetchArticleRecommendations());
  });

  if (!id) {
    return (
      <div className={classNames(classes.articleDetailsPage, {}, [className])}>
        {t('articleNotFound')}
      </div>
    );
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <Page className={classNames(classes.articleDetailsPage, {}, [className])}>
        <Button onClick={onBackToList}>{t('backToList')}</Button>
        <ArticleDetails id={id} />
        <Text size={TextSize.L} className={classes.commentTitle} title={t('recommendations')} />
        <ArticleList
          target="_blank"
          className={classes.recommendations}
          articles={recommendations}
          isLoading={recommendationsIsLoading}
        />
        <Text size={TextSize.L} className={classes.commentTitle} title={t('comments')} />
        <AddCommentForm onSendComment={onSendComment} />
        <CommentList
          isLoading={commentsIsLoading}
          comments={comments}
        />
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetailsPage);
