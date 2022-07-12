class app{
    constructor(){
        this.incomeData = {name: "incomeData", values: []};
        this.expensesData = {name: "expensesData", values: []};
        this.currency = "PLN";
        this.loadLocalStorageData();
        this.render("income", this.incomeData);
        this.render("expenses", this.expensesData);

    }
    loadLocalStorageData(){
        if(localStorage.incomeData != undefined){
            this.incomeData = JSON.parse(localStorage.incomeData);
        }
        if(localStorage.expensesData != undefined){
            this.expensesData = JSON.parse(localStorage.expensesData);
        }
    }
    createMoneyItem(name, value){
        return {
            date: new Date(),
            name: name,
            value: value
        }
    }
    applyMoney(list, name, value){
        list.values.push(this.createMoneyItem(name, value));
        localStorage.setItem(list.name, JSON.stringify(list));
    }
    addWeirdDate(){
        this.incomeData.values.push({date: new Date(2022,5,25),name: "XDDD", value: 250});
    }
    getValuesInCertainTime(data, startDate, endDate){
        return data.filter(({date}) => date.valueOf() > startDate.valueOf() && date.valueOf() < endDate.valueOf());
    }
    getSummary(list){
        let sum = 0
        list.values.forEach((item) => sum += item.value);
        return  sum; 
    }
    getFinalValue(){
        let income = this.getSummary(this.incomeData);
        let expense = this.getSummary(this.expensesData);
        return expense + income;
    }
    render(htmlListId, list){
        let listObject = document.getElementById(htmlListId);
        listObject.innerHTML = "";
        list.values.forEach(({name, value}) => {
            listObject.appendChild(createHTMLObject(name, value));
        })
        listObject.appendChild(this.inputGroup(htmlListId, list));
        document.getElementById(htmlListId + "Summary").querySelectorAll("span")[2].innerText = this.getSummary(list);
    }
    inputGroup(htmlListId, list){
        let itemGroup = document.createElement("div");
        itemGroup.classList.add("input-group");
        let namePart = document.createElement("input");
        namePart.classList.add("form-control");
        namePart.placeholder = "...";
        let signPart = document.createElement("span");
        signPart.classList.add("input-group-text");
        signPart.innerText = "$";
        let valuePart = document.createElement("input");
        valuePart.classList.add("form-control");
        valuePart.placeholder = "0.00";
        itemGroup.appendChild(namePart);
        itemGroup.appendChild(signPart);
        itemGroup.appendChild(valuePart);
        // inputGroup eventListener set
        itemGroup.addEventListener("keydown",() => {
            // add on enter click
            if(event.keyCode == 13){
                let inputs = itemGroup.querySelectorAll("input");
                // no value inputs protection
                if(inputs[0].value != "" && inputs[1].value != ""){
                    this.applyMoney(list, inputs[0].value, parseFloat(inputs[1].value));
                    this.render(htmlListId, list);
                }
            }
        });
        return itemGroup;
    }
}
/*
    <div class="input-group">
        <input type="text" class="form-control" placeholder="...">
        <span class="input-group-text">$</span>
        <input style="width: 120px;" type="number" class="input-group-text" placeholder="0.00">
    </div>
*/
function createHTMLObject(name, value){
    let itemGroup = document.createElement("div");
    itemGroup.classList.add("input-group");
    let namePart = document.createElement("span");
    namePart.classList.add("form-control");
    namePart.innerText = name;
    let signPart = document.createElement("span");
    signPart.classList.add("input-group-text");
    signPart.innerText = "$";
    let valuePart = document.createElement("span");
    valuePart.classList.add("form-control");
    valuePart.innerText = value;
    itemGroup.appendChild(namePart);
    itemGroup.appendChild(signPart);
    itemGroup.appendChild(valuePart);
    return itemGroup;
}
let item = new app();
function setTestLocalStorage(){
    item.applyMoney(item.incomeData, "1" ,25);
    item.applyMoney(item.incomeData, "2" ,80);
    item.applyMoney(item.incomeData, "3" ,140);
    item.addWeirdDate();
    item.applyMoney(item.expensesData, "asd" ,2.4);
    item.applyMoney(item.expensesData, "asddsa" ,60.5);
}
document.getElementById("testAdd").addEventListener("click", setTestLocalStorage);
item.render("income", item.incomeData);
item.render("expenses",item.expensesData);
console.log(localStorage)