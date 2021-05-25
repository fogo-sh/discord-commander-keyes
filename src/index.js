"use strict";
exports.__esModule = true;
var keyes_1 = require("./bots/keyes");
var cortana_1 = require("./bots/cortana");
var dotenv_1 = require("dotenv");
dotenv_1.config();
var _a = process.env, KEYES_TOKEN = _a.KEYES_TOKEN, CORTANA_TOKEN = _a.CORTANA_TOKEN;
if (!KEYES_TOKEN || !CORTANA_TOKEN)
    throw new Error("Missing environment variables.");
keyes_1["default"](KEYES_TOKEN);
cortana_1["default"](CORTANA_TOKEN);
