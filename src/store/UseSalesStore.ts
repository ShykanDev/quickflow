import { defineStore } from "pinia";

export const UseSalesStore = defineStore('UseSalesStore', {

    state: () => {  
        return{
            salesHistory:[]as Array<object>,

        }
    },
    getters:{
        getSalesHistory(): Array<object>{
            return this.salesHistory;
        }
    },
    actions:{
        addSaleHistory(newSale: object): void{
            this.salesHistory.unshift (newSale);
        }
    }
})