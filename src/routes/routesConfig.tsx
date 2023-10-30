import * as React from 'react';

import { TeamOverview, Teams, UserOverview } from 'pages';

export const routesConfig = [
  {
    path: '/',
    element: <Teams />,
  },
  {
    path: '/team/:teamId',
    element: <TeamOverview />,
  },
  {
    path: '/user/:useId',
    element: <UserOverview />,
  },
];
