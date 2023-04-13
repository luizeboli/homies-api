declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      PORT: string;
      DATABASE_URL: string;
      CORS_ORIGIN: string;
      CLERK_JWT_PUBLIC_KEY: string;
      CLERK_FRONTEND_API: string;
    }
  }
}

export {};
