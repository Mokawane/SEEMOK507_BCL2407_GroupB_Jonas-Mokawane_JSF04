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
  <div class="container mx-auto">
    <h1 class="text-4xl font-extrabold text-slate-600 mt-6">Your Cart,</h1>
    <div v-if="cartItems.length">
      <div v-for="item in cartItems" :key="item.id" class="flex items-center justify-between mb-4">
        <img :src="item.image" alt="Product Image" class="w-20 h-20 object-cover rounded">
        <div class="flex-1 ml-4">
          <h2 class="text-lg font-medium">{{ item.title }}</h2>
          <p class="text-gray-500">{{ item.category }}</p>
        </div>
        <div class="flex items-center">
          <button @click="decreaseQuantity(item)" class="px-2 bg-gray-300 rounded-l">-</button>
          <input type="text" v-model="item.quantity" class="w-12 text-center border-t border-b border-gray-300">
          <button @click="increaseQuantity(item)" class="px-2 bg-gray-300 rounded-r">+</button>
        </div>
        <p class="ml-4 font-semibold">{{ item.price }}</p>
        <button @click="removeFromCart(item)" class="ml-4 text-red-500">Remove</button>
      </div>
      <div class="flex justify-end mt-6">
        <p class="text-lg font-semibold">Total: {{ totalPrice }}</p>
      </div>
    </div>
    <div v-else>
      <p class="text-center text-gray-500">Your cart is empty.</p>
    </div>
  </div>
</template>

