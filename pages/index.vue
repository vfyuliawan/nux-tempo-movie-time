<script setup lang="ts">
// Import the necessary types
import type { Genre } from '~/interfaces/genre';
import type { DropdownItem } from '../components/Dropdown.vue';

const props = defineProps<{
  genres: Genre[];
  onGenreSelected: (item: DropdownItem) => void;
}>();


const route = useRoute();


useSeoMeta({
  title: "My Amazing Site",
  ogTitle: "My Amazing Site",
  description: "This is my amazing site, let me tell you all about it.",
  ogDescription: "This is my amazing site, let me tell you all about it.",
  ogImage: "https://example.com/image.png",
  twitterCard: "summary_large_image",
});

definePageMeta({
  layout: "default",

});


</script>

<template>
  <div>
    <div class="bg-slate-700 p-10">
      <LayoutsHero />
      
    </div>

    <LayoutsMovieList 
    :genre="'action'" :genres="genres" @genreSelected="onGenreSelected" />
  </div>
</template>
