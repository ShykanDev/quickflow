<template>
    <div class="">
       <MainLayout>
            <template #main>
                <div class="fixed top-0 bottom-0 left-0 right-0 bg-slate-100 -z-20">
                </div>
                <div class="flex flex-col gap-4 min-h-dvh pb-9 animate-fade-down">
                    <h1 class="text-3xl font-medium font-poppins text-sky-800 ">Ventas</h1>
                    <RouterLink :to="{name:'home'}" class="flex items-center gap-2 p-1 ml-3 bg-white shadow-md min-w-32 text-sky-800 rounded-2xl max-w-44">
                        <v-icon name="hi-solid-home" color="#246D93" scale="1.6" />
                        <h2 class="text-xl font-">Ir al inicio</h2>
                    </RouterLink>
                    <div class="flex items-center gap-2 ml-5 text-lg justify-left font-poppins ">
                        <h2 class="text-lg font-medium text-sky-800">Ingresos Totales: </h2>
                        <h2 v-if="showTotal" class="text-xl font-medium text-sky-800">${{ totalEarned }}.00</h2>
                        <h2 v-if="!showTotal" class="text-xl font-medium text-sky-800" >$****</h2>
                        <v-icon class="cursor-pointer" @click="toggleShowTotal" v-if="showTotal" name="io-eye-off-sharp" scale="1.5" color="#075985" />
                        <v-icon class="cursor-pointer" @click="toggleShowTotal" v-if="!showTotal" name="io-eye-sharp" scale="1.5" color="#075985" />
                    </div>
                    <section class="flex flex-wrap justify-center gap-5">
                        <div v-for="(sale,index) in salesHistory" :key="index" class="box-border relative flex flex-col items-start w-11/12 px-2 transition-transform duration-300 ease-out bg-white shadow-md tex8-black py-7 rounded-xl justify-evenly min-w-24 min-h-44 font-poppins hover:border-sky-800 hover:border hover:scale-105">
                            <div class="absolute top-1 right-1">
                                <p class="text-lg font-medium text-sky-800" >Fecha: {{ sale[0].itemDate }}</p> 
                            </div>
                            <div v-for="(item,index) in sale" :key="index">
                                <p v-if="item.itemName" class="text-lg font-medium" >{{item.itemAmount}} {{ item.itemName }} ${{ item.itemSubtotal }}</p>
                                
                            </div>
                            <p class="pt-2 text-xl font-medium text-sky-900">Total: ${{ sale[0].grandTotal }}.00 </p>
                        </div>
                    </section>
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