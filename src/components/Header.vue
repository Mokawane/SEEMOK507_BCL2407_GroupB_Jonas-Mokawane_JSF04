<script setup>
  import { ref, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { useStore } from 'vuex';

  /** 
 * A ref to manage the dropdown menu state.
 * @type {Ref<Boolean>}
 */
  const dropdownOpen = ref(false);

  /**
 * Toggles the dropdown menu open and closed.
 * @function
 */
  const toggleDropdown = () => {
    dropdownOpen.value = !dropdownOpen.value;
};

const router = useRouter();
const store = useStore();
const isAuthenticated = computed(() => store.getters.isAuthenticated);

const handleLoginLogout = () => {
  if (isAuthenticated.value) {
    store.dispatch('logout');
    router.push('/login');
  } else {
    router.push('/login');
  }
};

const cartItemCount = computed(() => store.getters.cartItemCount);
</script>

<template>
<header class="sticky z-50 top-0">
    <nav class="bg-gray-500 border-gray-200 ">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <button 
             @click="() => router.push(`/`)"
            class="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="/online-shop.png" class="h-8" alt="Flowbite Logo" />
            <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">
              SwiftCart
            </span>
          </button>
        
        <button
          @click="toggleDropdown"
          type="button"
          class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        <div
          :class="{ 'block': dropdownOpen, 'hidden': !dropdownOpen }"
          class="w-full md:block md:w-auto"
        >
          <ul class="flex flex-col top-10 font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-500 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 ">
            <li @click="() => router.push(`/comparison`)" class="hidden lg:block md:block relative">
                <div class="t-0 absolute left-3 -top-4">
                  <p class="flex h-2 w-2 items-center  justify-center rounded-full bg-red-500 p-3 text-xs text-white">
                    0
                  </p>
                </div>
                <svg  
                      xmlns="http://www.w3.org/2000/svg"
                      id="Layer_1" 
                      data-name="Layer 1"
                      fill="none" 
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      class="file: h-6 w-6 stroke-white cursor-pointer">
                        <path d="m23.561,11.439c.586.585.586,1.536,0,2.121l-5.327,5.327c-1.508,1.508-3.959,1.508-5.467,0l-2.154-2.154c-.338-.337-.887-.337-1.225,0l-4.827,4.827,1.332,1.331c.409.409.119,1.108-.459,1.108H1.091c-.602,0-1.091-.488-1.091-1.091v-4.342c0-.578.699-.868,1.108-.459l1.332,1.332,4.827-4.827c1.507-1.508,3.96-1.508,5.467,0l2.154,2.154c.328.327.896.327,1.225,0l5.327-5.327c.586-.586,1.535-.586,2.121,0Zm-.651-11.439h-4.169c-.642,0-.964.776-.51,1.23l1.209,1.209-4.827,4.827c-.338.337-.887.337-1.225,0l-2.154-2.154c-1.507-1.508-3.96-1.508-5.467,0L.439,10.439c-.586.585-.586,1.536,0,2.121.293.293.677.439,1.061.439s.768-.146,1.061-.439l5.327-5.327c.327-.327.897-.327,1.225,0l2.154,2.154c1.507,1.508,3.959,1.508,5.467,0l4.827-4.827,1.209,1.209c.454.454,1.23.132,1.23-.51V1.091c0-.603-.488-1.091-1.091-1.091Z"/>
                    </svg>
              </li>
            <li @click="() => router.push(`/comparison`)" class="lg:hidden md:hidden py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">
                Comparison
            </li>
            <li @click="() => router.push(`/wishlist`)" class="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">
                Wishlist
            </li>
              <li @click="() => router.push(`/cart`)" class="hidden lg:block md:block relative">
                <div class="t-0 absolute left-3 -top-4">
                  <p class="flex h-2 w-2 items-center  justify-center rounded-full bg-red-500 p-3 text-xs text-white">
                    {{ cartItemCount }}
                  </p>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  class="file: h-6 w-6 stroke-white cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
              </li>
            <li @click="() => router.push(`/cart`)" class="lg:hidden md:hidden py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">
                Cart
            </li>

            <li @click="handleLoginLogout" class="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 ">
              {{ isAuthenticated ? 'Logout' : 'Login' }}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>