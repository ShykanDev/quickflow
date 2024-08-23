<template>
    <div class="">
       <MainLayout>
            <template #main>
                <div class="fixed top-0 bottom-0 left-0 right-0 bg-slate-100 -z-20">
                </div>
                <div class="flex flex-col items-center animate-fade-up">
                    <h1 class="pt-2 text-xl font-medium text-sky-800 font-poppins">Historial De Ventas</h1>
                    <div class="flex items-center gap-1">
                        <p>Aqui se mostrará el resumen histórico de ventas cada que se guarden los datos en el boton 'guardar' en la seccion de</p>
                        <RouterLink :to="{name: 'sales'}" class="text-lg font-bold underline text-sky-800">ventas</RouterLink>
                    </div>
                </div>
            </template>
       </MainLayout>
    </div>
</template>

<script lang="ts" setup>
import MainLayout from '@/layout/MainLayout.vue';


</script>

<style scoped>

</style>