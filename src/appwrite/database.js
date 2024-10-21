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
  {
    dbId: "6714d56b002fd2733f6e",
    id: "6715f46d0023f2d1110d",
    name: "userNotifications",
  },
  {
    dbId: "6714d56b002fd2733f6e",
    id: "6716041a001225df4334",
    name: "pendingDeposit",
  },
  {
    dbId: "6714d56b002fd2733f6e",
    id: "671604be0030ad61589c",
    name: "pendingWithdraw",
  },
  {
    dbId: "6714d56b002fd2733f6e",
    id: "6716050a0019d74df9c1",
    name: "userDepositHistory",
  },
  {
    dbId: "6714d56b002fd2733f6e",
    id: "67160587000381cb44aa",
    name: "userWithdrawHistory",
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
