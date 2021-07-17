// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from 'firebase/app';

export const signup = (email, password) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      user.sendEmailVerification().then(() => {
        console.log('Sent verification email');
      });
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
};

export const resendVerification = (email) => {
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

export const login = (email, password) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      if (!user?.emailVerified) {
        throw new Error('Please verify your email');
      }
      console.log('Successfully logged in.');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
};

export const logout = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log('Logged out!');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
};
