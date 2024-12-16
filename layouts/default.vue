<script lang="ts" setup>
import type { Genre } from '~/interfaces/genre';
import { useMovies } from '../composables/useMovies';
import type { DropdownItem } from '../components/Dropdown.vue';

const { getMovieGenres } = useMovies();
const genres = ref<Genre[]>([]);
const res = await getMovieGenres();
genres.value = res?.genres ?? [];

const genreSelected = (item: DropdownItem) => {
};
</script>

<template>
  <div>
    <header>
      <LayoutsNavbar :genre="genres" :genreSelected="genreSelected" />
    </header>

    <main>
      <slot  />
    </main>

    <footer>
      <LayoutsFooter />
    </footer>
  </div>
</template>
