import { createStore } from 'vuex';

export default createStore({
  state() {
    return {
      isAuthenticated: !!localStorage.getItem('token'),
      wishlist: JSON.parse(localStorage.getItem('wishlist')) || [],
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
        localStorage.setItem('wishlist', JSON.stringify(state.wishlist)); // Save to localStorage
      }
    },
    REMOVE_FROM_WISHLIST(state, productId) {
      state.wishlist = state.wishlist.filter(item => item.id !== productId);
      localStorage.setItem('wishlist', JSON.stringify(state.wishlist)); // Update localStorage
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
  },
  getters: {
    isAuthenticated: (state) => state.isAuthenticated,
    wishlist: (state) => state.wishlist,
  },
});
