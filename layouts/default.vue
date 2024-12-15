<script lang="ts" setup>
import type { Genre } from '~/interfaces/genre';
import { useMovies } from '../composables/useMovies';
import type { DropdownItem } from '../components/Dropdown.vue';

// Fetch genres
const { getMovieGenres } = useMovies();
const genres = ref<Genre[]>([]);
const res = await getMovieGenres();
genres.value = res?.genres ?? [];

// Callback for genre selection
const genreSelected = (item: DropdownItem) => {
  console.log('Selected genre:', item);
};
</script>

<template>
  <div>
    <header>
      <LayoutsNavbar :genre="genres" :genreSelected="genreSelected" />
    </header>

    <main>
      <!-- Pass slot props -->
      <slot  />
    </main>

    <footer>
      <LayoutsFooter />
    </footer>
  </div>
</template>
