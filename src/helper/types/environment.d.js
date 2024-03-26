export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
        DB_CONNECT_STRING: string;
        DB_NAME_QUIZRR_APP: string;
        DB_NAME_QUIZRR_STAGING: string;
        ENV: 'staging' | 'dev' | 'prod';
        BROWSER: 'chrome' | 'firefox' | 'webkit';
    }
  }
}