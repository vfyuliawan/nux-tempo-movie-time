<template>
  <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
    <div class="mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <DisclosureButton
            class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          >
            <span class="absolute -inset-0.5" />
            <span class="sr-only">Open main menu</span>
            <Bars3Icon v-if="!open" class="block size-6" aria-hidden="true" />
            <XMarkIcon v-else class="block size-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
        <div class="flex flex-1 items-center justify-between sm:items-stretch">
          <div class="flex shrink-0 items-center">
            <img
              class="h-8 w-auto"
              src="/assets/moovietime-logo@2x.png"
              alt="Your Company"
            />
          </div>

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
                  <Dropdown :to-route="true" :label="'Category'" :on-click="$props.genreSelected"  :dropdown-menu="genre"/>
                  <NuxtLink
                    v-for="(item, index) in navigation"
                    @click="onSelected(index)"
                    :key="item.name"
                    :href="item.href"
                    :class="[
                      isSelected === index
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 flex-shrink-0 hover:bg-gray-700 hover:text-white',
                      'rounded-md px-3 py-2 text-sm font-medium cursor-pointer',
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
          <button
            type="button"
            class="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            <span class="absolute -inset-1.5" />
            <span class="sr-only">View notifications</span>
            <BellIcon class="size-6" aria-hidden="true" />
          </button>

          <!-- Profile dropdown -->
          <Menu as="div" class="relative ml-3">
            <div>
              <MenuButton
                class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span class="absolute -inset-1.5" />
                <span class="sr-only">Open user menu</span>
                <img
                  class="size-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </MenuButton>
            </div>
            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <MenuItems
                class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none"
              >
                <MenuItem v-slot="{ active }">
                  <a
                    href="#"
                    :class="[
                      active ? 'bg-gray-100 outline-none' : '',
                      'block px-4 py-2 text-sm text-gray-700',
                    ]"
                    >Your Profile</a
                  >
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a
                    href="#"
                    :class="[
                      active ? 'bg-gray-100 outline-none' : '',
                      'block px-4 py-2 text-sm text-gray-700',
                    ]"
                    >Settings</a
                  >
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a
                    href="#"
                    :class="[
                      active ? 'bg-gray-100 outline-none' : '',
                      'block px-4 py-2 text-sm text-gray-700',
                    ]"
                    >Sign out</a
                  >
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="space-y-1 px-2 pb-3 pt-2">
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
import { GeneralEnum } from '../../types/generalEnum';

const navigation = [
  { name: "Movie", href: "movie" },
  { name: "Tv Show", href: "tvShow" },
  { name: "Login", href: "" },
];


const {getMovieGenres} = useMovies()
const genre = ref<DropdownItem[]>([])



onMounted(async() => {
  getGenre()
})

const props = defineProps<{
  genre: Genre[]; 
  genreSelected:(genre: DropdownItem)=>void
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

const isSelected = ref(-1);


</script>
