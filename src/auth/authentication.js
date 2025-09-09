import { getAuth } from "firebase/auth";
import { app } from "../config.js";

// Inicialização Firebase Authentication
export const auth = getAuth( app );
