"use strict";
exports.__esModule = true;
exports.APINewMessage = exports.APIMessage = exports.APIClient = exports.APIClientUser = void 0;
var APIClientUser = /** @class */ (function () {
    function APIClientUser(id, username) {
        this.id = id;
        this.username = username;
    }
    return APIClientUser;
}());
exports.APIClientUser = APIClientUser;
var APIClient = /** @class */ (function () {
    function APIClient(user) {
        this.user = user;
    }
    return APIClient;
}());
exports.APIClient = APIClient;
var APIMessage = /** @class */ (function () {
    function APIMessage(id, content, channel) {
        this.id = id;
        this.content = content;
        this.channel = channel;
    }
    return APIMessage;
}());
exports.APIMessage = APIMessage;
var APINewMessage = /** @class */ (function () {
    function APINewMessage(client, data, channel) {
        this.client = client;
        this.data = data;
        this.channel = channel;
    }
    return APINewMessage;
}());
exports.APINewMessage = APINewMessage;
