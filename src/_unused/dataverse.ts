import { dataverseConfig } from '../config/msal';

interface DataverseResponse<T> {
  value: T[];
}

export class DataverseService {
  private baseUrl: string;
  private token: string;

  constructor(token: string) {
    this.baseUrl = dataverseConfig.baseUrl;
    this.token = token;
  }

  private async fetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`Dataverse API error: ${response.statusText}`);
    }

    const data = await response.json() as T;
    return data;
  }

  async get<T>(entity: string, id?: string, params?: Record<string, string>): Promise<T[]> {
    const endpoint = id ? `${entity}(${id})` : entity;
    const queryString = params ? '?' + new URLSearchParams(params).toString() : '';
    const response = await this.fetch<DataverseResponse<T>>(`${endpoint}${queryString}`);
    return response.value;
  }

  async create<T>(entity: string, data: Partial<T>): Promise<T> {
    return this.fetch<T>(entity, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async update<T>(entity: string, id: string, data: Partial<T>): Promise<void> {
    await this.fetch(`${entity}(${id})`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async delete(entity: string, id: string): Promise<void> {
    await this.fetch(`${entity}(${id})`, {
      method: 'DELETE',
    });
  }

  async query<T>(entity: string, query: Record<string, string>) {
    const response = await this.fetch<DataverseResponse<T>>(entity, {
      method: 'GET',
      params: query,
    });
    return response.value;
  }
} 