/* eslint-disable camelcase */
import axios from '../../axios';
import constant from '../../../constant';
export default {
  async checkUserExist({ commit }, payload) {
    try {
      return await axios.get(`https://api.room.video.wiki/api/share/room/?email=${payload.email}&cast_id=${payload.cast_id}`);
    } catch (e) {
      //console.log("Error: User not found")
    }
  },
  async renameRoomRecording({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .patch('https://api.room.video.wiki/api/update/user/recording/', payload, {
          'Content-Type': 'application/json',
        })
        .then((res) => {
          resolve(res);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  async deleteRecording({ commit, state }, recordingId) {
    const recordings = state.recordings;
    const newRecordings = recordings.filter(item => item.url["Record ID"] !== recordingId);
    commit('SET_RECORDINGS', newRecordings);
  },
  async renameRoom({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .patch('https://api.room.video.wiki/api/update/name/', payload, {
          'Content-Type': 'application/json',
        })
        .then((res) => {
          resolve(res);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  async changeShortCode({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .patch('https://api.room.video.wiki/api/url/update/', payload, {
          'Content-Type': 'application/json',
        })
        .then((res) => {
          resolve(res);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  async getOriginalUrl({ commit }, shortCode) {
    try {
      const res = await axios.get(`https://api.room.video.wiki/api/url/retrieve/${shortCode}/`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return res;
    } catch (error) {
      return null;
    }
  },
  // async getList({ commit }, payload) {
  //   const res = await axios.get('https://api.room.video.wiki/api/list/');
  //   //console.log(res, 'roomlkis');
  //   const { room_data } = res.data;
  //   if (room_data.length > 1) {
  //     commit('setRooms', room_data.slice(1, room_data.length));
  //   }
  //   commit('SET_ROOM', room_data[0]);
  // },
  async getList({ commit }, payload) {
    const res = await axios.get('https://api.room.video.wiki/api/list/');
    const { room_data } = res.data;
    if (room_data.length > 0) {
      commit('setRooms', room_data);
    }
    commit('SET_ROOM', room_data[0]);
  },
  async start({ commit }, payload) {
    const res = await axios({
      method: 'POST',
      url: 'https://api.room.video.wiki/api/join/',
      data: {
        name: 'Ritik',
        public_meeting_id: payload,
        password: '',
      },
    });
    return res;
  },

  async addRoom({ commit }, payload) {
    const data = {
      event_name: payload.room_name,
      room_code: '',
      join_now: 'False',
      logout_url: 'https://decast.live/dashboard',
    }
    if (payload.board_id) {
      data["board_id"] = payload.board_id;
    }
    const res = await axios({
      method: 'POST',
      url: 'https://api.room.video.wiki/api/create/',
      data: data,
    });
    var room = {
      room_name: payload.room_name,
      room_url:
        'https://api.room.video.wiki/join-room/' + res.data.public_cast_id,
      short_code: res.data.short_code
    };
    commit('ADD_ROOM', room);
    return res;
  },
  // async getRecordings({ commit }) {
  //   const res = await axios.get(
  //     'https://api.room.video.wiki/api/get/user/recordings/'
  //   );
  //   commit('SET_RECORDINGS', res.data.recordings);
  //   return res.data;
  // },
  async getRecordings({ commit }) {
    try {
      const res = await axios.get('https://api.room.video.wiki/api/get/user/recordings/');

      // Sort recordings by 'Start Time (Readable)' in descending order (newest first)
      res.data.recordings.sort((a, b) => {
        const dateA = new Date(a.url['Start Time (Readable)']);
        const dateB = new Date(b.url['Start Time (Readable)']);
        return dateB - dateA; // Compare dates in reverse order for descending sort
      });

      // Format 'Start Time (Readable)' to DD/MM/YY
      res.data.recordings.forEach(recording => {
        const date = new Date(recording.url['Start Time (Readable)']);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const year = String(date.getFullYear()).substring(2); // Get last two digits of the year
        const formattedDate = `${day}/${month}/${year}`;
        recording.url['Start Time (Readable)'] = formattedDate;
      });

      commit('SET_RECORDINGS', res.data.recordings);
      return res.data;
    } catch (error) {
      // Handle error
      ////console.log('Error fetching recordings:', error);
      throw error; // Rethrow error to be handled upstream
    }
  },
};
