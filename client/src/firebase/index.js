import firebase from 'firebase/app';
import 'firebase/storage';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCaPffiN_VRPZes_BmbTLVukFjUP_ZcP6w",
    authDomain: "yogaclassplanner-f4a94.firebaseapp.com",
    projectId: "yogaclassplanner-f4a94",
    storageBucket: "yogaclassplanner-f4a94.appspot.com",
    messagingSenderId: "753088447745",
    appId: "1:753088447745:web:f91887cc00f5da5362c700",
    measurementId: "G-76TR2FRP9F"
  };

  firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage();

  export {storage,firebase as default}

