import { BaseCrudApiClient, BaseRecord } from '@/apis/base';
import { BDS } from '@/config/env';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';

export interface IYaahCrudApiClientOptions {
  resource: string;
}

if (typeof window !== 'undefined' && !window.__NEXTAUTH_SESSION__) {
  window.__NEXTAUTH_SESSION__ = getSession();
}

const customGetSession = async (): Promise<Session | null> => {
  if (typeof window === 'undefined') {
    const { auth } = await import('@/auth');
    const session = await auth();
    return session;
  }
  // if (window.__NEXTAUTH_SESSION__ && (await window.__NEXTAUTH_SESSION__)) return window.__NEXTAUTH_SESSION__;
  // window.__NEXTAUTH_SESSION__ = getSession();
  return window.__NEXTAUTH_SESSION__ || null;
};

export class YaahCrudApiClient<T extends BaseRecord = BaseRecord> extends BaseCrudApiClient<T> {
  constructor({ resource }: IYaahCrudApiClientOptions) {
    const baseUrl =
      typeof window === 'undefined'
        ? `${BDS.API_URL}/api/${resource}`
        : `${window.location.origin}/yaah-api/v1/${resource}`;
    super({ baseUrl });
    this.client.interceptors.request.use(async (config) => {
      const session = await customGetSession();
      if (session) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        config.headers['Authorization'] = `Bearer ${session.accessToken}`;
      }

      return config;
    });
  }
}
