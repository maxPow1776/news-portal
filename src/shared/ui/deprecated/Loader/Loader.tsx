import { classNames } from '@/shared/lib/classNames/classNames';
import './Loader.scss';

export interface LoaderProps {
  className?: string;
}

/**
 * @deprecated
 */
export const Loader = ({ className }: LoaderProps) => (
  <div className={classNames('lds-ellipsis', {}, [className])}>
    <div />
    <div />
    <div />
    <div />
  </div>
);
