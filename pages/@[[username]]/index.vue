import { route } from './route';
<script setup lang="ts">
const route = useRoute();


onMounted(() => {
   alert('here you mounted user : '+route.params.username)
    
})



</script>

<template>
  <div>
    <div>{{ route.params.username }}</div>
  </div>
</template>
