import { Client, Databases, Account, Storage } from "appwrite";

const client = new Client();

client.setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

const database = new Databases(client);
const account = new Account(client);
const storage = new Storage(client);

export { client, account, database, storage };
