import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import ListIcon from '@/shared/assets/icons/list-24-24.svg';
import TilesIcon from '@/shared/assets/icons/tiled-24-24.svg';
import { Icon } from '@/shared/ui/deprecated/Icon';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import classes from './ArticleViewSelector.module.scss';
import { ArticleView } from '@/entities/Article';

export interface ArticleViewSelectorProps {
  className?: string;
  view: ArticleView;
  onViewClick?: (view: ArticleView) => void;
}

const viewTypes = [
  {
    view: ArticleView.BIG,
    icon: TilesIcon,
  },
  {
    view: ArticleView.SMALL,
    icon: ListIcon,
  },
];

export const ArticleViewSelector = memo(({ className, view, onViewClick }: ArticleViewSelectorProps) => {
  const onClick = (newView: ArticleView) => () => {
    onViewClick?.(newView);
  };

  return (
    <div className={classNames('', {}, [className])}>
      {viewTypes.map((viewType) => (
        <Button key={viewType.view} theme={ButtonTheme.CLEAR} onClick={onClick(viewType.view)}>
          <Icon
            Svg={viewType.icon}
            width={24}
            height={24}
            className={classNames('', { [classes.notSelected]: viewType.view !== view }, [])}
          />
        </Button>
      ))}
    </div>
  );
});