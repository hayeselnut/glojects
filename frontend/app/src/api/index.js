// Contains all communication with Firestore database

import firebase from 'firebase';
import 'firebase/firestore';
import { firebaseConfig } from '../firebase/firebaseConfig';

const getDb = () => {
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
  return firebase.firestore();
};

class API {
  #db;

  constructor () {
    this.#db = getDb();
    this.glojects = {
      getAll: async () => await this.#db.collection('glojects').get(),
      getById: async (glojectId) => await this.#db.collection('glojects').doc(glojectId).get(),
    };
    this.users = {
      getByUsername: async (username) => await this.#db.collection('users').doc(username).get(),
      exists: async (username) => (await this.#db.collection('users').doc(username).get()).exists
    };
  }
}

export default new API();