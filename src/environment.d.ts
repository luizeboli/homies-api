declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      PORT: string;
      DATABASE_URL: string;
      FRONTEND_URL: string;
      CLERK_SECRET_KEY: string;
      CLERK_JWT_PUBLIC_KEY: string;
      CLERK_FRONTEND_API: string;
      SVIX_SECRET_KEY: string;
    }
  }

  /**
   * Extend Clerk's JWT session claims with custom fields.
   */
  interface CustomJwtSessionClaims {
    userId: string;
    username: string;
  }
}

export {};
