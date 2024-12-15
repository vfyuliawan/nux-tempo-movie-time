<template>
  <div class="relative" @click="onBlur">
    <div class="relative py-3 px-3">
      <span
        class="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400"
      >
        <img
          src="/assets/movie-icon@2x.png"
          class="overflow-hidden w-8 ml-3"
          alt=""
        />
      </span>
      <input
        id="autoComplate"
        @input="handleInputChange"
        @focus="fetchSearchMovie(titleSearch)"
        type="text"
        :value="titleSearchHolder"
        placeholder="Search Movie..."
        class="px-4 py-2 pl-12 bg-transparent w-11/12 text-white border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
    <!-- <label for="autoComplate"> -->

    <ul
      v-if="movieList.length > 0"
      class="absolute z-50 w-[140%] lg:w-6/12 mt-2 bg-slate-800 border rounded shadow-lg"
    >
      <li
      @click.prevent="handleChoseMovie(suggestion)"
        v-for="(suggestion, index) in movieList"
        :key="index"
        class="px-4 py-2 text-slate-100 cursor-pointer hover:bg-slate-900"
      >
      {{ suggestion.title }}

      </li>
    </ul>
    <!-- </label> -->
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import type { Result } from "../interfaces/movies";
import { useMovies } from "../composables/useMovies";

const { getSearchMovie } = useMovies();
const movieList = ref<Result[]>([]);
const titleSearch = ref<string>("");
const titleSearchHolder = ref<string>("");
const initPage = ref<number>(1);
const isLoading = ref<boolean>(false);

const router = useRouter();

const fetchSearchMovie = async (input: string) => {
  if (!input.trim()) {
    movieList.value = [];
    return;
  }
  isLoading.value = true;
  const resp = await getSearchMovie({
    page: initPage.value,
    title: input,
  });

  if (resp !== null) {
    movieList.value = resp.results.splice(0, 15);
  }
};

const onBlur = () => {
  movieList.value = [];
};

const handleInputChange = (event: Event) => {
  setTimeout(() => {
    const input = (event.target as HTMLInputElement).value;
    titleSearch.value = input;
    titleSearchHolder.value = input;
    fetchSearchMovie(input);
  }, 500);
};

const handleChoseMovie = (item: Result) => {
  titleSearchHolder.value = item.title;
  movieList.value = [];
  router.push({ path: "/detail", query: { id: item.id } });
};

watch(titleSearch, (newValue) => {
  fetchSearchMovie(newValue);
});
</script>
