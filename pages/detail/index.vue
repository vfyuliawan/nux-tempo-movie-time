<script lang="ts" setup>
import { useRoute } from "vue-router";
import { ref, watchEffect } from "vue";
import { useMovies } from "../../composables/useMovies";
import type { DetailMovieInterface } from "../../interfaces/detailMovie";
import { GeneralEnum } from "../../types/generalEnum";
import type { ReviewsMovieInterface } from "../../interfaces/reviewMovie";
import type { MoviesInterface } from "../../interfaces/movies";
import type { Result } from "../../interfaces/movies";

const route = useRoute();
const router = useRouter();
const { getDetailMovie, getReviewsMovie, getRecomendationMovies } = useMovies();
const detailMovie = ref<DetailMovieInterface>();
const reviewMovie = ref<ReviewsMovieInterface>();
const recomendationMovies = ref<MoviesInterface>();
const isLoading = ref<boolean>(false);
const pageinit = ref<number>(1);
const pageRecomendation = ref<number>(1);
const uriImg = GeneralEnum.baseUriImg;

useSeoMeta({
  title: `TMDB Movie - Details Movie`,
  ogTitle: `TMDB Movie - Details Movie`,
  description: `${detailMovie.value?.overview} Watch this exciting movie now on TMDB!`,
  ogDescription: `${detailMovie.value?.overview} Watch this exciting movie now on TMDB!`,
  ogImage: `${uriImg}${detailMovie.value?.overview}`,
  twitterCard: "summary_large_image",
});

const fetchMovieDetails = async (id: string) => {
  isLoading.value = true;
  const response = await getDetailMovie({
    movieId: id,
  });
  if (response !== null) {
    detailMovie.value = response;
    isLoading.value = false;
  }
};

const fetchReviewMovieDetail = async (id: string) => {
  isLoading.value = true;
  const response = await getReviewsMovie({
    movieId: id,
    page: pageinit.value,
  });
  if (response !== null) {
    reviewMovie.value = response;
    isLoading.value = false;
  }
};

const fetchRecomendationMovie = async (id: string) => {
  isLoading.value = true;
  const response = await getRecomendationMovies({
    movieId: id,
    page: pageRecomendation.value,
  });
  if (response !== null) {
    recomendationMovies.value = response;
    isLoading.value = false;
  }
};

const handleLoadMore = (paramsPage: number, add: boolean) => {
  if (add) {
    pageinit.value = pageinit.value + paramsPage;
  } else {
    pageinit.value = pageinit.value - paramsPage;
  }
};

watchEffect(() => {
  const movieId = route.query.id;
  fetchMovieDetails(movieId?.toString() ?? "").then(() =>{
    pageinit.value =1
  });
  fetchReviewMovieDetail(movieId?.toString() ?? "");
  fetchRecomendationMovie(movieId?.toString() ?? "");
});

