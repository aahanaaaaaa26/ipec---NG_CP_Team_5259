/* ================= SIMPLE WALLET SYSTEM ================= */

let walletData = JSON.parse(
  localStorage.getItem("campusrent_wallet") || 
  '{"balance":1500,"transactions":[]}'
);

function saveWallet() {
  localStorage.setItem("campusrent_wallet", JSON.stringify(walletData));
  updateWalletDisplay();
}

function updateWalletDisplay() {
  const balanceEl = document.getElementById("walletBalance");
  const modalBalanceEl = document.getElementById("modalCurrentBalance");

  if (balanceEl) balanceEl.textContent = walletData.balance.toLocaleString();
  if (modalBalanceEl) modalBalanceEl.textContent = walletData.balance.toLocaleString();
}

document.addEventListener("DOMContentLoaded", updateWalletDisplay);

/* ================= ADD MONEY ================= */

let selectedAmount = 0;

function openAddMoneyModal() {
  document.getElementById("addMoneyModal").style.display = "flex";
  updateWalletDisplay();
}

function closeAddMoneyModal() {
  document.getElementById("addMoneyModal").style.display = "none";
}

function selectAmount(amount) {
  selectedAmount = amount;
  document.getElementById("customAmount").value = amount;
}

function processAddMoney() {

  const customAmount = parseInt(document.getElementById("customAmount").value);
  const amount = customAmount || selectedAmount;

  if (!amount || amount < 100) {
    alert("Minimum ₹100 required");
    return;
  }

  walletData.balance += amount;

  walletData.transactions.unshift({
    id: "TXN" + Date.now(),
    type: "credit",
    amount: amount,
    description: "Wallet Top-up",
    date: new Date().toISOString(),
  });

  saveWallet();
  closeAddMoneyModal();

  alert("₹" + amount + " added successfully!");
}

console.log("💳 Simple Wallet Ready");
