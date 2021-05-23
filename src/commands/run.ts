import { Client, Message } from "discord.js";
import { Command } from "../exec";
import { getCommands } from "../db";

export default (client: Client, msg: Message, command: Command) => {
  (async () => console.log(await getCommands()))();
};
