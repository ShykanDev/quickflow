import { defineStore } from "pinia";

export const UseSalesStore = defineStore('UseSalesStore', {

    state: () => {  
        return{
            salesHistory:[]as Array<object>,
            expenseTotal: 0,
            userExpenses:[]as Array<object>
        }
    },
    getters:{
        getSalesHistory(): Array<object>{
            return this.salesHistory;
        },
        getExpense(): number{ 
            return this.expenseTotal;
        },
        getUserExpenses(): Array<object>{
            return this.userExpenses;
        }
    },
    actions:{
        addSaleHistory(newSale: object): void{
            this.salesHistory.unshift (newSale);
        },
        setNewExpense(newExpensesTotal: number): void{
            this.expenseTotal = newExpensesTotal;
        },
        pushUserNewExpense(newUserExpenses: object): void{
            this.userExpenses.unshift(newUserExpenses);
        }
    },
    // persist: true
})