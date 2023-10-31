// src/api/index.ts
import axios, { AxiosInstance } from 'axios';

import { Teams, TeamOverview, UserData } from 'interfaces';

export class ApiService {
  private instance: AxiosInstance;

  constructor(private readonly baseURL: string) {
    this.instance = axios.create({
      baseURL: this.baseURL,
    });
  }

  public async getTeams(): Promise<Teams[]> {
    const { data } = await this.instance.get<Teams[]>('teams');

    return data;
  }

  public async getTeamOverview(teamId: string): Promise<TeamOverview> {
    const { data } = await this.instance.get<TeamOverview>(`teams/${teamId}`);

    return data;
  }

  public async getUserData(userId: string): Promise<UserData> {
    const { data } = await this.instance.get<UserData>(`users/${userId}`);

    return data;
  }
}

export const apiService = new ApiService(process.env.REACT_APP_API_BASE_URL || '');
