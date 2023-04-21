import { memo, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import classes from './StarRating.module.scss';
import { Icon } from '../Icon/Icon';
import StarIcon from '../../assets/icons/star.svg';

interface StarRatingProps {
  className?: string;
  onSelect?: (startsCount: number) => void;
  size?: number;
  selectedStars?: number;
}

const stars = [1, 2, 3, 4, 5];

export const StarRating = memo(({
  className, onSelect, size = 30, selectedStars = 0,
}: StarRatingProps) => {
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
    <div className={classNames(classes.starRating, {}, [className])}>
      {stars.map((starNumber) => (
        <Icon
          className={classNames(
            classes.starIcon,
            { [classes.selected]: isSelected },
            [currentStarsCount >= starNumber ? classes.hovered : classes.normal],
          )}
          Svg={StarIcon}
          key={starNumber}
          width={size}
          height={size}
          onMouseLeave={onLeave}
          onMouseEnter={onHover(starNumber)}
          onClick={onClick(starNumber)}
        />
      ))}
    </div>
  );
});
