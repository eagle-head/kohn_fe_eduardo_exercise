/* eslint-disable no-console */
// src/api/index.ts
import axios, { AxiosInstance } from 'axios';

import { TeamOverview, Teams, UserData } from 'interfaces';

export class ApiService {
  private instance: AxiosInstance;

  constructor(private readonly baseURL: string, private readonly timeout = 10000) {
    this.instance = axios.create({
      baseURL: this.baseURL,
      timeout: this.timeout,
    });
  }

  private async get<T>(url: string, signal: AbortSignal): Promise<T | null> {
    try {
      const { data } = await this.instance.get<T>(url, { signal });
      return data;
    } catch (error) {
      return null;
    }
  }

  public async getTeams(signal: AbortSignal): Promise<Teams[]> {
    return this.get<Teams[]>('teams', signal);
  }

  public async getTeamOverview(teamId: string, signal: AbortSignal): Promise<TeamOverview> {
    return this.get<TeamOverview>(`teams/${teamId}`, signal);
  }

  public async getUserData(userId: string, signal: AbortSignal): Promise<UserData> {
    return this.get<UserData>(`users/${userId}`, signal);
  }
}

export const apiService = new ApiService(process.env.REACT_APP_API_BASE_URL);
