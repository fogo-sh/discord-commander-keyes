import { Client } from "discord.js";
import { bind } from "./api";
export * from "./api";

export default async (token: string) => {
  const client = new Client();
  bind(client);
  client.login(token);
};
