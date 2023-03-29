import { ArticleDetailsPageRecommendationsSchema } from './ArticleDetailsPageRecommendationsSchema';
import { ArticleDetailsCommentSchema } from './ArticleDetailsCommentSchema';

export interface ArticleDetailsPageSchema {
  comments: ArticleDetailsCommentSchema;
  recommendations: ArticleDetailsPageRecommendationsSchema
}
