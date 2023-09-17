import { initializeApp } from 'firebase/app';
import firebase from 'firebase/compat/app';
import { getDatabase } from 'firebase/database';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCXhgfWzlY9-NnIrOLmnIREfGINrP8fw-A',
  authDomain: 'projectapp-92f72.firebaseapp.com',
  projectId: 'projectapp-92f72',
  storageBucket: 'projectapp-92f72.appspot.com',
  messagingSenderId: '604883356702',
  appId: '1:604883356702:web:fb8d60f68de098937ab20f',
  measurementId: 'G-RNLQK40QG2',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase();
export { firebaseApp as firebase, db };
