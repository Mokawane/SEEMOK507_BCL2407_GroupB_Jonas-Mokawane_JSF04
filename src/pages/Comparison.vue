<script>
export default {
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    comparisonItems() {
      return this.$store.state.comparisonItems || [];
    }
  },
  methods: {
    removeFromComparison(productId) {
      this.$store.commit('REMOVE_FROM_COMPARISON', productId);
    },
    clearComparisonList() {
      this.$store.commit('CLEAR_COMPARISON_LIST');
    }
  }
};
</script>

<template>
    <div v-if="isAuthenticated" class="container mx-auto py-8">
      <h1 class="text-2xl font-bold mb-4">Your Comparison List, </h1>
  
      <div v-if="comparisonItems.length" class="overflow-x-auto">
        <table class="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th class="px-4 py-2 border">Image</th>
              <th class="px-4 py-2 border">Title</th>
              <th class="px-4 py-2 border">Description</th>
              <th class="px-4 py-2 border">Price</th>
              <th class="px-4 py-2 border">Rating</th>
              <th class="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in comparisonItems" :key="item.id">
              <td class="px-4 py-2 border">
                <img :src="item.image" alt="Product Image" class="h-20 object-contain">
              </td>
              <td class="px-4 py-2 border">{{ item.title }}</td>
              <td class="px-4 py-2 border">{{ item.description }}</td>
              <td class="px-4 py-2 border">R{{ item.price }}</td>
              <td class="px-4 py-2 border">{{ item.rating.rate }} ({{ item.rating.count }})</td>
              <td class="px-4 py-2 border">
                <button 
                  @click="removeFromComparison(item.id)" 
                  class="text-red-500 hover:text-red-700 font-semibold">
                  <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" role="img" width="24px" height="24px"
                    fill="none">
                    <path stroke="currentColor" stroke-miterlimit="10" stroke-width="1.5"
                          d="M14.25 7.5v12m-4.5-12v12M5.25 6v13.5c0 1.24 1.01 2.25 2.25 2.25h9c1.24 0 2.25-1.01 2.25-2.25V5.25m0 0h2.75m-2.75 0H21m-12-3h5.25c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5H3">
                    </path>
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
  
        <button 
          @click="clearComparisonList" 
          class="flex items-center mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">
          <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" role="img" width="24px" height="24px"
              fill="none">
              <path stroke="currentColor" stroke-miterlimit="10" stroke-width="1.5"
                d="M14.25 7.5v12m-4.5-12v12M5.25 6v13.5c0 1.24 1.01 2.25 2.25 2.25h9c1.24 0 2.25-1.01 2.25-2.25V5.25m0 0h2.75m-2.75 0H21m-12-3h5.25c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5H3">
              </path>
            </svg>
            All
        </button>
      </div>
  
      <div v-else class="text-center text-gray-500">
        No items in the comparison list.
      </div>
    </div>
  
    <div v-else class="text-center text-gray-500">
      Please log in to access the comparison feature.
    </div>
  </template>