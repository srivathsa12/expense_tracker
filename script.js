let expenses = JSON.parse(localStorage.getItem("pocket_expenses")) || [];
let budget = Number(localStorage.getItem("pocket_budget")) || 0;

function saveData() {
    localStorage.setItem("pocket_expenses", JSON.stringify(expenses));
    localStorage.setItem("pocket_budget", budget);
}

function money(amount) {
    return "Rs " + amount.toFixed(2);
}

function monthText(date){
    let m = date.getMonth() + 1;
    if (m < 10) {
        m = "0" + m ;
    }
    return date.getFullYear() + "-" + m;
}

function todayText(){
    let d = new Date();
    let day = d.getDate();
    if (day < 10){
        day = "0" + day;
    }
    return monthText(d) + "-" + day;
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

let monthTotalBox = document.getElementById("monthTotal");
let safeTodayBox = document.getElementById("safeToday");

function bigMoney(amount) {
    let parts = amount.toFixed(2).split(".");
    return "Rs " + parts[0] + '<span class="dec">.' + parts[1] + "</span>";
}

function showMonth() {
    monthTotalBox.innerHTML = bigMoney(monthTotal());
}

showMonth();

function lastMonthTotal(){
    let now = new Date();
    let last = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    let month = monthText(last);
    let total = 0;
    for (let i = 0; i < expenses.length; i++){
        if (expenses[i].date.slice(0, 7) == month){
            total = total + expenses[i].amount;
        }
    }
    return total;
}

function trendPercent(){
    let thisMonth = monthTotal();
    let before = lastMonthTotal();
    if (before == 0) {
        return 0;
    }
    return Math.round(((thisMonth - before) / before) * 100);
}

let trendBox = document.getElementById("monthTrend");

function showTrend(){
    let p = trendPercent();
    let arrow = p > 0 ? "arrow-up-right" : "arrow-down-right";
    trendBox.innerHTML = '<i data-lucide="' + arrow + '"></i> ' + Math.abs(p) + "% vs last month";
    lucide.createIcons()
}

showTrend();

function daysLeft() {
    let now = new Date();
    let lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    return lastDay - now.getDate() + 1;
}

function safeToday(){
    let left = budget - monthTotal();
    if (left < 0){
        left = 0;
    }
    return left / daysLeft();
}

let daysLeftBox = document.getElementById("daysLeft");
let budgetPill = document.getElementById("budgetPill");

function showSafe(){
    safeTodayBox.innerHTML = bigMoney(safeToday());
    daysLeftBox.innerHTML = '<i data-lucide="calendar"></i> ' + daysLeft() + " days left";
    budgetPill.innerHTML = '<i data-lucide="wallet"></i> Budget: ' + money(budget);
    lucide.createIcons();
}

showSafe();

let editBudgetBtn = document.getElementById("editBudget");

function changeBudget(){
    let answer = prompt("Monthly budget in Rs:", budget);
    if (answer == null){
        return;
    }
    let number = Number(answer);
    if (answer.trim() == "" || isNaN(number) || number < 0){
        alert("Please enter a valid amount.");
        return;
    }
    budget = number;
    saveData();
    showSafe();
}

editBudgetBtn.addEventListener("click", changeBudget);

lucide.createIcons();