const handleChoseMovie = (item: Result) => {
  const movieListElement = document.getElementById("loadingId");
  if (movieListElement) {
    movieListElement.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
  router.push({ path: "/detail", query: { id: item.id } });
};

watch([pageinit], async () => {
  const movieId = route.query.id;
  await fetchReviewMovieDetail(movieId?.toString() ?? "");
});
</script>

<template>
  <div
    v-if="isLoading"
    class="w-full h-[100vh] bg-slate-600 pt-32 flex justify-center"
  >
    <Loading :color="'text-custom-red'" :class="'mt-32'" />
  </div>
  <div
    id="loadingId"
    v-if="!isLoading"
    :class="
      reviewMovie?.results.length === 0 ? 'h-[100vh]' : 'h-[250vh] lg:h-[160vh]'
    "
    class="w-full bg-white"
  >
    <div class="w-full relative">
      <div
        class="w-full h-[340px] overflow-hidden bg-slate-500 opacity-75"
        :style="{
          backgroundImage: `url(${uriImg + detailMovie?.backdrop_path})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }"
      ></div>

      <!-- detail -->
      <div class="w-full">
        <div class="flex flex-col">
          <div
            class="w-full px-3 sm:px-0 h-[80px] py-4 bg-black gap-4 opacity-85 flex flex-row justify-center items-center"
          >
            <div class="h-[32px] w-[32px] overflow-hidden">
              <img
                src="/assets/startRating.png"
                class="object-cover w-full h-full"
              />
            </div>
            <h3 class="text-slate-50 text-[36px]">
              {{ formatRating(detailMovie?.vote_average ?? 0) }}
            </h3>
            <div class="flex-col col">
              <h5 class="text-[12px] text-slate-500">USERSCORE</h5>
              <h5 class="text-[12px] text-slate-100">
                {{ detailMovie?.vote_count }} Votes
              </h5>
            </div>
            <div class="bg-white h-full w-[2px] opacity-30"></div>
            <div class="flex-col col">
              <h5 class="text-[12px] text-slate-500">STATUS</h5>
              <h5 class="text-[12px] text-slate-100">
                {{ detailMovie?.status }}
              </h5>
            </div>
            <div class="bg-white h-full w-[2px] opacity-30"></div>
            <div class="flex-col col">
              <h5 class="text-[12px] text-slate-500">LANGUAGE</h5>
              <h5 class="text-[12px] text-slate-100">
                {{ formaterLanguage(detailMovie?.original_language ?? "") }}
              </h5>
            </div>
            <div class="bg-white h-full w-[2px] opacity-30"></div>
            <div class="flex-col col">
              <h5 class="text-[12px] text-slate-500">BUDGET</h5>
              <h5 class="text-[12px] text-slate-100">
                {{ formatCurrency(detailMovie?.budget ?? 0) }}
              </h5>
            </div>
            <div class="bg-white h-full w-[2px] opacity-30"></div>
            <div class="flex-col col">
              <h5 class="text-[12px] text-slate-500">PRODUCTION</h5>
              <div class="flex flex-row gap-2">
                <h5
                  v-for="(
                    prod, index
                  ) in detailMovie?.production_companies.splice(0, 3)"
                  :key="index"
                  class="text-[12px] text-slate-100"
                >
                  {{ prod.name }}
                </h5>
              </div>
            </div>
          </div>

          <!-- detail review -->
          <div class="w-full h-[541px] px-10 pt-8 md:pt-48 md:px-36 bg-white">
            <p class="text-custom-red text-lg font-semibold">Reviews</p>
            <div class="grid mt-5 grid-cols-1 lg:grid-cols-2 gap-4 w-full">
              <!-- Card Review -->
              <div
                v-for="(itemReview, index) in reviewMovie?.results.slice(0, 6)"
                :key="index"
                class="w-full bg-card-gray p-6 shadow-lg rounded-xl"
              >
                <div class="flex flex-col">
                  <div class="flex-row flex justify-between">
                    <div class="flex-row flex gap-2 items-center">
                      <div
                        class="h-[48px] w-[48px] bg-gray-300 rounded-[24px] overflow-hidden"
                      >
                        <img
                          :src="uriImg + itemReview?.author_details.avatar_path"
                          alt=""
                          class="w-full h-full object-cover"
                          srcset=""
                        />
                      </div>
                      <div class="flex-col flex">
                        <h4 class="text-black font-bold">
                          {{ itemReview.author }}
                        </h4>
                        <h5 class="text-gray-400 font-normal">
                          {{
                            new Intl.DateTimeFormat("en-US", {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            }).format(new Date(itemReview.updated_at))
                          }}
                        </h5>
                      </div>
                    </div>
                    <div
                      class="flex-row flex gap-2 px-3 py-1 items-center bg-gray-200 rounded-md"
                    >
                      <div class="h-[17px] w-[17px] overflow-hidden">
                        <img
                          src="/assets/startRating.png"
                          class="object-cover w-full h-full"
                        />
                      </div>
                      <div class="flex-col flex">
                        <h4 class="text-black text-[36px] font-bold">
                          {{
                            formatRating(itemReview.author_details.rating ?? 0)
                          }}
                        </h4>
                      </div>
                    </div>
                  </div>
                  <p
                    class="mt-4 text-[13px] text-gray-600"
                    v-html="truncateText(itemReview.content, 500)"
                  ></p>
                </div>
              </div>
            </div>
            <div class="bg-card-gray text-lg mt-2 font-semibold mb-6"></div>
            <!-- Load More Comment -->
            <div
              v-if="reviewMovie?.results.length === 0"
              class="flex flex-row w-full justify-center mt-3"
            >
              <p class="text-lg text-slate-800 font-semibold">
                Tidak Ada Review
              </p>
            </div>

            <div
              v-if="
                !isLoading && pageinit == 1 && reviewMovie?.results.length !== 0
              "
              class="flex justify-center flex-row mt-3"
            >
              <div
                @click="handleLoadMore(1, true)"
                class="bg-custom-red hover:bg-red-800 w-[151px] justify-center flex p-2 cursor-pointer hover: rounded-2xl text-slate-100"
              >
                Next &gt;
              </div>
            </div>
            <div
              v-if="!isLoading && pageinit !== 1"
              class="flex mt-5 gap-2 justify-center flex-row"
            >
              <div
                @click="handleLoadMore(1, false)"
                class="bg-custom-red hover:bg-red-600 z-10 w-[151px] justify-center flex p-2 cursor-pointer rounded-2xl text-slate-100"
              >
                &lt; Prev
              </div>
              <div
                v-if="reviewMovie?.results.length !== 0"
                @click="handleLoadMore(1, true)"
                class="bg-custom-red hover:bg-red-600 z-10 w-[151px] justify-center flex p-2 cursor-pointer hover: rounded-2xl text-slate-100"
              >
                Next &gt;
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Floating card info -->
      <div class="absolute hidden lg:block top-[15%] w-full h-full px-28">
        <div class="flex w-full h-[400px] flex-row">
          <div class="flex">
            <img :src="uriImg + detailMovie?.poster_path" alt="" srcset="" />
          </div>
          <div class="flex flex-1 flex-col px-8 py-8 justify-between">
            <div>
              <p class="text-slate-50 text-[18px] font-normal">
                {{ detailMovie?.release_date.toString().split("-")[0] }}
              </p>
              <p class="text-slate-50 text-[36px] font-semibold">
                {{ detailMovie?.title }}
              </p>
              <div class="flex flex-row gap-2">
                <p
                  v-for="(genre, index) in detailMovie?.genres"
                  :key="index"
                  class="text-slate-50 text-[18px] font-normal"
                >
                  {{ genre.name }}
                </p>
              </div>
            </div>
            <div class="">
              <p
                class="text-custom-red text-lg mt-10 lg:mt-20 xl:mt-40 font-semibold"
              >
                Overview
              </p>
              <p class="mt-4 text-[13px] text-gray-600">
                {{ truncateText(detailMovie?.overview ?? "", 5000) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="!isLoading" class="flex w-full bg-slate-800 px-10 lg:px-20 py-20 flex-col">
    <p class="text-slate-100">RECOMMENDATION MOVIES</p>
    <div class="grid grid-cols-2 md:grid-cols-5 gap-2 mt-3">
      <div
        v-for="(item, index) in recomendationMovies?.results.slice(0, 5)"
        :key="index"
        @click="handleChoseMovie(item)"
        class="relative flex flex-col overflow-hidden group cursor-pointer"
      >
        <div
          class="xl:h-[380px] w-full bg-black bg-opacity-50 overflow-hidden relative"
        >
          <img
            :src="uriImg + item.poster_path"
            alt=""
            class="object-cover w-full h-full"
          />
        </div>

        <div class="absolute top-0 right-0">
          <div
            class="w-[48px] justify-center flex items-center h-[32px] bg-black opacity-75 text-slate-50"
          >
            <p class="text-lg text-slate-200 font-bold">
              {{ formatRating(item.vote_average) }}
            </p>
          </div>
        </div>
        <div class="flex ms-3 flex-col gap-2 mt-2">
          <p class="text-slate-50 text-lg font-semibold">
            {{ item.title }}
          </p>
          <div class="flex flex-row gap-2">
            <p class="text-slate-400 text-sm">
              {{ formatingYears(item.release_date) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
