import { Client, Databases, Account } from "appwrite";

const client = new Client();

client.setProject("670fb3a1003cfb9fc469");

const database = new Databases(client);
const account = new Account(client);

export { client, account, database };
