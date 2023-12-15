// import actions from './moduleModalActions.js';
import mutations from './moduleModalMutations.js';
import getDefaultState from './moduleModalState.js';

export default {
  namespaced: true,
  // actions,
  state: getDefaultState(),
  mutations,
};
