import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import ListIconDeprecated from '@/shared/assets/icons/list-24-24.svg';
import TilesIconDeprecated from '@/shared/assets/icons/tiled-24-24.svg';
import ListIcon from '@/shared/assets/icons/tile.svg';
import TilesIcon from '@/shared/assets/icons/burger.svg';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button';
import classes from './ArticleViewSelector.module.scss';
import { ArticleView } from '@/entities/Article';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';
import { Icon } from '@/shared/ui/Icon';
import { Card } from '@/shared/ui/Card';
import { HStack } from '@/shared/ui/Stack';

export interface ArticleViewSelectorProps {
  className?: string;
  view: ArticleView;
  onViewClick?: (view: ArticleView) => void;
}

const viewTypes = [
  {
    view: ArticleView.BIG,
    icon: toggleFeatures({
      name: 'isAppRedesigned',
      off: () => TilesIconDeprecated,
      on: () => TilesIcon,
    }),
  },
  {
    view: ArticleView.SMALL,
    icon: toggleFeatures({
      name: 'isAppRedesigned',
      off: () => ListIconDeprecated,
      on: () => ListIcon,
    }),
  },
];

export const ArticleViewSelector = memo(({ className, view, onViewClick }: ArticleViewSelectorProps) => {
  const onClick = (newView: ArticleView) => () => {
    onViewClick?.(newView);
  };

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      off={
        <div className={classNames(classes.articleViewSelector, {}, [className])}>
          {viewTypes.map((viewType) => (
            <ButtonDeprecated key={viewType.view} theme={ButtonTheme.CLEAR} onClick={onClick(viewType.view)}>
              <IconDeprecated
                Svg={viewType.icon}
                width={24}
                height={24}
                className={classNames('', { [classes.notSelected]: viewType.view !== view }, [])}
              />
            </ButtonDeprecated>
          ))}
        </div>
      }
      on={
        <Card border="partial" className={classNames(classes.articleViewSelectorRedesigned, {}, [className])}>
          <HStack gap="8">
            {viewTypes.map((viewType) => (
              <Icon
                key={viewType.view}
                Svg={viewType.icon}
                width={24}
                height={24}
                clickable
                onClick={onClick(viewType.view)}
                className={classNames('', { [classes.notSelected]: viewType.view !== view }, [])}
              />
            ))}
          </HStack>
        </Card>
      }
    />
  );
});
