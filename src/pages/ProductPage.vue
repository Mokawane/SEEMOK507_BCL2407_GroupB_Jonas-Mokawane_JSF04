<script setup>
import { ref, onMounted } from 'vue';
import { useRoute , useRouter} from 'vue-router';

/** 
 * The Vue Router instance.
 * @type {Router} 
 */
const router = useRouter();

/** 
 * The current route instance.
 * @type {RouteLocationNormalizedLoaded} 
 */
const route = useRoute();

/** 
 * The product ID extracted from the route parameters.
 * @type {string} 
 */
const productId = route.params.id;

/** 
 * A ref to hold the product data fetched from the API.
 * @type {Ref<Object|null>} 
 */
const product = ref(null);

/**
 * Fetches the product data from the Fake Store API based on the product ID.
 * @async
 * @function getProduct
 * @returns {Promise<void>}
 */
const getProduct = async () => {
    try {
        const res = await fetch(`https://fakestoreapi.com/products/${productId}`);
        const data = await res.json();
        product.value = data;
    } catch (error) {
        console.error('Error fetching product:', error);
    }
};

/**
 * Lifecycle hook that runs when the component is mounted.
 * Calls the getProduct function to fetch product data.
 */
onMounted(() => {
    getProduct();
});

/**
 * Navigates back to the previous page.
 * @function goBack
 */
const goBack = () => {
    router.push('/');
};

</script>

<template>
    <div @click="() => router.back(`/`)"
        class="flex items-center mt-6 space-x-2  whitespace-nowrap rounded-lg bg-cyan-700 px-3 py-2 text-sm font-medium text-white hover:bg-cyan-900 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors m-2 w-20 ">
            <svg xmlns="http://www.w3.org/2000/svg" id="Bold" viewBox="0 0 24 24" width="24" height="24" class="text-white">
                <path
                    d="M17.921,1.505a1.5,1.5,0,0,1-.44,1.06L9.809,10.237a2.5,2.5,0,0,0,0,3.536l7.662,7.662a1.5,1.5,0,0,1-2.121,2.121L7.688,15.9a5.506,5.506,0,0,1,0-7.779L15.36.444a1.5,1.5,0,0,1,2.561,1.061Z" fill="currentColor" />
            </svg>
            <button class="focus:outline-none">
                Back
            </button>
    </div>
    <div class="grid justify-center">
        <div v-if="product" class="mt-6 sm:mt-8 lg:flex lg:items-start  lg:max-w-6xl xl:max-w-7xl ">
            <div class="mx-auto w-2/5 flex-none">
                <img :src="product.image" :alt="product.title" class="w-[90%] h-[90%]" />
            </div>
            <div class="mx-auto  w-[90%] space-y-2 py-2">
                <h1 class="text-2xl md:text-4xl lg:text-4xl font-bold">{{ product.title }}</h1>
                <h3 class="text-xl md:text-2xl lg:text-2xl font-bold">Price: R{{ product.price }}</h3>
                <button
                    class="bg-cyan-700 hover:bg-cyan-900 w-[90%] md:w-[14rem] lg:w-[14rem]  text-white font-bold py-2 px-4 rounded">Add
                    To Cart
                </button>
                <h2 class="text-lg font-bold">Description</h2>
                <p>{{ product.description }}</p>
            </div>
        </div>
    </div>
</template>