<template>
    <div class="">
       <MainLayout>
            <template #main>
                <div class="flex flex-col gap-4">
                    <h1 class="text-2xl font-medium font-poppins">Ventas</h1>
                    <div v-for="(sale,index) in salesHistory" :key="index" class="text-white bg-black min-w-24 min-h-44">
                        <div v-for="(item,index) in sale" :key="index">
                            <p v-if="item.itemName">{{item.itemAmount}} {{ item.itemName }} ${{ item.itemSubtotal }}</p>
                            <!-- We gonna sum all the subtotals -->
                        </div>
                        <p>Total: ${{ sale[0].grandTotal }}.00 </p>
                    </div>
                </div>
            </template>
       </MainLayout>
    </div>
</template>

<script lang="ts" setup>
import MainLayout from '@/layout/MainLayout.vue';
import { UseSalesStore } from '@/store/UseSalesStore';
import { computed, ref } from 'vue';

const salesHistory = computed(() => UseSalesStore().getSalesHistory);

</script>

<style scoped>

</style>