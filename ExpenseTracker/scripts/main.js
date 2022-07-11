class app{
    constructor(){
        this.incomeData = [];
        this.expensesData = [];
        this.currency = "PLN";
        this.render("income",this.incomeData);
    }
    createMoneyItem(name, value){
        return {
            date: new Date(),
            name: name,
            value: value
        }
    }
    addIncome(name, value){
        this.incomeData.push(this.createMoneyItem(name, value));
    }
    addExpense(name, value){
        this.expensesData.push(this.createMoneyItem(name, value));
    }
    addWeirdDate(){
        this.incomeData.push({date: new Date(2022,5,25),name: "XDDD", value: 250});
    }
    getValuesInCertainTime(data, startDate, endDate){
        return data.filter(({date}) => date.valueOf() > startDate.valueOf() && date.valueOf() < endDate.valueOf());
    }
    getFinalValue(){
        let income = this.incomeData.reduce((sum, {value}) => typeof sum == "object" ? sum.value + value : sum + value);
        let expense = this.expensesData.reduce((sum, {value}) => typeof sum == "object" ? -sum.value - value : sum - value);
        return expense + income;
    }
    render(htmlListId, list){
        let listObject = document.getElementById(htmlListId);
        listObject.innerHTML = "";
        list.forEach(({name, value}) => {
            listObject.appendChild(createHTMLObject(name, value));
        })
        listObject.appendChild(this.inputGroup());
    }
    inputGroup(){
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
        itemGroup.addEventListener("keydown",() => {
            if(event.keyCode == 13){
                let inputs = itemGroup.querySelectorAll("input");
                this.addIncome(inputs[0].value, parseFloat(inputs[1].value));
                this.render("income",this.incomeData);
                console.log(this.incomeData)
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
// let incomeInputGroup = document.querySelector("#incomeInputGroup");
// console.log(incomeInputGroup);
// incomeInputGroup.addEventListener("keydown",() => console.log(event.keyCode));
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
item.addIncome("1" ,25);
item.addIncome("2" ,80);
item.addIncome("3" ,140);
item.addWeirdDate();
item.addExpense("asd" ,2.99);
item.addExpense("asddsa" ,60.59);
item.getFinalValue();
console.log(item.incomeData);
console.log(item.getValuesInCertainTime(item.incomeData, new Date(2022,6,1), new Date(2022,6,31)));
item.render("income", item.incomeData);