import { Client, Message } from "discord.js";
import { config } from "dotenv";
import { setup } from "./db";
import { Command, Exec } from "./exec";
import commands from "./commands";

setup();
config();

const client = new Client();

const { KEYES_TOKEN } = process.env;

const parse = (client: Client, msg: Message): Command => {
  if (!client.user) throw new Error("No user data");

  if (msg.mentions.has(client.user.id)) {
    const [, command, name] = msg.content.split(" ");
    const snowflake = msg.author.id;

    switch (command) {
      case Exec.Register:
        const attachment = msg.attachments.first()?.attachment;
        if (!attachment) {
          return {
            exec: Exec.Error,
            message: `Missing wasm attachment.`,
          };
        }
        return { exec: Exec.Register, snowflake, name, value: attachment };
      case Exec.Unregister:
        return { exec: Exec.Unregister, snowflake, name };
      default:
        return {
          exec: Exec.Error,
          message: `${command} is not a valid command.`,
        };
    }
  }
  return { exec: Exec.None };
};

client.on("ready", () => {
  console.log(`Logged in as ${client.user?.tag}!`);
});

client.on("message", async (msg) => {
  await commands(client, msg, parse(client, msg));
});

client.login(KEYES_TOKEN);
