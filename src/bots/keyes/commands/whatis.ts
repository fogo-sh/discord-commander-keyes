import { Client, Message } from "discord.js";
import { CommandInfo } from "../exec";
import { getCommandByName } from "../db";

export default async (client: Client, msg: Message, command: CommandInfo) => {
  if (command.name === undefined) {
    msg.reply("Please present a command name.");
    return;
  }

  try {
    const resolvedCommand = await getCommandByName(command.name);
    if (resolvedCommand) {
      const { createdBy, name, createdOn } = resolvedCommand;
      const user = await client.users.fetch(createdBy);
      msg.reply(`Command **${name}**
Created by: *${user.username}*
Created on: *${new Date(createdOn)}*`);
    } else {
      msg.reply(`${command.name}? That doesn't exist.`);
    }
  } catch (error) {
    msg.reply(`${error}`);
  }
};
