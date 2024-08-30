<template>
    <div class="">
       <MainLayout>
            <template #main>
                <div class="fixed top-0 bottom-0 left-0 right-0 bg-slate-100 -z-20">
                </div>
                <div class="flex flex-col items-center animate-fade-up">
                    <h1 class="pt-2 text-xl font-medium text-sky-800 font-poppins">Historial De Ventas</h1>
                    <div class="flex items-center gap-1 pb-5">
                        <p>Aqui se mostrará el resumen histórico de ventas cada que se guarden los datos en el boton 'guardar' en la seccion de <RouterLink :to="{name: 'sales'}" class="text-lg font-bold underline text-sky-800">ventas</RouterLink></p>
                    </div>
                    <div v-if="salesBackups.length>0" class="flex items-center justify-around w-full my-5">
                        <p class="py-[2px] px-[10px] text-3xl text-white bg-green-700 rounded-2xl shadow-sm" >Ventas</p>
                        <p class="text-3xl text-white bg-red-800 rounded-2xl py-[2px] px-[10px] shadow-sm" >Gastos</p>
                    </div>
                    <section  class="flex w-full justify-evenly" >
                        <!-- Sales History -->
                        <div class="flex flex-col w-[47%]">
                            <div v-for="(arr) in salesBackups" :key="arr" class="flex flex-col gap-1 p-3 py-2 mb-4 overflow-auto bg-gray-200 shadow-md full max-h-96 min-h-96 rounded-xl" >
                                <div class="flex flex-wrap justify-center gap-1 shadow-md bg-slate-50 rounded-xl">
                                    <p class="font-medium text-sky-900">Fecha de guardado: </p>
                                    <p class="font-bold text-sky-900">{{ arr[0][0].itemDate.substring(0, 9) }}</p>
                                </div>
                                <div class="flex flex-wrap justify-center gap-1 shadow-md bg-slate-50 rounded-xl">
                                    <p class="text-base font-bold text-sky-900">{{ arr.length }} ventas</p>
                                </div>
                                <div v-for="(elm) in arr" :key="elm" class="px-3 py-2 shadow-md bg-slate-50 rounded-xl">
                                    <div v-for="(item) in elm" :key="item"  class="flex flex-wrap">
                                        <p v-if="item.itemName" class="text-sky-700">{{ item.itemAmount }} {{ item.itemName }} de ${{ item.itemPrice }}</p>
                                        <div class="flex flex-wrap justify-center w-full gap-1">
                                            <p v-if="item.grandTotal" class="font-medium text-sky-900">Total en esta venta:</p>
                                            <p v-if="item.grandTotal" class="font-bold text-sky-900">${{ item.grandTotal }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="w-[47%] ">
                            <!-- TO FIX: when user clicks on add expense button, button pushes an array, that's causing errors while trying to iterate through it, need to fix by changing the method to push from an array to an object (when user clicks on add expense button it should push an object instead of an array) -->
                            <!-- Expenses History -->
                            <div v-for="(item) in backupExpenses" :key="item" class="flex flex-col gap-1 p-3 py-2 mb-4 overflow-auto bg-gray-200 shadow-md full max-h-96 min-h-96 rounded-xl">
                                <div class="flex flex-wrap justify-center gap-1 shadow-md bg-slate-50 rounded-xl">
                                    <p class="font-medium text-sky-900">Fecha de guardado:</p>
                                    <p class="font-bold text-sky-900">{{ item[0].expenseDate.substring(0, 9) }}</p>
                                </div>
                                <div v-for="(elm) in item" :key="elm">
                                    <div class="flex flex-col justify-start gap-1 p-1 mb-1 bg-white shadow-md rounded-xl">
                                        <div class="flex flex-wrap gap-1">
                                            <p class="text-base text-sky-900 ">Motivo:</p>
                                            <p class="text-base font-semibold text-sky-900">'{{ elm.expenseReason }}' </p>
                                        </div>
                                        <div class="flex flex-wrap gap-1">
                                            <p class="text-base font-base text-sky-900"> Gasto:</p>
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
import { computed, onMounted } from 'vue';
const backupSalesHistory = UseBackupHistorySales();

let salesBackups = computed(() => backupSalesHistory.getBackupsSalesHistory);
let backupExpenses = computed(() => backupSalesHistory.getBackupsExpensesHistory);
// console.log('salesBackups:', salesBackups);


onMounted(() => {
    console.log('salesBackups:', backupSalesHistory.getBackupsSalesHistory);
});

</script>

<style scoped>

</style>