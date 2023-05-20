import { ReactElement } from 'react';
import { FeatureFlags } from '@/shared/types/featureFlags';
import { getFeatureFlag } from '../../lib/setGetFeatures';

interface ToggleFeatureProps {
  feature: keyof FeatureFlags;
  on: ReactElement;
  off: ReactElement;
}

export const ToggleFeatures = ({ feature, on, off }: ToggleFeatureProps) => {
  if (getFeatureFlag(feature)) {
    return on;
  }

  return off;
};
