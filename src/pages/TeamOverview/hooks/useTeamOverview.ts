import * as React from 'react';

import { useImmerReducer as useReducer } from 'use-immer';

import { apiService } from 'api';
import { UserData } from 'interfaces';
import { mapDataToColumns } from 'utils';

interface State {
  teamLead?: UserData;
  teamMembers: UserData[];
  loading: boolean;
  error: Error | null;
}

type Action =
  | { type: 'FETCH/INIT' }
  | { type: 'FETCH/SUCCESS'; payload: { teamLead: UserData; teamMembers: UserData[] } }
  | { type: 'FETCH/FAILURE'; payload: Error };

const initialState: State = {
  teamMembers: [],
  loading: true,
  error: null,
};

function teamOverviewReducer(draft: State, action: Action): void {
  switch (action.type) {
    case 'FETCH/INIT':
      draft.loading = true;
      draft.error = null;
      break;
    case 'FETCH/SUCCESS':
      draft.teamLead = action.payload.teamLead;
      draft.teamMembers = action.payload.teamMembers;
      draft.loading = false;
      break;
    case 'FETCH/FAILURE':
      draft.error = action.payload;
      draft.loading = false;
      break;
    default:
      throw new Error('useTeamOverview: No action type found');
  }
}

export function useTeamOverview(teamId: string) {
  const [state, dispatch] = useReducer(teamOverviewReducer, initialState);

  React.useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    (async () => {
      dispatch({ type: 'FETCH/INIT' });

      try {
        const { teamLeadId, teamMemberIds = [] } = await apiService.getTeamOverview(teamId, signal);
        if (signal.aborted) {
          return;
        }

        const teamLead = await apiService.getUserData(teamLeadId, signal);
        if (signal.aborted) {
          return;
        }

        const teamMembers: UserData[] = [];
        for (const teamMemberId of teamMemberIds) {
          const memberData = await apiService.getUserData(teamMemberId, signal);
          if (signal.aborted) {
            return;
          }

          teamMembers.push(memberData);
        }

        dispatch({
          type: 'FETCH/SUCCESS',
          payload: {
            teamLead,
            teamMembers,
          },
        });
      } catch (err) {
        if (!signal.aborted) {
          dispatch({
            type: 'FETCH/FAILURE',
            payload: err as Error,
          });
        }
      }
    })();

    return () => {
      controller.abort();
    };
  }, [teamId]);

  const mappedTeamLead = state.teamLead ? [mapDataToColumns(state.teamLead, 'teamLead')] : [];
  const mappedTeamMembers = state.teamMembers.map(member => mapDataToColumns(member, 'user'));

  return {
    teamLead: mappedTeamLead,
    teamMembers: mappedTeamMembers,
    loading: state.loading,
    error: state.error,
  };
}
