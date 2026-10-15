import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, set, push, remove } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const storage = getStorage(app);

// One-time migration from localStorage to Firebase
function migrateLocalToFirebase() {
  if (localStorage.getItem('harbin-migrated-to-firebase')) return;
  try {
    const phrases = JSON.parse(localStorage.getItem('harbin-phrases') || '[]');
    if (phrases.length > 0) phrases.forEach(p => push(ref(db, 'shared/phrases'), p));
    const expenses = JSON.parse(localStorage.getItem('harbin-expenses') || '[]');
    if (expenses.length > 0) expenses.forEach(e => push(ref(db, 'shared/expenses'), e));
    const checked = JSON.parse(localStorage.getItem('harbin-pack-v2') || '{}');
    if (Object.keys(checked).length > 0) set(ref(db, 'shared/packing/checked'), checked);
    const extras = JSON.parse(localStorage.getItem('harbin-extras') || '{}');
    if (Object.keys(extras).length > 0) set(ref(db, 'shared/packing/extras'), extras);
  } catch (e) {}
  localStorage.setItem('harbin-migrated-to-firebase', '1');
}
migrateLocalToFirebase();

export { db, ref, onValue, set, push, remove, storage, storageRef, uploadBytes, getDownloadURL };
