import firebase from "firebase"

const  firebaseApp = firebase.initializeApp({
     

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

    // For Firebase JS SDK v7.20.0 and later, measurementId is optional

    apiKey: "AIzaSyCpQ9P2YO9M-X6F_l62nXmNc3BGgtiITfQ",
    authDomain: "instagram-clone-43358.firebaseapp.com",
    projectId: "instagram-clone-43358",
    storageBucket: "instagram-clone-43358.appspot.com",
    messagingSenderId: "544955744042",
    appId: "1:544955744042:web:c95a02a4d14495b60fe853",
    measurementId: "G-Q4WCG96RRW"
  

  

})

const db= firebaseApp.firestore();
// const auth=firebase.auth();
// const storage=firebase.storage();

// export default {db,auth,storage};
export default db;