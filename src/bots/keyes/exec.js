"use strict";
var _a;
exports.__esModule = true;
exports.Help = exports.CommandType = void 0;
var CommandType;
(function (CommandType) {
    CommandType["Help"] = "help";
    CommandType["Commands"] = "commands";
    CommandType["CommandInfo"] = "whatis";
    CommandType["Register"] = "register";
    CommandType["Unregister"] = "unregister";
    CommandType["Error"] = "error";
    CommandType["None"] = "none";
})(CommandType = exports.CommandType || (exports.CommandType = {}));
exports.Help = (_a = {},
    _a[CommandType.Help] = "You're looking at it",
    _a[CommandType.Commands] = "List of running bots",
    _a[CommandType.CommandInfo] = "Prints more info of a command",
    _a[CommandType.Register] = "Registers a command. Usage: register [name] attach a wasm file.",
    _a[CommandType.Unregister] = "Unregisters a command. Usage: unregister [name]",
    _a);
