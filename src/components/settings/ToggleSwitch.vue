<template>
    <div class="">
        <div :class="{'bg-sky-200': !isToggled , 'bg-sky-800' : isToggled }" class="cursor-pointer transition-colors duration-500 ease-in-out box-border flex items-center w-7 h-4 px-[2px]  rounded-full shadow-sm">
            <div :class="{'translate-x-full' : isToggled, 'translate-x-0': !isToggled}" class="w-3 h-3 transition-transform duration-500 ease-in-out bg-white rounded-full">
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch} from 'vue';
import { defineProps } from 'vue';


const props = defineProps({
    saveValues:{
        type:Boolean,
        required:true,
        default: false
    }
})
let propValue = computed(()=>props.saveValues);

const isToggled = ref(props.saveValues);
const toggleValue = () => isToggled.value = !isToggled.value;

watch(propValue,(newVal) => {
        toggleValue();
})



</script>

<style scoped>

</style>