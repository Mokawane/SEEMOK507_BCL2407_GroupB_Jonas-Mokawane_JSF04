import { createStore } from 'vuex';

export default createStore({
  state() {
    return {
      isAuthenticated: !!localStorage.getItem('token'),
      wishlist: JSON.parse(localStorage.getItem('wishlist')) || [],
      cart: JSON.parse(localStorage.getItem('cart')) || [],
      comparisonItems: JSON.parse(localStorage.getItem('comparisonItems')) || [],
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
    CLEAR_WISHLIST(state) {
      state.wishlist = [];
      localStorage.removeItem('wishlist');
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
    CLEAR_CART(state) {
      state.cart = [];
      localStorage.removeItem('cart');
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
        localStorage.setItem('cart', JSON.stringify(state.cart));
      }
    },
    
    ADD_TO_COMPARISON(state, product) {
      if (state.comparisonItems.length < 5) {
        const exists = state.comparisonItems.find(item => item.id === product.id);
        if (!exists) {
          state.comparisonItems.push(product);
          localStorage.setItem('comparisonItems', JSON.stringify(state.comparisonItems));
        }
      }
    },
    REMOVE_FROM_COMPARISON(state, productId) {
      state.comparisonItems = state.comparisonItems.filter(item => item.id !== productId);
      localStorage.setItem('comparisonItems', JSON.stringify(state.comparisonItems));
    },
    CLEAR_COMPARISON_LIST(state) {
      state.comparisonItems = [];
      localStorage.removeItem('comparisonItems');
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
    clearWishlist({ commit }) {
      commit('CLEAR_WISHLIST');
    },
    addToCart({ commit }, product) {
      commit('ADD_TO_CART', product);
    },
    removeFromCart({ commit }, productId) {
      commit('REMOVE_FROM_CART', productId);
    },
    clearCart({ commit }) {
      commit('CLEAR_CART');
    },
    addToComparison({ commit }, product) {
      commit('ADD_TO_COMPARISON', product);
    },
    removeFromComparison({ commit }, productId) {
      commit('REMOVE_FROM_COMPARISON', productId);
    },
    clearComparisonList({ commit }) {
      commit('CLEAR_COMPARISON_LIST');
    }
  },
  getters: {
    isAuthenticated: (state) => state.isAuthenticated,
    wishlist: (state) => state.wishlist,
    cart: (state) => state.cart,
    comparisonItems: (state) => state.comparisonItems,
    cartItemCount: (state) => state.cart.reduce((total, item) => total + item.quantity, 0),
    comparisonItemCount: (state) => state.comparisonItems.length,
  },
});
