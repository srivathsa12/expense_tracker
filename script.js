let expenses = JSON.parse(localStorage.getItem("pocket_expenses")) || [];
let budget = Number(localStorage.getItem("pocket_budget")) || 0;

function saveData() {
    localStorage.setItem("pocket_expenses", JSON.stringify(expenses));
    localStorage.setItem("pocket_budget", budget);
}

function money(amount) {
    return "Rs " + amount.toFixed(2);
}


lucide.createIcons();