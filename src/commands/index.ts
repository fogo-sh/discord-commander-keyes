import { Message, Client } from "discord.js";
import { Command, Exec } from "../exec";
import register from "./register";
import run from "./run";
import unregister from "./unregister";

export default (client: Client, msg: Message, command: Command) => {
  switch (command.exec) {
    case Exec.Register:
      register(client, msg, command);
      break;
    case Exec.Run:
      run(client, msg, command);
      break;
    case Exec.Unregister:
      unregister(client, msg, command);
      break;
    case Exec.Error:
      msg.reply(command.message);
      break;
    default:
      break;
  }
};
