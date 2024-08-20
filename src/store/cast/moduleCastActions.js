/* eslint-disable camelcase */
import axios from '../../axios';
import constants from '../../../constant';
export default {
  async getAllCasts({ commit }) {
    const response = await axios.get(
      constants.apiCastUrl + '/api/event/get/all/info/'
    );
    const allCasts = response.data.my_events.sort(
      (a, b) => b.event_id - a.event_id
    );
    commit('SET_ALL_CASTS', allCasts);
    return allCasts;
  },
  async getDecasts({ commit }) {
    try {
      const res = await axios.get(
        constants.apiCastUrl + '/api/event/get/decast/info/'
      );
      return res;
    } catch (error) {
      console.error('Error fetching all casts:', error);
    }
  },
  async renameRecording({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .patch(constants.apiCastUrl + '/api/event/update/recording/', payload, {
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
    const newRecordings = recordings.map((subList) =>
      subList.filter((item) => item['Record ID'] !== recordingId)
    );
    commit('SET_RECORDING_LIST', newRecordings);
  },
  async changeShortCode({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .patch(constants.apiCastUrl + '/api/url/update/', payload, {
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
      const res = await axios.get(
        `${constants.apiCastUrl}/api/url/retrieve/${shortCode}/`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return res;
    } catch (error) {
      return null;
    }
  },
  async getCastList({ commit }) {
    try {
      const response = await axios.get(
        constants.apiCastUrl + '/api/event/user/events/'
      );
      // //console.log(response, 'castlis');
      const casts = response.data.my_events;
      const castInfoPromises = casts.map(async (cast) => {
        try {
          const castDetailsResponse = await axios.get(
            `${constants.apiCastUrl}/api/event/meeting/get/details/?cast_id=${cast.public_meeting_id}`
          );
          return {
            castId: cast.public_meeting_id,
            details: castDetailsResponse.data,
          };
        } catch (error) {
          console.error(error);
          return null;
        }
      });
      const castInfoList = await Promise.all(castInfoPromises);
      const validCastInfoList = castInfoList.filter((info) => info !== null);
      const castsInfo = {};
      validCastInfoList.forEach((info) => {
        castsInfo[info.castId] = info.details;
      });
      commit('SET_CASTS_INFO', castsInfo);
      commit('SET_ALL_CASTS', casts);
      // //console.log(castsInfo, 'TTTT');
      // //console.log(casts, 'pppp');
    } catch (error) {
      console.error(error);
    }
  },
  getUserCasts({ commit }) {
    return axios.get(constants.apiCastUrl + '/api/event/user/events/');
  },

  compressImage({ commit }, { data, maxWidth, maxHeight, quality }) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = data;
      image.onload = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        let width = image.width;
        let height = image.height;

        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }

        canvas.width = width;
        canvas.height = height;

        context.drawImage(image, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              resolve(reader.result);
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          },
          'image/jpeg',
          quality
        );
      };
      image.onerror = reject;
    });
  },
  checkCreateJoin({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(constants.apiCastUrl + '/api/creator/join/cast/', payload, {
          'Content-Type': 'application/json',
        })
        .then((res) => {
          //console.log('This is running');
          //console.log(res);
          // location.href = res.data.cast_url;
          resolve(res);
        })
        .catch((e) => {
          //console.log(e.response);
          if (
            e.response.status === 400 &&
            e.response.data.message ===
              'please check the scheduled cast start time'
          ) {
            location.href = '/joining/' + this.$route.params.cast_Id;
          }
          reject(e);
        });
    });
  },

  meetingInfo({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${constants.apiCastUrl}/api/event/meeting/info/?public_meeting_id=${payload}`
        )
        .then((res) => {
          //console.log('meeting working');
          resolve(res);
        })
        .catch((error) => {
          //console.log('meeting not working');
          reject(error);
        });
    });
  },

  meetInfo({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${constants.apiCastUrl}/api/event/meeting/get/details/?cast_id=${payload}`
        )
        .then((res) => {
          //console.log('meeting working');
          resolve(res);
        })
        .catch((error) => {
          //console.log('meeting not working');
          reject(error);
        });
    });
  },

  getCertificateInfo({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${constants.apiCastUrl}/api/event/fetch/nft/details/?cast_id=${payload}&nft_type=vc`,
          {
            mode: 'no-cors',
          }
        )
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
          console.log(error);
        });
    });
  },

  joinNow({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(constants.apiCastUrl + '/api/event/meeting/join/', payload)
        .then((response) => {
          //console.log('joining Now');
          resolve(response.data);
        })
        .catch((error) => {
          //console.log('cannot join');
          reject(error);
        });
    });
  },

  verifyingOtp({ commit }, payload) {
    const { email, otp, eventId } = payload;
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${constants.apiCastUrl}/api/event/validate/otp/?email=${email}&cast_id=${eventId}&otp=${otp}`
        )
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
          console.log(error);
        });
    });
  },
  sendingOtp({ commit }, payload) {
    const { email, eventId } = payload;
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${constants.apiCastUrl}/api/event/send/otp/?email=${email}&cast_id=${eventId}`
        )
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
          console.log(error);
        });
    });
  },

  editEvent({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'GET',
        url: `${constants.apiCastUrl}/api/event/meeting/get/details/?cast_id=${payload}`,
      })
        .then((res) => {
          resolve(res);
          // //console.log(res,"res..")
        })
        .catch((error) => {
          reject(error);
          //console.log('not Editing');
          console.log(error);
        });
    });
  },
  formSubmit({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .patch(constants.apiCastUrl + '/api/event/meeting/update/', payload)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          //console.log('not submitting');
          reject(error);
          console.log(error);
        });
    });
  },
  submitForm({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(constants.apiCastUrl + '/api/event/meeting/create/', payload)
        .then((res) => {
          //console.log('form create submit');
          resolve(res);
        })
        .catch((error) => {
          //console.log('form create not submit');
          reject(error);
          console.log(error);
        });
    });
  },
  getNFTDetails({ commit }, payload) {
    const { castId, nftType } = payload;
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${constants.apiCastUrl}/api/event/fetch/nft/details/?cast_id=${castId}&nft_type=${nftType}`
        )
        .then((res) => {
          resolve(res);
          //console.log('getting');
        })
        .catch((error) => {
          reject(error);
          console.log(error);
          //console.log('not getting');
        });
    });
  },
  fetchNFTDetails({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${constants.apiCastUrl}/api/event/fetch/nft/details/?cast_id=${payload}&nft_type=vc`,
          {
            mode: 'no-cors',
          }
        )
        .then((res) => {
          resolve(res);
          //console.log('fetching');
        })
        .catch((error) => {
          reject(error);
          console.log(error);
          //console.log('not fetching');
        });
    });
  },
  recieveNFTDetails({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${constants.apiCastUrl}/api/event/fetch/nft/details/?cast_id=${payload}`,
          {
            mode: 'no-cors',
          }
        )
        .then((res) => {
          //console.log('reciveing');
          resolve(res);
        })
        .catch((error) => {
          reject(error);
          console.log('not reciveing', error);
        });
    });
  },

  getImage({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${constants.apiCastUrl}/api/add/text/image/?user_name=${payload}`)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
          console.log(error);
        });
    });
  },
  merkelTree({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${constants.apiCastUrl}/api/event/fetch/nft/details/?cast_id=${payload}&nft_type=vc`,
          {
            mode: 'no-cors',
          }
        )
        .then((res) => {
          resolve(res);
          //console.log('Merkel tree getting');
        })
        .catch((error) => {
          reject(error);
          console.log('Merkel tree not getting', error);
        });
    });
  },
  join({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(constants.apiCastUrl + '/api/event/meeting/join/', payload)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
          console.log(error);
        });
    });
  },

  e({ commit }, payload) {
    return new Promise((resolve, reject) => {
      const { session_key } = payload;
      axios
        .get(
          `${constants.apiCastUrl}/api/event/meeting/info/?public_meeting_id=${session_key}`
        )
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
          console.log(error);
        });
    });
  },
  deleteCast({ commit }, payload) {
    return axios.post(constants.apiCastUrl + '/api/event/meeting/delete/', {
      public_meeting_id: payload,
    });
  },
  // async recordings({ commit }) {
  //   const res = await axios.get(constants.apiCastUrl + '/api/event/user/recordings');
  //   //console.log("res.data.status", res.data.status)
  //   commit('SET_RECORDING_LIST', res.data.status);
  //   return res.data.status;
  // },
  async recordings({ commit }) {
    try {
      const res = await axios.get(
        constants.apiCastUrl + '/api/event/user/recordings'
      );

      // Initialize an array to store all recordings from all status arrays
      let allRecordings = [];
      //console.log('before', res.data.status);
      // Iterate over each status array within res.data.status
      res.data.status.forEach((statusArray) => {
        // Iterate over each recording within the current status array
        statusArray.forEach((recording) => {
          allRecordings.push(recording);
        });
      });

      // Sort all recordings by 'Start Time (Readable)' in descending order (newest first)
      allRecordings.sort((a, b) => {
        const dateA = new Date(a['Start Time (Readable)']);
        const dateB = new Date(b['Start Time (Readable)']);
        return dateB - dateA; // Compare dates in reverse order for descending sort
      });

      // Format 'Start Time (Readable)' to DD/MM/YY for all recordings
      allRecordings.forEach((recording) => {
        const date = new Date(recording['Start Time (Readable)']);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const year = String(date.getFullYear()).substring(2); // Get last two digits of the year
        const formattedDate = `${day}/${month}/${year}`;
        recording['Start Time (Readable)'] = formattedDate;
      });
      //console.log('after', allRecordings);

      commit('SET_RECORDING_LIST', allRecordings);
      return allRecordings;
    } catch (error) {
      // Handle error
      console.error('Error fetching recordings:', error);
      throw error; // Rethrow error to be handled upstream
    }
  },
  async decastRecordings({ commit }) {
    try {
      const res = await axios.get(
        constants.apiCastUrl + '/api/event/user/decast/recordings'
      );
      commit('SET_RECORDINGLIST', res.data.status);
      return res.data.status;
    } catch (error) {
      console.error('Error fetching recordings:', error);
    }
  },
  
};
