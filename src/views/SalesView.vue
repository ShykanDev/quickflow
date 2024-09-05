<template>
    <div class="">
       <MainLayout>
            <template #main>
                <div class="fixed top-0 bottom-0 left-0 right-0 bg-slate-100 -z-20">
                </div>
                <div class="flex flex-col w-full gap-4 min-h-dvh pb-9 animate-fade-down">
                    <h1 class="text-3xl font-medium font-poppins text-sky-800">Ventas</h1>
                    <RouterLink :to="{name:'home'}" class="flex items-center gap-2 p-1 ml-3 bg-white shadow-md animate-delay-200 animate-fade-down min-w-32 text-sky-800 rounded-2xl max-w-44">
                        <v-icon name="hi-solid-home" color="#246D93" scale="1.6" />
                        <h2 class="text-xl font-">Ir al inicio</h2>
                    </RouterLink>
                    <div class="flex items-center pl-3">
                        <div  class="flex p-1 bg-white shadow-md rounded-2xl">
                            <v-icon class="pr-1 bg-white cursor-pointer rounded-l-3xl"  name="gi-receive-money" scale="1.5" color="#246D93" />
                            <h2 class="text-lg font-medium text-sky-800">Ingresos Netos: </h2>
                            <div class="flex items-center pl-2 text-lg font-medium justify-left font-poppins">
                                <h2 v-if="showTotal" class="pr-2 text-xl text-sky-800">${{ totalEarned }}</h2>
                                <h2 v-if="!showTotal" class="pr-2 text-xl text-sky-800" >$****</h2>
                                <v-icon class="cursor-pointer" @click="toggleShowTotal" v-if="showTotal" name="io-eye-off-sharp" scale="1.5" color="#075985" />
                                <v-icon class="cursor-pointer" @click="toggleShowTotal" v-if="!showTotal" name="io-eye-sharp" scale="1.5" color="#075985" />
                            </div>
                        </div>
                    </div>
                    <div  class="flex items-center pl-3">
                        <div @click="toggleShowDetailedInfo" class="flex p-1 px-2 bg-white shadow-md cursor-pointer rounded-2xl">
                            <h2 class="text-lg font-medium text-sky-800">Ver Informacion detallada</h2>
                            <div class="flex items-center pl-2 text-lg justify-left font-poppins">
                                <v-icon  v-if="!showDetailedInfo" class="cursor-pointer" name="md-expandcircledown-round" scale="1.5" color="#075985" />
                                <v-icon  v-if="showDetailedInfo"  class="cursor-pointer" name="md-expandcircledown-round" scale="1.5" color="#075985" flip="vertical"  />
                            </div>
                        </div>
                    </div>
                <div class="flex justify-center w-dvw ">
                    <section v-if="showDetailedInfo" class="box-border w-full py-2 bg-white shadow-md rounded-2xl animate-fade-up ">
                        <div class="flex flex-wrap items-center justify-center w-full gap-1">
                            <div class="flex items-center gap-2 px-1 ml-1 text-lg text-white bg-red-800 rounded-2xl justify-left font-poppins">
                                <v-icon class="cursor-pointer "  name="gi-pay-money" scale="1.5" color="white" />
                            <h2 class="text-lg font-medium text-white">Gastos:  </h2>
                            <h2 v-if="showTotal" class="text-xl font-medium ">${{ expenses }}</h2>
                            <h2 v-if="!showTotal" class="text-xl font-medium " >$****</h2>
                        </div>
                        <div class="flex items-center gap-2 ml-2 text-lg justify-left font-poppins text-white bg-[#3EB489] rounded-2xl px-1">
                            <v-icon class="cursor-pointer "  name="gi-money-stack" scale="1.5" color="white" />
                            <h2 class="text-lg font-medium">Balance Final:  </h2>
                            <h2 v-if="showTotal" class="text-xl font-medium">${{ finalBalance }}</h2>
                            <h2 v-if="!showTotal" class="text-xl font-medium" >$****</h2>
                        </div>
                    </div>
                        <PieChart v-if="showChart" :labels="['Gastos', 'Balance Final']"  :dataSet="[ expenses, finalBalance]" />
                    <div class="flex flex-col items-start w-full gap-2 ml-5 text-lg font-poppins">
                        <div class="flex items-center gap-2">
                            <h2 class="text-lg font-medium text-sky-800">Agregar Gasto</h2>
                            <v-icon class="cursor-pointer" @click="toggleShowAddExpense" v-if="!showAddExpense" name="md-addbox" scale="1.2" color="#075985" />
                            <v-icon class="cursor-pointer" @click="toggleShowAddExpense" v-if="showAddExpense" name="ri-checkbox-indeterminate-fill" scale="1.2" color="#075985" />
                        </div>
                     
                        <section v-if="showAddExpense" class="flex flex-col items-start gap-2 animate-fade-right">
                        <h2 class="text-lg font-medium text-sky-800">Motivo</h2>
                        <input v-model="expenseReason" class="w-full border-b-[1px] border-sky-800 shadow-sm focus:outline-none" type="text" placeholder="Compré agua y gas" >
                        <h2 class="text-lg font-medium text-sky-800">Gasto</h2>
                        <div class="flex items-center bg-white shadow-sm">
                            <p>$</p>
                            <input v-model="expenseAmount" class="w-full border-b-[1px] border-sky-800 shadow-sm focus:outline-none" type="number" placeholder="250"  min="0">
                        </div>
                        <div>
                            <p  v-if="isInfo" class="px-1 text-xl font-medium text-white rounded-xl bg-sky-700 animate-jump">{{ infoMessage }}!</p>
                            <p v-if="isError" class="text-sm font-semibold text-red-700">{{ errorMessage }}!</p>
                        </div>
                        <div>
                            <button @click="addExpense" class="p-1 text-xl text-white rounded-lg bg-sky-700 font-poppins">Añadir Gasto</button>
                        </div>
                      
                    </section>
                    </div>
                    </section>
                </div>
                <div class="flex justify-end w-full pr-6 mt-9">
                            <button @click="pushNewBackup" class="p-1 text-sm text-white rounded-lg bg-sky-700 font-poppins min-w-48">Guardar y Reestablecer Datos</button>
                        </div>
                    <section  class="flex flex-wrap justify-center gap-5">
                        <div v-for="(sale,index) in salesHistory" :key="index" class="box-border relative flex flex-col items-start w-11/12 px-2 transition-transform duration-300 ease-out bg-white shadow-md tex8-black py-7 rounded-xl justify-evenly min-w-24 min-h-44 font-poppins hover:border-sky-800 hover:border hover:scale-105">
                            <div class="absolute top-1 right-1">
                                <p class="text-sm font-medium text-sky-800" >Fecha: {{ sale[0].itemDate }}</p> 
                            </div>
                            <div v-for="(item,index) in sale" :key="index" class="flex items-center justify-center w-full">
                                <!-- <p v-if="item.itemName" class="text-lg font-medium" >{{item.itemAmount}} {{ item.itemName }} ${{ item.itemSubtotal }}</p> -->
                                 <div v-if="item.itemName && item.itemName !== 'Otros'" class="flex flex-wrap items-center justify-start w-full gap-1">
                                    <p class="text-lg font-medium text-sky-700" v-if="item.itemAmount">{{ item.itemAmount }}</p>
                                    <p class="text-lg font-medium text-sky-700" v-if="item.itemName">{{ item.itemName }}</p>
                                    <p class="text-lg font-medium underline text-sky-900" v-if="item.itemSubtotal">${{ item.itemSubtotal}}</p>
                                 </div>
                                 <div v-if="item.itemName && item.itemName === 'Otros'" class="flex flex-wrap items-center justify-start w-full gap-1">
                                    <!-- <p class="text-lg font-medium text-sky-700" v-if="item.itemAmount">{{ item.itemAmount }}</p> -->
                                    <p class="text-lg font-medium text-sky-700" v-if="item.itemName">{{ item.itemName }}</p>
                                    <p class="text-lg font-medium underline text-sky-900" v-if="item.itemSubtotal">${{ item.itemSubtotal}}</p>
                                 </div>
                            </div>
                            <p class="pt-2 text-xl font-bold text-sky-900">Total: ${{ sale[0].grandTotal }}.00 </p>
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
import { UseBackupHistorySales} from '@/store/UseBackupHistorySales';
import { computed, onMounted, reactive, Ref, ref } from 'vue';
import moment from 'moment';
import { storeToRefs } from 'pinia';
import router from '@/router';
import PieChart from '@/components/charts/PieChart.vue';


