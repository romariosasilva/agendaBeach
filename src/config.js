import { config } from 'dotenv';
import { initializeApp } from 'firebase/app';

config();

// INFORMAÇÕES PARA CONEXÃO COM FIREBASE
const firebaseConfig = {
	apiKey: process.env.FIREBASE_KEY,
	authDomain: process.env.FIREBASE_AUTHDOMAIN,
	projectId: process.env.FIREBASE_PROJECTID,
	storageBucket: process.env.FIREBASE_STORAGEBUCKET,
	messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
	appId: process.env.FIREBASE_APPID
};

// Inicialização Firebase
export const app = initializeApp( firebaseConfig );

// INFORMAÇÕES CONFIGURADAS NO ARQUIVO .ENV
export const systemConfig = {
	siteName: process.env.SITE_NAME || 'Meu Site de Torneios',
};
