// src/pages/Teams.tsx
import * as React from 'react';

import { Container, Header, CardList, Spinner } from 'components';
import { Teams as TeamsList } from 'interfaces';
import { mapDataToColumns } from 'utils';

import { apiService } from '../../api';

export const Teams = () => {
  const [teams, setTeams] = React.useState<TeamsList[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const getTeams = async () => {
      const response = await apiService.getTeams();
      setTeams(response);
      setIsLoading(false);
    };
    getTeams();
  }, []);

  const mappedTeams = teams.map(team => mapDataToColumns(team, 'team'));

  return (
    <Container>
      <Header title="Teams" showBackButton={false} />
      {isLoading ? <Spinner /> : <CardList items={mappedTeams} />}
    </Container>
  );
};
