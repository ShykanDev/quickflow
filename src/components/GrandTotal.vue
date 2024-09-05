<template>
    <div class="max-w-[48%]">
        <h2 class="p-2 text-xl font-semibold text-white rounded-lg bg-sky-800 font-poppins">Gran Total: ${{ UseUserStoreValues().getGrandTotal }} </h2>
    </div>
</template>

<script lang="ts" setup>
import { UseUserStoreValues } from '@/store/UseStoreValues';

</script>

<style scoped>

</style>