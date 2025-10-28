// --- 1. Import necessary Firebase modules ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

// --- 2. Your Firebase configuration ---
const firebaseConfig = {
  apiKey: "AIzaSyBuZK63q2NwhGTUqhhJBSGgL7fISSUXtZs",
  authDomain: "web-app-c986e.firebaseapp.com",
  projectId: "web-app-c986e",
  storageBucket: "web-app-c986e.firebasestorage.app",
  messagingSenderId: "961179834761",
  appId: "1:961179834761:web:e45f86f8ced4bed4e92958",
  measurementId: "G-M7Q2892LHX"
};

// --- 3. Initialize Firebase ---
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// --- 4. DOM elements ---
const input = document.getElementById("userInput");
const btn = document.getElementById("submitBtn");
const list = document.getElementById("reportList");

// --- 5. Add data to Firestore ---
btn.addEventListener("click", async () => {
  const text = input.value.trim();
  if (!text) {
    alert("Type something first!");
    return;
  }

  try {
    await addDoc(collection(db, "reports"), { text });
    input.value = "";
    loadReports();
  } catch (error) {
    console.error("Error adding document: ", error);
  }
});

// --- 6. Load all data from Firestore ---
async function loadReports() {
  list.innerHTML = "";
  try {
    const querySnapshot = await getDocs(collection(db, "reports"));
    querySnapshot.forEach((doc) => {
      const li = document.createElement("li");
      li.textContent = doc.data().text;
      list.appendChild(li);
    });
  } catch (error) {
    console.error("Error loading data: ", error);
  }
}

// --- 7. Load existing reports when page starts ---
loadReports();
