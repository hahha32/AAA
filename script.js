  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBuZK63q2NwhGTUqhhJBSGgL7fISSUXtZs",
    authDomain: "web-app-c986e.firebaseapp.com",
    projectId: "web-app-c986e",
    storageBucket: "web-app-c986e.firebasestorage.app",
    messagingSenderId: "961179834761",
    appId: "1:961179834761:web:e45f86f8ced4bed4e92958",
    measurementId: "G-M7Q2892LHX"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

// --- 2. Handle submission ---
const input = document.getElementById("userInput");
const btn = document.getElementById("submitBtn");
const list = document.getElementById("reportList");

btn.addEventListener("click", async () => {
  const text = input.value.trim();
  if (!text) return alert("Type something first!");

  await addDoc(collection(db, "reports"), { text });
  input.value = "";
  loadReports();
});

// --- 3. Load all reports ---
async function loadReports() {
  list.innerHTML = "";
  const querySnapshot = await getDocs(collection(db, "reports"));
  querySnapshot.forEach((doc) => {
    const li = document.createElement("li");
    li.textContent = doc.data().text;
    list.appendChild(li);
  });
}

// Initial load
loadReports();
