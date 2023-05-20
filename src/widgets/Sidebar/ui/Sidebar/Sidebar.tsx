import { memo, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { LangSwitcher } from '@/features/LangSwitcher';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { VStack } from '@/shared/ui/Stack';
import classes from './Sidebar.module.scss';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import { useSidebarItems } from '../../model/selectors/getSidebarItems';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { ToggleFeatures } from '@/shared/lib/features';
import { AppLogo } from '@/shared/ui/AppLogo';
import { Icon } from '@/shared/ui/Icon';
import ArrowIcon from '@/shared/assets/icons/arrow-bottom.svg';

export interface SidebarProps {
  className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const sidebarItemsList = useSelector(useSidebarItems);

  const onToggle = () => {
    setCollapsed((prev) => !prev);
  };

  const itemsList = useMemo(
    () => sidebarItemsList.map((item) => <SidebarItem key={item.path} item={item} collapsed={collapsed} />),
    [collapsed, sidebarItemsList],
  );

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      off={
        <aside
          data-testid="sidebar"
          className={classNames(classes.sidebar, { [classes.collapsed]: collapsed }, [className])}>
          <Button
            data-testid="sidebar-toggle"
            onClick={onToggle}
            className={classes.collapsedBtn}
            theme={ButtonTheme.BACKGROUND_INVERTED}
            size={ButtonSize.L}
            square>
            {collapsed ? '>' : '<'}
          </Button>
          <VStack role="navigation" gap="8" className={classes.items}>
            {itemsList}
          </VStack>
          <div className={classes.switchers}>
            <ThemeSwitcher />
            <LangSwitcher short={collapsed} className={classes.lang} />
          </div>
        </aside>
      }
      on={
        <aside
          data-testid="sidebar"
          className={classNames(classes.sidebarRedesigned, { [classes.collapsedRedesigned]: collapsed }, [className])}>
          <AppLogo size={collapsed ? 30 : 50} className={classes.appLogo} />
          <VStack role="navigation" gap="8" className={classes.items}>
            {itemsList}
          </VStack>
          <Icon
            data-testid="sidebar-toggle"
            onClick={onToggle}
            className={classes.collapsedBtn}
            Svg={ArrowIcon}
            clickable
          />
          <div className={classes.switchers}>
            <ThemeSwitcher />
            <LangSwitcher short={collapsed} className={classes.lang} />
          </div>
        </aside>
      }
    />
  );
});
