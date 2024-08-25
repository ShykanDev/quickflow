<template>
  <div>
    <MainLayout>
      <template #main>
        <!-- Background gradient that spans the entire viewport with a fixed position -->
        <div class="fixed top-0 bottom-[-100%] left-0 right-0 bg-slate-100 -z-10">
        </div>
        <!-- Main content section where items are displayed using a flex layout and animation -->
        <section class="z-20 flex flex-wrap justify-center gap-5 pt-3 overflow-hidden pb-28 animate-shake">
          <!-- Loop through each item in the 'items' array and pass properties to the 'ItemCard' component -->
          <div v-for="(item, index) in items" :key="index" class="">
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
              class="fixed flex transition-transform duration-500 top-0 bottom-0 left-0 right-[50%] bg-sky-50 z-10 px-2 flex-col items-center justify-start">
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
              <li v-for="(item, index) in summaryValues.filter( item => item.itemName)" :key="index"
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
          <SaveToSales  @click="pushSummaryToSales" class="cursor-pointer" />
          <p v-if="isError" class="text-sm font-semibold text-red-700 font-poppins">{{ errorMessage }}</p>
        </section>

        <!-- Grand total button that appears when the sidebar is closed -->
        <Transition>
          <div class="fixed left-0 right-0 z-50 flex justify-between px-2 bottom-3">
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
import { computed, onMounted, onUnmounted, ref, Ref } from 'vue';
import moment from 'moment';
import { useRoute, useRouter } from 'vue-router';

let items = UseUserStoreValues().getTotalItems;
const saveValues = ref(false);
let grandTotal = ref(UseUserStoreValues().getGrandTotal);
const isSideBarOpened = ref(false);

const router = useRouter();

const valuesToPush1 = ref();
// boolean that will be used to show/hide an error message
let isError = ref(false);

// error message that will be used to show/hide an error message
let errorMessage = ref(''); 

// Function to handle opening and closing the sidebar
const handleOpenSideBar = async (close?: boolean) => {
  try {
   if (!close) isSideBarOpened.value = !isSideBarOpened.value;
   if (close) isSideBarOpened.value = false;
    if (isSideBarOpened.value) {
      // If the sidebar is opened, save values and fetch summary data

      const dateFormated = moment().format('DD/MM/YY HH:mm:ss');
      saveValues.value = true;
      summaryValues.value = UseUserStoreValues().getSummary;
      grandTotal.value = UseUserStoreValues().getGrandTotal;
      console.log(summaryValues.value);
       summaryValues.value.push({ grandTotal: grandTotal.value, itemDate: dateFormated });
       valuesToPush1.value = summaryValues.value; 
      console.log('Values to push:',  valuesToPush1.value);
      // UseSalesStore().addSaleHistory(summaryValues.value);
    } else {
      // If the sidebar is closed, reset summary and grand total
      saveValues.value = false;
      UseUserStoreValues().resetSummary();
      summaryValues.value = UseUserStoreValues().getSummary;
      grandTotal.value = UseUserStoreValues().getGrandTotal;
      valuesToPush1.value = [];
    }
  } catch (error) {
    console.log(error);
  }
};

// timeout function to hide error message after 3 seconds
let timeoutId = null;
// function to push values from summary to sales store history
const pushSummaryToSales = () => {
  if(timeoutId) {
    clearTimeout(timeoutId);
  }
  try {
    if (summaryValues.value.length >= 2) { 
      UseSalesStore().addSaleHistory(valuesToPush1.value)
      UseUserStoreValues().resetSummary();
      summaryValues.value = UseUserStoreValues().getSummary;
      valuesToPush1.value = [];
      router.push({name:'sales'})
      UseSalesStore().pushNewEarn({itemSutotal:grandTotal.value})
    } else  {
      isError.value = true;
      errorMessage.value = 'Agrega primero algun producto!';
      timeoutId = setTimeout(() => {
        isError.value = false;
        errorMessage.value = '';
      }, 3000);
      return
    }
    }
    catch (error) {
      console.log('Error while adding to History' + error);
      
    }
}

// function to push values from summary to sales store history

// Array holding the summary of selected items
let summaryValues: Ref<Array<ISummary>> = computed(() => UseUserStoreValues().getSummary);

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

