<script lang="ts" setup>
const props = defineProps<{
  color: string;
}>();
</script>

<template>
  <div class="flex flex-col items-center">
    <svg
      :class="$props.color"
      class="animate-spin h-10 w-10"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 100 8v4a8 8 0 01-8-8z"
      ></path>
    </svg>
    <p class="text-slate-400 text-sm mt-2">Loading movies...</p>
  </div>
</template>
