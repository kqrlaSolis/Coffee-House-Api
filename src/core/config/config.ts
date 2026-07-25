import dotenv from "dotenv";

dotenv.config();

const getConfig = (key: string): string => {
    const value = process.env[key];

    if (value === undefined) {
        throw new Error(`Missing environment variable: ${key}`);
    }
    return value;
};

export const secretKey = getConfig("APP_SECRET");
