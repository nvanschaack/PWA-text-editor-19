import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
// when i start to type text in the text editor, this is the functionality that allows me to see the newest text i write/as i write text, it's automatically updating
export const putDb = async (content) => {
  const jateDb = await openDB('jate', 1);
  const transaction = jateDb.transaction('jate', 'readwrite');
  const store = transaction.objectStore('jate');
  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log('Data saved to the indexedDB', result)
}


// TODO: Add logic for a method that gets all the content from the database
// when i refresh the page, the gets all of the information that is stored in the indexedDB
export const getDb = async () => {
  const jateDb = await openDB('jate', 1);
  const transaction = jateDb.transaction('jate', 'readonly');
  const store = transaction.objectStore('jate');
  const request = store.get(1);
  const result = await request;
  console.log('result.value', result)
};

initdb();
