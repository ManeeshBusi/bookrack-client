import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_KEY,
  authDomain: process.env.REACT_APP_FB_AUTH,
  projectId: process.env.REACT_APP_FB_ID,
  storageBucket: process.env.REACT_APP_FB_STORAGE,
  messagingSenderId: process.env.REACT_APP_FB_SEND,
  appId: process.env.REACT_APP_FB_APP,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app, "gs://bookrack-mb99.appspot.com");
export default storage;
