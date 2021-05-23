export const init = `\
CREATE TABLE IF NOT EXISTS commands (
    name varchar PRIMARY KEY NOT NULL,
    is_archived boolean NOT NULL DEFAULT false,
    created_by string NOT NULL,
    created_on datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
);`;

export const selectCommands = "SELECT * FROM commands;";

export const upsertCommand = `INSERT OR REPLACE INTO commands (name, created_by) VALUES (?, ?)`;
