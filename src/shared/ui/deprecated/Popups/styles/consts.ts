import { DropdownDirection } from '../../../../types/ui';
import classes from './Popup.module.scss';

export const mapDirectionClass: Record<DropdownDirection, string> = {
  'top right': classes.optionsTopRight,
  'top left': classes.optionsTopLeft,
  'bottom right': classes.optionsBottomRight,
  'bottom left': classes.optionsBottomLeft,
};
