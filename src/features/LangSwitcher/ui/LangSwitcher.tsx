import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button/Button';
import { ToggleFeatures } from '@/shared/lib/features';
import { Button } from '@/shared/ui/Button';

export interface LangSwitcherProps {
  className?: string;
  short?: boolean;
}

export const LangSwitcher = memo(({ className, short }: LangSwitcherProps) => {
  const { t, i18n } = useTranslation();

  const toggle = async () => {
    i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
  };

  return (
    <ToggleFeatures
      feature="isAppRedisigned"
      off={
        <ButtonDeprecated className={classNames('', {}, [className])} theme={ButtonTheme.CLEAR} onClick={toggle}>
          {t(short ? 'shortLanguage' : 'language')}
        </ButtonDeprecated>
      }
      on={
        <Button variant="clear" onClick={toggle}>
          {t(short ? 'shortLanguage' : 'language')}
        </Button>
      }
    />
  );
});
