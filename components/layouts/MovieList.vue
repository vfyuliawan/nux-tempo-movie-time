import { Genre } from '../../interfaces/genre';
<script lang="ts" setup>
import type { Genre } from "~/interfaces/genre";
import type { DropdownItem } from "../Dropdown.vue";
import type { MoviesInterface } from "~/interfaces/movies";
import { GeneralEnum } from "../../types/generalEnum";
import type { AddFavoriteMovie } from '../../interfaces/addFavoriteMovie';
import { postFavoriteMovie } from '../../services/tmdbService';
import type { Result } from '../../interfaces/movies';

const { getMovieGenres, getDiscoverMovie , addFavoriteMovie, getFavoriteMovie} = useMovies();
const movieList = ref<MoviesInterface | null>();
const movieGenres = ref<Genre[]>([]);

const baseImgUrl = GeneralEnum.baseUriImg;
const dropDownValue = ref<DropdownItem[]>([]);
const dropDownSelected = ref<string>("popularity.desc");
const genreSelected = ref<string>();
const isLoading = ref<boolean>(true);
const page = ref<number>(1);
  const favMovieLength = ref<number>(0);
  const isShowAlert = ref(false);

  const route = useRouter();

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
  { id: "popularity.desc", name: "Popularity Descending" } as DropdownItem,
  { id: "popularity.asc", name: "Popularity Ascending" } as DropdownItem,

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

const fetchMovies = async (pageparams?: number) => {
  isLoading.value = true;
  const movieResponse = await getDiscoverMovie({
    page: `${pageparams?? page.value}`,
    sort_by: dropDownSelected.value ?? "",
    genre: genreSelected.value ?? "",
  });
  movieList.value = movieResponse;
  setTimeout(() => {
    isLoading.value = false;
  }, 1000);
 
};


const fetchFavoriteMovies = async() =>{
  const resp = await getFavoriteMovie()
  if (resp !== null) {
    return resp;
  }
}

await fetchMovies().then(async() => {
  await fetchFavoriteMovies().then((resp) =>{
    favMovieLength.value = resp?.total_results ?? 0;
    setTimeout(() => {
    isLoading.value = false;
  }, 500);
  })
});

watch([dropDownSelected, genreSelected], async () => {
  await fetchMovies(1);
});

watch([page], async () => {
  await fetchMovies();
});


const handleAddMovieFavorite = async(req: AddFavoriteMovie) =>{
 const response =  await addFavoriteMovie(req)
 if (response !== null) {
  favMovieLength.value += 1;
  isShowAlert.value = true;
  setTimeout(() => {
  isShowAlert.value = false;
  }, 2000);
 }
}

const handleChoseMovie = (item: Result) => {
  route.push({ path: "/detail", query: { id: item.id } });
};


const handleLoadMore = (paramsPage:number, add: boolean) => {
  const movieListElement = document.getElementById("movieList");
  if (movieListElement) {
    movieListElement.scrollIntoView({
      behavior: "smooth",
      block: "start",    
    });
  }
  if (add) {
    page.value = page.value + paramsPage;
  }else{
    page.value = page.value - paramsPage;
  }
};

const handleSelectGenre = (item: Genre) => {
  movieGenres.value.forEach((genre: Genre) => (genre.isActive = false));
  item.isActive = true;
  genreSelected.value = item.id.toString();
};

const handleDropdownClick = (item: { name: string; id: string }) => {
  dropDownSelected.value = item.id;
};
</script>

