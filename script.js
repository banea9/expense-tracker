const amount = document.getElementById("transaction-amount");
const text = document.getElementById("transaction-text");
const list = document.getElementById("list");
const balance = document.getElementById("moneyAmount");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const form = document.getElementById("form");

let localStorageTransactions = JSON.parse(localStorage.getItem("transactions"));
let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

// add transaction
function addTransaction(e) {
  e.preventDefault();
  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("Please add text and value");
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value
    };
    transactions.push(transaction);

    addTransactionDOM(transaction);
    updateValues();
    updateLocalStorage();
    text.value = "";
    amount.value = "";
  }
}

//generateID
function generateID() {
  return Math.floor(Math.random() * 1000000);
}
// Add transactions to DOM list
function addTransactionDOM(transaction) {
  // Get sign
  const sign = transaction.amount < 0 ? "-" : "+";

  const item = document.createElement("li");

  // Add class based on value
  item.classList.add(transaction.amount < 0 ? "minus" : "plus");

  item.innerHTML = `
      ${transaction.text} <span>${sign}${Math.abs(
    transaction.amount
  )}</span> <button class="del-btn" onclick="removeTransaction(${
    transaction.id
  })">x</button>
    `;

  list.appendChild(item);
}

//update the balance income and expense
function updateValues() {
  const amounts = transactions.map(el => el.amount);
  const totalBalance = amounts.reduce((a, b) => a + b, 0).toFixed(2);
  const income = amounts
    .filter(x => x > 0)
    .reduce((a, b) => a + b, 0)
    .toFixed(2);
  const expense = (
    amounts.filter(x => x < 0).reduce((a, b) => a + b, 0) * -1
  ).toFixed(2);

  balance.innerText = `$${totalBalance}`;
  money_plus.innerText = `$${income}`;
  money_minus.innerText = `$${expense}`;
}

//remove transactions

function removeTransaction(id) {
  transactions = transactions.filter(el => el.id !== id);
  updateLocalStorage();
  init();
}

function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Init app
function init() {
  list.innerHTML = "";
  transactions.forEach(addTransactionDOM);
  updateValues();
}

init();

form.addEventListener("submit", addTransaction);

