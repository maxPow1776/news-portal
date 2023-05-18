import { memo } from 'react';
import classes from './AppLogo.module.scss';
import { HStack } from '../../deprecated/Stack';
import AppSvg from '@/shared/assets/icons/app-image.svg';
import { classNames } from '@/shared/lib/classNames/classNames';

interface AppLogoProps {
  className?: string;
}

/**
 * @deprecated
 */
export const AppLogo = memo(({ className }: AppLogoProps) => {
  return (
    <HStack max justify="center" className={classNames(classes.appLogoWrapper, {}, [className])}>
      <div className={classes.gradientBig} />
      <div className={classes.gradientSmall} />
      <AppSvg className={classes.appLogo} />
    </HStack>
  );
});
