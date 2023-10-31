// src/pages/Teams.tsx
import * as React from 'react';

import { Container, Header, CardList, Spinner } from 'components';

import { useTeams } from './hooks/useTeams';

export const Teams = () => {
  const { teams, loading, error } = useTeams();

  return (
    <Container>
      <Header title="Teams" showBackButton={false} />
      {loading && <Spinner />}
      {error && <div style={{ color: 'red' }}>Error: {error.message}</div>}
      {!loading && !error && <CardList items={teams} />}
    </Container>
  );
};
