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
      exists: async (glojectId) => (await this.glojects.getById(glojectId)).exists,
      create: async (glojectData) => await this.#db.collection('glojects').add(glojectData),
      delete: async (glojectId) => await this.#db.collection('glojects').doc(glojectId).delete(),
      // update: {
      //   title: async (glojectId, title) => await this.#db.collection('glojects').doc(glojectId).update({title}),
      //   description: async (glojectId, description) => await this.#db.collection('glojects').doc(glojectId).update({description}),
      //   team: async (glojectId, team) => await this.#db.collection('glojects').doc(glojectId).update({team}),
      //   tags: async (glojectId, tags) => await this.#db.collection('glojects').doc(glojectId).update({tags}),
      // },
    };
    this.users = {
      getByUsername: async (username) => await this.#db.collection('users').doc(username).get(),
      exists: async (username) => (await this.users.getByUsername(username)).exists,
    };
  }
}

export default new API();