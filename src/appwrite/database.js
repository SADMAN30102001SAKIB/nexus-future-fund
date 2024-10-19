import { database } from "./config";
import { ID } from "appwrite";

const db = {};

const collections = [
  {
    dbId: "6713e905002c82075006",
    id: "6713e91600145703eda0",
    name: "users",
  },
];

collections.forEach((col) => {
  db[col.name] = {
    create: (payload, permissions, id = ID.unique()) =>
      database.createDocument(col.dbId, col.id, id, payload, permissions),
    update: (id, payload, permissions) =>
      database.updateDocument(col.dbId, col.id, id, payload, permissions),
    delete: (id) => database.deleteDocument(col.dbId, col.id, id),
    list: (queries = []) => database.listDocuments(col.dbId, col.id, queries),
    get: (id) => database.getDocument(col.dbId, col.id, id),
  };
});

export default db;
