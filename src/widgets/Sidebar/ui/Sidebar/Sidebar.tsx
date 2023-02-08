import { useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';
import classes from './Sidebar.module.scss';

export interface SidebarProps {
  className?: string;
}

export const  Sidebar = ({ className }:  SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const onToggle = () => {
    setCollapsed(prev => !prev);
  }

  return (
    <div className={classNames(classes.sidebar, {[classes.collapsed]: collapsed}, [className])}>
      <button onClick={onToggle}>toggle</button>
      <div className={classes.switchers}>
        <ThemeSwitcher />
      </div>
    </div>
  );
};
