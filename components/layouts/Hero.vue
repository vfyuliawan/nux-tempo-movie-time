<script lang="ts" setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import { useMovies } from "../../composables/useMovies";
import type { MoviesInterface } from "../../interfaces/movies";
import { GeneralEnum } from "../../types/generalEnum";
import type { Genre } from "../../interfaces/genre";
import type { Result } from '../../interfaces/movies';

const isActiveIndex = ref(0);
const modules = [Autoplay];
const router = useRouter();


const uriImg = GeneralEnum.baseUriImg;

const onSlideChange = (swiper: any) => {
  isActiveIndex.value = swiper.activeIndex;
};

const getGenreById = (idGenres: number[]) => {
  const genres = idGenres.map((item) => {
    return genreList.value?.find((item2) => item2.id === item)?.name;
  });
  return genres;
};

const moviesTrandingList = ref<MoviesInterface>();
const genreList = ref<Genre[]>();

const { getTrandingMovie, getMovieGenres } = useMovies();

onMounted(async () => {
  getGenreString();

  const res = await getTrandingMovie();
  const genresMovie = await getMovieGenres();
  if (res && genresMovie !== null) {
    moviesTrandingList.value = res;
    genreList.value = genresMovie.genres;
  }
});


const handleChoseMovie = (item: Result) => {
  router.push({ path: "/detail", query: { id: item.id } });
};
</script>

<template>
  <swiper
    :slidesPerView="3"
    :centeredSlides="true"
    :spaceBetween="130"
    :pagination="{ clickable: true }"
    :autoplay="{ delay: 3000, disableOnInteraction: false }"
    :modules="modules"
    class="mySwiper "
    @slideChange="onSlideChange"
  >
    <swiper-slide
      v-for="(item, index) in moviesTrandingList?.results"
      :key="index"
      @click="handleChoseMovie(item)"
      class="bg-slate-700 cursor-pointer"
    >
      <div
        class="flex h-[364px] w-[541px] bg-slate-700 justify-center items-center"
      >
        <div class="w-[243px] h-[364px]">
          <img :src="uriImg + item.poster_path" class="overflow-hidden" />
        </div>
        <div
          class="lg:w-[265px] text-start flex-col hidden lg:block py-14 px-4 bg-black h-[324px]"
        >
          <div class="flex flex-row gap-2 items-center">
            <div class="h-[23px] w-[23px]overflow-hidden">
              <img src="/assets/startRating.png" class="object-cover" />
            </div>
            <p class="text-slate-50">
              {{ formatRating(item.vote_average) }}
            </p>
          </div>
          <h4
            class="text-slate-50 text-md font-bold truncate whitespace-nowrap overflow-hidden"
          >
            {{ item.title }}
          </h4>
          <div class="flex-row items-center flex gap-2">
            <p class="text-slate-50 text-md">
              {{ formatingYears(item.release_date) }}
            </p>
          </div>
          <div class="flex flex-wrap justify-start items-center gap-3">
            <p
              v-for="(itemGenre, key2) in getGenreById(item.genre_ids).splice(
                0,
                3
              )"
              :key="key2"
              class="text-slate-50 text-sm"
            >
              {{ itemGenre === "Science Fiction" ? "Sci-Fi" : itemGenre }}
            </p>
          </div>
          <p class="text-slate-50 text-xs">
            {{
              item.overview.length > 200
                ? item.overview.substring(0, 200) + "..."
                : item.overview
            }}
          </p>
        </div>
      </div>
    </swiper-slide>
  </swiper>
  <div class="flex flex-row mt-10 justify-center">
    <div
      v-for="(item, index) in moviesTrandingList?.results"
      :key="index"
      class="h-[13px] w-[13px] me-8 rounded-xl"
      :class="{
        'w-[70px] bg-custom-red': index === isActiveIndex,
        'w-[13px] bg-white bg-opacity-55': index !== isActiveIndex,
      }"
    ></div>
  </div>
</template>
