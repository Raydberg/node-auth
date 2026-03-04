import 'dotenv/config';
import { get } from 'env-var';


export const envs = {

  PORT: get('PORT').required().asPortNumber(),
  MONGO_URL: get("MONGO_URL").required().asString(),
  MONGO_DB_NAME: get("MONGO_DB_NAME").required().asString(),
  JWT_SEED: get("JWT_SEED").required().asString(),
  MAILER_SERVICE: get("MAILER_SERVICE").required().asString(),
  MAILER_EMAIL: get("MAILER_EMAIL").required().asString(),
  MAILER_SECRET_KEY: get("MAILER_SECRET_KEY").required().asString(),
  WEBSERVICE_URL: get("WEBSERVICE_URL").required().asString(),
  CLOUDFLARE_ACCESS_KEY: get("CLOUDFLARE_ACCESS_KEY").required().asString(),
  CLOUDFLARE_SECRET_KEY: get("CLOUDFLARE_SECRET_KEY").required().asString(),
  CLOUDFLARE_URL: get("CLOUDFLARE_URL").required().asString(),
  R2_BUCKET_NAME: get("R2_BUCKET_NAME").required().asString()

}