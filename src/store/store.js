/* =========================================================================================
  File Name: store.js
  Description: Vuex store
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== */

import Vue from 'vue';
import Vuex from 'vuex';

import state from './state';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';

import moduleAuth from './auth/moduleAuth.js';
import moduleStudio from './studio/moduleStudio.js';
import moduleSearch from './search/moduleSearch.js';
import moduleCast from './cast/moduleCast';
import moduleRoom from './room/moduleRoom';

Vue.use(Vuex);

export default new Vuex.Store({
  getters,
  mutations,
  state,
  actions,
  modules: {
    auth: moduleAuth,
    studio: moduleStudio,
    search: moduleSearch,
    cast: moduleCast,
    room: moduleRoom,
  },
  strict: process.env.NODE_ENV !== 'production',
});
