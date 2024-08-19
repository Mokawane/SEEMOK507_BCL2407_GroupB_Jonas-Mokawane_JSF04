import { createStore } from 'vuex';

export default createStore({
  state() {
    return {
      isAuthenticated: !!localStorage.getItem('token'),
      wishlist: JSON.parse(localStorage.getItem('wishlist')) || [],
      cart: JSON.parse(localStorage.getItem('cart')) || [],
    };
  },
  mutations: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
    ADD_TO_WISHLIST(state, product) {
      const exists = state.wishlist.find(item => item.id === product.id);
      if (!exists) {
        state.wishlist.push(product);
        localStorage.setItem('wishlist', JSON.stringify(state.wishlist));
      }
    },
    REMOVE_FROM_WISHLIST(state, productId) {
      state.wishlist = state.wishlist.filter(item => item.id !== productId);
      localStorage.setItem('wishlist', JSON.stringify(state.wishlist));
    },

    ADD_TO_CART(state, product) {
      const exists = state.cart.find(item => item.id === product.id);
      if (exists) {
        exists.quantity++;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    
    REMOVE_FROM_CART(state, productId) {
      state.cart = state.cart.filter(item => item.id !== productId);
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    INCREASE_QUANTITY(state, itemId) {
      const item = state.cart.find(item => item.id === itemId);
      if (item) {
        item.quantity++;
      }
    },
    DECREASE_QUANTITY(state, itemId) {
      const item = state.cart.find(item => item.id === itemId);
      if (item && item.quantity > 1) {
        item.quantity--;
      }
    },
  },
  actions: {
    login({ commit }) {
      commit('login');
    },
    logout({ commit }) {
      commit('logout');
    },
    addToWishlist({ commit }, product) {
      commit('ADD_TO_WISHLIST', product);
    },
    removeFromWishlist({ commit }, productId) {
      commit('REMOVE_FROM_WISHLIST', productId);
    },
    addToCart({ commit }, product) {
      commit('ADD_TO_CART', product);
    },
    removeFromCart({ commit }, productId) {
      commit('REMOVE_FROM_CART', productId);
    },
  },
  getters: {
    isAuthenticated: (state) => state.isAuthenticated,
    wishlist: (state) => state.wishlist,
    cart: (state) => state.cart,
  },
});
