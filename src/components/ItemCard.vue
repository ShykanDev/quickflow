<template class="">
    <div class="relative flex flex-col items-center gap-2 px-2 py-3 transition-transform duration-200 bg-white shadow-md y-2 min-w-44 max-w-44 rounded-xl sm:min-h-72 sm:min-w-52 hover:scale-105 hover:border hover:border-purple-300">
        <!-- <h3 v-if="amount >0" class="absolute top-0 text-2xl font-bold text-purple-400 select-none right-2 font-poppins">{{ amount }}</h3> -->
        <h2 class="pt-1 text-xl font-medium select-none font-poppins text-slate-600 sm:text-2xl">{{ props.itemName }}</h2>
        <!-- <img class="object-contain w-24 h-24 select-none " :src="props.itemImg" alt=""> -->
            <div class="flex flex-col items-center w-full gap-2 font-poppins">
            <label class="text-2xl font-semibold select-none user-select-none text-sky-800" for="">${{
                props.itemPrice }}</label>
            <label class="font-medium select-none text-md user-select-none"
                for="">Cantidad</label>
            <div class="relative flex items-center w-full mb-6 justify-evenly">
                <v-icon class="cursor-pointer" @click="handleAmount('remove')" name="md-remove-outlined" scale="1.5"
                    color="#f190f5" />
                <input v-model="amount" type="number" class="w-16 p-1 text-center text-black border rounded-lg border-slate-400"
                    placeholder="0" min="0">
                <v-icon class="cursor-pointer" @click="handleAmount('add')" name="md-addcircle-round" scale="1.5"
                    color="#f190f5" />
            </div>
            </div>
            <h2 @click="notifyParent" class="absolute bottom-0 font-medium select-none left-4 text-sky-800 font-poppins">Total:
                ${{ subtotal }}
            </h2>
        </div>
</template>

<script lang="ts" setup>
import ISummary from '@/interface/ISummary';
import { UseUserStoreValues } from '@/store/UseStoreValues';
import { computed, defineProps, ref, watch } from 'vue';
import { defineEmits } from 'vue';
const props = defineProps({
    itemName: String,
    itemImg: String,
    itemPrice: {
    type:Number,
    required:true,
    },
    saveValues:Boolean
})

const amount = ref(0);
const subtotal = computed(()=> amount.value * props.itemPrice)
const saveValues = computed(()=>props.saveValues)
const handleAmount = (operation: string) => {
    if (amount.value <=0 && operation === 'remove') {
        return
    }
    if (operation === 'add') {
        amount.value += 1
    } else if (operation === 'remove') {
        amount.value -= 1
    }
}

const addValuesToStore = ()=> {
    try {
        const newSell:ISummary = {
            itemName: props.itemName,
            itemPrice:props.itemPrice,
            itemAmount:amount.value,
            itemSubtotal: subtotal.value,
        }
        UseUserStoreValues().pushToSummary(newSell);
    } catch (error) {
        console.log(error);
    }
}

const emmit = defineEmits(['alertMessage']);

const notifyParent = ()=>{
    emmit('alertMessage', props.itemName)
}

watch(saveValues,(newVal)=>{
    if(newVal && amount.value > 0) {
        addValuesToStore()
    }
})

</script>

<style scoped></style>
<!-- 
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
</script> -->
