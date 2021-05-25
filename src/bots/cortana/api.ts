import { Client, ClientUser, Message } from "discord.js";
import { APIMessage, APIClient, APIClientUser } from "../../../api/discord";

type API = {
  on_message: (message: APIMessage) => void;
  on_login: (client: APIClient) => void;
};

const toApi = (records: Record<string, WebAssembly.ExportValue>) => {
  // TODO: 🙃 holy fuck
  return records as any as API;
};

let machines: Map<string, API> = new Map();

export const addWasm = (
  command: string,
  listener: Record<string, WebAssembly.ExportValue>
) => machines.set(command, toApi(listener));

export const toWasm = () => ({
  index: {
    do_send: (...args: any[]) => console.log(args),
  },
});

type Serializable = Message | Client | ClientUser;
type Serialized = APIMessage | APIClient | APIClientUser;
const serialize = (source: Serializable): Serialized => {
  switch (source.constructor) {
    case Message:
      const message = <Message>source;
      return new APIMessage(message.id, message.content, message.channel.id);
    case Client:
      const client = <Client>source;
      if (!client.user) throw new Error("User isn't defined.");
      return new APIClient(<ClientUser>serialize(client.user));
    case ClientUser:
      const user = <ClientUser>source;
      return new APIClientUser(user.id, user.username);
    default:
      throw new Error("Invalid input.");
  }
};

export const bind = (client: Client) => {
  client.on("ready", () =>
    machines.forEach(({ on_login }) => on_login(<APIClient>serialize(client)))
  );

  client.on("message", async (msg) => {
    machines.forEach(({ on_message }) => {
      on_message(<APIMessage>serialize(msg));
    });
  });
};
