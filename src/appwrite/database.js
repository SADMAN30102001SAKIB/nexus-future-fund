import { database } from "./config";
import { ID } from "appwrite";

const db = {};

const collections = [
  {
    dbId: "6714d56b002fd2733f6e",
    id: "6714d57400006633f97e",
    name: "users",
  },
  {
    dbId: "6714d56b002fd2733f6e",
    id: "67153f8b0010d4ff26d1",
    name: "notifications",
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
