import { memo } from 'react';
import classes from './AppLogo.module.scss';
import { HStack } from '../Stack';
import AppSvg from '@/shared/assets/icons/app-image.svg';
import { classNames } from '@/shared/lib/classNames/classNames';

interface AppLogoProps {
  className?: string;
  size?: number;
}

export const AppLogo = memo(({ className, size = 50 }: AppLogoProps) => {
  return (
    <HStack max justify="center" className={classNames(classes.appLogoWrapper, {}, [className])}>
      <div className={classes.gradientBig} />
      <div className={classes.gradientSmall} />
      <AppSvg width={size} height={size} color="black" />
    </HStack>
  );
});
