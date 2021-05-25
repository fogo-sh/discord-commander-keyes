import { Client, Message } from "discord.js";
import { Commands } from "../exec";
import { getCommands } from "../db";

export default async (client: Client, msg: Message, command: Commands) => {
  try {
    const resolvedCommand = await getCommands();
    msg.reply(
      `Registered commands\n${resolvedCommand
        .map(({ name }) => `**${name}**`)
        .join(", ")}`
    );
  } catch (error) {
    msg.reply(`${error}`);
  }
};
