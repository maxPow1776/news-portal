import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text as TextDeprecated, TextAlign } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/Text';
import { ArticleImageBlock } from '../../model/types/article';
import classes from './ArticleImageBlockComponent.module.scss';
import { ToggleFeatures } from '@/shared/lib/features';

export interface ArticleImageBlockComponentProps {
  className?: string;
  block: ArticleImageBlock;
}

export const ArticleImageBlockComponent = memo(({ className, block }: ArticleImageBlockComponentProps) => (
  <div className={classNames(classes.articleImageBlockComponent, {}, [className])}>
    <img src={block.src} alt={block.title} className={classes.img} />
    {block.title && (
      <ToggleFeatures
        feature="isAppRedesigned"
        off={<TextDeprecated text={block.title} align={TextAlign.CENTER} />}
        on={<Text text={block.title} align="center" />}
      />
    )}
  </div>
));
