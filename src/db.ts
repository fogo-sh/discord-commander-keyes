import { Database } from "sqlite3";
import { Register, Snowflake } from "./exec";
import { init, upsertCommand, selectCommands } from "./sql";

const db = new Database("./commands.db");

type CommandDB = {
  name: string;
  isArchived: false;
  createdOn: Date;
  createdBy: Snowflake;
};

export const setup = () => {
  db.serialize(() => {
    db.run(init);
  });
};

export const register = ({ name, snowflake }: Register) => {
  db.serialize(() => {
    db.run(upsertCommand, [name, snowflake], (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Updated 1 row.");
    });
  });
};

export const getCommands = (): Promise<CommandDB[]> =>
  new Promise((resolve, reject) => {
    db.serialize(() => {
      const out: CommandDB[] = [];
      db.each(selectCommands, (err, row) => {
        if (err) reject(err);
        out.push({
          name: row.name,
          isArchived: row.is_archived,
          createdBy: row.created_by,
          createdOn: row.created_on,
        });
      });
      resolve(out);
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
