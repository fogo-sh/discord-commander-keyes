"use strict";
exports.__esModule = true;
exports.deleteCommand = exports.upsertCommand = exports.selectSingleCommand = exports.selectCommands = exports.init = void 0;
exports.init = "CREATE TABLE IF NOT EXISTS commands (\n    name text PRIMARY KEY NOT NULL,\n    wasm blob NOT NULL,\n    is_archived integer NOT NULL DEFAULT false,\n    created_by text NOT NULL,\n    created_on text NOT NULL DEFAULT CURRENT_TIMESTAMP\n);";
exports.selectCommands = "SELECT * FROM commands;";
exports.selectSingleCommand = "SELECT * FROM commands WHERE name = ?;";
exports.upsertCommand = "INSERT OR REPLACE INTO commands (name, created_by, wasm) VALUES (?, ?, ?)";
exports.deleteCommand = "DELETE FROM commands WHERE name IS ?";
