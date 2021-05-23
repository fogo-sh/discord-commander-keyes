import { Client, Message } from "discord.js";
import { Command } from "../exec";

export default (client: Client, msg: Message, command: Command) => {
  console.log(client, msg, command);
};
