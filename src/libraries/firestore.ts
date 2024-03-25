import { getFirestore } from "firebase/firestore";
import { firebaseApp } from "./firebase";

// Initialize Firestore
export const firestoreDb = getFirestore(firebaseApp);
