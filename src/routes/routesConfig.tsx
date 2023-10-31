import * as React from 'react';

import { TeamOverviewPage, TeamsPage, UserOverviewPage } from 'pages';

export const routesConfig = [
  {
    path: '/',
    element: <TeamsPage />,
  },
  {
    path: '/team/:teamId',
    element: <TeamOverviewPage />,
  },
  {
    path: '/user/:useId',
    element: <UserOverviewPage />,
  },
];
