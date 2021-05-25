import {
  APIClientUser,
  APIClient,
  APIMessage,
  APINewMessage,
} from "../../api/discord";

declare function do_send(message: APINewMessage): void;

var client: APIClient;

export function on_login(id: string, username: string): void {
  client = new APIClient(new APIClientUser(id, username));
}

export function on_message(message: APIMessage): void {
  if (client) {
    console.log(`${client.user.username}`);
    do_send(new APINewMessage(client, {}, message.channel));
  }
}
