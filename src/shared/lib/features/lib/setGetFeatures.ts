import { LOCAL_STORAGE_LAST_DESIGN_KEY } from '../../../const/localStorage';
import { FeatureFlags } from '@/shared/types/featureFlags';

const defaultFeatures = {
  isAppRedesigned: localStorage.getItem(LOCAL_STORAGE_LAST_DESIGN_KEY) !== 'old',
};

let featureFlags: FeatureFlags = {
  ...defaultFeatures,
};

export function setFeatureFlags(newFeatureFlags?: FeatureFlags) {
  if (newFeatureFlags) featureFlags = newFeatureFlags;
}

export function getFeatureFlag(flag: keyof FeatureFlags) {
  return featureFlags?.[flag];
}

export function getAllFeatureFlags() {
  return featureFlags;
}
