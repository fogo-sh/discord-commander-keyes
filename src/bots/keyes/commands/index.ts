import { Message, Client } from "discord.js";
import { ParsedCommand, CommandType } from "../exec";
import register from "./register";
import whatis from "./whatis";
import commands from "./commands";
import unregister from "./unregister";

export default async (client: Client, msg: Message, command: ParsedCommand) => {
  switch (command.exec) {
    case CommandType.Commands:
      await commands(client, msg, command);
      break;
    case CommandType.CommandInfo:
      await whatis(client, msg, command);
      break;
    case CommandType.Register:
      await register(client, msg, command);
      break;
    case CommandType.Unregister:
      await unregister(client, msg, command);
      break;
    case CommandType.Error:
      msg.reply(command.message);
      break;
    default:
      break;
  }
};
