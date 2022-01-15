import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.FB_KEY,
  authDomain: process.env.FB_AUTH,
  projectId: process.env.FB_ID,
  storageBucket: process.env.FB_STORAGE,
  messagingSenderId: process.env.FB_SEND,
  appId: process.env.FB_APP,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app, "gs://bookrack-mb99.appspot.com");
console.log(process.env.FB_ID);
export default storage;
