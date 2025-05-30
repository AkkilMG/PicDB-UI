import dotenv from 'dotenv';

dotenv.config();

if (!process.env.PORT || !process.env.MONGODB_URI || !process.env.JWT_SECRET || !process.env.TOKEN_AUTH_IDENTITY) {
    console.warn('Some environment variables are missing. Ensure .env.local or .env file is properly configured.');
}

export const MONGODB_URI = process.env.MONGODB_URI
export const MONGODB_DB = process.env.MONGODB_DB || 'picdb'
export const JWT_SECRET = process.env.JWT_SECRET
export const TOKEN_AUTH_IDENTITY = process.env.NEXT_PUBLIC_TOKEN_AUTH_IDENTITY
// export const NODE_ENV = process.env.NODE_NEV || 'development',
