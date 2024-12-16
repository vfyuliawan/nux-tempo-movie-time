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
  title: "TMDB Movie - Home",
  ogTitle: "TMDB Movie - Home",
  description: "Explore the best movies, trailers, and reviews at TMDB Movie. Find your next favorite movie today!",
  ogDescription: "Explore the best movies, trailers, and reviews at TMDB Movie. Find your next favorite movie today!",
  ogImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN8TpRfeoLQp1Qkwmz5t7pskPsggM9K_Noxg&s", 
  twitterCard: "summary_large_image",
});

definePageMeta({
  layout: "default",

});


</script>

<template>
  <div>
    <div class="bg-slate-700 pl-10 pr-10 pt-20 pb-10">
      <LayoutsHero />
      
    </div>

    <LayoutsMovieList 
    :genre="'action'" :genres="genres" @genreSelected="onGenreSelected" />
  </div>
</template>
