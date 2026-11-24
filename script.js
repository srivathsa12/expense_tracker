var addBtn = document.getElementById("addBtn");
        var totalSpent = 0
        var food = 0
        var travel = 0
        var shopping = 0 
        var other = 0
        var expenses = [];

        function checkBudget(){
            var budget = Number(document.getElementById("budget").value);

            if (budget>0){
                var left = budget - totalSpent;
                document.getElementById("left").innerText = left;

                if (left<0){
                    document.getElementById("warning").innerText = "You are over budget!";
                }else if (totalSpent >= budget * 0.8){
                    document.getElementById("warning").innerText = "Careful! 80% of your budget is used"; 
                }else {
                    document.getElementById("warning").innerText = "";
                }
            }
        }

        function showExpense(name, amount, category, date, index){
            var item = document.createElement("li");
            item.innerText = name + "-Rs" + amount + "(" + category + ") - " + date;

            var delBtn = document.createElement("button");
            delBtn.innerText = "x";

            delBtn.onclick = function(){
                expenses.splice(index, 1);
                localStorage.setItem("expenses", JSON.stringify(expenses));
                location.reload();
            };

            item.appendChild(delBtn);

            document.getElementById("list").appendChild(item);

            totalSpent = totalSpent + Number(amount);
            document.getElementById("total").innerText = totalSpent;

             
            
            if (category == "Food"){
                food = food + Number(amount);
                document.getElementById("foodTotal").innerText = food;
            } else if (category == "Travel"){
                travel = travel + Number(amount);
                document.getElementById("travelTotal").innerText = travel;
            }else if (category == "Shopping"){
                shopping = shopping + Number(amount);
                document.getElementById("shoppingTotal").innerText = shopping;
            }else {
                other = other + Number(amount);
                document.getElementById("otherTotal").innerText = other
            }
            checkBudget();     
        }      
            document.getElementById("budget").oninput = function(){
                localStorage.setItem("budget",document.getElementById("budget").value);
                checkBudget();
        };
        addBtn.onclick = function(){
            var name = document.getElementById("useName").value;
            var amount = document.getElementById("amount").value;
            var category = document.getElementById("category").value;

            if (name == "" || amount == ""){
                alert("Please fill everything");
                return;
            }
            var today = new Date().toLocaleDateString();
            showExpense(name, amount, category, expenses.length);
            
            expenses.push({name:name, amount:amount,category:category, date: today});
            localStorage.setItem("expenses", JSON.stringify(expenses));
            

            document.getElementById("useName").value = "";
            document.getElementById("amount").value = "";
            
        };
        document.getElementById("clearBtn").onclick = function(){
            var sure = confirm("Delete all expenses?");

            if (sure == true){
                localStorage.removeItem("expenses");
                location.reload();
            }
        }
        var savedBudget = localStorage.getItem("budget");
        if (savedBudget != null){
            document.getElementById("budget").value = savedBudget;           
        }

        var saved = localStorage.getItem("expenses");
        if (saved != null){
            expenses = JSON.parse(saved);

            for(var i=0; i < expenses.length; i++){
                showExpense(expenses[i].name, expenses[i].amount, expenses[i].category, expenses[i].date, i);
            }
        }