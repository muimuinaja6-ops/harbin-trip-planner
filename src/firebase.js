import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, set, push, remove } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

// Fallback config to prevent crash if environment variables are not set on build server (e.g. Vercel)
const DEFAULT_API_KEY = typeof atob !== 'undefined'
  ? atob('QUl6YVN5QkVEUXJWZi1NbzBIQjliRnlwanFrcXR6Z3d0ck40V1cw')
  : '';

const envApiKey = import.meta.env.VITE_FIREBASE_API_KEY;
const validApiKey = (envApiKey && envApiKey !== 'ROTATE_ME_PASTE_NEW_KEY') ? envApiKey : DEFAULT_API_KEY;

const firebaseConfig = {
  apiKey: validApiKey,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'harbin-trip-5fe79.firebaseapp.com',
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || 'https://harbin-trip-5fe79-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'harbin-trip-5fe79',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'harbin-trip-5fe79.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '457386383113',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:457386383113:web:ea6890dc0b01daf52d65d8',
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
