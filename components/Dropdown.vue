<script lang="ts" setup>
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";

export interface DropdownItem {
  name: string;
  id: string;
}
// Props
const props = defineProps({
  dropdownMenu: {
    type: Array as () => DropdownItem[],
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: false,
    default: "/assets/grid-icon@2x.png",
  },
  onClick: {
    type: Function as unknown as () => (item: DropdownItem) => void,
    required: false,
  },
  toRoute:{
    type:Boolean,
    reqired: true
  }
});

const dynamicLabel = ref(props.label);
const router = useRouter();


const defaultOnClick = (item: DropdownItem) => {
  dynamicLabel.value = item.name; 
};

const handleClick = (item: DropdownItem, close: () => void) => {
  defaultOnClick(item); 
  if (props.onClick) {
    props.onClick(item);
  }
  if (props.toRoute) {
    router.push(`/${item.name}`);
  }

  close();
};
</script>

<template>
  <Menu as="div" class="relative inline-block text-left">
    <div>
      <MenuButton
        class="inline-flex w-full items-center justify-center gap-x-1.5 rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700"
      >
        <div class="w-[20px] items-center justify-center flex h-[20px]">
          <img :src="img" alt="icon" class="overflow-hidden" />
        </div>
        {{ dynamicLabel }}
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
        class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
      >
        <div class="py-1">
          <MenuItem
            v-for="(item, index) in dropdownMenu"
            :key="index"
            v-slot="{ active, close }"
          >
            <NuxtLink

              @click.prevent="handleClick(item, close)"
              :class="[
                active
                  ? 'bg-gray-100 text-gray-900 outline-none'
                  : 'text-gray-700',
                'block px-4 py-2 text-sm',
              ]"
            >
              {{ item.name }}
            </NuxtLink>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>
