import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyDQqViH74PjMdkpCFyc3seMdSubchXdzDA",
    authDomain: "jogging-app-f3d16.firebaseapp.com",
    databaseURL: "https://jogging-app-f3d16.firebaseio.com",
    projectId: "jogging-app-f3d16",
    storageBucket: "jogging-app-f3d16.appspot.com",
    messagingSenderId: "982504879885",
    appId: "1:982504879885:web:ba58b51a223f70044a2244"
  };


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
