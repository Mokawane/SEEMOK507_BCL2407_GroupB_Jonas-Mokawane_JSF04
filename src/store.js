import { createStore } from 'vuex';

export default createStore({
  state() {
    return {
      isAuthenticated: !!localStorage.getItem('token'),
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
  },
  actions: {
    login({ commit }) {
      commit('login');
    },
    logout({ commit }) {
      commit('logout');
    },
  },
  getters: {
    isAuthenticated: (state) => state.isAuthenticated,
  },
});
