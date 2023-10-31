import * as React from 'react';

import { useImmerReducer as useReducer } from 'use-immer';

import { apiService } from 'api';
import { Teams as TeamsList } from 'interfaces';
import { mapDataToColumns } from 'utils';

interface State {
  teams: TeamsList[];
  loading: boolean;
  error: Error | null;
}

type Action =
  | { type: 'FETCH/INIT' }
  | { type: 'FETCH/SUCCESS'; payload: TeamsList[] }
  | { type: 'FETCH/FAILURE'; payload: Error };

const initialState: State = {
  teams: [],
  loading: true,
  error: null,
};

function teamsReducer(draft: State, action: Action): void {
  switch (action.type) {
    case 'FETCH/INIT':
      draft.loading = true;
      draft.error = null;
      break;
    case 'FETCH/SUCCESS':
      draft.teams = action.payload;
      draft.loading = false;
      break;
    case 'FETCH/FAILURE':
      draft.error = action.payload;
      draft.loading = false;
      break;
    default:
      throw new Error('useTeams: No action type found');
  }
}

export function useTeams() {
  const [state, dispatch] = useReducer(teamsReducer, initialState);

  React.useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    (async () => {
      dispatch({ type: 'FETCH/INIT' });

      try {
        const response = await apiService.getTeams(signal);
        dispatch({ type: 'FETCH/SUCCESS', payload: response });
      } catch (err) {
        if (!signal.aborted) {
          dispatch({ type: 'FETCH/FAILURE', payload: err as Error });
        }
      }
    })();

    return () => {
      controller.abort();
    };
  }, []);

  const mappedTeams = state.teams.map(team => mapDataToColumns(team, 'team'));

  return { ...state, teams: mappedTeams };
}
