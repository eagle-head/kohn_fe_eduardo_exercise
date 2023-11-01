// src/pages/__tests__/TeamOverview.test.tsx
import * as React from 'react';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { apiService } from '../../../api';
import { TeamOverviewPage } from '../TeamOverviewPage';

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

    render(<TeamOverviewPage />);

    await waitFor(() => {
      expect(screen.queryAllByText('userData')).toHaveLength(4);
    });
  });

  it('should filter team members based on search input', async () => {
    const teamOverview = {
      id: '1',
      teamLeadId: '2',
      teamMemberIds: ['3', '4', '5'],
    };
    const teamLeadData = {
      id: '2',
      firstName: 'TeamLead',
      lastName: 'Smith',
      displayName: 'teamlead',
      location: '',
      avatar: '',
    };
    const teamMemberData = [
      {
        id: '3',
        firstName: 'Alice',
        lastName: 'Johnson',
        displayName: 'alice',
        location: '',
        avatar: '',
      },
      {
        id: '4',
        firstName: 'Bob',
        lastName: 'Doe',
        displayName: 'bob',
        location: '',
        avatar: '',
      },
      {
        id: '5',
        firstName: 'Charlie',
        lastName: 'Brown',
        displayName: 'charlie',
        location: '',
        avatar: '',
      },
    ];

    apiService.getTeamOverview = jest.fn().mockResolvedValue(teamOverview);
    apiService.getUserData = jest
      .fn()
      .mockResolvedValueOnce(teamLeadData)
      .mockResolvedValueOnce(teamMemberData[0])
      .mockResolvedValueOnce(teamMemberData[1])
      .mockResolvedValueOnce(teamMemberData[2]);

    render(<TeamOverviewPage />);

    await waitFor(() => {
      expect(screen.getByText('TeamLead Smith')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('Bob Doe')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('Charlie Brown')).toBeInTheDocument();
    });

    userEvent.type(screen.getByPlaceholderText('Search for team members...'), 'Bob');

    await waitFor(() => {
      expect(screen.getByText('TeamLead Smith')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.queryByText('Alice Johnson')).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('Bob Doe')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.queryByText('Charlie Brown')).not.toBeInTheDocument();
    });
  });
});
