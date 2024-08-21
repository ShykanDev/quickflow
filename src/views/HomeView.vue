<template>
  <div class="relative w-full min-h-dvh bg-sky-50">
    <section class="flex flex-wrap justify-center gap-5 pt-3 overflow-hidden pb-28 animate-flip-down ">
     <div v-for="(item, index) in items" :key="index">
      <ItemCard  :item-img="item.itemImage" :item-name="item.itemName" :item-price="item.itemPrice" :save-values="saveValues" />
     </div>
    </section>
      <section :class="{'-translate-x-full': !isSideBarOpened, 'translate-x-0': isSideBarOpened}" class="fixed flex justify-center transition-transform duration-500 top-0 bottom-0 left-0 right-[50%] bg-sky-100 z-10">
        <v-icon :class="{'rotate-180 -translate-x-10 opacity-100': isSideBarOpened, 'rotate-0 translate-x-0 opacity-50': !isSideBarOpened}" @click="handleOpenSideBar" class="absolute transition-transform duration-500 ease-out cursor-pointer -right-10" name="bi-arrow-right-circle" color="#316694" scale="2.1"/>
        <ul class="pt-[20%] overflow-auto" v-if="summaryValues.length > 0">
          <li class="px-2 mb-1 text-lg font-medium bg-white rounded-md shadow-md font-poppins text-sky-800" v-for="(item, index) in summaryValues" :key="index"> {{ item.itemAmount }} {{ item.itemName }}  ${{ item.itemSubtotal }}</li>
        </ul>
      </section>
    <GrandTotal   class="fixed bottom-3 right-5"/>
    <!-- <button class="" @click="UseUserStoreValues().resetGrandTotal()">Reset Grand Total</button> -->
  </div>
</template>

<script lang="ts" setup>
import GrandTotal from '@/components/GrandTotal.vue';
import ItemCard from '@/components/ItemCard.vue';
import ISummary from '@/interface/ISummary';

import { UseUserStoreValues } from '@/store/UseStoreValues';
import { onMounted, onUnmounted, ref,Ref } from 'vue';

let items = UseUserStoreValues().getTotalItems;
const saveValues = ref(false);

// const handleSaveValues = async() =>saveValues.value = !saveValues.value;


const isSideBarOpened = ref(false);
const handleOpenSideBar = async() => {
  try {
    isSideBarOpened.value = !isSideBarOpened.value;
    if(isSideBarOpened.value) {
      saveValues.value = true;  
      summaryValues.value = UseUserStoreValues().getSummary;
    } else {
      saveValues.value = false;
      UseUserStoreValues().resetSummary();
      summaryValues.value = [];      
    }
  } catch (error) {
    console.log(error);
  }
}

let summaryValues:Ref<Array<ISummary>> = ref(UseUserStoreValues().getSummary);
onMounted(() => {
  UseUserStoreValues().resetGrandTotal();
  UseUserStoreValues().resetSells();

})
onUnmounted(() => {
  UseUserStoreValues().resetGrandTotal();
})
</script>

<style scoped></style>
