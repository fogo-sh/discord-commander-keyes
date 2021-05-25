"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var discord_js_1 = require("discord.js");
var db_1 = require("./db");
var exec_1 = require("./exec");
var commands_1 = require("./commands");
var machines_1 = require("./machines");
exports["default"] = (function (token) { return __awaiter(void 0, void 0, void 0, function () {
    var client, parse;
    return __generator(this, function (_a) {
        db_1.setup();
        client = new discord_js_1.Client();
        parse = function (client, msg) {
            var _a;
            if (!client.user)
                throw new Error("No user data");
            if (msg.mentions.has(client.user.id)) {
                var _b = msg.content.split(" "), command = _b[1], name_1 = _b[2];
                var snowflake = msg.author.id;
                switch (command) {
                    case exec_1.CommandType.Commands:
                        return {
                            exec: exec_1.CommandType.Commands
                        };
                    case exec_1.CommandType.CommandInfo:
                        return {
                            exec: exec_1.CommandType.CommandInfo,
                            name: name_1
                        };
                    case exec_1.CommandType.Register:
                        var attachment = (_a = msg.attachments.first()) === null || _a === void 0 ? void 0 : _a.attachment;
                        if (!attachment) {
                            return {
                                exec: exec_1.CommandType.Error,
                                message: "Missing wasm attachment."
                            };
                        }
                        if (msg.attachments.size > 1)
                            return {
                                exec: exec_1.CommandType.Error,
                                message: "Too many attachments. One command at a time please."
                            };
                        return {
                            exec: exec_1.CommandType.Register,
                            snowflake: snowflake,
                            name: name_1,
                            value: attachment
                        };
                    case exec_1.CommandType.Unregister:
                        return { exec: exec_1.CommandType.Unregister, snowflake: snowflake, name: name_1 };
                    case exec_1.CommandType.Help:
                        var commands_2 = "```" + Object.entries(exec_1.Help)
                            .map(function (_a) {
                            var key = _a[0], value = _a[1];
                            return key.padEnd(12, " ") + " " + value;
                        })
                            .join("\n") + "```";
                        return {
                            exec: exec_1.CommandType.Error,
                            message: "Runs arbitrary WASM bots. Available commands are:\n" + commands_2
                        };
                    default:
                        if (command) {
                            return {
                                exec: exec_1.CommandType.Error,
                                message: command + " is not a valid command."
                            };
                        }
                        else {
                            return {
                                exec: exec_1.CommandType.Error,
                                message: "Runs arbitrary WASM bots. Available commands are: _\n" + Object.keys(exec_1.Help).join(", ") + "_"
                            };
                        }
                }
            }
            return { exec: exec_1.CommandType.None };
        };
        client.on("ready", function () {
            var _a;
            console.log("Logged in as " + ((_a = client.user) === null || _a === void 0 ? void 0 : _a.tag) + "!");
        });
        client.on("message", function (msg) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, commands_1["default"](client, msg, parse(client, msg))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        machines_1["default"](client);
        client.login(token);
        return [2 /*return*/];
    });
}); });
