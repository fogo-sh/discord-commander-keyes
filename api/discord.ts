export class APIClientUser {
  id: string;
  username: string;

  constructor(id: string, username: string) {
    this.id = id;
    this.username = username;
  }
}

export class APIClient {
  user: APIClientUser;

  constructor(user: APIClientUser) {
    this.user = user;
  }
}

export class APIMessage {
  id: string;
  content: string;
  channel: string;

  constructor(id: string, content: string, channel: string) {
    this.id = id;
    this.content = content;
    this.channel = channel;
  }
}

export class APINewMessage {
  client: APIClient;
  data: Object;
  channel: string;

  constructor(client: APIClient, data: Object, channel: string) {
    this.client = client;
    this.data = data;
    this.channel = channel;
  }
}
