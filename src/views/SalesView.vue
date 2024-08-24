<template>
    <div class="">
       <MainLayout>
            <template #main>
                <div class="fixed top-0 bottom-0 left-0 right-0 bg-slate-100 -z-20">
                </div>
                <div class="flex flex-col gap-4 min-h-dvh pb-9 animate-fade-down">
                    <h1 @click="sumExpenses" class="text-3xl font-medium font-poppins text-sky-800 ">Ventas</h1>
                    <RouterLink :to="{name:'home'}" class="flex items-center gap-2 p-1 ml-3 bg-white shadow-md min-w-32 text-sky-800 rounded-2xl max-w-44">
                        <v-icon name="hi-solid-home" color="#246D93" scale="1.6" />
                        <h2 class="text-xl font-">Ir al inicio</h2>
                    </RouterLink>
                    <div class="flex items-center gap-2 ml-5 text-lg justify-left font-poppins ">
                        <h2 class="text-lg font-medium text-emerald-700">Ingresos Totales: </h2>
                        <h2 v-if="showTotal" class="text-xl font-medium text-emerald-700">${{ totalEarned }}.00</h2>
                        <h2 v-if="!showTotal" class="text-xl font-medium text-emerald-700" >$****</h2>
                        <v-icon class="cursor-pointer" @click="toggleShowTotal" v-if="showTotal" name="io-eye-off-sharp" scale="1.5" color="#075985" />
                        <v-icon class="cursor-pointer" @click="toggleShowTotal" v-if="!showTotal" name="io-eye-sharp" scale="1.5" color="#075985" />
                    </div>
                    <div class="flex items-center gap-2 ml-5 text-lg justify-left font-poppins ">
                        <h2 class="text-lg font-medium text-red-900">Gastos:  </h2>
                        <h2 v-if="showTotal" class="text-xl font-medium text-red-900">${{ expenses }}</h2>
                        <h2 v-if="!showTotal" class="text-xl font-medium text-red-900" >$****</h2>
                    </div>
                    <div class="flex flex-col items-start w-9/12 gap-2 ml-5 text-lg font-poppins">
                        <div class="flex items-center gap-2">
                            <h2 class="text-lg font-medium text-sky-800">Agregar Gasto</h2>
                            <v-icon class="cursor-pointer" @click="toggleShowAddExpense" v-if="!showAddExpense" name="md-addbox" scale="1.2" color="#075985" />
                            <v-icon class="cursor-pointer" @click="toggleShowAddExpense" v-if="showAddExpense" name="ri-checkbox-indeterminate-fill" scale="1.2" color="#075985" />
                        </div>
                        <section v-if="showAddExpense" class="flex flex-col items-start gap-2 animate-fade-right">
                        <h2 class="text-lg font-medium text-sky-800">Motivo</h2>
                        <input v-model="expenseReason" class="w-full shadow-sm focus:outline-none" type="text" placeholder="Compré agua y gas" >
                        <h2 class="text-lg font-medium text-sky-800">Gasto</h2>
                        <div class="flex items-center bg-white shadow-sm">
                            <p>$</p>
                            <input v-model="expenseAmount" class="w-full bg-transparent focus:outline-none" type="number" placeholder="250"  min="0">
                        </div>
                        <div>
                            <p v-if="isInfo" class="text-emerald-700">{{ infoMessage }}</p>
                            <p v-if="isError" class="text-sm font-semibold text-red-700">{{ errorMessage }}!</p>
                        </div>
                        <div>
                            <button @click="addExpense" class="p-1 text-xl text-white rounded-lg bg-sky-700 font-poppins">Añadir Gasto</button>
                        </div>
                    </section>
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
import { computed, onMounted, reactive, Ref, ref } from 'vue';
import moment from 'moment';
import { storeToRefs } from 'pinia';



const salesStore = UseSalesStore();
const salesHistory = computed(() => UseSalesStore().getSalesHistory);
let totalEarned = ref(0);


// dynamic value to toogle the view of the total amount
let showTotal = ref(false);  



//  function to toggle the showTotal variable
const toggleShowTotal = () => showTotal.value = !showTotal.value;

const totalEarnings = [];

let expenses = ref(0);
const calcTotal = () => {
    salesHistory.value.forEach((sale) => {
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
        errorMessage.value = 'No puedes dejar un campo vacío';
        return;
    } else {
        isError.value = false;
    }
    // value to push to salesHistory (Ej:  {expenseReason: 'Tuve que pagar la luz', expenseAmount: 250, expenseDate: 'DD/MM/YY HH:mm:ss'})
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
        expenseReason.value = '';
        expenseAmount.value = 0;
        isError.value = false;
        console.log('Expense added successfully', salesStore.getUserExpenses);

        // value that have the total amount of expenses reduced from the userExpenses array
        const valueReduced = salesStore.getUserExpenses.reduce((a, b) => a + b.expenseAmount, 0);
        expenses.value = valueReduced;
        isInfo.value = true;
        infoMessage.value = 'Gasto añadido correctamente';
        timeoutId = setTimeout(() => {
            isInfo.value = false;
        }, 3500);
    } catch (error) {
        console.error('Could not add expenses',  error);
        
    }
}

// function to reducce the amount of expenses from the userExpenses array
const sumExpenses = () => {
    let totalUserExpensesAmount = [];
    try {
         salesStore.getUserExpenses.forEach((e) => {
            totalUserExpensesAmount.push(e.expenseAmount)  
         });
        let finalResult = totalUserExpensesAmount.reduce((a,b) => a+b)
        expenses.value = finalResult;
    } catch (error) {
        console.log('Could not reduce expenses', error);
    }
}

onMounted(() => {
    if(salesHistory.value.length>0) calcTotal();
})
</script>

<style scoped>

</style>