import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBuZK63q2NwhGTUqhhJBSGgL7fISSUXtZs",
  authDomain: "web-app-c986e.firebaseapp.com",
  projectId: "web-app-c986e",
  storageBucket: "web-app-c986e.firebasestorage.app",
  messagingSenderId: "961179834761",
  appId: "1:961179834761:web:e45f86f8ced4bed4e92958",
  measurementId: "G-M7Q2892LHX"
};

// --- Initialize Firebase ---
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// --- DOM elements ---
const input = document.getElementById("userInput");
const btn = document.getElementById("submitBtn");
const statusMsg = document.getElementById("statusMsg");

// --- Submit user input to Firestore ---
btn.addEventListener("click", async () => {
  const text = input.value.trim();
  if (!text) {
    statusMsg.textContent = "⚠️ Please type something first!";
    return;
  }

  try {
    await addDoc(collection(db, "reports"), { text, timestamp: new Date() });
    statusMsg.textContent = "✅ Your input has been submitted!";
    input.value = "";

    // optional: fade out status message
    setTimeout(() => (statusMsg.textContent = ""), 3000);
  } catch (e) {
    console.error("Error adding document: ", e);
    statusMsg.textContent = "❌ Submission failed. Try again later.";
  }
});
