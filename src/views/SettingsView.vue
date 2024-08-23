<template>
    <div class="">
       <MainLayout>
            <template #main>
                <div class="fixed top-0 bottom-0 left-0 right-0 bg-slate-100 -z-20">
                </div>
                <div>
                    <h1 class="pt-2 text-xl font-medium text-sky-800 font-poppins">Configuracion</h1>
                    <div class="">
                        <div class="flex items-center ">
                            <p>Mostrar Imagenes</p>
                            <ToggleSwitch/>
                        </div>
                        <div class="flex items-center ">
                            <p>Mostrar Imagenes</p>
                            <ToggleSwitch/>
                        </div>
                    </div>
                </div>
            </template>
       </MainLayout>
    </div>
</template>

<script lang="ts" setup>
import ToggleSwitch from '@/components/settings/ToggleSwitch.vue';
import MainLayout from '@/layout/MainLayout.vue';


</script>

<style scoped>

</style>