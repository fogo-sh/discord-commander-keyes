import { BufferResolvable } from "discord.js";
import { Stream } from "stream";

export enum Exec {
  Register = "register",
  Unregister = "unregister",
  Error = "error",
  None = "none",
}

export type Snowflake = string;

export type Register = {
  exec: Exec.Register;
  snowflake: Snowflake;
  name: string;
  value: string | BufferResolvable | Stream;
};

export type Unregister = {
  exec: Exec.Unregister;
  snowflake: Snowflake;
  name: string;
};

type Error = {
  exec: Exec.Error;
  message: string;
};

type None = {
  exec: Exec.None;
};

export type Command = Register | Unregister | None | Error;
