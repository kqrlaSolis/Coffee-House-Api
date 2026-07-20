import dotenv from "dotenv";
import { getConfig } from "../utils/config";
dotenv.config();

export const secretKey = getConfig("APP_SECRET");
