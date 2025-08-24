document.addEventListener("DOMContentLoaded", () => {
  let expenses = [
    {
      id: 1,
      name: "Groceries",
      amount: 45.5,
      date: "2025-08-24",
      category: "Food",
    },
    {
      id: 2,
      name: "Bus Ticket",
      amount: 2.8,
      date: "2025-08-21",
      category: "Travel",
    },
    {
      id: 3,
      name: "Movie",
      amount: 12.0,
      date: "2025-08-28",
      category: "Other",
    },
  ];

  const expenseForm = document.getElementById("expense-form");
  const totalAmount = document.getElementById("total-amount");
  const expenseList = document.getElementById("expenses-list");

  displayExpenses();
  updateTotalAmount();

  expenseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("expense-name").value;
    const amount = parseFloat(document.getElementById("expense-amount").value);
    const date = document.getElementById("expense-date").value;
    const category = document.getElementById("expense-category").value;

    const row = { id: Date.now(), name, amount, date, category };

    expenses.push(row);
    displayExpenses();
    updateTotalAmount();
    expenseForm.reset();
  });

  function displayExpenses() {
    
    expenseList.innerHTML = "";
    expenses.forEach((expense) => {
      const row = document.createElement("tr");
      const formattedDate = formatDate(expense.date);
      row.innerHTML = `
    <td>${expense.name}</td>
    <td>$${expense.amount.toFixed(2)}</td>
    <td class="cell-expense-date">${formattedDate}</td>
    <td>${expense.category}</td>
    <td>
        <button class="edit-btn" data-id="${expense.id}">Edit</button>
        <button class="delete-btn" data-id="${expense.id}">Delete</button>
    </td>
  `;
      expenseList.appendChild(row);
    });
   sortTableByDate("expenses-table-id", true);
  }

  function updateTotalAmount() {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    totalAmount.textContent = total.toFixed(2);
  }

  expenseList.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
      console.log("delete buttone clicked");
      const id = parseInt(e.target.dataset.id);
      expenses = expenses.filter(expense => expense.id !== id);
      displayExpenses(expenses);
      updateTotalAmount();
    }
    if (e.target.classList.contains("edit-btn")) {
      const id = parseInt(e.target.dataset.id);
      const expense = expenses.find((expense) => expense.id === id);
      document.getElementById("expense-name").value = expense.name;
      document.getElementById("expense-amount").value = expense.amount;
      document.getElementById("expense-date").value = expense.date;
      document.getElementById("expense-category").value = expense.category;

      expenses = expenses.filter(expense => expense.id !== id);
      displayExpenses(expenses);
      updateTotalAmount();
    }
  });
   const dateInput = document.getElementById("expense-date");
  const today = new Date().toISOString().split('T')[0];
  dateInput.value = today;
  dateInput.max = today; // Optional

  function formatDate(dateStr) {
  const [year, month, day] = dateStr.split("-");
  return `${day}-${month}-${year}`;
}

function sortTableByDate(tableId, ascending = true) {
  const table = document.getElementById(tableId);
  const tbody = table.querySelector("tbody");
  const rows = Array.from(tbody.querySelectorAll("tr"));

  rows.sort((a, b) => {
    const dateA = parseDDMMYYYY(a.querySelector(".cell-expense-date").textContent.trim());
    const dateB = parseDDMMYYYY(b.querySelector(".cell-expense-date").textContent.trim());
    return ascending ? dateA - dateB : dateB - dateA;
  });

  // Clear and re-append sorted rows
  tbody.innerHTML = "";
  rows.forEach(row => tbody.appendChild(row));
}

function parseDDMMYYYY(dateStr) {
  const [day, month, year] = dateStr.split("-");
  return new Date(`${year}-${month}-${day}`);
}
});
