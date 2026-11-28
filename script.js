let expenses = JSON.parse(localStorage.getItem("pocket_expenses")) || [];
let budget = Number(localStorage.getItem("pocket_budget")) || 0;

function saveData() {
    localStorage.setItem("pocket_expenses", JSON.stringify(expenses));
    localStorage.setItem("pocket_budget", budget);
}

function money(amount) {
    return "Rs " + amount.toFixed(2);
}

function todayText(){
    return new Date().toISOString().slice(0, 10);
}

function addExpense(amount, category){
    expenses.push({
        id: Date.now(),
        amount: amount,
        category: category,
        date: todayText()
    });
    saveData();
}

function monthTotal(){
    let month = todayText().slice(0, 7);
    let total = 0;
    for (let i=0; i < expenses.length; i++) {
        if (expenses[i].date.slice(0, 7) == month){
            total = total + expenses[i].amount;
        }
    }
    return total;
}

lucide.createIcons();