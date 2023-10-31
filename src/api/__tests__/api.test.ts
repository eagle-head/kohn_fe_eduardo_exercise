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

    mock.onGet('/teams').reply(200, teamsMock);

    const result = await service.getTeams(controller.signal);

    expect(result).toEqual(teamsMock);
  });

  it('should fetch team overview by teamId', async () => {
    const controller = new AbortController();
    const teamId = teamMock.id;

    mock.onGet(`/teams/${teamId}`).reply(200, teamMock);

    const result = await service.getTeamOverview(teamId, controller.signal);

    expect(result).toEqual(teamMock);
  });

  it('should fetch user data by userId', async () => {
    const controller = new AbortController();
    const userId = userMock.id;

    mock.onGet(`/users/${userId}`).reply(200, userMock);

    const result = await service.getUserData(userId, controller.signal);

    expect(result).toEqual(userMock);
  });
});
