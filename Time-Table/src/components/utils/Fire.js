import firebase from 'firebase';
let chat;
class Fire {
  constructor() {
    // this.init();
    // this.observeAuth();
    this.getChatId();
  }

  getChatId = () => {
      let id;
      firebase.auth().onAuthStateChanged(user => {
          if(user){
            firebase.database().ref('users/' + firebase.auth().currentUser.uid).once('value', data => {
                id = data.toJSON().chatid;
            }).then(()=> {
                chat = id;
                console.log(chat);
                return id;
            })
          }
      });
  }

  init = () => {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyDzSgSLCzdyfwQtKlT4hPMgUEyAok-Rqzw",
    authDomain: "time-table-7c1d7.firebaseapp.com",
    databaseURL: "https://time-table-7c1d7.firebaseio.com",
    projectId: "time-table-7c1d7",
    storageBucket: "time-table-7c1d7.appspot.com",
    messagingSenderId: "671031154846",
    appId: "1:671031154846:web:517eee2002dc4a3eb7438f",
    measurementId: "G-CWZD3K3XQW"
      });
    }
  };

  observeAuth = () =>
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

  onAuthStateChanged = user => {
    if (!user) {
      try {
        firebase.auth().signInAnonymously();
      } catch ({ message }) {
        alert(message);
      }
    }
  };

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  get ref() {
    return firebase.database().ref('messages/' + chat);
  }

  parse = snapshot => {
    const { timestamp: numberStamp, text, user } = snapshot.val();
    const { key: _id } = snapshot;
    const timestamp = new Date(numberStamp);
    const message = {
      _id,
      timestamp,
      text,
      user,
    };
    return message;
  };

  on = callback =>{
    firebase.auth().onAuthStateChanged(user => {
        if(user){
          firebase.database().ref('users/' + firebase.auth().currentUser.uid).once('value', data => {
              id = data.toJSON().chatid;
          }).then(()=> {
              chat = id;
              firebase.database().ref('messages/' + chat)
                .limitToLast(1000)
                .on('child_added', snapshot => callback(this.parse(snapshot)));
                    })  
        }
    });
  }

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }
  // send the message to the Backend
   getDateStringServ = timestamp => {
    let date = new Date(Date.now());
    return ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear() + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
  }
  send = messages => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];
      const message = {
        text,
        user,
        timestamp: this.getDateStringServ(this.timestamp),
      };
      this.append(message);
    }
  };

  append = message => this.ref.push(message);

  // close the connection to the Backend
  off() {
    this.ref.off();
  }
}

Fire.shared = new Fire();
export default Fire;
