import { Client, Databases, Account, Storage } from "appwrite";

const client = new Client();

client.setProject("6714d4f1001449eb409f");

const database = new Databases(client);
const account = new Account(client);
const storage = new Storage(client);

export { client, account, database, storage };
