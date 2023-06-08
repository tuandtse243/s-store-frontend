export const openDatabase = () => {
    const request = window.indexedDB.open('myDatabase', 1);
  
    request.onerror = (event) => {
      console.error('Failed to open database', event.target.error);
    };
  
    request.onsuccess = (event) => {
      const db = event.target.result;
      // Proceed with saving the Base64 string to the database
      // (e.g., call a function to save the data)
    };
  
    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      if (!db.objectStoreNames.contains('ImageStore')) {
        db.createObjectStore('ImageStore', { keyPath: 'id', autoIncrement: true });
      }
      // Define any necessary object store indexes or additional settings
    };
};

export const saveData = (db, base64String) => {
  const transaction = db.transaction(['ImageStore'], 'readwrite');
  const objectStore = transaction.objectStore('ImageStore');
  
  const data = { base64: base64String };
  const request = objectStore.add(data);

  request.onerror = (event) => {
    console.error('Failed to save data in IndexedDB', event.target.error);
  };

  request.onsuccess = (event) => {
    console.log('Data saved successfully in IndexedDB');
  };
};

export const retrieveData = (db) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['ImageStore'], 'readonly');
    const objectStore = transaction.objectStore('ImageStore');
    
    const request = objectStore.getAll();

    request.onerror = (event) => {
      reject(new Error('Failed to retrieve data from IndexedDB', event.target.error));
    };

    request.onsuccess = (event) => {
      const data = event.target.result;
      // Process the retrieved data as needed
      resolve(data);
    };
  })
};

export const deleteObjectStore = (db, objectStoreName) => {
  const request = db.transaction(objectStoreName, 'readwrite')
  .objectStore(objectStoreName).clear();

  request.onsuccess = ()=> {
    console.log(`Object Store "${objectStoreName}" emptied`);
  }

  request.onerror = (err)=> {
    console.error(`Error to empty Object Store: ${objectStoreName}`)
  }
  
};