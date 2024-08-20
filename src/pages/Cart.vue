<script>
export default {
  computed: {
    cartItems() {
      return this.$store.state.cart;
    },
    totalPrice() {
      const total = this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
      return total.toFixed(2);
    },
  },
  methods: {
    increaseQuantity(item) {
      this.$store.commit('INCREASE_QUANTITY', item.id);
    },
    decreaseQuantity(item) {
      this.$store.commit('DECREASE_QUANTITY', item.id);
    },
    removeFromCart(item) {
      this.$store.commit('REMOVE_FROM_CART', item.id);
    },
  },
};
</script>

<template>
  <div class="container mx-auto mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
    <div class="lg:col-span-8">
      <h1 class="text-4xl font-extrabold text-slate-600 mt-6">Your Cart,</h1>
      <div v-if="cartItems.length">
        <div v-for="item in cartItems" :key="item.id" class="flex items-center justify-between mb-8 border-b pb-4">
          <img :src="item.image" alt="Product Image" class="w-24 h-24 object-contain rounded">
          <div class="flex-1 ml-4">
            <h2 class="text-lg font-semibold">{{ item.title }}</h2>
            <p class="text-gray-500">{{ item.category }}</p>
            <button @click="removeFromCart(item)" class="mx-6 text-red-500">
            <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" role="img" width="24px" height="24px"
              fill="none">
              <path stroke="currentColor" stroke-miterlimit="10" stroke-width="1.5"
                d="M14.25 7.5v12m-4.5-12v12M5.25 6v13.5c0 1.24 1.01 2.25 2.25 2.25h9c1.24 0 2.25-1.01 2.25-2.25V5.25m0 0h2.75m-2.75 0H21m-12-3h5.25c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5H3">
              </path>
            </svg>
          </button>
          </div>
          <div class="flex items-center">
            <button @click="decreaseQuantity(item)" class="px-2 bg-gray-300 rounded-l">-</button>
            <input type="text" v-model="item.quantity" class="w-10 text-center border-t border-b border-gray-300">
            <button @click="increaseQuantity(item)" class="px-2 bg-gray-300 rounded-r">+</button>
          </div>
          <p class="text-lg font-semibold mx-2">R{{ item.price }}</p>
        </div>
      </div>
      <div v-else>
        <p class="text-center text-gray-500">Your cart is empty.</p>
      </div>
    </div>
    <div class="lg:col-span-4 bg-gray-50 p-6 rounded-md">
      <h2 class="text-xl font-bold mb-4">Summary</h2>
      <div class="flex justify-between text-gray-700 mb-2">
        <p>Subtotal</p>
        <p>R{{ totalPrice }}</p>
      </div>
      <div class="flex justify-between text-gray-700 mb-2">
        <p>VAT</p>
        <p></p>
      </div>
      <div class="flex justify-between text-gray-700 mb-2">
        <p>Estimated Delivery & Handling</p>
        <p></p>
      </div>
      <div class="flex justify-between text-gray-900 font-semibold text-lg mt-4">
        <p>Total</p>
        <p>R{{ totalPrice }}</p>
      </div>
      <button class="w-full mt-6 bg-black text-white py-3 rounded-md font-semibold hover:bg-gray-800">
        Member Checkout
      </button>
    </div>
  </div>
</template>
