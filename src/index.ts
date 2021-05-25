import keyes from "./bots/keyes";
import cortana from "./bots/cortana";
import { config } from "dotenv";

config();

const { KEYES_TOKEN, CORTANA_TOKEN } = process.env;

if (!KEYES_TOKEN || !CORTANA_TOKEN)
  throw new Error("Missing environment variables.");

keyes(KEYES_TOKEN);
cortana(CORTANA_TOKEN);
