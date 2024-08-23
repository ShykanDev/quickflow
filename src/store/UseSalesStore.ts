import { defineStore } from "pinia";

export const UseSalesStore = defineStore('UseSalesStore', {

    state: () => {  
        return{
            salesHistory:[]as Array<object>,
            expenseTotal: 0,
        }
    },
    getters:{
        getSalesHistory(): Array<object>{
            return this.salesHistory;
        },
        getExpense(): number{ 
            return this.expenseTotal;
        },

    },
    actions:{
        addSaleHistory(newSale: object): void{
            this.salesHistory.unshift (newSale);
        },
        setNewExpense(newExpensesTotal: number): void{
            this.expenseTotal = newExpensesTotal;
        }
    },
    // persist: true
})