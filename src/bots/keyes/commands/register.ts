import { Client, Message } from "discord.js";
import { Register } from "../exec";
import { register } from "../db";
import { getCommandByName } from "../db";
import machines from "../machines";

export default async (client: Client, msg: Message, command: Register) => {
  if (command.name === undefined) {
    msg.reply("Please present a command name.");
    return;
  }

  let updateMessage;
  try {
    const resolvedCommand = await getCommandByName(command.name);
    if (resolvedCommand && resolvedCommand.createdBy !== msg.author.id) {
      msg.reply(
        `${command.name} is a registered command, and you didn't create it.`
      );
      return;
    }
  } catch {
    updateMessage = msg.reply(`Updating ${command.name}...`);
  }

  try {
    await register(command);
    machines(client);
    msg.reply(`${command.name} is registered 👍`);
  } catch (error) {
    msg.reply(`${error}`);
  }

  if (updateMessage) (await updateMessage).delete();
};