<template>
  <div id="movieList" class="relative w-full h-[500px] bg-slate-600">
    <div class="absolute top-20 w-full bg-transparentpx-6 py-4 px-12 xl:px-32">
      <div class="flex flex-row justify-between">
        <div class="flex-col hidden sm:block">
          <div class="w-[100px] h-[6px] bg-custom-red mb-2"></div>
          <p class="text-white text-lg">Discover Movie</p>
        </div>
        <div
          class="flex items-center justify-evenly sm:justify-start flex-row md:w-[200px] w-full"
        >
          <p class="text-slate-50 text-sm me-3">My Movies</p>
          <div class="py-2 px-4 rounded-xl bg-slate-700">
            <p class="text-slate-50 text-sm">{{ favMovieLength }} Movies</p>
          </div>
          <div class="md:hidden block">
            <Dropdown
              :to-route="false"
              :onClick="handleDropdownClick"
              :label="'Popularity Descending'"
              :dropdown-menu="dropDownValue"
              :img="'/assets/polygon.png'"
              class="mt-5 mb-5 text-[8px]"
            />
          </div>
         
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
                  @click="handleSelectGenre(item)"
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
        <div class="flex flex-1 w-full h-auto  md:px-8">
          <div class="flex-col w-full col">
            <div class="flex flex-row w-full">
              <div class="w-full justify-center items-center flex flex-row">
                <div
                  v-if="isLoading"
                  class="flex justify-center items-center h-[400px]"
                >
                  <Loading :color="'text-custom-red'" />
                </div>

                <div
                  v-else
                  class="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full"
                >
                  <div
                    v-for="(item, index) in movieList?.results"
                    :key="index"
                    class="relative flex  flex-col overflow-hidden group"
                  >
                    <div
                      class="xl:h-[330px] w-full min-h-[150px] bg-slate-800 bg-opacity-60  overflow-hidden relative"
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
                        <p class="text-sm  text-slate-200">
                          {{ formatRating(item.vote_average) }}
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
                              class="object-fill"
                              alt="Rating Icon"
                            />
                          </div>
                          <p class="text-slate-100 text-sm md:text-lg">
                            {{ formatRating(item.vote_average) }}
                          </p>
                        </div>
                        <div class="flex flex-wrap justify-center px-2 gap-1 md:gap-2">
                          <p
                            v-for="(itemGenre, index2) in getGenreName(
                              item.genre_ids
                            )"
                            :key="index2"
                            class="text-slate-50 text-[8px] md:text-sm"
                          >
                            {{
                              itemGenre === "Science Fiction"
                                ? "Sci-Fi"
                                : itemGenre
                            }}
                          </p>
                        </div>
                        <button
                        @click="handleChoseMovie(item)"
                          class="bg-custom-red mt-3 px-12 py-2  sm:mt-6 sm:px-14 hover:bg-red-700 justify-center flexm cursor-pointer rounded-2xl  md:rounded-2xl text-slate-100"
                        >
                          View
                        </button>
                        <button
                        @click="handleAddMovieFavorite({favorite: true, media_id:item.id, media_type:'movie'  })"
                          class=" focus:bg-focus-green focus:text-slate-600 focus:outline-none focus:ring focus:border-white bg-transparent mt-3 px-12 py-2 sm:mt-6 sm:px-14 justify-center flex p-2 cursor-pointer rounded-2xl   md:rounded-3xl border border-white text-slate-100"
                        >
                          Add
                        </button>

                      </div>
                    </div>

                    <!-- Movie Info -->
                    <div class="flex ms-3 flex-col gap-2 mt-2">
                      <p class="text-slate-50 text-[13px] md:text-md font-semibold">
                        {{ item.title }}
                      </p>
                      <div class="flex flex-row gap-2">
                        <p
                          class="text-slate-400 md:text-sm text-[10px]"
                        >
                        {{ formatingYears(item.release_date) }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="!isLoading && page ==1" class="flex justify-center flex-row mt-6">
              <div
                @click="handleLoadMore(1, true)"
                class="bg-custom-red hover:bg-red-800 w-[151px] justify-center flex p-2 cursor-pointer hover: rounded-2xl text-slate-100"
              >
                Load More
              </div>
            </div>
            <div v-if="!isLoading &&page!==1" class="flex mt-5 gap-2 justify-center flex-row">
              <div
                @click="handleLoadMore(1, false)"
                class="bg-custom-red hover:bg-red-600  w-[151px] justify-center flex p-2 cursor-pointer hover: rounded-2xl text-slate-100"
              >
                Prev
              </div>
              <div
                @click="handleLoadMore(1, true)"
                class="bg-transparent border border-white hover:font-bold hover:text-slate-700 hover:bg-slate-100 hover:text-md w-[151px] justify-center flex p-2 cursor-pointer rounded-2xl text-slate-100"
              >
                Next
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Alert v-if="isShowAlert" :is-show="isShowAlert" :message="'Berhasil Ditambahkan Ke Favorite'"/>
  </div>

  <div class="w-full h-[300rem] lg:h-[130rem] bg-slate-700 px-32"></div>

  
</template>

<style lang="postcss" scoped></style>
