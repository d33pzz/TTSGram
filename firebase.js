import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCAwyXXOw343pv3XOZbjfOXSQ3iG2aTno4",
  authDomain: "rn-instagram-clone-84d26.firebaseapp.com",
  projectId: "rn-instagram-clone-84d26",
  storageBucket: "rn-instagram-clone-84d26.appspot.com",
  messagingSenderId: "902303544242",
  appId: "1:902303544242:web:8867213a194ce0e119aaab",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export { firebase, db };
