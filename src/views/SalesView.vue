<template>
    <div class="">
       <MainLayout>
            <template #main>
                <div class="flex flex-col">
                    <h1 class="text-2xl font-medium font-poppins">Ventas</h1>
                    
                </div>
            </template>
       </MainLayout>
    </div>
</template>

<script lang="ts" setup>
import MainLayout from '@/layout/MainLayout.vue';
import { UseSalesStore } from '@/store/UseSalesStore';
import { ref } from 'vue';

const salesHistory = ref(UseSalesStore().getSalesHistory)

</script>

<style scoped>

</style>