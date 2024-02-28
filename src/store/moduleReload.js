const state = {
    shouldReload: false,
  };
  
  const getters = {
    shouldReload: (state) => state.shouldReload,
  };
  
  const mutations = {
    setReloadFlag(state, value) {
      state.shouldReload = value;
    },
  };
  
  const actions = {
    setReloadFlag({ commit }, value) {
      commit('setReloadFlag', value);
    },
  };
  
  export default {
    state,
    getters,
    mutations,
    actions,
  };