import { Client, Account, Storage, TablesDB } from 'appwrite';

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string)
  
const account = new Account(client);
const storage = new Storage(client);
const database = new TablesDB(client)

export {account, storage, database}
