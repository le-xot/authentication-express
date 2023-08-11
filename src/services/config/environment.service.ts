import dotenv from 'dotenv';

dotenv.config({
    path: `${process.env.NODE_ENV}.env`,
});

const { APPLICATION_PORT, SECRET_TOKEN_ACCESS, SECRET_TOKEN_REFRESH, DEV_TOKEN, MONGO_URI } = process.env;

export const applicationPort = Number(APPLICATION_PORT ?? 3000);
export const secretTokenAccess = SECRET_TOKEN_ACCESS ?? '';
export const secretTokenRefresh = SECRET_TOKEN_REFRESH ?? '';
export const devToken = DEV_TOKEN;
export const mongoUri = MONGO_URI ?? 'mongodb://localhost:27017/authentification-express';
