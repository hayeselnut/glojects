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
        return allGlojects
          .filter((gloject) => difficulty === '' ? true : gloject.difficulty === difficulty)
          .filter((gloject) => tags.length ? gloject.tags.every(t => tags.includes(t)) : true );
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
      // update: {
      //   title: async (glojectId, title) => await this.#db.collection('glojects').doc(glojectId).update({title}),
      //   description: async (glojectId, description) => await this.#db.collection('glojects').doc(glojectId).update({description}),
      //   team: async (glojectId, team) => await this.#db.collection('glojects').doc(glojectId).update({team}),
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
      getById: async (uid) => await this.#db.collection('users').doc(uid).get(),
      exists: async (uid) => (await this.users.getById(uid)).exists,
    };
  }
}

export default new API();
