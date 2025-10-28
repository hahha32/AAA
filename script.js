// ✅ Firebase import
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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// --- ✅ 按钮逻辑 ---
const buttons = document.querySelectorAll(".vote-btn");
const votes = {};

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const group = btn.dataset.group;

    // 同组按钮全部取消active
    buttons.forEach((b) => {
      if (b.dataset.group === group) {
        b.classList.remove("active");
      }
    });

    // 当前按钮设为active
    btn.classList.add("active");
    votes[group] = btn.textContent;

    console.log("当前选择：", votes);
  });
});

// --- ✅ 提交部分 ---
const input = document.getElementById("username");
const submit = document.getElementById("submitName");
const msg = document.getElementById("statusMsg");

submit.addEventListener("click", async () => {
  const name = input.value.trim();
  if (!name) {
    msg.textContent = "⚠️ 请输入你的游戏名！";
    return;
  }

  try {
    await addDoc(collection(db, "votes"), {
      name,
      choice1: votes["1"] || "未选择",
      choice2: votes["2"] || "未选择",
      timestamp: new Date(),
    });

    msg.textContent = "✅ 提交成功！感谢你的投票！";
    input.value = "";
    buttons.forEach((b) => b.classList.remove("active")); // 提交后重置颜色
  } catch (e) {
    console.error("错误：", e);
    msg.textContent = "❌ 提交失败，请稍后再试。";
  }
});
