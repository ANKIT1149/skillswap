import { Client, Account, Storage, TablesDB } from 'appwrite';

export const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string)
  
const account = new Account(client);
const storage = new Storage(client);
const database = new TablesDB(client)

export const serverHeaders = {
  'X-Appwrite-Api-Key': process.env.API_KEY!,
};

export {account, storage, database}
