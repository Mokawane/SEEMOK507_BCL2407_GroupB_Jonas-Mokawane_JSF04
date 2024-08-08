<script setup>
  import { ref } from 'vue';
  
  /**
 * Props passed to the component.
 * @typedef {Object} Props
 * @property {Array<string>} categories - List of categories for the dropdown.
 */

/** 
 * @type {Props} 
 */
  const props = defineProps({
    categories: Array
  });
  
  /**
 * Emits events for category and search changes.
 * @typedef {Object} Emits
 * @property {function(string): void} categoryChange - Emit event when the category is changed.
 * @property {function(string): void} searchChange - Emit event when the search query is changed.
 */
  const emit = defineEmits(['categoryChange', 'searchChange']);

  /** 
 * A ref to manage the dropdown menu state.
 * @type {Ref<Boolean>}
 */
  const showDropdown = ref(false);

  /** 
 * A ref to hold the currently selected category.
 * @type {Ref<String>}
 */
  const selectedCategory = ref('All Categories');

  /** 
 * A ref to hold the search query input.
 * @type {Ref<String>}
 */
  const searchQuery = ref('');
  
  /**
 * Toggles the dropdown menu open and closed.
 * @function
 */
  const toggleDropdown = () => {
    showDropdown.value = !showDropdown.value;
  };
  
  /**
 * Handles selecting a category from the dropdown.
 * @function
 * @param {string} category - The selected category.
 */
  const handleCategorySelect = (category) => {
    selectedCategory.value = category;
    emit('categoryChange', category);
    showDropdown.value = false;
  };

  /**
 * Emits the search query when the input changes.
 * @function
 */
  const handleSearch = () => {
  emit('searchChange', searchQuery.value);
};
</script>

<template>
    <form>
        <div class="flex lg:w-[31.25rem] sm:w-[95%] md:w-full relative">
            <button
                @click="toggleDropdown"
                class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 "
                type="button"> {{ selectedCategory }}
                <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="m1 1 4 4 4-4" />
                </svg>
            </button>
            <div 
                v-show="showDropdown"
                class="z-10 absolute top-[100%] bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                <ul class="py-2 text-sm text-gray-700" aria-labelledby="dropdown-button">
                    <li
                        v-for="category in categories"
                        :key="category"
                        @click="handleCategorySelect(category)"
                        class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer">
                        {{ category }}
                    </li>
                    <!-- <li>
                        <button class="inline-flex w-full px-4 py-2 hover:bg-gray-100">
                        </button>
                    </li> -->
                </ul>
            </div>
            <div class="relative w-full">
                <input
                    v-model="searchQuery"
                    @input="handleSearch"
                    class=" p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                    placeholder="Search products..." />
                <button type="submit"
                    class="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ">
                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                    <span class="sr-only">Search</span>
                </button>
            </div>
        </div>
    </form>
</template>