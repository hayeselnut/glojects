// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from 'firebase/app';
import api from '../api';

export const signup = async (email, password, username, location) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      user.sendEmailVerification().then(() => {
        console.log('Sent verification email');
      });
      api.users.createUser(user.uid, username, email, location);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      return false;
    });
  return true;
};

export const resendVerification = async (email) => {
  firebase
    .auth()
    .currentUser.sendEmailVerification()
    .then(function () {
      console.log('Sent verification email');
    })
    .catch(function (error) {
      // Error occurred. Inspect error.code.
    });
};

export const login = async (email, password) => {
  await firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      if (!user?.emailVerified) {
        throw new Error('Please verify your email');
      }
      console.log('Successfully logged in.', user);
      localStorage.setItem('id', user.uid);
      return true;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      return false;
    });
};

export const logout = async () => {
  await firebase
    .auth()
    .signOut()
    .then(() => {
      localStorage.removeItem('id');
      console.log('Logged out!');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
};
