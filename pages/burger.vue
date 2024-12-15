import { route } from './@[[username]]/route';
<script setup lang="ts">
     const route = useRoute();
</script>
<template>
<div>ini Burger Perrent</div>
<p>{{ route.query }}</p>
<NuxtPage :page-key="route => route.fullPath"/>
</template>