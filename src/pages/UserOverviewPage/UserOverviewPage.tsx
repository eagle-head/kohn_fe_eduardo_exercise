// src/pages/UserOverviewPage/UserOverviewPage.tsx
import * as React from 'react';

import { useLocation } from 'react-router-dom';

import { Card, Container, Header } from 'components';
import { UserData } from 'interfaces';
import { mapDataToColumns } from 'utils';

export const UserOverviewPage = () => {
  const location = useLocation();
  const userData: UserData = location.state;

  const userListItem = mapDataToColumns(userData, 'user');

  return (
    <Container>
      <Header title={`User ${userData.firstName} ${userData.lastName}`} />
      <Card columns={userListItem.columns} hasNavigation={false} navigationProps={userData} />
    </Container>
  );
};
