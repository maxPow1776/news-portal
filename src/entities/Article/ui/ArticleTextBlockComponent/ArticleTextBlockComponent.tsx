import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/Text';
import { ArticleTextBlock } from '../../model/types/article';
import classes from './ArticleTextBlockComponent.module.scss';
import { ToggleFeatures } from '@/shared/lib/features';

export interface ArticleTextBlockComponentProps {
  className?: string;
  block: ArticleTextBlock;
}

export const ArticleTextBlockComponent = memo(({ className, block }: ArticleTextBlockComponentProps) => {
  return (
    <div className={classNames(classes.articleTextBlockComponent, {}, [className])}>
      {block.title && (
        <ToggleFeatures
          feature="isAppRedesigned"
          off={<TextDeprecated title={block.title} className={classes.title} />}
          on={<Text title={block.title} className={classes.title} />}
        />
      )}
      {block.paragraphs.map((paragraph) => (
        <ToggleFeatures
          feature="isAppRedesigned"
          off={<TextDeprecated key={paragraph} text={paragraph} className={classes.paragraph} />}
          on={<Text key={paragraph} text={paragraph} className={classes.paragraph} />}
        />
      ))}
    </div>
  );
});
