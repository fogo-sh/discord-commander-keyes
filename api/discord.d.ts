export declare class APIClientUser {
    id: string;
    username: string;
    constructor(id: string, username: string);
}
export declare class APIClient {
    user: APIClientUser;
    constructor(user: APIClientUser);
}
export declare class APIMessage {
    id: string;
    content: string;
    channel: string;
    constructor(id: string, content: string, channel: string);
}
export declare class APINewMessage {
    client: APIClient;
    data: Object;
    channel: string;
    constructor(client: APIClient, data: Object, channel: string);
}
//# sourceMappingURL=discord.d.ts.map