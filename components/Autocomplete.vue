<template>
  <div class="relative">
    <div class="relative  py-3 px-3">
      <span
        class="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400"
      >
        <img src="/assets/movie-icon@2x.png" class="overflow-hidden w-8 ml-3" alt="" srcset="" />
      </span>
      <input
        v-model="query"
        @focus="filterSuggestions"
        @input="filterSuggestions"
        @blur="handleBlur"
        type="text"
        placeholder="Search Movie..."
        class="px-4 py-2 pl-12 bg-transparent w-11/12 text-white border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
    <ul
      v-if="filteredSuggestions.length > 0"
      class="absolute z-10 w-6/12 mt-2 bg-white border border-gray-300 rounded shadow-lg"
    >
      <li
        v-for="(suggestion, index) in filteredSuggestions"
        :key="index"
        @mousedown="selectSuggestion(suggestion)"
        class="px-4 py-2 cursor-pointer hover:bg-blue-100"
      >
        {{ suggestion }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: "",
      suggestions: [
        "Vue.js",
        "Tailwind CSS",
        "JavaScript",
        "Nuxt.js",
        "TypeScript",
      ],
      filteredSuggestions: [],
    };
  },
  methods: {
    filterSuggestions() {
      this.filteredSuggestions = this.suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(this.query.toLowerCase())
      );
    },
    selectSuggestion(suggestion) {
      this.query = suggestion;
      this.filteredSuggestions = [];
    },
    clearSuggestions() {
      this.filteredSuggestions = [];
    },
    handleBlur(event) {
      // Allow time for @mousedown to trigger before clearing suggestions
      setTimeout(() => {
        this.clearSuggestions();
      }, 100);
    },
  },
};
</script>
