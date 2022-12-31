import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js"
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js"
import { getStorage } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-storage.js"


const firebaseConfig = {
  apiKey: "AIzaSyBTIGvlwCVl0OYTv9CAncsunIpzNKwrdcY",
  authDomain: "fir-autenticacion-3f34e.firebaseapp.com",
  projectId: "fir-autenticacion-3f34e",
  storageBucket: "fir-autenticacion-3f34e.appspot.com",
  messagingSenderId: "1084826853489",
  appId: "1:1084826853489:web:9e250e94e0bf15d3547bd0"
};


export const app = initializeApp(firebaseConfig)
export const auth =  getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app, 'gs://fir-autenticacion-3f34e.appspot.com')