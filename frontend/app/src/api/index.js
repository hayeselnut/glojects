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

const convertToArray = (snapshot) => {
  const glojects = [];
  snapshot.forEach((doc) => {
    const id = doc.id;
    const data = doc.data();
    const gloject = {id, ...data};
    glojects.push(gloject);
  });
  return glojects;
};

class API {
  #db;

  constructor() {
    this.#db = getDb();
    this.glojects = {
      getAll: async () => {
        const snapshot = await this.#db.collection('glojects').get();
        return convertToArray(snapshot);
      },
      getAllActives: async () => {
        const snapshot = await this.#db.collection('glojects')
          .where('status', '==', 'ACTIVE')
          .get();
        return convertToArray(snapshot);
      },
      getById: async (glojectId) => {
        const snapshot = await this.#db.collection('glojects').doc(glojectId).get();
        if (!snapshot.exists) return {};
        const id = snapshot.id;
        const data = snapshot.data();
        return {id, ...data};
      },

      getAllFilters: async ({difficulty, tags}) => {
        const allGlojects = await this.glojects.getAll();

        console.log("tags length", tags.length)
        return allGlojects
          .filter((gloject) => difficulty === '' ? true : gloject.difficulty === difficulty)
          .filter((gloject) => tags.length ? tags.every(t => gloject.tags.includes(t)) : true );
      },
      getAllTags: async () => {
        const allGlojects = await this.glojects.getAll();
        const allTags = [...new Set(allGlojects.map((gloject) => gloject.tags).flat())];
        return allTags;
      },
      exists: async (glojectId) =>
        (await this.glojects.getById(glojectId)).exists,
      create: async (glojectData) =>
        await this.#db.collection('glojects').add(glojectData),
      delete: async (glojectId) =>
        await this.#db.collection('glojects').doc(glojectId).delete(),
      update: async (glojectId, updated) => await this.#db.collection('glojects').doc(glojectId).update(updated),
    };
    this.users = {
      createUser: async (uid, username, email, location, photoURL) =>
        await this.#db.collection('users').doc(uid).set({
          username: username,
          email: email,
          location: location,
          active_glojects: [],
          past_glojects: [],
          interests: [],
          photoURL: photoURL,
        }),
      getById: async (uid) => {
        const snapshot = await this.#db.collection('users').doc(uid).get()
        const id = snapshot.id;
        const data = snapshot.data();
        return {id, ...data};
      },
      exists: async (uid) => (await this.users.getById(uid)).exists,
    };
  }
}

export default new API();
