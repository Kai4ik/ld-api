declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      USER_POOL_ID: string;
      USER_POOL_CLIENT_ID: string;
      DB_USER: string;
      DB_PASSWORD: string;
      DB_HOST: string;
      DB_DBNAME: string;
    }
  }
}

export {};
