export const init = `\
CREATE TABLE IF NOT EXISTS commands (
    id SERIAL PRIMARY KEY,
    name varchar NOT NULL,
    is_archived boolean NOT NULL DEFAULT false,
    created_by string NOT NULL,
    created_on datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
);`;

export const selectCommands = "SELECT * FROM commands;";

export const insertCommand = `INSERT INTO commands (name, created_by) VALUES (?, ?)`;
