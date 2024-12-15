import { route } from './@[[username]]/route';
<script lang="ts" setup>
    const route = useRoute();
</script>

<template>
<div>
    <p>this is router from {{ route.path }}</p>
</div>    
</template>

<style lang="postcss" scoped>
    
</style>
