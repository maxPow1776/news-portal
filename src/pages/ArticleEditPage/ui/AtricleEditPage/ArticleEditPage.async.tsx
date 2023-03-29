import { lazy } from 'react';

export const AtricleEditPageAsync = lazy(() => new Promise((resolve) => {
  // @ts-ignore
  setTimeout(() => resolve(import('./AtricleEditPage')), 400);
}));
