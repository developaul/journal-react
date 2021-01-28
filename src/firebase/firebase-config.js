import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCvNS6V-q1iuV2WjW3Gb1E-Ik_H--7VuNQ",
    authDomain: "journal-app-653df.firebaseapp.com",
    projectId: "journal-app-653df",
    storageBucket: "journal-app-653df.appspot.com",
    messagingSenderId: "755264379787",
    appId: "1:755264379787:web:6d0efc011310d0aef72d8e"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
}