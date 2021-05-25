import { Client, Message } from "discord.js";
import { setup } from "./db";
import { ParsedCommand, CommandType, Help } from "./exec";
import commands from "./commands";
import machines from "./machines";

export default async (token: string) => {
  setup();

  const client = new Client();

  const parse = (client: Client, msg: Message): ParsedCommand => {
    if (!client.user) throw new Error("No user data");

    if (msg.mentions.has(client.user.id)) {
      const [, command, name] = msg.content.split(" ");
      const snowflake = msg.author.id;

      switch (command) {
        case CommandType.Commands:
          return {
            exec: CommandType.Commands,
          };
        case CommandType.CommandInfo:
          return {
            exec: CommandType.CommandInfo,
            name,
          };
        case CommandType.Register:
          const attachment = msg.attachments.first()?.attachment;
          if (!attachment) {
            return {
              exec: CommandType.Error,
              message: `Missing wasm attachment.`,
            };
          }
          if (msg.attachments.size > 1)
            return {
              exec: CommandType.Error,
              message: `Too many attachments. One command at a time please.`,
            };
          return {
            exec: CommandType.Register,
            snowflake,
            name,
            value: attachment,
          };
        case CommandType.Unregister:
          return { exec: CommandType.Unregister, snowflake, name };
        case CommandType.Help:
          const commands = `\`\`\`${Object.entries(Help)
            .map(
              ([key, value]: [string, string]) =>
                `${key.padEnd(12, " ")} ${value}`
            )
            .join("\n")}\`\`\``;
          return {
            exec: CommandType.Error,
            message: `Runs arbitrary WASM bots. Available commands are:\n${commands}`,
          };
        default:
          if (command) {
            return {
              exec: CommandType.Error,
              message: `${command} is not a valid command.`,
            };
          } else {
            return {
              exec: CommandType.Error,
              message: `Runs arbitrary WASM bots. Available commands are: _\n${Object.keys(
                Help
              ).join(", ")}_`,
            };
          }
      }
    }
    return { exec: CommandType.None };
  };

  client.on("ready", () => {
    console.log(`Logged in as ${client.user?.tag}!`);
  });

  client.on("message", async (msg) => {
    await commands(client, msg, parse(client, msg));
  });

  machines(client);

  client.login(token);
};
