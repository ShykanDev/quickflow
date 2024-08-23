<template>
    <div class="">
        <div @click="toggleValue" :class="{'bg-sky-200': !isToggled , 'bg-sky-800' : isToggled }" class="cursor-pointer transition-colors duration-500 ease-in-out box-border flex items-center w-7 h-4 px-[2px]  rounded-full shadow-sm">
            <div :class="{'translate-x-full' : isToggled, 'translate-x-0': !isToggled}" class="w-3 h-3 transition-transform duration-500 ease-in-out bg-white rounded-full">
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { defineProps } from 'vue';

const toggleValue = () => isToggled.value = !isToggled.value;



const props = defineProps({
    saveValues:{
        type:Boolean,
        required:true,
        default: false
    }
})

const isToggled = ref(props.saveValues);
watch({ props: { saveValues: { deep: true } } }, (newVal) => {
    console.log(newVal);
    if (newVal) {
        toggleValue()
    } else {
        toggleValue()
    }
})

</script>

<style scoped>

</style>