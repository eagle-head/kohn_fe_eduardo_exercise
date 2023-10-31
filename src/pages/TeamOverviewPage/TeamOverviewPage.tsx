// src/pages/TeamOverviewPage/TeamOverviewPage.tsx
import * as React from 'react';

import { useLocation, useParams } from 'react-router-dom';

import { Container, Header, CardList, Spinner, SearchBar } from 'components'; // Importe o SearchBar aqui

import { useTeamOverview } from './hooks/useTeamOverview';

export const TeamOverviewPage = () => {
  const location = useLocation();
  const { teamId } = useParams<{ teamId: string }>();
  const { teamLead, teamMembers, loading, error } = useTeamOverview(teamId);

  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredMembers = teamMembers.filter(member =>
    member.columns.some(
      column => column.key === 'Name' && column.value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  if (error) {
    return (
      <Container>
        <Header title={`Team ${location.state.name}`} />
        <p>Error loading team details. Please try again.</p>
      </Container>
    );
  }

  return (
    <Container>
      <Header title={`Team ${location.state.name}`} />
      {loading ? (
        <Spinner />
      ) : (
        <React.Fragment>
          <CardList items={teamLead} />
          <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search for team members..." />
          <CardList items={filteredMembers} />
        </React.Fragment>
      )}
    </Container>
  );
};
