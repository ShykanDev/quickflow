import IItem from "@/interface/IItem";
import ISummary from "@/interface/ISummary";
import { IoReturnUpBack } from "oh-vue-icons/icons";
import { defineStore } from "pinia";

export const UseUserStoreValues = defineStore("UseStoreValues", {
  state() {
    return {
      totalItems: [
        {
          itemName: "Tacos",
          itemPrice: 30,
          itemImage: require("../assets/img/items/taquito.png"),
        },
        {
          itemName: "Quesadillas",
          itemPrice: 30,
          itemImage: require("@/assets/img/items/quesadillaSimple.png"),
        },
        {
          itemName: "Quesadillas Carnitas",
          itemPrice: 40,
          itemImage: require("@/assets/img/items/quesadillaCarnitas.png"),
        },
        {
          itemName: "Tortas",
          itemPrice: 35,
          itemImage: require("@/assets/img/items/tortasimple.png"),
        },
        {
          itemName: "Tortas Carnitas",
          itemPrice: 40,
          itemImage: require("@/assets/img/items/torta.png"),
        },
        {
          itemName: "Gorditas",
          itemPrice: 35,
          itemImage: require("@/assets/img/items/gorditas-min.png"),
        },
        {
          itemName: "Gorditas Carnitas",
          itemPrice: 40,
          itemImage: require("@/assets/img/items/gorditaChicharron.png"),
        },
        {
          itemName: "Refrescos Vidrio",
          itemPrice: 25,
          itemImage: require("@/assets/img/items/vidrio-min.png"),
        },
        {
          itemName: "Refrescos Desechable",
          itemPrice: 27,
          itemImage: require("@/assets/img/items/desechables-min.png"),
        },
        {
          itemName: "Queso Extra",
          itemPrice: 10,
          itemImage: require("@/assets/img/items/oaxaca.png"),
        },
        {
          itemName: "Por Kilo",
          itemPrice: 380,
          itemImage: require("@/assets/img/items/peso.png"),
        },
      ] as Array<IItem>,
      grandTotal: 0,
      sells: [] as Array<object>,
      summary: [] as Array<ISummary>,
    };
  },
  getters: {
    getGrandTotal(): number {
      return this.grandTotal;
    },
    getSells(): Array<any> {
      return this.sells;
    },
    getTotalItems(): Array<IItem> {
      return this.totalItems;
    },
    getSummary(): Array<ISummary> {
      return this.summary;
    },
  },
  actions: {
    updateGrandTotal(newGrandTotal: number) {
      this.grandTotal += newGrandTotal;
    },
    reduceGrandTotal(newGrandTotal: number) {
      this.grandTotal - newGrandTotal;
    },
    resetGrandTotal() {
      this.grandTotal = 0;
    },
    setNewSell(newSell: object): void {
      this.sells.push(newSell);
    },
    resetSells(): void {
      this.sells = [];
    },
    pushToSummary(valuesSummary: ISummary): void {
      this.summary.push(valuesSummary);
    },
    resetSummary(): void {
      this.summary = [];
    },
  },
}); 