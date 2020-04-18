const addBtn = document.getElementById("add-transaction");
const transactionAmount = document.getElementById("transaction-amount");
const transactionText = document.getElementById("transaction-text");
const list = document.getElementById("list");
function addTransaction(text, amount) {
  validateInput(text, amount);
  createDOMElement(text, amount, list);
}

function validateInput(text, amount) {
  if (!text.value.trim() || !amount.value) {
    alert("Please populate both: transaction text and transaction amount");
  }
}

function createDOMElement(text, amount, parentEl) {
  const li = document.createElement("li");
  if (amount.value[0] === "-") {
    li.innerHTML = `${text.value} <span>${amount.value}</span>`;
    li.style.borderRight = '4px solid #e42424'
  }
  else {
    li.innerHTML = `${text.value} <span>+${amount.value}</span>`;
    li.style.borderRight = '4px solid #279d21'
  }
  const btn = document.createElement("button");
  btn.textContent = "X";
  btn.id = "del-btn";
  btn.classList.add("del-btn");
  btn.addEventListener('click', deleteDOMElement)
  li.appendChild(btn);
  parentEl.appendChild(li);
}

function deleteDOMElement() {
    event.target.parentElement.remove()
}

addBtn.addEventListener("click", () =>
  addTransaction(transactionText, transactionAmount)
);

// create income func or expense func   
