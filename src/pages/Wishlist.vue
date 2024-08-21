<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const wishlist = computed(() => store.getters.wishlist);

function removeFromWishlist(productId) {
  store.dispatch('removeFromWishlist', productId);
}

function clearWishlist() {
  store.dispatch('clearWishlist');
}
</script>

<template>
  <div class="grid justify-center m-4">
    <h1 class="text-4xl font-extrabold text-slate-600 mt-6">Your Wishlist,</h1>
    <div>
      <button 
          @click="clearWishlist" 
          class="flex items-center mt-4 bg-red-500 text-white px-4 py-2 mx-4 my-4 rounded hover:bg-red-700">
          <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" role="img" width="24px" height="24px"
              fill="none">
              <path stroke="currentColor" stroke-miterlimit="10" stroke-width="1.5"
                d="M14.25 7.5v12m-4.5-12v12M5.25 6v13.5c0 1.24 1.01 2.25 2.25 2.25h9c1.24 0 2.25-1.01 2.25-2.25V5.25m0 0h2.75m-2.75 0H21m-12-3h5.25c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5H3">
              </path>
            </svg>
            All
        </button>
      </div>
    <ul v-if="wishlist.length > 0" class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <li v-for="product in wishlist" :key="product.id"
        class="wishlist-item bg-white flex flex-col border border-slate-200 shadow rounded-2xl overflow-hidden my-3">
        <img :src="product.image" :alt="product.title" class="object-contain h-48 mt-3 mx-auto" />
        <div class="p-6">
          <h2 class="text-lg font-extrabold text-slate-600 mb-2">{{ product.title }}</h2>
          <p class="text-base font-bold text-slate-500">R{{ product.price }}</p>
          <p
            class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
            {{ product.category }}</p>
        </div>
        <div class="justify-end space-x-2 px-6">
          <button @click="removeFromWishlist(product.id)">
            <svg class="me-1.5 h-5 w-5 hover:fill-red-500 mt-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
              width="24" height="24" fill="none" viewBox="0 0 24 24" transform="scale(1.6)">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
            </svg>
          </button>
          <button
            class="inline-flex float-right whitespace-nowrap rounded-lg bg-cyan-700 m-3 px-3 py-2 text-sm font-medium text-white hover:bg-cyan-900 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors">
            Add To Cart
          </button>
        </div>
      </li>
    </ul>
    <p v-else class="text-center text-slate-500">Your wishlist is empty.</p>
  </div>
</template>