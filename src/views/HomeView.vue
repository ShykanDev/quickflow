<template>
  <div class="p-1 min-h-dvh bg-sky-50">
    <section class="flex flex-wrap gap-5 p-1 overflow-auto animate-fade-down">
    <ItemCard :item-img="require('@/assets/img/items/taquito.png')" item-price="30" item-name="Taco"/>
    <ItemCard :item-img="require('@/assets/img/items/quesadillaSimple.png')" item-price="35" item-name="Quesadilla"/>
    <ItemCard :item-img="require('@/assets/img/items/gorditas-min.png')" item-price="35" item-name="Gordita Chicharon"/>
    <ItemCard :item-img="require('@/assets/img/items/gorditaChicharron.png')" item-price="35" item-name="Gordita Carnitas"/>
    <ItemCard :item-img="require('@/assets/img/items/vidrio-min.png')" item-price="25" item-name="Refresco Vidrio"/>
    <ItemCard :item-img="require('@/assets/img/items/desechables-min.png')" item-price="27" item-name="Refresco Botella"/>
    </section>
  </div>
</template>

<script lang="ts" setup>
import ItemCard from '@/components/ItemCard.vue';



</script>

<style scoped></style>
