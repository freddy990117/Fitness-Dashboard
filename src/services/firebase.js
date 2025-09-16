// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; //
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDzJSa8KuBJSeGPQjex0NlYN3F0EFwgb1U",
  authDomain: "fitness-dashboard-b1c44.firebaseapp.com",
  projectId: "fitness-dashboard-b1c44",
  storageBucket: "fitness-dashboard-b1c44.appspot.com",
  messagingSenderId: "879370698697",
  appId: "1:879370698697:web:64e65819b73c0e00d77218",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); // 告訴 Firebase 你要連哪個專案（用 .env 提供的參數）
export const auth = getAuth(app); // 拿到這個專案的「登入功能服務」物件
export const db = getFirestore(app); // 拿到這個專案的「資料庫服務」物件
