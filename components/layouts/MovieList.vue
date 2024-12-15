import { Genre } from '../../interfaces/genre';
<script lang="ts" setup>
import type { Genre } from "~/interfaces/genre";
import type { DropdownItem } from "../Dropdown.vue";
import type { MoviesInterface } from "~/interfaces/movies";
import { GeneralEnum } from "../../types/generalEnum";

const { getMovieGenres, getDiscoverMovie } = useMovies();
const movieList = ref<MoviesInterface | null>();
const movieGenres = ref<Genre[]>([]);

const baseImgUrl = GeneralEnum.baseUriImg;
const dropDownValue = ref<DropdownItem[]>([]);
const dropDownSelected = ref<string>("popularity.desc");
const genreSelected = ref<string>();
const isLoading = ref<boolean>(true);
const page = ref<number>(1);

const props = defineProps<{
  genre?: string;
  genres?: Genre[];
  genreSelected?: (item: DropdownItem) => void;
}>();

const getGenreName = (genresId: number[]) => {
  const genreName = genresId.map((item) => {
    return movieGenres.value.find((genre) => genre.id === item)?.name;
  });
  return genreName;
};

dropDownValue.value = [
  { id: "popularity.asc", name: "Popularity Ascending" } as DropdownItem,
  { id: "popularity.desc", name: "Popularity Descending" } as DropdownItem,
  {
    id: "primary_release_date.asc",
    name: "Release Date Ascending",
  } as DropdownItem,
  {
    id: "primary_release_date.desc",
    name: "Release Date Descending",
  } as DropdownItem,
  { id: "revenue.asc", name: "Revenue Ascending" } as DropdownItem,
  { id: "revenue.desc", name: "Revenue Descending" } as DropdownItem,
];
const genreResponse = await getMovieGenres();
const mapResponse = genreResponse?.genres.map((item, index) => {
  return {
    name: item.name,
    id: item.id,
    isActive:
      props?.genre?.toLocaleLowerCase() === item.name.toLocaleLowerCase(),
  };
});
movieGenres.value = mapResponse ?? [];
isLoading.value = false;

genreSelected.value =
  mapResponse?.find((item) => item.isActive === true)?.id.toString() ?? "";

const fetchMovies = async () => {
  isLoading.value = true;
  const movieResponse = await getDiscoverMovie({
    page: `${page.value}`,
    sort_by: dropDownSelected.value ?? "",
    genre: genreSelected.value ?? "",
  });
  movieList.value = movieResponse;
  setTimeout(() => {
  isLoading.value = false;
    
  }, 300);
};

await fetchMovies();

watch([dropDownSelected, page], async () => {
  await fetchMovies();
});

const handleLoadMore = () =>{
  page.value = page.value+1
  console.log(page);
  
}

const handleDropdownClick = (item: { name: string; id: string }) => {
  dropDownSelected.value = item.id;
};
</script>

