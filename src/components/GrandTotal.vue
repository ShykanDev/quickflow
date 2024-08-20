<template>
    <div class="max-w-48">
        <h2 class="p-2 text-xl font-semibold text-white bg-purple-400 rounded-lg font-poppins">Gran Total: ${{ UseUserStoreValues().getGrandTotal }} </h2>
    </div>
</template>

<script lang="ts" setup>
import { UseUserStoreValues } from '@/store/UseStoreValues';

</script>

<style scoped>

</style>