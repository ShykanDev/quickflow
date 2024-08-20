<!-- <template class="">
    <div
        class="relative flex flex-col items-center gap-2 px-2 py-3 transition-transform duration-200 bg-white shadow-md y-2 min-w-44 max-w-44 rounded-xl sm:min-h-72 sm:min-w-52 hover:scale-105 hover:border hover:border-purple-300">
        <h2 class="text-xl font-medium select-none font-poppins text-slate-600 sm:text-2xl">{{ props.itemName }}</h2>
        <img class="object-contain w-24 h-24 select-none " :src="props.itemImg" alt="">
        <div class="flex flex-col items-start w-full gap-2 font-poppins">
            <label v-if="!props.kilo" class="pl-4 text-lg font-semibold select-none text-md user-select-none" for="">${{
                props.itemPrice }}</label>
            <label v-if="!props.kilo" class="pl-4 font-medium select-none text-md user-select-none"
                for="">Cantidad</label>
            <div v-if="!props.kilo" class="relative flex items-center w-full mb-6 justify-evenly">
                <v-icon class="cursor-pointer" @click="handleAmount('remove')" name="md-remove-outlined" scale="1.5"
                    color="#f190f5" />
                <input v-model="amount" type="number" class="w-16 p-1 text-black border rounded-lg border-slate-400"
                    placeholder="0" min="0">
                <v-icon class="cursor-pointer" @click="handleAmount('add')" name="md-addcircle-round" scale="1.5"
                    color="#f190f5" />
            </div>
            <div v-if="props.kilo" class="flex flex-col items-center w-full font-medium font-poppins ">
                <h2 class="font-semibold">Costo total:</h2>
                <div class="flex items-center">
                    <p>$</p>
                    <input class="w-16 p-1 text-black border rounded-lg border-slate-400" type="number"
                        v-model="kiloAmount">
                    <p>MXN</p>
                </div>
            </div>
        </div>
        <h2 v-if="!props.kilo" class="absolute bottom-0 font-medium select-none left-4 text-sky-800 font-poppins">Total:
            ${{ amount * Number(props.itemPrice) }}</h2>
    </div>
</template>

<script lang="ts" setup>
import { UseUserStoreValues } from '@/store/UseStoreValues';
import { defineProps, ref } from 'vue';

const props = defineProps({
    itemName: String,
    itemImg: String,
    itemPrice: String,
    kilo: {
        default: false,
        type: Boolean,
    }
})

const amount = ref(0);
const kiloAmount = ref(0);

const handleAmount = (operation: string) => {
    if (amount.value >0 && amount.value < 1 && operation === 'remove') {

        UseUserStoreValues().reduceGrandTotal(amount.value * Number(props.itemPrice))
        return
    }
    if (operation === 'add') {
        amount.value += 1
        UseUserStoreValues().updateGrandTotal(amount.value * Number(props.itemPrice))
    } else if (operation === 'remove') {
        amount.value -= 1
        UseUserStoreValues().reduceGrandTotal(amount.value * Number(props.itemPrice))
    }
}
</script>

<style scoped></style> -->

<template>
    <div class="relative flex flex-col items-center gap-2 px-2 py-3 transition-transform duration-200 bg-white shadow-md y-2 min-w-44 max-w-44 rounded-xl sm:min-h-72 sm:min-w-52 hover:scale-105 hover:border hover:border-purple-300">
        <h2 class="text-xl font-medium select-none font-poppins text-slate-600 sm:text-2xl">{{ props.itemName }}</h2>
        <img class="object-contain w-24 h-24 select-none " :src="props.itemImg" alt="">
        <div class="flex flex-col items-start w-full gap-2 font-poppins">
            <label v-if="!props.kilo" class="pl-4 text-lg font-semibold select-none text-md user-select-none" for="">${{ props.itemPrice }}</label>
            <label v-if="!props.kilo" class="pl-4 font-medium select-none text-md user-select-none" for="">Cantidad</label>
            <div v-if="!props.kilo" class="relative flex items-center w-full mb-6 justify-evenly">
                <v-icon class="cursor-pointer" @click="handleAmount('remove')" name="md-remove-outlined" scale="1.5" color="#f190f5" />
                <input v-model="amount" type="number" class="w-16 p-1 text-black border rounded-lg border-slate-400" placeholder="0" min="0">
                <v-icon class="cursor-pointer" @click="handleAmount('add')" name="md-addcircle-round" scale="1.5" color="#f190f5" />
            </div>
            <div v-if="props.kilo" class="flex flex-col items-center w-full font-medium font-poppins ">
              <h2 class="font-semibold">Costo total:</h2>
              <div class="flex items-center">
                  <p>$</p>
                  <input oninput="" class="w-16 p-1 text-black border rounded-lg border-slate-400" type="number" v-model="amount">
                  <p>MXN</p>
                </div>
            </div>
        </div>
        <h2 v-if="!props.kilo" class="absolute bottom-0 font-medium select-none left-4 text-sky-800 font-poppins">Total: ${{ amount * Number(props.itemPrice) }}</h2>
    </div>
</template>

<script lang="ts" setup>
import { UseUserStoreValues } from '@/store/UseStoreValues';
import { defineProps, ref } from 'vue';

const props = defineProps({
    itemName: String,
    itemImg: String,
    itemPrice: String,
    kilo: {
        default: false,
        type: Boolean,
    }
});

const amount = ref(0);
const kiloAmount = ref(0);
const prevAmount = ref(0);  // Mantener la cantidad anterior
const userStore = UseUserStoreValues();

const handleAmount = (operation: string) => {
    if (amount.value === 0 && operation === 'remove') {
        return;
    }
    
    let newAmount = amount.value;

    if (operation === 'add') {
        newAmount += 1;
    } else if (operation === 'remove') {
        newAmount -= 1;
    }

    // Calcular la diferencia
    const difference = (newAmount - prevAmount.value) * Number(props.itemPrice);
    
    // Actualizar el grandTotal en la store con la diferencia
    userStore.updateGrandTotal(difference);

    // Actualizar el valor de prevAmount y amount
    prevAmount.value = newAmount;
    amount.value = newAmount;
};
</script>
