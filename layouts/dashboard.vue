<template>
    <div>
      <header>
        <h1>Ini web layout dashboard</h1>
        <div class="flex flex-row">
          <NuxtLink
            class="bg-red-500 text-sm px-5 py-2.5 me-2 mb-2text-center min-w-10 cursor-pointer rounded-lg text-white hover:bg-red-300"
            to="about"
            >About</NuxtLink
          >
          <NuxtLink
            class="bg-red-500 text-sm px-5 py-2.5 me-2 mb-2text-center min-w-10 cursor-pointer rounded-lg text-white hover:bg-red-300"
            to="contact"
            >Contact</NuxtLink
          >
          <NuxtLink
            class="bg-red-500 text-sm px-5 py-2.5 me-2 mb-2text-center min-w-10 cursor-pointer rounded-lg text-white hover:bg-red-300"
            to="burger"
            >Burger</NuxtLink
          >
        </div>
      </header>
      <slot />
    </div>
  </template>
  