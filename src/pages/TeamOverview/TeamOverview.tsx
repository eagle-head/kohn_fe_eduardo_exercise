// src/pages/TeamOverview.tsx
import * as React from 'react';

import { useLocation, useParams } from 'react-router-dom';

import { Container, Header, CardList, Spinner } from 'components';
import { UserData } from 'interfaces';
import { mapDataToColumns } from 'utils';

import { apiService } from '../../api';

interface PageState {
  teamLead?: UserData;
  teamMembers?: UserData[];
}

export const TeamOverview = () => {
  const location = useLocation();
  const { teamId } = useParams();
  const [pageData, setPageData] = React.useState<PageState>({});
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const getTeamUsers = async () => {
      const { teamLeadId, teamMemberIds = [] } = await apiService.getTeamOverview(teamId);
      const teamLead = await apiService.getUserData(teamLeadId);

      const teamMembers = [];
      for (const teamMemberId of teamMemberIds) {
        const data = await apiService.getUserData(teamMemberId);
        teamMembers.push(data);
      }
      setPageData({
        teamLead,
        teamMembers,
      });
      setIsLoading(false);
    };
    getTeamUsers();
  }, [teamId]);

  const mappedTeamLead = pageData.teamLead ? [mapDataToColumns(pageData.teamLead, 'teamLead')] : [];
  const mappedTeamMembers = pageData.teamMembers
    ? pageData.teamMembers.map(member => mapDataToColumns(member, 'user'))
    : [];

  return (
    <Container>
      <Header title={`Team ${location.state.name}`} />
      {!isLoading && <CardList items={mappedTeamLead} />}
      {isLoading ? <Spinner /> : <CardList items={mappedTeamMembers} />}
    </Container>
  );
};
