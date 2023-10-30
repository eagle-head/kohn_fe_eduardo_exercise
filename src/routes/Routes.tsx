import * as React from 'react';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { routesConfig } from './routesConfig';

export function Routes(): JSX.Element {
  const router = createBrowserRouter(routesConfig);

  return <RouterProvider router={router} />;
}
