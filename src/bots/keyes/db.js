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
exports.getCommandByName = exports.getCommands = exports.unregister = exports.register = exports.setup = void 0;
var sqlite3_1 = require("sqlite3");
var sql_1 = require("./sql");
var node_fetch_1 = require("node-fetch");
var db = new sqlite3_1.Database("./commands.db");
var setup = function () {
    db.serialize(function () {
        db.run(sql_1.init);
    });
};
exports.setup = setup;
var register = function (_a) {
    var name = _a.name, snowflake = _a.snowflake, value = _a.value;
    return __awaiter(void 0, void 0, void 0, function () {
        var res_1, buffer_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!(typeof value === "string")) return [3 /*break*/, 4];
                    return [4 /*yield*/, node_fetch_1["default"](value)];
                case 1:
                    res_1 = _b.sent();
                    return [4 /*yield*/, res_1.buffer()];
                case 2:
                    buffer_1 = _b.sent();
                    return [4 /*yield*/, new Promise(function (resolve, reject) {
                            if (res_1.headers.get("content-type") !== "application/wasm")
                                throw new Error("Invalid file type.");
                            if (!WebAssembly.validate(buffer_1))
                                reject(new Error("That's not a WASM file."));
                            res_1.body.on("error", reject);
                            db.serialize(function () {
                                db.run(sql_1.upsertCommand, [name, snowflake, buffer_1], function (err) {
                                    if (err) {
                                        reject(err);
                                    }
                                    resolve(true);
                                });
                            });
                        })];
                case 3:
                    _b.sent();
                    return [3 /*break*/, 5];
                case 4: throw new Error("That's not a URL.");
                case 5: return [2 /*return*/];
            }
        });
    });
};
exports.register = register;
var unregister = function (_a) {
    var name = _a.name;
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_b) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    return db.serialize(function () {
                        db.run(sql_1.deleteCommand, name, function (err) {
                            if (err) {
                                reject(err);
                            }
                            resolve(true);
                        });
                    });
                })];
        });
    });
};
exports.unregister = unregister;
var getCommands = function () {
    return new Promise(function (resolve, reject) {
        db.serialize(function () {
            var out = [];
            db.each(sql_1.selectCommands, function (err, row) {
                if (err)
                    reject(err);
                out.push({
                    name: row.name,
                    wasm: row.wasm,
                    isArchived: row.is_archived,
                    createdBy: row.created_by,
                    createdOn: row.created_on
                });
            }, function () { return resolve(out); });
        });
    });
};
exports.getCommands = getCommands;
var getCommandByName = function (name) {
    return new Promise(function (resolve, reject) {
        db.serialize(function () {
            db.get(sql_1.selectSingleCommand, name, function (err, row) {
                if (err)
                    reject(err);
                if (row) {
                    resolve({
                        name: row.name,
                        wasm: row.wasm,
                        isArchived: row.is_archived,
                        createdBy: row.created_by,
                        createdOn: row.created_on
                    });
                }
                else {
                    resolve(null);
                }
            });
        });
    });
};
exports.getCommandByName = getCommandByName;