// sales store (pinia)
const salesStore = UseSalesStore();
let salesHistory =  UseSalesStore().getSalesHistory;

// sales backup store (pinia)
const backupSalesStore = UseBackupHistorySales();


let totalEarned = ref(0);


// dynamic value to toogle the view of the total amount
let showTotal = ref(false);  

// value to show the graphic pie chart
let showChart = ref(true);

//  function to toggle the showTotal variable
const toggleShowTotal = () => showTotal.value = !showTotal.value;

const totalEarnings = [];

let expenses = ref(0); // variable to store the expenses
// we need to replace this function with the one in the store */*/*/*
const calcTotal = () => {
    salesHistory.forEach((sale) => {
       totalEarnings.push(sale[0].grandTotal) 
    })
    totalEarned.value = totalEarnings.reduce((a, b) => a + b);
    
}

// info boolean that will be used to show/hide an info message
let isInfo = ref(false);

// info message 
let infoMessage = ref('');

// error boolean that will be used to show/hide an error message
const isError = ref(false);

// error message
let errorMessage = ref('');

// values to add expenses
let expenseReason = ref('');
let expenseAmount = ref(0);


let timeoutId = null;

// function to toggle the view of add expense
let showAddExpense = ref(false);

const toggleShowAddExpense = () => {
    showAddExpense.value = !showAddExpense.value;
}
// function to add expenses
const addExpense = () => {
    // Verify if expenseReason and expenseAmount are not empty if so, set isError to true and return the function
    if(!expenseReason.value || !expenseAmount.value) {
        isError.value = true;
        errorMessage.value = 'Verifica haber rellenado todos los campos';
        return;
    } else {
        isError.value = false;
    }
    // value to push to salesHistory (Ej:  {expenseReason: 'Tuve que pagar la luz', expenseAmount: 250, expenseDate: 'DD/MM/YY HH:mm:ss'})
    showChart.value = false;
    const valueToPush = reactive({
        expenseReason: expenseReason.value,
        expenseAmount: expenseAmount.value,  
        expenseDate: moment().format('DD/MM/YY HH:mm:ss')
    })
   if(timeoutId) {
        clearTimeout(timeoutId);
    }
    try {
        isInfo.value = false;
        salesStore.pushUserNewExpense(valueToPush);
        // salesStore.pushUserNewExpense(valueToPush);
        expenseReason.value = '';
        expenseAmount.value = 0;
        isError.value = false;
        console.log('Expense added successfully', salesStore.getUserExpenses);
        expenses.value = salesStore.getExpensesReduced;
        finalBalance.value = totalEarned.value - salesStore.getExpensesReduced;
        isInfo.value = true;
        infoMessage.value = 'Gasto agregado';
        timeoutId = setTimeout(() => {
            isInfo.value = false;
            showChart.value = true;
        }, 2000);
    } catch (error) {
        console.error('Could not add expenses',  error);
        
    }
}

