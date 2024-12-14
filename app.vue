<script setup lang="ts">
const isComponentShow = ref(false)

const onClick = () =>{
  isComponentShow.value = !isComponentShow.value
}


import 'swiper/css';

import 'swiper/css/pagination';

import './style.css';
</script>


<template>
  <!-- <div>
    <NuxtRouteAnnouncer />
    <LayoutsNavbar />
    <div v-if="isComponentShow" class="text-center font-bold"> this is content</div>
    <button @click="onClick" >Click here to hide component</button>
    
    <LayoutsFooter />
  </div> -->
  <NuxtLayout >
    <NuxtPage />

  </NuxtLayout>
</template>


<!-- urutan : app.vue -> layout -> page -->

