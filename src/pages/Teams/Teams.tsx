// src/pages/Teams.tsx
import * as React from 'react';

import { Container, Header, List, Spinner } from 'components';
import { ListItem, Teams as TeamsList } from 'interfaces';

import { getTeams as fetchTeams } from '../../api';

const MapT = (teams: TeamsList[]) => {
  return teams.map(team => {
    const columns = [
      {
        key: 'Name',
        value: team.name,
      },
    ];
    return {
      id: team.id,
      url: `/team/${team.id}`,
      columns,
      navigationProps: team,
    } as ListItem;
  });
};

export const Teams = () => {
  const [teams, setTeams] = React.useState<any>([]);
  const [isLoading, setIsLoading] = React.useState<any>(true);

  React.useEffect(() => {
    const getTeams = async () => {
      const response = await fetchTeams();
      setTeams(response);
      setIsLoading(false);
    };
    getTeams();
  }, []);

  return (
    <Container>
      <Header title="Teams" showBackButton={false} />
      {isLoading ? <Spinner /> : <List items={MapT(teams)} isLoading={isLoading} />}
    </Container>
  );
};
