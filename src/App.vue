<script setup>
  import { ref, onMounted, computed } from 'vue'
  import { useRoute } from 'vue-router';
  import Header from './components/Header.vue';
  import Filter from './components/Filter.vue';
  import Sort from './components/Sort.vue';

  /**
 * The selected sorting option.
 * @type {import('vue').Ref<string>}
 */
  const sortOption = ref('default');

  /**
 * The selected category.
 * @type {import('vue').Ref<string>}
 */
  const selectedCategory = ref('All Categories');


/**
 * The list of categories.
 * @type {import('vue').Ref<Array<string>>}
 */
  const categories = ref([]);

  /**
 * The search query string.
 * @type {import('vue').Ref<string>}
 */
  const searchQuery = ref('');

  /**
 * The route object provided by vue-router.
 * @type {import('vue-router').RouteLocationNormalized}
 */
  const route = useRoute();

  /**
 * Handles the change of the sorting option.
 * @param {string} newSortOption - The new sorting option.
 */
  const handleSortChange = (newSortOption) => {
    sortOption.value = newSortOption;
  };

  /**
 * Handles the change of the selected category.
 * @param {string} newCategory - The new category.
 */
  const handleCategoryChange = (newCategory) => {
  selectedCategory.value = newCategory;
};

/**
 * Handles the change of the search query.
 * @param {string} newSearchQuery - The new search query.
 */
const handleSearchChange = (newSearchQuery) => {
  searchQuery.value = newSearchQuery;
};

/**
 * Fetches the list of categories from the API and sets the categories ref.
 * @function getCategories
 */
const getCategories = () => {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data) => {
      const uniqueCategories = [...new Set(data.map(product => product.category))];
      categories.value = ['All Categories', ...uniqueCategories];
    });
};


/**
 * Fetches categories when the component is mounted.
 * @function onMounted
 */
onMounted(() => {
  getCategories();
});

/**
 * Computed property to check if the current route is a product page.
 * @type {import('vue').ComputedRef<boolean>}
 */
const isProductPage = computed(() => route.path.startsWith("/product/"));
</script>

<template>

  <Header />
  <div v-if="!isProductPage" class="grid lg:flex gap-y-4 gap-x-48 lg:items-start mt-3 mx-auto justify-center">
    <Filter :categories="categories" @categoryChange="handleCategoryChange" @searchChange="handleSearchChange" />
  <Sort @sortChange = "handleSortChange" />
</div>
  <router-view :sortOption="sortOption" :selectedCategory="selectedCategory" :searchQuery="searchQuery" />
</template>

<style scoped>
</style>

