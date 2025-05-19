import { Client, Databases, Account, Storage } from "appwrite";

const client = new Client();

const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;

if (!projectId) {
  throw new Error("Missing Appwrite project ID in environment variables.");
}

client.setProject(projectId);

const database = new Databases(client);
const account = new Account(client);
const storage = new Storage(client);

export { client, account, database, storage };
