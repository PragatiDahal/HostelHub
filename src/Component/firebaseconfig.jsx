// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDcEVEYswCLaUKxldvjejg0AW5ANpkky2c",
  authDomain: "hostelhub-project.firebaseapp.com",
  projectId: "hostelhub-project",
  storageBucket: "hostelhub-project.appspot.com",
  messagingSenderId: "214254432085",
  appId: "1:214254432085:web:581f02efb550f01aa9c9dc",
  measurementId: "G-3FQG2JZBSC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { auth };