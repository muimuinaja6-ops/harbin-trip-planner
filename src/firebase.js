import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, set, push, remove } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBEDQrVf-Mo0HB9bFypjqkqtzgwtrN4WW0",
  authDomain: "harbin-trip-5fe79.firebaseapp.com",
  databaseURL: "https://harbin-trip-5fe79-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "harbin-trip-5fe79",
  storageBucket: "harbin-trip-5fe79.firebasestorage.app",
  messagingSenderId: "457386383113",
  appId: "1:457386383113:web:ea6890dc0b01daf52d65d8",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// One-time migration: push localStorage data to Firebase (runs once per device)
function migrateLocalToFirebase() {
  if (localStorage.getItem('harbin-migrated-to-firebase')) return;
  try {
    // Migrate custom phrases
    const phrases = JSON.parse(localStorage.getItem('harbin-phrases') || '[]');
    if (phrases.length > 0) {
      phrases.forEach(p => push(ref(db, 'shared/phrases'), p));
    }
    // Migrate expenses
    const expenses = JSON.parse(localStorage.getItem('harbin-expenses') || '[]');
    if (expenses.length > 0) {
      expenses.forEach(e => push(ref(db, 'shared/expenses'), e));
    }
    // Migrate packing checklist
    const checked = JSON.parse(localStorage.getItem('harbin-pack-v2') || '{}');
    if (Object.keys(checked).length > 0) {
      set(ref(db, 'shared/packing/checked'), checked);
    }
    const extras = JSON.parse(localStorage.getItem('harbin-extras') || '{}');
    if (Object.keys(extras).length > 0) {
      set(ref(db, 'shared/packing/extras'), extras);
    }
  } catch (e) { /* ignore parse errors */ }
  localStorage.setItem('harbin-migrated-to-firebase', '1');
}
migrateLocalToFirebase();

export { db, ref, onValue, set, push, remove };
