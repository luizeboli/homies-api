declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      PORT: string;
      COOKIE_NAME: string;
      COOKIE_SECRET: string;
      DATABASE_URL: string;
    }
  }
}

export {};
