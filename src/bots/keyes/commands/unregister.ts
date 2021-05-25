import { Client, Message } from "discord.js";
import { Unregister } from "../exec";
import { unregister } from "../db";
import { getCommandByName } from "../db";

export default async (_: Client, msg: Message, command: Unregister) => {
  if (command.name === undefined) {
    msg.reply("Please present a command name.");
    return;
  }

  try {
    const resolvedCommand = await getCommandByName(command.name);
    if (resolvedCommand?.createdBy !== msg.author.id) {
      msg.reply(`You do not own ${command.name}.`);
      return;
    }
  } catch {
    console.log(`Unregistering command ${command.name}`);
  }

  try {
    await unregister(command);
  } catch (error) {
    msg.reply(`${error}`);
  }

  msg.reply(`${command.name} is gone 👍`);
};
