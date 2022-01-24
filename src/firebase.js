import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
      apiKey: "AIzaSyCyOW9vHzdDc4g2FSNkPNIlVSseKjyfHXE",
      authDomain: "basic-messenger-c2bf9.firebaseapp.com",
      databaseURL: "https://basic-messenger-c2bf9-default-rtdb.firebaseio.com",
      projectId: "basic-messenger-c2bf9",
      storageBucket: "basic-messenger-c2bf9.appspot.com",
      messagingSenderId: "847909258130",
      appId: "1:847909258130:web:4956c6ababa8f141d9774b",
      measurementId: "G-5MRRSPDV2R"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app)

export default db