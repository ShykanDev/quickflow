<template>
    <div class="">
       <MainLayout>
            <template #main>
                <div class="fixed top-0 bottom-0 left-0 right-0 bg-slate-100 -z-20">
                </div>
                <div class="flex flex-col items-center animate-fade-up">
                    <h1 class="pt-2 text-xl font-medium text-sky-800 font-poppins">Historial De Ventas</h1>
                    <div class="flex items-center gap-1">
                        <p>Aqui se mostrará el resumen histórico de ventas cada que se guarden los datos en el boton 'guardar' en la seccion de <RouterLink :to="{name: 'sales'}" class="text-lg font-bold underline text-sky-800">ventas</RouterLink></p>
                    </div>
                    <section  class="flex w-full bg-purple-500 justify-evenly" >
                        <!-- Sales History -->
                        <div class="flex flex-col w-2/4">
                            <div v-for="(arr) in salesBackups" :key="arr" class="flex flex-col gap-1 p-3 py-2 mb-4 overflow-auto bg-green-400 shadow-md full max-h-96 min-h-96 rounded-xl" >
                                <p>Ventas</p>
                                <div v-for="(elm) in arr" :key="elm">
                                    <div v-for="(item) in elm" :key="item">
                                        <p v-if="item.itemName">{{ item.itemAmount }} {{ item.itemName }}</p>
                                        <p v-if="item.grandTotal">Total en esta venta: {{ item.grandTotal }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="w-2/4 bg-red-600">
                            <!-- TO FIX: when user clicks on add expense button, button pushes an array, that's causing errors while trying to iterate through it, need to fix by changing the method to push from an array to an object (when user clicks on add expense button it should push an object instead of an array) -->
                            <!-- Expenses History -->
                            <div v-for="(item) in backupExpenses" :key="item" class="flex flex-col gap-1 p-3 py-2 mb-4 overflow-auto bg-green-400 shadow-md full max-h-96 min-h-96 rounded-xl">
                                <p>Gastos</p>
                                <div v-for="(elm) in item" :key="elm">
                                    <p>Motivo:{{ elm.expenseReason }}</p>
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