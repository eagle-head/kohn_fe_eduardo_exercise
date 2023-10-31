// src/pages/__tests__/TeamOverview.test.tsx
import * as React from 'react';

import { render, screen, waitFor } from '@testing-library/react';

import { apiService } from '../../../api';
import { TeamOverview } from '../TeamOverview';

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

jest.mock('../../../api');

describe('TeamOverview', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.resetAllMocks();
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

    apiService.getTeamOverview = jest.fn().mockResolvedValue(teamOverview);
    apiService.getUserData = jest
      .fn()
      .mockResolvedValueOnce(userData)
      .mockResolvedValueOnce(userData)
      .mockResolvedValueOnce(userData)
      .mockResolvedValueOnce(userData);

    render(<TeamOverview />);

    await waitFor(() => {
      expect(screen.queryAllByText('userData')).toHaveLength(4);
    });
  });
});
