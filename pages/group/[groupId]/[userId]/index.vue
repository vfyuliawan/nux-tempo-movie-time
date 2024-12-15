import { route } from './route';
<script setup lang="ts">
const route = useRoute();

</script>

<template>
  <div>
    <div>{{ route.params }}</div>
  </div>
</template>
