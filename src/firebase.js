import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyB4ZGFF__Vq2zTu6MMqQvEWq2-nKx4YPVA',
  authDomain: 'netflix-clone-a3f34.firebaseapp.com',
  projectId: 'netflix-clone-a3f34',
  storageBucket: 'netflix-clone-a3f34.appspot.com',
  messagingSenderId: '231335562846',
  appId: '1:231335562846:web:88614d628e2151bbfdaecf'
};

//initialize the app with credentials, this takes the config as an object
const firebaseApp = firebase.initializeApp(firebaseConfig)
//fireStore is the data base
const db = firebaseApp.fireStore();
const auth = firebase.auth();

//using both types of export, explicit and default. You can use just one default but many explicits
export { auth };
export default db;
