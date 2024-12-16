<template>
  <Disclosure as="nav" class=" bg-opacity-50 bg-slate-800 fixed top-0 left-0 w-full z-50 " v-slot="{ open }">
    <div class="mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <DisclosureButton
            class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          >
            <span class="absolute -inset-0.5" />
            <span class="sr-only">Open main menu</span>
            <Bars3Icon v-if="!open" class="block size-6" aria-hidden="true" />
            <XMarkIcon v-else class="block size-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
        <div
          class="flex flex-1 items-center justify-between relative sm:static sm:blocksm:items-center"
        >
          <NuxtLink
          to="/"
            class="flex shrink-0 items-center absolute sm:relative right-2 sm:right-auto sm:left-3"
          >
            <img
              class="h-8 w-auto"
              src="/assets/moovietime-logo@2x.png"
              alt="Movie Time"
            />
          </NuxtLink>

          <!-- menu -->

          <div
            class="hidden justify-end items-end self sm:ml-6 sm:block w-full"
          >
            <div class="flex flex-row">
              <div class="basis-3/4 flex w-full justify-end items-end">
                <Autocomplete class="w-11/12" />
              </div>
              <div class="basis-1/4">
                <div
                  class="flex flex-row mx-auto h-full justify-center items-center"
                >
                  <Dropdown
                    :to-route="true"
                    :label="'Category'"
                    :on-click="$props.genreSelected"
                    :dropdown-menu="genre"
                  />
                  <NuxtLink
                    v-for="(item, index) in navigation"
                    @click="onSelected(index)"
                    :key="item.name"
                    :href="item.href"
                    :class="[
                      isSelected === index
                        ? 'bg-gray-900 text-white '
                        : 'text-gray-300 flex-shrink-0 hover:bg-gray-700 hover:text-white',
                      'rounded-md px-5 py-2 text-sm font-medium cursor-pointer',
                    ]"
                    :aria-current="isSelected === index ? 'page' : undefined"
                  >
                    {{ item.name }}
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
        >
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="space-y-1 px-2 pb-3 pt-2 ">
        <DisclosureButton
          v-for="(item, index) in navigation"
          :key="item.name"
          as="a"
          :href="item.href"
          :class="[
            index === isSelected
              ? 'bg-gray-900 text-white'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
            'block rounded-md px-3 py-2 text-base font-medium',
          ]"
          :aria-current="index === isSelected ? 'page' : undefined"
          >{{ item.name }}</DisclosureButton
        >
        <DisclosureButton>
          <Dropdown
          :to-route="true"
          :label="'Category'"
          :on-click="$props.genreSelected"
          :dropdown-menu="genre"
        />
        </DisclosureButton>
        
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup lang="ts">
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/vue";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/vue/24/outline";
import type { Genre } from "~/interfaces/genre";
import type { DropdownItem } from "../Dropdown.vue";
import { GeneralEnum } from "../../types/generalEnum";
import { route } from '../../../Salinan nux-tempo-movie-time/pages/@[[username]]/route';

const navigation = [
  { name: "Movie", href: "movie" },
  { name: "TvShow", href: "" },
  { name: "Login", href: "" },
];

const { getMovieGenres } = useMovies();
const genre = ref<DropdownItem[]>([]);

onMounted(async () => {
  getGenre();
});

const props = defineProps<{
  genre: Genre[];
  genreSelected: (genre: DropdownItem) => void;
}>();

const getGenre = async () => {
  const toDropdownMenu = props?.genre.map((item) => {
    return {
      id: item.id.toString(),
      name: item.name,
    } as DropdownItem;
  });
  genre.value = toDropdownMenu;
};

const onSelected = (indexMenu: number) => {
  isSelected.value = indexMenu;
};

const isSelected = ref(0);
</script>
