import { BufferResolvable } from "discord.js";
import { Stream } from "stream";

export enum CommandType {
  Help = "help",
  Commands = "commands",
  CommandInfo = "whatis",
  Register = "register",
  Unregister = "unregister",
  Error = "error",
  None = "none",
}

export const Help = {
  [CommandType.Help]: "You're looking at it",
  [CommandType.Commands]: "List of running bots",
  [CommandType.CommandInfo]: "Prints more info of a command",
  [CommandType.Register]:
    "Registers a command. Usage: register [name] attach a wasm file.",
  [CommandType.Unregister]: "Unregisters a command. Usage: unregister [name]",
};

export type Snowflake = string;

export type Help = {
  exec: CommandType.Help;
};

export type Commands = {
  exec: CommandType.Commands;
};

export type CommandInfo = {
  exec: CommandType.CommandInfo;
  name: string;
};

export type Register = {
  exec: CommandType.Register;
  snowflake: Snowflake;
  name: string;
  value: string | BufferResolvable | Stream;
};

export type Unregister = {
  exec: CommandType.Unregister;
  snowflake: Snowflake;
  name: string;
};

type Error = {
  exec: CommandType.Error;
  message: string;
};

type None = {
  exec: CommandType.None;
};

export type ParsedCommand =
  | Register
  | Unregister
  | Commands
  | CommandInfo
  | None
  | Error;
