<template>
    <div class="">
        <!-- header content -->
         <div class="fixed top-0 left-0 right-0 z-50 ">
            <!-- <div class="relative flex items-center justify-center p-1 bg-white rounded-b-lg shadow-md font-poppins min-h-12"> -->
            <div class="relative flex items-center justify-center p-1 bg-white rounded-b-lg shadow-md font-poppins min-h-12">
                <div class="absolute left-2">
                    <v-icon name="gi-pig" @click="easterEggPig"  scale="1.7" color="#075985" />
                </div>
                <div v-if="showEasterEgg" class="absolute p-1 bg-white border rounded-tr-lg rounded-bl-lg rounded-br-lg shadow-2xl select-none text-sky-800 -bottom-2 left-10 border-sky-800">
                    <p>{{ easterMessage }}</p>
                </div>
                <h1 class="p-1 text-xl font-medium select-none font-poppins text-sky-800" >Carnitas Estilo Michoacán</h1>
                <div class="absolute right-2">
                    <!-- <v-icon @click="toggleSidebar" class="cursor-pointer" name="md-menu-round" scale="1.5" color="#075985" /> -->
                     <HamMenuAnimated @click="(isMainSideBarOpened) ? isMainSideBarOpened = false : isMainSideBarOpened = true"/>
                </div>
            </div>
         </div>
         <!-- main content -->
          <div class="pt-12">
            <!-- main sidebar -->
             <Transition>
                 <section v-if="isMainSideBarOpened" class="fixed top-0 bottom-0 left-0 right-0 z-40 transition-all duration-500 bg-sky-950 bg-opacity-70 animate-ease-out" />
            </Transition>
            <div  :class="{'translate-x-full': !isMainSideBarOpened, 'translate-x-0': isMainSideBarOpened }" class="fixed bottom-0 right-0 z-40 flex flex-col items-center gap-1 p-1 pt-5 transition-all duration-300 ease-out shadow-xl right-0-0 font-poppins text-sky-950 bg-slate-50 top-8">  
                <RouterLink :to="{name: 'home'}"  class="flex items-center w-full gap-2 text-lg font-medium bg-white rounded-lg shadow-sm ">
                    <v-icon name="hi-solid-home" scale="1.5" color="#075985"/>
                    <div :class="{'bg-sky-800 text-white': route.name === 'home'}" class="flex items-center w-full gap-2 px-1 text-lg font-medium rounded-lg shadow-sm hover:text-white hover:bg-sky-700">
                        <h2>Inicio</h2>
                    </div>
                </RouterLink>
                <RouterLink :to="{name: 'sales'}" class="flex items-center w-full gap-2 text-lg font-medium bg-white rounded-lg shadow-sm ">
                    <v-icon name="md-pointofsale" scale="1.5" color="#075985"/>
                    <div :class="{'bg-sky-900 text-white': route.name === 'sales'}"  class="flex items-center w-full gap-2 px-1 text-lg font-medium rounded-lg shadow-sm hover:text-white hover:bg-sky-700">
                        <h2>Ventas</h2>
                    </div>
                </RouterLink>
                <RouterLink :to="{name: 'history'}" class="flex items-center w-full gap-2 text-lg font-medium bg-white rounded-lg shadow-sm ">
                    <v-icon name="fa-history" scale="1.5" color="#075985"/>
                    <div :class="{'bg-sky-900 text-white': route.name === 'history'}"  class="flex items-center w-full gap-2 px-1 text-lg font-medium rounded-lg shadow-sm hover:text-white hover:bg-sky-700">
                        <h2>Historial De Ventas</h2>
                    </div>
                </RouterLink>
                <div class="flex items-center w-full gap-2 text-lg font-medium bg-white rounded-lg shadow-sm ">
                    <v-icon name="bi-image-fill" scale="1.5" color="#075985"/>
                    <div @click="togglePhotos" class="flex items-center w-full gap-2 px-1 text-lg font-medium rounded-lg shadow-sm hover:text-white hover:bg-sky-700">
                        <h2>Mostrar Fotos</h2>
                        <ToggleSwitch :save-values="savePhotos" />
                    </div>
                </div>
                <!-- <RouterLink :to="{name: 'settings'}" class="flex items-center w-full gap-2 text-lg font-medium bg-white rounded-lg shadow-sm ">
                    <v-icon name="md-settingsapplications-sharp" scale="1.5" color="#075985"/>
                    <div :class="{'bg-sky-900 text-white': route.name === 'settings'}"  class="flex items-center w-full gap-2 px-1 text-lg font-medium rounded-lg shadow-sm hover:text-white hover:bg-sky-700">
                        <h2>Configuración</h2>
                    </div>
                </RouterLink> -->
            </div>
            <slot name="main">

            </slot>
          </div>
    </div>
</template>

<script lang="ts" setup>
import HamMenuAnimated from '@/components/home/HamMenuAnimated.vue';
import ToggleSwitch from '@/components/settings/ToggleSwitch.vue';
import { UseEasterEggs } from '@/store/UseEasterEggs';
import { UseUserPreferences } from '@/store/UseUserPreferences';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
// User preferences 
const userPreferences = UseUserPreferences();
let savedPhotos = computed(()=>userPreferences.getShowImages);
const isMainSideBarOpened = ref(false)
    const toggleSidebar = ():boolean => isMainSideBarOpened.value = !isMainSideBarOpened.value
const route = useRoute();

// function to show or hide photos
let savePhotos = ref(true); 

const togglePhotos = ():void => {
    userPreferences.setShowImages();
    savePhotos.value = !savePhotos.value;
    console.log(savePhotos.value);
    
}


// Easter egg to show a message
let easterMessage = ref('');
let showEasterEgg = ref(false);
let timeoutEaster = null;
const easterEggPig = () => {
    if(timeoutEaster) clearTimeout(timeoutEaster);
    showEasterEgg.value = true;
    easterMessage.value = 'oink!';
    timeoutEaster = setTimeout(() => {
        showEasterEgg.value = false;
    }, 1000);
}
onMounted(() => {
    savePhotos.value = savedPhotos.value;
});
</script>
<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}</style>

