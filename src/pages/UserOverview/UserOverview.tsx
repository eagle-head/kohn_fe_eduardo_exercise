import * as React from 'react';

import { useLocation } from 'react-router-dom';

import { Card, Container, Header } from 'components';
import { UserData } from 'interfaces';

const mapU = (user: UserData) => {
  const columns = [
    {
      key: 'Name',
      value: `${user.firstName} ${user.lastName}`,
    },
    {
      key: 'Display Name',
      value: user.displayName,
    },
    {
      key: 'Location',
      value: user.location,
    },
  ];
  return <Card columns={columns} hasNavigation={false} navigationProps={user} />;
};

export const UserOverview = () => {
  const location = useLocation();
  return (
    <Container>
      <Header title={`User ${location.state.firstName} ${location.state.lastName}`} />
      {mapU(location.state)}
    </Container>
  );
};
