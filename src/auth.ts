import { decode } from 'jsonwebtoken';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { yaahApi } from './apis/yaah';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        code: {},
      },
      async authorize(credentials) {
        try {
          const res = await yaahApi.auth.verifyCode({
            body: { code: credentials.code as never },
          });

          return {
            token: res.data.access_token,
          } as never;
        } catch (error) {
          throw error;
        }
      },
      type: 'credentials',
      name: 'code',
      id: 'code',
    }),
  ],
  pages: {
    signIn: '/login',
    newUser: '/register',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign-in
      if (account && user) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const accessToken: string = user.token;
        token.accessToken = accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      try {
        const { accessToken } = token;

        if (!accessToken) {
          throw new Error('Invalid session');
        }

        const { exp } = decode(accessToken as string) as { exp: number };

        if (exp * 1000 < Date.now()) {
          throw new Error('Session expired');
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        session.accessToken = accessToken;

        return session;
      } catch (error) {
        await signOut();
        throw error;
      }
    },
  },
  debug: process.env.NODE_ENV === 'development',
});
