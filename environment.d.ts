declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      USER_POOL_ID: string;
      USER_POOL_CLIENT_ID: string;
    }
  }
}

export {};
