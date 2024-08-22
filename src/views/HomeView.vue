<template>
  <div>
    <MainLayout>
      <template #main>
        <!-- Background gradient that spans the entire viewport with a fixed position -->
        <div class="fixed top-0 bottom-[-100%] left-0 right-0 bg-slate-100 -z-10">
        </div>
        <!-- Main content section where items are displayed using a flex layout and animation -->
        <section class="z-20 flex flex-wrap justify-center gap-5 pt-3 overflow-hidden pb-28 animate-fade-left">
          <!-- Loop through each item in the 'items' array and pass properties to the 'ItemCard' component -->
          <div v-for="(item, index) in items" :key="index">
            <ItemCard :item-img="item.itemImage" :item-name="item.itemName" :item-price="item.itemPrice"
              :save-values="saveValues" />
          </div>
        </section>
        <!-- Sidebar background overlay with a fade-in transition -->
        <Transition>
          <div v-if="isSideBarOpened">
            <section @click="handleOpenSideBar(true)"
              class="fixed top-0 bottom-0 left-0 right-0 transition-all duration-500 bg-black bg-opacity-70 animate-ease-out" />
          </div>
        </Transition>
        <!-- Sidebar with items summary, slides in and out based on 'isSideBarOpened' -->
        <section :class="{'-translate-x-full': !isSideBarOpened, 'translate-x-0': isSideBarOpened}"
          class="fixed flex justify-center transition-transform duration-500 top-0 bottom-0 left-0 right-[50%] bg-sky-50 z-10 px-2">
          <!-- Sidebar toggle button with rotation animation -->
          <Transition>
            <v-icon v-if="!isSideBarOpened" :class="{' text-sky-400': isSideBarOpened, '': !isSideBarOpened}"
              @click="handleOpenSideBar()"
              class="absolute top-[50%] transition-transform duration-500 ease-out bg-white cursor-pointer -right-10 rounded-tl-xl rounded-bl-xl shadow-lg"
              name="fa-arrow-left" flip="horizontal" color="#075985" scale="2.1" />
          </Transition>

          <Transition>
            <v-icon v-if="isSideBarOpened" :class="{'text-white': isSideBarOpened, '': !isSideBarOpened}"
              @click="handleOpenSideBar()"
              class="absolute transition-transform duration-500 ease-out cursor-pointer -right-12 top-12"
              name="fa-arrow-left" color="#075985" scale="2.3" />
          </Transition>

          <!-- Summary of selected items -->
          <Transition>
            <ul v-if="summaryValues.length > 0" class="pt-[30%] overflow-auto">
              <li v-for="(item, index) in summaryValues" :key="index"
                class="px-2 mb-1 text-lg font-medium bg-white rounded-md shadow-md font-poppins text-sky-800">
                {{ item.itemAmount }} {{ item.itemName }} ${{ item.itemSubtotal }}
              </li>
              <!-- Display total price -->
              <li class="px-2 mb-1 text-lg font-medium text-white rounded-md shadow-md bg-sky-800 font-poppins">
                Total: ${{ grandTotal }}
              </li>
              <!-- Message when there are no items selected -->
            </ul>
          </Transition>
        </section>

        <!-- Grand total button that appears when the sidebar is closed -->
        <Transition>
          <div class="fixed left-0 right-0 z-50 flex justify-between px-2 bottom-3">
            <SaveToSales  @click="pushToSales" v-if="!isSideBarOpened" class="cursor-pointer" />
            <GrandTotal v-if="!isSideBarOpened" class="" />
          </div>
        </Transition>
      </template>
    </MainLayout>
  </div>
</template>


<script lang="ts" setup>
import GrandTotal from '@/components/GrandTotal.vue';
import ItemCard from '@/components/ItemCard.vue';
import SaveToSales from '@/components/SaveToSales.vue';
import ISummary from '@/interface/ISummary';
import MainLayout from '@/layout/MainLayout.vue';
import { UseSalesStore } from '@/store/UseSalesStore';
import { UseUserStoreValues } from '@/store/UseStoreValues';
import { onMounted, onUnmounted, ref, Ref } from 'vue';

let items = UseUserStoreValues().getTotalItems;
const saveValues = ref(false);
let grandTotal = ref(UseUserStoreValues().getGrandTotal);
const isSideBarOpened = ref(false);

// Function to set the 'isSideBarOpened' value to false and reset summary and grand total


// Function to handle opening and closing the sidebar
const handleOpenSideBar = async (close?: boolean) => {
  try {
   if (!close) isSideBarOpened.value = !isSideBarOpened.value;
   if (close) isSideBarOpened.value = false;
    if (isSideBarOpened.value) {
      // If the sidebar is opened, save values and fetch summary data
      saveValues.value = true;
      summaryValues.value = UseUserStoreValues().getSummary;
      grandTotal.value = UseUserStoreValues().getGrandTotal;
    } else {
      // If the sidebar is closed, reset summary and grand total
      saveValues.value = false;
      UseUserStoreValues().resetSummary();
      summaryValues.value = [];
      grandTotal.value = UseUserStoreValues().getGrandTotal;
    }
  } catch (error) {
    console.log(error);
  }
};


// function to push values from summary to sales store history
const pushToSales = (): void => {
  const newSale: ISummary = {
    itemName: '',
    itemPrice: 0,
    itemAmount: 0,
    itemSubtotal: 0,
    itemDate: new Date().toLocaleDateString(),
  }
  saveValues.value = true;
  summaryValues.value = UseUserStoreValues().getSummary;
  grandTotal.value = UseUserStoreValues().getGrandTotal;
  console.log(summaryValues.value);
  summaryValues.value.forEach((item) => {
    newSale.itemName = item.itemName,
    newSale.itemPrice = item.itemPrice,
    newSale.itemAmount = item.itemAmount,
    newSale.itemSubtotal = item.itemSubtotal
  })
  UseSalesStore().addSaleHistory(newSale)
  console.log(UseSalesStore().getSalesHistory);
}
// Array holding the summary of selected items
let summaryValues: Ref<Array<ISummary>> = ref(UseUserStoreValues().getSummary);

// Lifecycle hook: Reset grand total and sells data when component mounts
onMounted(() => {
  UseUserStoreValues().resetGrandTotal();
  UseUserStoreValues().resetSells();
});

// Lifecycle hook: Reset grand total when component unmounts
onUnmounted(() => {
  UseUserStoreValues().resetGrandTotal();
});
</script>


<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}</style>

