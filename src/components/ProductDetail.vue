<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

/**
 * Props passed to the component
 * @typedef {Object} Props
 * @property {String} sortOption - The option to sort the products by
 * @property {String} selectedCategory - The selected category to filter products
 * @property {String} searchQuery - The search query to filter products
 */
const props = defineProps({
  sortOption: String,
  selectedCategory: String,
  searchQuery: String
});

/** @type {Ref<Array>} products - The list of products fetched from the API */
const products = ref([]);
// const filteredProducts = ref([]);

/** 
 * @type {Ref<Array>} sortedProducts - The list of sorted and filtered products */
const sortedProducts = ref([]);

/** @type {Ref<Boolean>} loading - The loading state to indicate if products are being fetched */
const loading = ref(true);

/** @type {Route} route - The current route object */
const route = useRoute();

/** @type {Router} router - The Vue router instance */
const router = useRouter();
// const sortOption = ref('default');
// const selectedCategory = ref('All Categories');
// const searchQuery = ref('');


/**
 * Fetches the products from the API and sets the products list
 * @async
 * @function getProducts
 */
const getProducts = async () => {
    try {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      products.value = data;
      filterAndSortProducts();
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
    loading.value = false;
    }
  };


  /**
 * Filters and sorts the products based on the props
 * @function filterAndSortProducts
 */
  const filterAndSortProducts = () => {
    let filtered = [...products.value];
  
    if (props.selectedCategory && props.selectedCategory !== 'All Categories') {
      filtered = filtered.filter(product => product.category === props.selectedCategory);
    }
    
    if (props.searchQuery) {
      filtered = filtered.filter(product => 
        product.title.toLowerCase().includes(props.searchQuery.toLowerCase())
      );
    }

    if (props.sortOption === 'low') {
      sortedProducts.value = filtered.sort((a, b) => a.price - b.price);
    } else if (props.sortOption === 'high') {
      sortedProducts.value = filtered.sort((a, b) => b.price - a.price);
    } else {
      sortedProducts.value = filtered;
    }
  };
  

  /**
 * Lifecycle hook called when the component is mounted
 * @function onMounted
 */
  onMounted(() => {
    getProducts();
  });
  

  /**
 * Watchers to re-filter and sort products when the props change
 * @watch props.sortOption
 * @watch props.selectedCategory
 * @watch props.searchQuery
 */
  watch(() => props.sortOption, filterAndSortProducts);
  watch(() => props.selectedCategory, filterAndSortProducts);
  watch(() => props.searchQuery, filterAndSortProducts);
</script>

<template class="grid justify-center">
    <div v-if="loading" class="flex flex-col justify-center items-center h-screen">
    <div class="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500 mb-4"></div>
    <div class="font-extrabold text-slate-500 leading-snug">Loading</div>
  </div>
      <div v-else class="grid justify-center">
    <ul class="lg:max-h-[130rem] max-w-xl mx-auto grid gap-4 grid-cols-1 lg:grid-cols-4 md:grid-cols-2 items-center lg:max-w-none my-4">
      <li 
          v-for="product in sortedProducts"
          :key="product.id"
          class="flex flex-col max-h-[130rem] cursor-pointer max-w-80 hover:-translate-y-1 hover:scale-105 duration-300 bg-white border border-slate-200 shadow shadow-slate-950/5 rounded-2xl overflow-hidden"
          
        >
          <img @click="() => router.push(`/product/${product.id}`)" :src="product.image" :alt="product.title" class="object-contain h-48 mt-3" />
  
          <div class="flex-1 flex flex-col p-6">
            <div class="flex-1">
                <header @click="() => router.push(`/product/${product.id}`)" class="mb-2 flex-2">
                  <h2 class="text-lg line-clamp-2 font-extrabold leading-snug">
                    <div class="text-slate-600">
                      {{ product.title }}
                    </div>
                  </h2>
                </header>
                <div class="flex gap-2">
                  <svg class="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor" viewBox="0 0 22 20">
                    <path
                      d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <span>{{ product.rating.rate }}</span>
                </div>
                <div class="mx-auto w-[90%] space-y-2">
                <h2 class="text-base line-clamp-2 font-extrabold text-slate-500 leading-snug">
                  R{{product.price}}
                </h2>
              </div>
              <div class="mx-auto w-[90%] space-y-2">
                <h2 class="text-base line-clamp-2 font-extrabold text-slate-500 leading-snug">
                </h2>
              </div>
              <div class="flex mt-1 space-x-2">
                <div class="justify-start flex-1">
                  <span
                    class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10"
                  >
                    {{ product.category }}
                  </span>
                </div>
                <div class="justify-end space-x-2">
                  <button>
                    <svg class="me-1.5 h-5 w-5 hover:fill-red-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" transform="scale(1.6)">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
                    </svg>
                  </button>
                  <button class="inline-flex justify-center whitespace-nowrap rounded-lg bg-cyan-700 px-3 py-2 text-sm font-medium text-white hover:bg-cyan-900 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors">
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </li>
    </ul>
  </div>
</template>