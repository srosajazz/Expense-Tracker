const balance = document.getElementById('balance');
const money_plus = document.getElementById('money_plus');
const money_minus = document.getElementById('money_minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

const fooTransactions = [
  {id: 1, text: 'Flower', amount: -20},
  {id: 2, text: 'Salary', amount: 600},
  {id: 3, text: 'Book', amount: -25},
  {id: 4, text: 'Camera', amount: 240},
];

let transactions = fooTransactions;

// Add transactions
function addTransaction(e){
  e.preventDefault();

  if(text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please add a text and amount');
  } else {
    const transaction = {
      id: generateID(),
      text:text.value,
      amount: +amount.value
    };

    transactions.push(transaction);

    //Add to the DOM
    addTransactionDOM(transaction);

    updateValues();
    text.value = '';
    amount.value = '';
    
  }
}

//Generate random ID
function generateID() {
  return Math.floor(Math.random() * 100000000);
}

// Add transaction to the DOM list
function addTransactionDOM(transaction){

//Get Sign
const sign = transaction.amount < 0 ? '-' : '+';

const item = document.createElement('li');

//Add class based on value of transaction
item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

item.innerHTML =`
  ${transaction.text} <span>${sign}${Math.abs(
    transaction.amount
    )}</span><button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
`;

list.appendChild(item);
}

// Update the balance, income and expense
function updateValues(){

  const amounts = transactions.map(transaction =>
    transaction.amount);
    
    // Get Total
    const total = amounts.reduce((acc, item) => (acc + item), 0).toFixed(2);

  // Get Income
  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);


    // Expense
    const expense = (amounts
    .filter(item => item < 0)
    .reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);
    
    balance.innerText = `$${total}`;
    money_plus.innerText = `$${income}`;
    money_minus.innerText = `$${expense}`;
}

//Remove transaction by id
function removeTransaction(id){
  transactions = transactions
  .filter(transaction => transaction
  .id !== id);

  init();
}

//Init app
function init(){
  list.innerHTML = '';

  transactions.forEach(addTransactionDOM)
  updateValues();
}
init();
form.addEventListener('submit', addTransaction);