import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text, TextAlign } from '@/shared/ui/Text/Text';
import { ArticleImageBlock } from '../../model/types/article';
import classes from './ArticleImageBlockComponent.module.scss';

export interface ArticleImageBlockComponentProps {
  className?: string;
  block: ArticleImageBlock
}

export const ArticleImageBlockComponent = memo(({ className, block }: ArticleImageBlockComponentProps) => (
  <div className={classNames(classes.articleImageBlockComponent, {}, [className])}>
    <img src={block.src} alt={block.title} className={classes.img} />
    {block.title && (
    <Text text={block.title} align={TextAlign.CENTER} />
    )}
  </div>
));
