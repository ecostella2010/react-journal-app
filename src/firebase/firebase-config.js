// Es para la version de firebase 9.5.0
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

// Es para la version de firebase 7.14.0
// import firebase from 'firebase/app';
// import 'firebase/firestore';
// import 'firebase/auth';

//console.log ( process.env );

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};
  
  // if( process.env.NODE_ENV === 'test') {
  //   // testing
  //   // Initialize Firebase
  //   firebase.initializeApp(firebaseConfigTesting);

  // } else {
  //   // dev/prod
  //   // Initialize Firebase
  //   firebase.initializeApp(firebaseConfig);
  // }
  
  //console.log(firebaseConfig);

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

  export {
    db,
    googleAuthProvider,
    firebase

  }
