import { Redis } from "ioredis";
import { env } from "../env";

//criando instancia do REDIS
export const redis = new Redis(env.REDIS_URL);
