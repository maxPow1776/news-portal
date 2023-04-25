import { RouteProps } from 'react-router-dom';
// eslint-disable-next-line maxpow1776-custom/layer-imports
import { UserRole } from '@/entities/User';

export type AppRoutesProps = RouteProps & {
  authOnly?: boolean;
  roles?: UserRole[];
}
