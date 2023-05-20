import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Code } from '@/shared/ui/Code';
import { ArticleCodeBlock } from '../../model/types/article';
import classes from './ArticleCodeBlockComponent.module.scss';

export interface ArticleCodeBlockComponentProps {
  className?: string;
  block: ArticleCodeBlock;
}

export const ArticleCodeBlockComponent = memo(({ className, block }: ArticleCodeBlockComponentProps) => (
  <Code className={classNames(classes.articleCodeBlockComponent, {}, [className])} text={block.code} />
));
