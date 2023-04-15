class app{
    constructor(){
        this.incomeData = {name: "incomeData", values: []};
        this.expensesData = {name: "expensesData", values: []};
        this.currency = "PLN";
        this.loadLocalStorageData();
        this.render("income", this.filterByDate(this.incomeData, new Date(moment().startOf("month")), new Date(moment().endOf("month"))));
        this.render("expenses", this.filterByDate(this.expensesData, new Date(moment().startOf("month")), new Date(moment().endOf("month"))));

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
        this.incomeData.values.push({date: new Date(2022,5,25),name: "25.06 old", value: 250});
    }
    filterByDate(data, startDate, endDate){
        return {name: data.name, values: data.values.filter(({date}) => {
            let dateValue = new Date(date).valueOf();
            return dateValue >= startDate.valueOf() && dateValue <= endDate.valueOf()
        })};
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
    renderDateFiltered(startDate, endDate){
        this.render("income", this.filterByDate(this.incomeData, new Date(startDate), new Date(endDate)));
        this.render("expenses", this.filterByDate(this.expensesData, new Date(startDate), new Date(endDate)));
    }
    render(htmlListId, list){
        let listObject = document.getElementById(htmlListId);
        listObject.innerHTML = "";
        list.values.forEach(({name, value}) => {
            listObject.appendChild(this.createListItem(name, value));
        })
        listObject.appendChild(this.inputGroup(htmlListId, list));
        document.getElementById(htmlListId + "Summary").querySelectorAll("span")[2].innerText = this.getSummary(list);
    }
    createListItem(name, value){
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

        itemGroup.addEventListener("keydown",() => {
            if(event.keyCode == 13){
                let inputs = itemGroup.querySelectorAll("input");
                if(inputs[0].value != "" && inputs[1].value != ""){
                    this.applyMoney(list, inputs[0].value, parseFloat(inputs[1].value));
                    this.render(htmlListId, list);
                }
            }
        });
        return itemGroup;
    }
}
let item = new app();

$('input[id="datePicker"]').daterangepicker({
    opens: 'left',
    startDate: moment().startOf("month"),
    endDate: moment().endOf("month"),
    locale: {
        format: 'DD-MM-YYYY'
    }
}, function(start, end) {
    item.renderDateFiltered(start,end);
});

function setTestLocalStorage(){
    item.addWeirdDate();
    item.applyMoney(item.incomeData, "1" ,25);
    item.applyMoney(item.incomeData, "2" ,80);
    item.applyMoney(item.incomeData, "3" ,140);
    item.applyMoney(item.expensesData, "asd" ,2.4);
    item.applyMoney(item.expensesData, "asddsa" ,60.5);
}
document.getElementById("testAdd").addEventListener("click", setTestLocalStorage);
