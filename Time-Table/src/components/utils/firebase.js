import firebase from 'firebase';
var firebaseConfig = {
    apiKey: "AIzaSyDzSgSLCzdyfwQtKlT4hPMgUEyAok-Rqzw",
    authDomain: "time-table-7c1d7.firebaseapp.com",
    databaseURL: "https://time-table-7c1d7.firebaseio.com",
    projectId: "time-table-7c1d7",
    storageBucket: "time-table-7c1d7.appspot.com",
    messagingSenderId: "671031154846",
    appId: "1:671031154846:web:517eee2002dc4a3eb7438f",
    measurementId: "G-CWZD3K3XQW"
  };
  // Initialize Firebase
const Firebase =  firebase.initializeApp(firebaseConfig);
export default Firebase;