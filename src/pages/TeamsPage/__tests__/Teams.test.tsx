// src/pages/__tests__/Teams.test.tsx
import * as React from 'react';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { apiService } from '../../../api';
import { TeamsPage } from '../TeamsPage';

jest.mock('react-router-dom', () => ({
  useLocation: () => ({
    state: {
      firstName: 'Test',
      lastName: 'User',
      displayName: 'userName',
      location: 'location',
    },
  }),
  useNavigate: () => ({}),
}));

jest.mock('../../../api');

describe('Teams', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should render spinner while loading', async () => {
    apiService.getTeams = jest.fn(
      () =>
        new Promise(resolve =>
          setTimeout(
            () =>
              resolve([
                {
                  id: '1',
                  name: 'Team1',
                },
                {
                  id: '2',
                  name: 'Team2',
                },
              ]),
            1000
          )
        )
    );

    render(<TeamsPage />);

    expect(screen.getByTestId('spinner')).toBeInTheDocument();

    jest.advanceTimersByTime(1000);

    await waitFor(() => {
      expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
    });
  });

  it('should render teams list', async () => {
    apiService.getTeams = jest.fn().mockResolvedValue([
      {
        id: '1',
        name: 'Team1',
      },
      {
        id: '2',
        name: 'Team2',
      },
    ]);

    render(<TeamsPage />);

    await waitFor(() => {
      expect(screen.getByText('Team1')).toBeInTheDocument();
    });
    expect(screen.getByText('Team2')).toBeInTheDocument();
  });

  it('should filter teams based on search input', async () => {
    apiService.getTeams = jest.fn().mockResolvedValue([
      {
        id: '1',
        name: 'Team1',
      },
      {
        id: '2',
        name: 'Team2',
      },
      {
        id: '3',
        name: 'AlphaTeam',
      },
    ]);

    render(<TeamsPage />);

    await waitFor(() => {
      expect(screen.getByText('Team1')).toBeInTheDocument();
    });

    userEvent.type(screen.getByPlaceholderText('Search by name...'), 'Alpha');

    await waitFor(() => {
      expect(screen.getByText('AlphaTeam')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.queryByText('Team1')).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.queryByText('Team2')).not.toBeInTheDocument();
    });
  });
});
