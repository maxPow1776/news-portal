import { memo, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { LangSwitcher } from '@/features/LangSwitcher';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { VStack } from '@/shared/ui/deprecated/Stack';
import classes from './Sidebar.module.scss';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import { getSidebarItems } from '../../model/selectors/getSidebarItems';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { ToggleFeatures } from '@/shared/lib/features';
import { AppLogo } from '@/shared/ui/deprecated/AppLogo';

export interface SidebarProps {
  className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const sidebarItemsList = useSelector(getSidebarItems);

  const onToggle = () => {
    setCollapsed((prev) => !prev);
  };

  const itemsList = useMemo(
    () => sidebarItemsList.map((item) => <SidebarItem key={item.path} item={item} collapsed={collapsed} />),
    [collapsed, sidebarItemsList],
  );

  return (
    <ToggleFeatures
      feature="isAppRedisigned"
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
          className={classNames(classes.sidebarRedisigned, { [classes.collapsed]: collapsed }, [className])}>
          <AppLogo className={classes.appLogo} />
          {/* <Button
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
          </div> */}
        </aside>
      }
    />
  );
});
