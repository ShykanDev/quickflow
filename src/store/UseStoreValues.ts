import { defineStore } from "pinia";

export const UseUserStoreValues = defineStore('UseStoreValues',{
    state() {
        return {
            grandTotal:0
        }
    },
    getters:{
        getGrandTotal():number{
            return this.grandTotal;
        }
    },
    actions: {
        updateGrandTotal(newGrandTotal:number) {
            this.grandTotal += newGrandTotal
        },
        reduceGrandTotal(newGrandTotal:number) {
            this.grandTotal - newGrandTotal
        },
        resetGrandTotal() {
            this.grandTotal = 0
        }
    },
    persist: true
}) 