// value to show the final balance
let finalBalance = ref(0);
// function to reduce the amount of expenses from the userExpenses array

// boolean value to toggle the view of the detailed info
let showDetailedInfo = ref(false);

// function to toggle the view of the detailed info 
const toggleShowDetailedInfo = () => {
    showDetailedInfo.value = !showDetailedInfo.value;
    if(showDetailedInfo.value) {
        showTotal.value = true;
    } else {
        showTotal.value = false;
    }
}

const pushNewBackup = ():void => {
    // 
    try {
        if(salesStore.getSalesHistory.length <1) {
            alert('Necesitas tener al menos una venta');
            return            
        }
        if(salesStore.getUserExpenses.length <1){
        
            // push new backup of sales and expenses
            backupSalesStore.pushNewBackupSale(salesHistory);
            backupSalesStore.pushNewBackupExpense([{expenseReason: 'No hay gastos', expenseAmount: 0, expenseDate: moment().format('DD/MM/YY HH:mm:ss')}]);
            salesStore.pushNewFinancialHistory({totalSale:totalEarned.value,totalExpenses: expenses.value, finalBalance: finalBalance.value});

            // reset sales and expenses
            console.log('History Backup:', UseBackupHistorySales().getBackupsExpensesHistory);
            console.log('SalesStore before deletion:', salesStore.getSalesHistory);
            salesStore.resetSalesHistory();
            salesStore.resetUserExpenses();
            console.log('SalesStore after deletion:', salesStore.getSalesHistory);
            salesHistory = salesStore.getSalesHistory;
            salesStore.resetTotalEarnedHistory();
            salesStore.resetTotalEarned();
            totalEarned.value = salesStore.getTotalEarned;

            // once backup is pushed, redirect to history
            router.push({name:'history'})    
            return
        }

        // push new backup of sales and expenses
        backupSalesStore.pushNewBackupSale(salesStore.getSalesHistory);
        backupSalesStore.pushNewBackupExpense(salesStore.getUserExpenses);
        salesStore.pushNewFinancialHistory({totalSale:totalEarned.value,totalExpenses: expenses.value, finalBalance: finalBalance.value});
        // reset sales and expenses
        salesStore.resetTotalEarnedHistory();
        salesStore.resetTotalEarned();
        totalEarned.value = salesStore.getTotalEarned;        
        salesStore.resetSalesHistory();
        salesStore.resetUserExpenses();
        salesHistory = []
    
        //  once backup is pushed, redirect to history
        router.push({name:'history'})    
    } catch (error) {
        console.log('Error while trying to push backup');
    }
}
// function to push all the sales value to the salesHistory array
onMounted(() => {
    if(salesHistory.length>0) {
        totalEarned.value = salesStore.getTotalEarned;
        expenses.value = salesStore.getExpensesReduced;
        finalBalance.value = salesStore.getTotalEarned - salesStore.getExpensesReduced;
    }
    console.log('total gastos: ', salesStore.getUserExpenses);
    
})
</script>

<style scoped>

</style>