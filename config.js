import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyCs6PQ9dJTs1egvPYdpqSrir9eKY6rIjqA",
	authDomain: "codeflow-2a713.firebaseapp.com",
	databaseURL: "https://codeflow-2a713-default-rtdb.europe-west1.firebasedatabase.app",
	projectId: "codeflow-2a713",
	storageBucket: "codeflow-2a713.appspot.com",
	messagingSenderId: "883996777321",
	appId: "1:883996777321:web:3f37309532c266047a7bf8",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);
