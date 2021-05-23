import { Database } from "sqlite3";
import { Register, Snowflake } from "./exec";
import { init, upsertCommand, selectCommands } from "./sql";
import fetch from "node-fetch";

const db = new Database("./commands.db");

type CommandDB = {
  name: string;
  isArchived: false;
  wasm: Buffer;
  createdOn: Date;
  createdBy: Snowflake;
};

export const setup = () => {
  db.serialize(() => {
    db.run(init);
  });
};

export const register = async ({ name, snowflake, value }: Register) => {
  if (typeof value === "string") {
    const res = await fetch(value);
    const buffer = await res.buffer();
    await new Promise((resolve, reject) => {
      if (res.headers.get("content-type") !== "application/wasm")
        throw new Error("Invalid file type.");

      if (!WebAssembly.validate(buffer)) reject();

      res.body.on("error", reject);

      db.serialize(() => {
        db.run(upsertCommand, [name, snowflake, buffer], (err) => {
          if (err) {
            reject(err);
          }
          console.log("Updated 1 row.");
        });
      });
    });
  }
};

export const getCommands = (): Promise<CommandDB[]> =>
  new Promise((resolve, reject) => {
    db.serialize(() => {
      const out: CommandDB[] = [];
      db.each(
        selectCommands,
        (err, row) => {
          if (err) reject(err);
          out.push({
            name: row.name,
            wasm: row.wasm,
            isArchived: row.is_archived,
            createdBy: row.created_by,
            createdOn: row.created_on,
          });
        },
        () => resolve(out)
      );
    });
  });

export const getCommandByName = (name: string): Promise<CommandDB> =>
  new Promise((resolve, reject) => {
    db.serialize(() => {
      db.get(selectCommands, [name], (err, row) => {
        if (err) reject(err);
        resolve(row);
      });
    });
  });