<template>
  <div class="relative w-full h-[500px] bg-slate-600">
    <div class="absolute top-20 w-full bg-transparentpx-6 py-4 px-32">
      <div class="flex flex-row justify-between">
        <div class="flex-col hidden sm:block">
          <div class="w-[100px] h-[6px] bg-custom-red mb-2"></div>
          <p class="text-white text-lg">Discover Movie</p>
        </div>
        <div
          class="flex items-center justify-evenly sm:justify-start flex-row w-[180px]"
        >
          <p class="text-slate-50 text-sm me-3">My Movies</p>
          <p class="text-slate-50 text-sm">2 Movies</p>
        </div>
      </div>
      <div class="flex sm:flex-none flex-row mt-10">
        <div class="w-[250px] h-5 hidden sm:block">
          <div
            class="flex-col bg-custom-gradient w-full h-[600px] sm:w-[80%] md:w-[100%] rounded-lg"
          >
            <div class="flex-col py-8 px-5">
              <p class="text-slate-50 text-sm">Sort Result By</p>
            </div>
            <div class="border-t h-1 w-full border-gray-600"></div>
            <Dropdown
              :to-route="false"
              :onClick="handleDropdownClick"
              :label="'Popularity Ascending'"
              :dropdown-menu="dropDownValue"
              :img="'/assets/polygon.png'"
              class="mt-5 mb-5"
            />
            <div class="border-t h-1 w-full border-gray-600"></div>
            <div class="flex-col py-4 px-5">
              <p class="text-slate-50 text-sm">Genres</p>
            </div>
            <div class="border-t h-1 w-full border-gray-600"></div>
            <div class="flex-col py-4 px-5">
              <div
                v-for="(item, index) in movieGenres"
                :key="index"
                class="flex-row flex justify-between mb-3"
              >
                <p class="text-slate-100 text-sm">{{ item.name }}</p>
                <input
                  @click="
                    () => {
                      movieGenres.forEach((genre) => (genre.isActive = false));
                      item.isActive = true;
                    }
                  "
                  :checked="item.isActive"
                  id="checked-checkbox"
                  type="checkbox"
                  value=""
                  class="w-4 h-4 accent-red-500 bg-gray-100 border-gray-300 rounded"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-1 w-full h-auto px-8">
          <div class="flex-col  w-full col">
            <div class="flex flex-row w-full ">
              <div class="w-full justify-center items-center flex flex-row">
              <div
                v-if="isLoading"
                class="flex justify-center items-center h-[400px]"
              >
                <Loading :color="'text-custom-red'"/>
              </div>

              <div
                v-else
                class="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full"
              >
                <div
                  v-for="(item, index) in movieList?.results"
                  :key="index"
                  class="relative flex flex-col overflow-hidden group"
                >
                  <div
                    class="h-[330px] w-full bg-black bg-opacity-50 overflow-hidden relative"
                  >
                    <img
                      :src="baseImgUrl + item.poster_path"
                      alt=""
                      class="object-contain w-full"
                    />
                  </div>

                  <div class="absolute top-0 right-0">
                    <div
                      class="w-[48px] justify-center flex items-center h-[32px] bg-black opacity-75 text-slate-50"
                    >
                      <p class="text-sm text-slate-200">
                        {{ formatRating(item.popularity) }}
                      </p>
                    </div>
                  </div>

                  <div
                    class="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <div class="flex-col flex items-center justify-center">
                      <div
                        class="flex flex-row justify-center items-center h-full"
                      >
                        <div
                          class="h-[32px] w-[32px] flex justify-center overflow-hidden items-center"
                        >
                          <img
                            src="/assets/startRating.png"
                            class=" object-fill"
                            alt="Rating Icon"
                          />
                        </div>
                        <p class="text-slate-100 text-lg">
                          {{ formatRating(item.vote_average) }}
                        </p>
                      </div>
                      <div class="flex flex-row gap-2">
                        <p
                          v-for="(itemGenre, index2) in getGenreName(
                            item.genre_ids
                          )"
                          :key="index2"
                          class="text-slate-50 text-sm"
                        >
                          {{
                            itemGenre === "Science Fiction"
                              ? "Sci-Fi"
                              : itemGenre
                          }}
                        </p>
                      </div>
                      <div
                        class="bg-custom-red mt-6 w-[151px] hover:bg-red-700 justify-center flex p-2 cursor-pointer rounded-2xl text-slate-100"
                      >
                        View
                      </div>
                      <div
                        class="bg-transparent mt-4 w-[151px] justify-center flex p-2 cursor-pointer rounded-2xl border border-white text-slate-100"
                      >
                        Add
                      </div>
                    </div>
                  </div>

                  <!-- Movie Info -->
                  <div class="flex ms-3 flex-col gap-2 mt-2">
                    <p class="text-slate-50 text-lg font-semibold">
                      {{ formatingYears(item.release_date) }}
                    </p>
                    <div class="flex flex-row gap-2">
                      <p
                        v-for="(itemGenre, index2) in getGenreName(
                          item.genre_ids
                        )"
                        :key="index2"
                        class="text-slate-400 text-sm"
                      >
                        {{
                          itemGenre === "Science Fiction" ? "Sci-Fi" : itemGenre
                        }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
          

            <div 
            v-if="!isLoading"
            class="flex justify-center flex-row mt-6">
              <div
              @click="handleLoadMore"
                class="bg-custom-red hover:bg-red-800 w-[151px] justify-center flex p-2 cursor-pointer hover: rounded-2xl text-slate-100"
              >
                Load More
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="w-full h-[130rem] bg-slate-700 px-32"></div>
</template>

<style lang="postcss" scoped></style>
