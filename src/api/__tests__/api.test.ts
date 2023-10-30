import {teamsMock} from 'mocks/teamsMock';
import {teamMock} from 'mocks/teamMock';
import {userMock} from 'mocks/userMock';
import * as API from '..';

// Mock global fetch
global.fetch = jest.fn();
const mockedFetch = global.fetch as jest.Mock;

describe('API methods', () => {
  beforeEach(() => {
    mockedFetch.mockClear();
  });

  it('fetches teams', async () => {
    mockedFetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(teamsMock),
    });

    const result = await API.getTeams();
    expect(result).toEqual(teamsMock);
    expect(mockedFetch).toHaveBeenCalledWith(`${process.env.REACT_APP_API_BASE_URL}/teams`);
  });

  it('fetches team overview by teamId', async () => {
    mockedFetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(teamMock),
    });

    const teamId = '7676a4bf-adfe-415c-941b-1739af07039b';
    const result = await API.getTeamOverview(teamId);
    expect(result).toEqual(teamMock);
    expect(mockedFetch).toHaveBeenCalledWith(`${process.env.REACT_APP_API_BASE_URL}/teams/${teamId}`);
  });

  it('fetches user data by userId', async () => {
    mockedFetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(userMock),
    });

    const userId = 'fd282131-d8aa-4819-b0c8-d9e0bfb1b75c';
    const result = await API.getUserData(userId);
    expect(result).toEqual(userMock);
    expect(mockedFetch).toHaveBeenCalledWith(`${process.env.REACT_APP_API_BASE_URL}/users/${userId}`);
  });
});
