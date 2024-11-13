import { openDB } from 'idb';

const dbPromise = openDB('journeylog', 1, {
  upgrade(db) {
    db.createObjectStore('entries', { keyPath: 'id', autoIncrement: true });
  },
});

export const saveEntryOffline = async (entry: unknown) => {
  const db = await dbPromise;
  await db.put('entries', entry);
};

export const getOfflineEntries = async () => {
  const db = await dbPromise;
  return await db.getAll('entries');
};