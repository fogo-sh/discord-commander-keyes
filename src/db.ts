import { Database } from "sqlite3";
import { Command, Register, Snowflake } from "./exec";
import { init, insertCommand, selectCommands } from "./sql";

const db = new Database("./commands.db");

type CommandDB = {
  id: number;
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
    db.run(insertCommand, [name, snowflake], (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Inserted 1 row.");
    });
  });
};

export const getCommands = (): Promise<CommandDB[]> =>
  new Promise((resolve) => {
    db.serialize(() => {
      const out: CommandDB[] = [];
      db.each(selectCommands, (err, row) => {
        if (err) {
          console.error(err);
          return;
        }
        //   out.push({
        //     id,
        //     name,
        //     isArchived: is_archived,
        //     createdBy: created_by,
        //     createdOn: created_on,
        //   });
        console.log(row);
      });
      resolve(out);
    });
  });
