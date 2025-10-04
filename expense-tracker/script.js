let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
let currentFilter = 'all';

document.addEventListener('DOMContentLoaded', function() {
    updateDisplay();
    
    document.getElementById('description').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') addExpense();
    });

    document.getElementById('amount').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') addExpense();
    });
});

function addExpense() {
    const description = document.getElementById('description').value.trim();
    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('category').value;

    if (!description || !amount || amount <= 0) {
        alert('Please enter a valid description and amount!');
        return;
    }

    const expense = {
        id: Date.now(),
        description,
        amount,
        category,
        date: new Date().toLocaleDateString()
    };

    expenses.push(expense);
    saveExpenses();
    
    // Clear input fields
    document.getElementById('description').value = '';
    document.getElementById('amount').value = '';
    
    updateDisplay();
}

function deleteExpense(id) {
    if (confirm('Are you sure you want to delete this expense?')) {
        expenses = expenses.filter(expense => expense.id !== id);
        saveExpenses();
        updateDisplay();
    }
}

function filterExpenses(category) {
    currentFilter = category;
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    updateDisplay();
}

function updateDisplay() {
    const expensesList = document.getElementById('expensesList');
    const totalBalance = document.getElementById('totalBalance');
    
    const filteredExpenses = currentFilter === 'all' 
        ? expenses 
        : expenses.filter(exp => exp.category === currentFilter);
    
    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    totalBalance.textContent = `$${total.toFixed(2)}`;
    
    if (filteredExpenses.length === 0) {
        expensesList.innerHTML = `
            <div class="empty-state">
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
                </svg>
                <h3>No expenses yet</h3>
                <p>${currentFilter === 'all' ? 'Add your first expense to get started!' : 'No expenses in this category'}</p>
            </div>
        `;
        return;
    }
    
    expensesList.innerHTML = filteredExpenses
        .sort((a, b) => b.id - a.id) 
        .map(expense => `
            <li class="expense-item category-${expense.category}">
                <div class="expense-info">
                    <div class="expense-description">${expense.description}</div>
                    <span class="expense-category">${getCategoryEmoji(expense.category)} ${expense.category}</span>
                </div>
                <div class="expense-amount">$${expense.amount.toFixed(2)}</div>
                <button class="btn-delete" onclick="deleteExpense(${expense.id})">Delete</button>
            </li>
        `).join('');
}

function getCategoryEmoji(category) {
    const emojis = {
        food: '🍔',
        transport: '🚗',
        shopping: '🛍️',
        entertainment: '🎬',
        bills: '💡',
        other: '📦'
    };
    return emojis[category] || '📦';
}

function saveExpenses() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

function exportExpenses() {
    const dataStr = JSON.stringify(expenses, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'expenses.json';
    link.click();
}

function clearAllExpenses() {
    if (confirm('Are you sure you want to delete ALL expenses? This cannot be undone!')) {
        expenses = [];
        saveExpenses();
        updateDisplay();
    }
}