import getDefaultState from './moduleMenuState.js';

export default {
  setInitialState(state) {
    Object.assign(state, getDefaultState());
  },
  SET_MENU_CLOSE(state) {
    state.activeMenu = '';
  },
  SET_MENU_OPEN(state, payload) {
    state.activeMenu = payload;
  },
};
