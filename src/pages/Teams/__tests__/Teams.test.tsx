// src/pages/__tests__/Teams.test.tsx
import * as React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import * as API from '../../../api';
import { Teams } from '../Teams';

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

jest.mock('../../api');

describe('Teams', () => {
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

  it('should render spinner while loading', async () => {
    (API.getTeams as jest.Mock).mockImplementation(
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

    render(<Teams />);

    expect(screen.getByTestId('spinner')).toBeInTheDocument();

    jest.advanceTimersByTime(1000);

    await waitFor(() => {
      expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
    });
  });

  it('should render teams list', async () => {
    (API.getTeams as jest.Mock).mockResolvedValue([
      {
        id: '1',
        name: 'Team1',
      },
      {
        id: '2',
        name: 'Team2',
      },
    ]);

    render(<Teams />);

    await waitFor(() => {
      expect(screen.getByText('Team1')).toBeInTheDocument();
    });
    expect(screen.getByText('Team2')).toBeInTheDocument();
  });
});
