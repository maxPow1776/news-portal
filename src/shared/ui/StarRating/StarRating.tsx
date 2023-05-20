import { memo, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import classes from './StarRating.module.scss';
import StarIcon from '../../assets/icons/star.svg';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';
import { Icon as IconDeprecated } from '../deprecated/Icon';
import { Icon } from '../Icon';

interface StarRatingProps {
  className?: string;
  onSelect?: (startsCount: number) => void;
  size?: number;
  selectedStars?: number;
}

const stars = [1, 2, 3, 4, 5];

export const StarRating = memo(({ className, onSelect, size = 30, selectedStars = 0 }: StarRatingProps) => {
  const [currentStarsCount, setCurrentStarsCount] = useState(selectedStars);
  const [isSelected, setIsSelected] = useState(Boolean(selectedStars));

  const onHover = (starsCount: number) => () => {
    if (!isSelected) {
      setCurrentStarsCount(starsCount);
    }
  };

  const onLeave = () => {
    if (!isSelected) {
      setCurrentStarsCount(0);
    }
  };

  const onClick = (startCount: number) => () => {
    if (!isSelected) {
      onSelect?.(startCount);
      setCurrentStarsCount(startCount);
      setIsSelected(true);
    }
  };

  return (
    <div
      className={classNames(
        toggleFeatures({
          name: 'isAppRedesigned',
          off: () => classes.starRating,
          on: () => classes.starRatingRedesigned,
        }),
        {},
        [className],
      )}>
      {stars.map((starNumber) => {
        const props = {
          className: classNames(classes.starIcon, { [classes.selected]: isSelected }, [
            currentStarsCount >= starNumber ? classes.hovered : classes.normal,
          ]),
          Svg: StarIcon,
          key: starNumber,
          width: size,
          height: size,
          onMouseLeave: onLeave,
          onMouseEnter: onHover(starNumber),
          onClick: onClick(starNumber),
          'data-testid': `star-rating.${starNumber}`,
          'data-selected': currentStarsCount >= starNumber,
        };
        return (
          <ToggleFeatures
            feature="isAppRedesigned"
            off={<IconDeprecated {...props} />}
            on={<Icon clickable={!isSelected} {...props} />}
          />
        );
      })}
    </div>
  );
});
