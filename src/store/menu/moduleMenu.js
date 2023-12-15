import mutations from './moduleMenuMutations.js';
import getDefaultState from './moduleMenuState.js';

export default {
  namespaced: true,
  state: getDefaultState(),
  mutations,
};
