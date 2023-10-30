import { TeamOverview, Teams, UserOverview } from 'pages';
import * as React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const App = () => {
  const router = createBrowserRouter([
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
  ]);

  return <RouterProvider router={router} />;
};

export default App;
