// src/pages/TeamOverview.tsx
import * as React from 'react';

import { useLocation, useParams } from 'react-router-dom';

import { Container, Header, CardList, Spinner } from 'components';

import { useTeamOverview } from './hooks/useTeamOverview';

export const TeamOverview = () => {
  const location = useLocation();
  const { teamId } = useParams<{ teamId: string }>();
  const { teamLead, teamMembers, loading, error } = useTeamOverview(teamId);

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
          <CardList items={teamMembers} />
        </React.Fragment>
      )}
    </Container>
  );
};
