// --- Import necessary Firebase modules ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

// --- Firebase configuration ---
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
const list = document.getElementById("reportList");

// --- Add document ---
btn.addEventListener("click", async () => {
  const text = input.value.trim();
  if (!text) return alert("Type something first!");

  try {
    await addDoc(collection(db, "reports"), { text });
    input.value = "";
    loadReports();
  } catch (e) {
    console.error("Error adding doc: ", e);
  }
});

// --- Load all documents ---
async function loadReports() {
  list.innerHTML = "";
  try {
    const querySnapshot = await getDocs(collection(db, "reports"));
    querySnapshot.forEach((doc) => {
      const li = document.createElement("li");
      li.textContent = doc.data().text;
      list.appendChild(li);
    });
  } catch (e) {
    console.error("Error loading docs: ", e);
  }
}

loadReports();
