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
  // const firebaseConfig = {
  //     apiKey: "AIzaSyDgCQKMya50STSkqMo325j_IdEBiZN3ET8",
  //     authDomain: "react-app-cursos-c98ec.firebaseapp.com",
  //     projectId: "react-app-cursos-c98ec",
  //     storageBucket: "react-app-cursos-c98ec.appspot.com",
  //     messagingSenderId: "418644070048",
  //     appId: "1:418644070048:web:6ddd2afa7de4d7dab7c3c5"
  //   };
  //  console.log('process.env:');
  //  console.log(process.env);

  // Your web app's Firebase configuration
  // const firebaseConfigTesting = {
  //     apiKey: "AIzaSyAVxUxhxqHJQMlp7YEnntU8O9b9Kaw3lsE",
  //     authDomain: "test-49980.firebaseapp.com",
  //     databaseURL: "https://test-49980.firebaseio.com",
  //     projectId: "test-49980",
  //     storageBucket: "test-49980.appspot.com",
  //     messagingSenderId: "787988976002",
  //     appId: "1:787988976002:web:fba32b27a9b7db46757f9b"
  //   };


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
