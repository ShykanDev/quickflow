<template>
    <div class="">
       <MainLayout>
            <template #main>
                <div class="flex flex-col gap-4 animate-fade-down">
                    <h1 class="text-3xl font-medium font-poppins text-sky-800 ">Ventas</h1>
                    <div class="flex items-center justify-center gap-2 text-lg font-poppins ">
                        <h2 class="text-lg text-sky-800">Ingresos Totales: </h2>
                        <h2 v-if="showTotal" class="text-xl font-medium text-sky-800">${{ totalEarned }}.00</h2>
                        <h2 v-if="!showTotal" class="text-xl font-medium text-sky-800" >$****</h2>
                        <v-icon @click="toggleShowTotal" v-if="showTotal" name="io-eye-off-sharp" scale="1.5" color="#075985" />
                        <v-icon @click="toggleShowTotal" v-if="!showTotal" name="io-eye-sharp" scale="1.5" color="#075985" />
                    </div>
                    <div v-for="(sale,index) in salesHistory" :key="index" class="text-white bg-black min-w-24 min-h-44">
                        <p>Fecha: {{ sale[0].itemDate }}</p>
                        <div v-for="(item,index) in sale" :key="index">
                            <p v-if="item.itemName">{{item.itemAmount}} {{ item.itemName }} ${{ item.itemSubtotal }}</p>
                            <!-- We gonna sum all the subtotals -->
                        </div>
                        <p>Total: ${{ sale[0].grandTotal }}.00 </p>
                    </div>
                </div>
            </template>
       </MainLayout>
    </div>
</template>

<script lang="ts" setup>
import MainLayout from '@/layout/MainLayout.vue';
import { UseSalesStore } from '@/store/UseSalesStore';
import { computed, onMounted, ref } from 'vue';

const salesHistory = computed(() => UseSalesStore().getSalesHistory);
let totalEarned = ref(0);

// dynamic value to toogle the view of the total amount
let showTotal = ref(false);  

//  function to toggle the showTotal variable
const toggleShowTotal = () => showTotal.value = !showTotal.value;

const totalEarnings = []
const calcTotal = () => {
    salesHistory.value.forEach((sale) => {
       totalEarnings.push(sale[0].grandTotal) 
    })
    totalEarned.value = totalEarnings.reduce((a, b) => a + b);
    
}
onMounted(() => {
    if(salesHistory.value.length>0) calcTotal();
})
</script>

<style scoped>

</style>