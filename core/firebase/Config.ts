import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyDkVJ7-XoZomARCUnbeQfuETYAkTpuAwQU',
  authDomain: 'tink-edu.firebaseapp.com',
  databaseURL: 'https://tink-edu.firebaseio.com',
  projectId: 'tink-edu',
  storageBucket: 'tink-edu.firebasestorage.app',
  messagingSenderId: '260239644005',
  appId: 'com.gbv.tinkedu',
  measurementId: 'G-measurement-id',
};

const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
