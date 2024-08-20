<template>
  <div class="relative w-full min-h-dvh bg-sky-50">
    <section class="flex flex-wrap justify-center gap-5 pt-3 overflow-hidden pb-28 animate-flip-down ">
    <ItemCard :item-img="require('@/assets/img/items/taquito.png')" item-price="30" item-name="Taco"/>
    <ItemCard :item-img="require('@/assets/img/items/quesadillaSimple.png')" item-price="30" item-name="Quesadilla"/>
    <ItemCard :item-img="require('@/assets/img/items/quesadillaCarnitas.png')" item-price="40" item-name="Quesadilla Carnitas"/>
    <ItemCard :item-img="require('@/assets/img/items/tortasimple.png')" item-price="30" item-name="Torta"/>
    <ItemCard :item-img="require('@/assets/img/items/torta.png')" item-price="30" item-name="Torta Carnitas"/>
    <ItemCard :item-img="require('@/assets/img/items/gorditas-min.png')" item-price="35" item-name="Gordita Chicharon"/>
    <ItemCard :item-img="require('@/assets/img/items/gorditaChicharron.png')" item-price="40" item-name="Gordita Carnitas"/>
    <ItemCard :item-img="require('@/assets/img/items/vidrio-min.png')" item-price="25" item-name="Refresco Vidrio"/>
    <ItemCard :item-img="require('@/assets/img/items/desechables-min.png')" item-price="27" item-name="Refresco Botella"/>
    <ItemCard :item-img="require('@/assets/img/items/oaxaca.png')" item-price="10" item-name="Queso Extra"/>
    <ItemCard :item-img="require('@/assets/img/items/peso.png')" :kilo=true item-name="Por Kilo"/>
    </section>
    <GrandTotal class="fixed bottom-3 right-5"/>
    <!-- <button class="" @click="UseUserStoreValues().resetGrandTotal()">Reset Grand Total</button> -->
  </div>
</template>

<script lang="ts" setup>
import GrandTotal from '@/components/GrandTotal.vue';
import ItemCard from '@/components/ItemCard.vue';
import { UseUserStoreValues } from '@/store/UseStoreValues';
import { onMounted, onUnmounted } from 'vue';

onMounted(() => {
  UseUserStoreValues().resetGrandTotal();

})
onUnmounted(() => {
  UseUserStoreValues().resetGrandTotal();
})
</script>

<style scoped></style>
