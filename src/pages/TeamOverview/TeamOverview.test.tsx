// src/pages/__tests__/testTeamOverview.tsx
import * as React from 'react';

import { render, screen, waitFor } from '@testing-library/react';

import * as API from '../../api';

import { TeamOverview } from './TeamOverview';

jest.mock('react-router-dom', () => ({
  useLocation: () => ({
    state: {
      teamName: 'Some Team',
    },
  }),
  useNavigate: () => ({}),
  useParams: () => ({
    teamId: '1',
  }),
}));

describe('TeamOverview', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.resetAllMocks(); // Limpar todos os mocks após cada teste
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should render team overview users', async () => {
    const teamOverview = {
      id: '1',
      teamLeadId: '2',
      teamMemberIds: ['3', '4', '5'],
    };
    const userData = {
      id: '2',
      firstName: 'userData',
      lastName: 'userData',
      displayName: 'userData',
      location: '',
      avatar: '',
    };

    jest.spyOn(API, 'getTeamOverview').mockResolvedValue(teamOverview);
    jest
      .spyOn(API, 'getUserData')
      .mockResolvedValueOnce(userData) // para o líder da equipe
      .mockResolvedValueOnce(userData) // para o primeiro membro da equipe
      .mockResolvedValueOnce(userData) // para o segundo membro da equipe
      .mockResolvedValueOnce(userData); // para o terceiro membro da equipe

    render(<TeamOverview />);

    await waitFor(() => {
      expect(screen.queryAllByText('userData')).toHaveLength(4);
    });
  });
});
