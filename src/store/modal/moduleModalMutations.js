import getDefaultState from './moduleModalState.js';

export default {
  setInitialState(state) {
    Object.assign(state, getDefaultState());
  },
  // setRooms(state, payload) {
  //   state.rooms = payload;
  // },
  // SET_ROOM(state, payload) {
  //   state.room = payload;
  // },
  // ADD_ROOM(state, payload) {
  //   state.rooms.push(payload);
  // },
  SET_MODAL_CLOSE(state) {
    state.activeModal = '';
    state.modalTitle = '';
  },
  SET_MODAL_OPEN(state, payload) {
    state.activeModal = payload.activeModal;
    state.modalTitle = payload.modalTitle;
  },
};
