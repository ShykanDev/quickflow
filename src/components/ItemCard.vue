<template class="">
    <div class="relative flex flex-col items-center gap-2 px-2 py-3 bg-white shadow-md y-2 min-w-44 max-w-44 rounded-xl sm:min-h-72 sm:min-w-52">
        <h2 class="text-xl font-medium select-none font-poppins text-slate-600 sm:text-2xl">{{ props.itemName }}</h2>
        <img class="object-contain w-24 h-24 select-none user-select-none" :src="props.itemImg" alt="">
        <div class="flex flex-col items-start w-full gap-2 font-poppins">
            <label class="pl-4 text-lg font-semibold select-none text-md user-select-none" for="">${{ props.itemPrice }}</label>
            <label class="pl-4 font-medium select-none text-md user-select-none" for="">Cantidad</label>
            <div class="relative flex items-center w-full mb-6 justify-evenly">
                <v-icon class="cursor-pointer" @click="handleAmount('remove')" name="md-remove-outlined" scale="1.5" color="#f190f5" />
                <input v-model="amount" type="number" class="w-16 p-1 text-black border rounded-lg border-slate-400" placeholder="0" min="0">
                <v-icon class="cursor-pointer" @click="handleAmount('add')" name="md-addcircle-round" scale="1.5" color="#f190f5" />
            </div>
        </div>
        <h2 class="absolute bottom-0 font-medium select-none left-4 text-sky-800 font-poppins">Total: ${{ amount * Number(props.itemPrice) }}</h2>
    </div>
</template>

<script lang="ts" setup>
import { defineProps, ref } from 'vue';

const props = defineProps({
    itemName: String,
    itemImg: String,
    itemPrice: String,
})

const amount = ref(0);

const handleAmount = (operation: string) => {
    if (amount.value === 0 && operation === 'remove') {
       return
    }
    if (operation === 'add') {
        amount.value += 1
    } else if (operation === 'remove') {
        amount.value -= 1
    }
}
</script>

<style scoped></style>