import { Session } from 'next-auth';

declare global {
  interface Window {
    __NEXTAUTH_SESSION__?: Promise<Session | null>;
  }
}
