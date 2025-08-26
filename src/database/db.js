import { getFirestore } from "firebase/firestore";
import { app } from "../config.js";

// Inicialização Firestore
export const db = getFirestore( app );
