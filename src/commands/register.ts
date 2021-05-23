import { Client, Message } from "discord.js";
import { Command, Register } from "../exec";
import { register } from "../db";

export default (client: Client, msg: Message, command: Register) => {
  if (command.name === undefined) {
    msg.reply("Invalid command name.");
    return;
  }
  register(command);
};
