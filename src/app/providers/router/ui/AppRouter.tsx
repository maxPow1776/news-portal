import { Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';
import { routeConfig } from 'shared/config/routeConfig/routeConfig';

const AppRouter = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {Object.values(routeConfig).map(({ path, element }) => {
            <Route
              key={path}
              path={path}
              element={(
                <Suspense fallback={<div>Loading...</div>}>
                  {element}
                </Suspense>
              )}
            />
          })}
        </Routes>
      </Suspense>
  );
};

export default AppRouter;