import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

import { ApiService } from 'api';
import { teamMock, teamsMock, userMock } from 'api/mocks';

describe('ApiService', () => {
  let mock: AxiosMockAdapter;
  let service: ApiService;

  beforeEach(() => {
    mock = new AxiosMockAdapter(axios);
    service = new ApiService('http://localhost:3000');
  });

  afterEach(() => {
    mock.reset();
  });

  it('should fetch teams', async () => {
    const controller = new AbortController();
    const { signal } = controller;

    mock.onGet('/teams').reply(200, teamsMock);

    const result = await service.getTeams(signal);

    expect(result).toEqual(teamsMock);
  });

  it('should fetch team overview by teamId', async () => {
    const controller = new AbortController();
    const { signal } = controller;
    const teamId = teamMock.id;

    mock.onGet(`/teams/${teamId}`).reply(200, teamMock);

    const result = await service.getTeamOverview(teamId, signal);

    expect(result).toEqual(teamMock);
  });

  it('should fetch user data by userId', async () => {
    const controller = new AbortController();
    const { signal } = controller;
    const userId = userMock.id;

    mock.onGet(`/users/${userId}`).reply(200, userMock);

    const result = await service.getUserData(userId, signal);

    expect(result).toEqual(userMock);
  });

  it('should handle an error when fetching user data', async () => {
    const controller = new AbortController();
    const { signal } = controller;
    const userId = 'some-id';

    mock.onGet(`/users/${userId}`).reply(500);

    const result = await service.getUserData(userId, signal);

    expect(result).toBeNull();
  });
});
