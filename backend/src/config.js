import 'dotenv/config';

export const PORT = process.env.PORT || 8000;
export const DB_HOST = process.env.DB_HOST || 'localhost';
export const DB_USER = process.env.DB_USER || 'user';
export const DB_PASSWORD = process.env.DB_PASSWORD || 'password';
export const DB_NAME = process.env.DB_NAME || 'myDbName';
export const DB_PORT = process.env.DB_PORT || 8888;

export const FRONT_URL = process.env.FRONT_URL || 'https://example-url.com';
export const SECRET_TOKEN = process.env.SECRET_TOKEN || 'test';
