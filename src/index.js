import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';

import Final from './final'
import firebase from 'firebase'

import registerServiceWorker from './registerServiceWorker';

var config = {
    apiKey: "AIzaSyB3HgS3xUWTqwfwy4bw2XUtdNTw6JKoL7U",
    authDomain: "file-share-using-react.firebaseapp.com",
    databaseURL: "https://file-share-using-react.firebaseio.com",
    projectId: "file-share-using-react",
    storageBucket: "file-share-using-react.appspot.com",
    messagingSenderId: "828944569482"
  };
  firebase.initializeApp(config);

ReactDOM.render(<Final />, document.getElementById('root'));
registerServiceWorker();
