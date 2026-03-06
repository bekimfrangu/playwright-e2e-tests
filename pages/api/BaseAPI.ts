import { APIRequestContext, request } from '@playwright/test';

export class BaseAPI {
  protected baseURL: string;
  protected context!: APIRequestContext;
  protected timeout: number = 30000;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async initialize() {
    this.context = await request.newContext({
      baseURL: this.baseURL,
    });
  }

  async teardown() {
    await this.context.dispose();
  }

  async get(endpoint: string, options: any = {}) {
    const response = await this.context.get(endpoint, {
      timeout: this.timeout,
      ...options,
    });

    if (!response.ok()) {
      throw new Error(`GET ${endpoint} failed with status ${response.status()}`);
    }

    return await response.json();
  }

  async post(endpoint: string, data: any, options: any = {}) {
    const response = await this.context.post(endpoint, {
      data,
      timeout: this.timeout,
      ...options,
    });

    if (!response.ok()) {
      throw new Error(`POST ${endpoint} failed with status ${response.status()}`);
    }

    return await response.json();
  }

  async put(endpoint: string, data: any, options: any = {}) {
    const response = await this.context.put(endpoint, {
      data,
      timeout: this.timeout,
      ...options,
    });

    if (!response.ok()) {
      throw new Error(`PUT ${endpoint} failed with status ${response.status()}`);
    }

    return await response.json();
  }

  async patch(endpoint: string, data: any, options: any = {}) {
    const response = await this.context.patch(endpoint, {
      data,
      timeout: this.timeout,
      ...options,
    });

    if (!response.ok()) {
      throw new Error(`PATCH ${endpoint} failed with status ${response.status()}`);
    }

    return await response.json();
  }

  async delete(endpoint: string, options: any = {}) {
    const response = await this.context.delete(endpoint, {
      timeout: this.timeout,
      ...options,
    });

    if (!response.ok()) {
      throw new Error(`DELETE ${endpoint} failed with status ${response.status()}`);
    }

    return {
      status: response.status(),
      statusText: response.statusText(),
    };
  }

  async head(endpoint: string, options: any = {}) {
    const response = await this.context.head(endpoint, {
      timeout: this.timeout,
      ...options,
    });

    return response.ok();
  }
}
