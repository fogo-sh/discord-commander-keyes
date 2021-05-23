import { Client, Message } from "discord.js";
import { Register } from "../exec";
import { register } from "../db";
import { getCommandByName } from "../db";

export default async (client: Client, msg: Message, command: Register) => {
  if (command.name === undefined) {
    msg.reply("Please present a command name.");
    return;
  }
  
  getCommandByName(command.name).then((resolved) => {
    if(resolved && resolved.createdBy === msg.author.id) {
      msg.reply(`${command.name} is a registered command, and you didn't create it.`);
      return;
    }
  }).catch(() => console.log(`Registering new command ${command.name}`));


  register(command);
};
