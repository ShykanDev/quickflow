import { defineStore } from "pinia";

export const UseUserPreferences = defineStore('UseUserPreferences',{
    state() {
        return{
            showImages:true,
        }
    },
    getters:{
        getShowImages():boolean{
            return this.showImages;
        }
    },
    actions:{
        setShowImages():void{
            this.showImages = !this.showImages;
        },
        setTrueShowImages():void{
            this.showImages = true;
        },
        setFalseShowImages():void{
            this.showImages = false;
        }
    }, 
    // persist: true

})