import axios from '../../axios';
import constants from '../../../constant';

const state = {
  siaMinutes: 0,
  siaFreeGiven: false,
  swarmMinutes: 0,
  swarmFreeGiven: false,
};

const mutations = {
  setUserMinutes(
    state,
    { siaMinutes, siaFreeGiven, swarmMinutes, swarmFreeGiven }
  ) {
    state.siaMinutes = siaMinutes;
    state.siaFreeGiven = siaFreeGiven;
    state.swarmMinutes = swarmMinutes;
    state.swarmFreeGiven = swarmFreeGiven;
  },
};

const actions = {
  async fetchUserMinutes({ commit }) {
    try {
      const response = await axios.get(
        constants.apiCastUrl + '/api/decast/get/user/minutes/'
      );
      const { sia_minutes, sia_free_given, swarm_minutes, swarm_free_given } =
        response.data;
      commit('setUserMinutes', {
        siaMinutes: sia_minutes,
        siaFreeGiven: sia_free_given,
        swarmMinutes: swarm_minutes,
        swarmFreeGiven: swarm_free_given,
      });
    } catch (error) {
      ////console.log('Error fetching user minutes:', error);
    }
  },
};

export default {
  state,
  mutations,
  actions,
};
