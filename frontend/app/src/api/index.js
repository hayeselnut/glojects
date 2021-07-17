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

  constructor() {
    this.#db = getDb();
    this.glojects = {
      getAll: async () => await this.#db.collection('glojects').get(),
      getById: async (glojectId) =>
        await this.#db.collection('glojects').doc(glojectId).get(),
      exists: async (glojectId) =>
        (await this.glojects.getById(glojectId)).exists,
      create: async (glojectData) =>
        await this.#db.collection('glojects').add(glojectData),
      delete: async (glojectId) =>
        await this.#db.collection('glojects').doc(glojectId).delete(),
      // update: {
      //   title: async (glojectId, title) => await this.#db.collection('glojects').doc(glojectId).update({title}),
      //   description: async (glojectId, description) => await this.#db.collection('glojects').doc(glojectId).update({description}),
      //   team_members: async (glojectId, team_members) => await this.#db.collection('glojects').doc(glojectId).update({team_members}),
      //   tags: async (glojectId, tags) => await this.#db.collection('glojects').doc(glojectId).update({tags}),
      // },
    };
    this.users = {
      createUser: async (uid, username, email, location) =>
        await this.#db.collection('users').doc(uid).set({
          username: username,
          email: email,
          location: location,
          active_glojects: [],
          past_glojects: [],
          interests: [],
        }),
      getById: async (uid) =>
        await this.#db.collection('users').doc(uid).get(),to_dict(),
      exists: async (uid) => (await this.users.getById(uid)).exists,
    };
  }
}

export default new API();
