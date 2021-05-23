export const init = `\
CREATE TABLE IF NOT EXISTS commands (
    name text PRIMARY KEY NOT NULL,
    wasm blob NOT NULL,
    is_archived integer NOT NULL DEFAULT false,
    created_by text NOT NULL,
    created_on text NOT NULL DEFAULT CURRENT_TIMESTAMP
);`;

export const selectCommands = "SELECT * FROM commands;";

export const upsertCommand = `INSERT OR REPLACE INTO commands (name, created_by, wasm) VALUES (?, ?, ?)`;
