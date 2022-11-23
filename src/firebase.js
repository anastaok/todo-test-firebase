import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCiI3oF_BzP7X9bguw1Xl9yGUeJzaxkOR8",
  authDomain: "todo-react-86ce8.firebaseapp.com",
  projectId: "todo-react-86ce8",
  storageBucket: "todo-react-86ce8.appspot.com",
  messagingSenderId: "714197705516",
  appId: "1:714197705516:web:887c491031a6eace68c289",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
