import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'semantic-ui-css/semantic.min.css';

import firebase from 'firebase/app';
import 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: 'AIzaSyDnFzcl4K2gtIBIETg77m3a6N_izwZAGS4',
  authDomain: 'glojects.firebaseapp.com',
  projectId: 'glojects',
  storageBucket: 'glojects.appspot.com',
  messagingSenderId: '837750996466',
  appId: '1:837750996466:web:79dc5e0db7ade834fb3f6b',
  measurementId: 'G-6V45WZLM9W',
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
