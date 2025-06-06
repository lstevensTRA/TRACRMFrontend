import axios, { AxiosInstance, AxiosError } from 'axios';
import { dataverseConfig } from '../config/msal';

export class DataverseError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string,
    public details?: any
  ) {
    super(message);
    this.name = 'DataverseError';
  }
}

export class DataverseService {
  private client: AxiosInstance;

  constructor(accessToken: string) {
    this.client = axios.create({
      baseURL: dataverseConfig.baseUrl,
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'OData-MaxVersion': '4.0',
        'OData-Version': '4.0',
        'Accept': 'application/json'
      }
    });

    this.client.interceptors.response.use(
      response => response,
      this.handleError
    );
  }

  private handleError = (error: AxiosError): Promise<never> => {
    if (error.response) {
      const { status, data } = error.response;
      throw new DataverseError(
        'Dataverse API Error',
        status,
        data.error?.code,
        data.error?.message
      );
    }
    throw new DataverseError('Network Error');
  };

  async get<T>(entity: string, id?: string, query?: Record<string, string>) {
    const url = id ? `${entity}(${id})` : entity;
    const response = await this.client.get<T>(url, { params: query });
    return response.data;
  }

  async create<T>(entity: string, data: Partial<T>) {
    const response = await this.client.post<T>(entity, data);
    return response.data;
  }

  async update<T>(entity: string, id: string, data: Partial<T>) {
    const response = await this.client.patch<T>(`${entity}(${id})`, data);
    return response.data;
  }

  async delete(entity: string, id: string) {
    await this.client.delete(`${entity}(${id})`);
  }

  async query<T>(entity: string, query: Record<string, string>) {
    const response = await this.client.get<T>(entity, { params: query });
    return response.data;
  }
} 