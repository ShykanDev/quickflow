<template>
    <div class="">
       <MainLayout>
            <template #main>
                <div class="fixed top-0 bottom-0 left-0 right-0 bg-slate-100 -z-20">
                </div>
                <div class="flex flex-col items-center animate-fade-up">
                    <div v-if="salesBackups.length<1" class="flex flex-col items-center gap-1 pb-5">
                        <h1 class="pt-2 text-2xl font-medium text-sky-800 font-poppins">Historial De Ventas</h1>
                        <p>Aqui se mostrará el resumen histórico de ventas cada que se guarden los datos en el boton 'guardar' en la seccion de <RouterLink :to="{name: 'sales'}" class="text-lg font-bold underline text-sky-800">ventas</RouterLink></p>
                    </div>
                    <div v-if="salesBackups.length>0" class="flex items-center justify-around w-full my-2">
                        <p  class="py-[2px] px-[10px] text-2xl text-white bg-sky-700 rounded-xl shadow-sm" >Ventas</p>
                        <div>
                            <p @click="toggleShowExpenses" v-if="!showExpenses" class="py-[2px] cursor-pointer px-[10px] text-2xl text-white bg-gray-600 rounded-xl shadow-sm" >Ver Gastos</p>
                            <p @click="toggleShowExpenses" v-if="showExpenses" class="py-[2px] cursor-pointer px-[10px] text-2xl text-white bg-sky-700 rounded-xl shadow-sm" >Ocultar gastos</p>
                        </div>
                        <!-- <p @click="toggleShowExpenses" v-if="!showExpenses" class="text-3xl text-white bg-sky-500 rounded-2xl py-[2px] px-[10px] shadow-sm" >Mostrar Gastos</p> -->
                    </div>
                    <section  class="flex w-full justify-evenly" >
                        <!-- Sales History -->
                        <div :class="{'w-full': !showExpenses}" class="flex flex-col min-w-[55%] ">
                            <div v-for="(arr) in salesBackups" :key="arr" class="flex flex-col gap-1 p-1 py-1 mb-4 overflow-auto bg-gray-200 shadow-md full max-h-96 min-h-96 rounded-xl" >
                                <div class="flex flex-col items-center justify-center gap-1 bg-white shadow-md rounded-xl">
                                    <div class="flex flex-wrap justify-center gap-1">
                                        <p class="font-medium text-sky-900">Fecha de guardado: </p>
                                        <p class="font-bold text-sky-900">{{ arr[0][0].itemDate.substring(0, 9) }}</p>
                                    </div>

                                    <div class="flex flex-col items-center gap-1">
                                        <p class="p-1 font-bold text-white rounded-md bg-sky-700">Ingresos Netos: ${{ totalFinancialHistory[salesBackups.indexOf(arr)].totalSale}}</p>
                                        <p class="p-1 font-bold text-white bg-red-600 rounded-md">Gastos: ${{ totalFinancialHistory[salesBackups.indexOf(arr)].totalExpenses}}</p>
                                        <p class="p-1 font-bold text-white bg-green-800 rounded-md">Balance: $ {{ totalFinancialHistory[salesBackups.indexOf(arr)].finalBalance}}</p>
                                    </div>
                                        
                                    <PieChart  :dataSet="[
                                        totalFinancialHistory[salesBackups.indexOf(arr)].totalSale,
                                        totalFinancialHistory[salesBackups.indexOf(arr)].totalExpenses,
                                        totalFinancialHistory[salesBackups.indexOf(arr)].finalBalance
                                ]" />
                               
                                </div>
                                <div class="flex flex-wrap justify-center gap-1 shadow-md bg-slate-50 rounded-xl">
                                    <p class="text-base font-bold text-sky-900">{{ arr.length }} ventas</p>
                                </div>
                                <div v-for="(elm) in arr" :key="elm" class="px-3 py-2 shadow-md bg-slate-50 rounded-xl">
                                    <p class="font-medium text-sky-900 ">Total en esta venta:</p>
                                    <p class="inline-block p-1 mb-2 font-bold text-white shadow-md bg-sky-800 rounded-xl">${{elm.find((x) => x.itemDate).grandTotal}}</p>
                                    <div v-for="(item) in elm" :key="item"  class="flex flex-wrap">
                                        <p v-if="item.itemName && item.itemName !== 'Otros'" class="inline-block p-1 mb-1 font-bold transition-transform bg-white shadow-md cursor-pointer text-sky-900 rounded-xl hover:scale-105 hover:border hover:border-sky-900">{{ item.itemAmount }} {{ item.itemName }} de ${{ item.itemPrice }}  (${{ item.itemSubtotal }})</p>
                                        <p v-if="item.itemName && item.itemName === 'Otros'" class="inline-block p-1 mb-1 font-bold bg-white shadow-md text-sky-900 rounded-xl hover:scale-105 hover:border hover:border-sky-900-"> {{ item.itemName }}   (${{ item.itemSubtotal }})</p>
                                        <div v-if="item.grandTotal" class="flex flex-wrap justify-center w-full gap-1">
                                            <!-- <p v-if="item.grandTotal" class="font-medium text-sky-900">Total en esta venta:</p> -->
                                            <!-- <p v-if="item.grandTotal"  class="font-bold text-sky-900">${{ item.grandTotal }}</p> -->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Expenses History -->
                        <div v-if="showExpenses" class="min-w-[42%] ">
                            <!-- TO FIX: when user clicks on add expense button, button pushes an array, that's causing errors while trying to iterate through it, need to fix by changing the method to push from an array to an object (when user clicks on add expense button it should push an object instead of an array) -->
                            <div v-for="(item) in backupExpenses" :key="item" class="flex flex-col gap-1 p-3 py-2 mb-4 overflow-auto bg-gray-100 shadow-md full max-h-96 min-h-96 rounded-xl">
                                <div class="flex flex-wrap justify-center gap-1 text-white shadow-md bg-sky-800 rounded-xl">
                                    <p class="font-medium ">Fecha de guardado:</p>
                                    <p class="font-bold">{{ item[0].expenseDate.substring(0, 9) }}</p>
                                </div>
                                <div v-for="(elm) in item" :key="elm">
                                    <div class="flex flex-col justify-start gap-1 p-1 mb-1 bg-white shadow-md rounded-xl">
                                        <div class="flex flex-wrap gap-1">
                                            <p class="text-base font-medium text-sky-900">Motivo:</p>
                                            <p class="text-base font-semibold text-sky-900">'{{ elm.expenseReason }}' </p>
                                        </div>
                                        <div class="flex flex-wrap gap-1">
                                            <p class="text-base font-medium text-sky-900"> Gasto:</p>
                                            <p class="text-base font-semibold text-sky-900"> ${{ elm.expenseAmount }}</p>
                                        </div>
                                    </div>
                                </div>
                                </div>
                        </div>
                    </section>
                </div>
            </template>
       </MainLayout>
    </div>
</template>

<script lang="ts" setup>
import MainLayout from '@/layout/MainLayout.vue';
import { UseBackupHistorySales } from '@/store/UseBackupHistorySales';
import { UseSalesStore } from '@/store/UseSalesStore';
import { computed, onMounted, ref } from 'vue';
import PieChart from '@/components/charts/PieChart.vue';

const backupSalesHistory = UseBackupHistorySales();
const salesHistory = UseSalesStore();
let salesBackups = computed(() => backupSalesHistory.getBackupsSalesHistory);
let backupExpenses = computed(() => backupSalesHistory.getBackupsExpensesHistory);
let totalFinancialHistory = computed(() => salesHistory.getTotalFinancialHistory);
// console.log('salesBackups:', salesBackups);

let showExpenses = ref(false);

const toggleShowExpenses = () => {
    showExpenses.value = !showExpenses.value;
};

onMounted(() => {
    console.log('salesBackups:', backupSalesHistory.getBackupsSalesHistory);
});

</script>

<style scoped>

</style>