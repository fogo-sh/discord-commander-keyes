import { Message, Client } from "discord.js";
import { Command, Exec } from "../exec";
import register from "./register";
import unregister from "./unregister";

export default async (client: Client, msg: Message, command: Command) => {
  switch (command.exec) {
    case Exec.Register:
      await register(client, msg, command);
      break;
    case Exec.Unregister:
      await unregister(client, msg, command);
      break;
    case Exec.Error:
      msg.reply(command.message);
      break;
    default:
      break;
  }
};
