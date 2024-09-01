<template class="">
    <div  class="relative flex flex-col items-center gap-2 px-2 py-3 transition-transform duration-200 bg-white shadow-md select-none y-2 min-w-44 max-w-44 rounded-xl sm:min-w-52 hover:scale-105 hover:border hover:border-sky-800 ">
        <!-- <h3 v-if="amount >0" class="absolute top-0 text-2xl font-bold text-purple-400 select-none right-2 font-poppins">{{ amount }}</h3> -->
        <h2 class="pt-1 text-xl font-medium select-none font-poppins text-slate-600 sm:text-2xl">{{ props.itemName }}</h2>
        <img v-if="showImages" class="object-contain w-24 h-24 select-none animate-fade-up" :src="props.itemImg" alt=""> 
            <div class="flex flex-col items-center w-full gap-2 font-poppins">
            <label class="text-2xl font-semibold select-none user-select-none text-sky-800" for="">${{
                props.itemPrice }}</label>
                <div @click="toggleShowDesciption" v-if="props.itemDescription.length>=1" class="flex items-center justify-center w-full gap-1 cursor-pointer">
                    <p v-if="!showDescription" class="font-medium select-none text-md user-select-none">Ver más</p>
                    <p v-if="showDescription" class="font-medium select-none text-md user-select-none">Ver menos</p>
                    <v-icon v-if="!showDescription" name="md-expandcircledown-round" scale="1.5" color="#075985" />
                    <v-icon v-if="showDescription" name="md-expandcircledown-round" scale="1.5" color="#075985" flip="vertical"/>
                </div>
                <div v-if="props.itemDescription.length>=1 && showDescription" class="box-border flex flex-col items-start justify-start w-full p-2 overflow-auto shadow-sm rounded-xl animate-fade-up">
                    <div v-for="(descrip) in props.itemDescription" :key="descrip" class="flex items-center gap-2 ">
                        <v-icon name="bi-dot" scale="1.5" color="#075985" />
                        <p  class="font-medium text-sky-800">{{ descrip }}</p>
                    </div>
                    <!-- <ul class="list-inside" >
                        <li v-for="(descrip) in props.itemDescription" :key="descrip" class="flex items-center gap-2 font-medium text-sky-800">
                            {{ descrip }}
                        </li>
                    </ul> -->
                </div>
            <label class="font-medium select-none text-md user-select-none"
                for="">Cantidad</label>
            <div class="relative flex items-center w-full mb-6 justify-evenly">
                <v-icon class="cursor-pointer" @click="handleAmount('remove')" name="md-remove-outlined" scale="1.5"
                    color="#075985" />
                <input v-model="amount" type="number" class="w-16 p-1 text-center text-black border rounded-lg select-none border-slate-400 placeholder:select-none"
                    placeholder="0" min="0">
                <v-icon class="cursor-pointer" @click="handleAmount('add')" name="md-addcircle-round" scale="1.5"
                    color="#075985" />
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
import { UseUserPreferences } from '@/store/UseUserPreferences';
import { computed, defineProps, ref, watch } from 'vue';
import { defineEmits } from 'vue';

// User Preferences Store
const storeUserPreferences = UseUserPreferences();

// Boolean value for show images
let showImages = computed(()=>storeUserPreferences.getShowImages)



const props = defineProps({
    itemName: String,
    itemImg: String,
    itemPrice: {
    type:Number,
    required:true,
    },
    itemDescription:{
        type:String,
        required:false,
        default:""
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

watch(subtotal,(newVal, oldVal)=>{
    UseUserStoreValues().updateGrandTotal(newVal - oldVal);
})  



// function to toggle list of products for items that have description
let showDescription = ref(false)
const toggleShowDesciption = ()=> {
    showDescription.value = !showDescription.value;  
    console.log('showDescription:', showDescription.value);
}
</script>

<style scoped></style>
