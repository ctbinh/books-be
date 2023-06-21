import { config as configEnv } from 'dotenv';
import { cleanEnv, str, json } from 'envalid';
configEnv();

export const envs = cleanEnv(process.env, {
    NODE_ENV: str<Environment>({
        devDefault: 'development',
        choices: ['development', 'test', 'production', 'staging']
    }),
    CORS_WHITE_LIST: json<string[]>(),
    DATABASE_URL: str(),
    JWT_SECRET: str(),
    COOKIE_SECRET: str(),
    ELASTICSEARCH_URL: str(),
    ELASTICSEARCH_USERNAME: str(),
    ELASTICSEARCH_PASSWORD: str(),
});