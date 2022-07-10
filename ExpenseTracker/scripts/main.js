class app{
    constructor(){
        this.incomeData = [];
        this.expensesData = [];
        this.currency = "PLN";
    }
    createMoneyItem(value){
        return {
            date: new Date(),
            value: value
        }
    }
    addIncome(value){
        this.incomeData.push(this.createMoneyItem(value));
    }
    addExpense(value){
        this.expensesData.push(this.createMoneyItem(value));
    }
    addWeirdDate(){
        this.incomeData.push({date: new Date(2022,5,25), value: 250});
    }
    getValuesInCertainTime(data, startDate, endDate){
        return data.filter(({date}) => date.valueOf() > startDate.valueOf() && date.valueOf() < endDate.valueOf());
    }
    getFinalValue(){
        let income = this.incomeData.reduce((sum, {value}) => typeof sum == "object" ? sum.value + value : sum + value);
        let expense = this.expensesData.reduce((sum, {value}) => typeof sum == "object" ? -sum.value - value : sum - value);
        return expense + income;
    }
}
let item = new app();
item.addIncome(25);
item.addIncome(80);
item.addIncome(140);
item.addWeirdDate();
item.addExpense(2.99);
item.addExpense(60.59);
item.getFinalValue();
console.log(item.incomeData);
console.log(item.getValuesInCertainTime(item.incomeData, new Date(2022,6,1), new Date(2022,6,31)))