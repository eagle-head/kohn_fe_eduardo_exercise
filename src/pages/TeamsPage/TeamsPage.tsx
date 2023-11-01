// src/pages/TeamsPage/TeamsPage.tsx
import * as React from 'react';

import { Container, Header, CardList, Spinner, SearchBar } from 'components';

import { useTeams } from './hooks/useTeams';

export const TeamsPage = () => {
  const { teams, loading, error } = useTeams();
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredTeams = teams.filter(team =>
    team.columns.some(column => column.key === 'Name' && column.value.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Container>
      <Header title="Teams" showBackButton={false} />
      <SearchBar value={searchTerm} placeholder="Search by name..." onChange={value => setSearchTerm(value)} />
      {loading && <Spinner />}
      {error && <div style={{ color: 'red' }}>Error: {error.message}</div>}
      {!loading && !error && <CardList items={filteredTeams} />}
    </Container>
  );
};
