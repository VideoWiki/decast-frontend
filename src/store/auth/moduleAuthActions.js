/* =========================================================================================
  File Name: moduleAuthActions.js
  Description: Auth Module Actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== */

import jwt from '../../http/requests/auth/jwt/index.js';
import constants from '../../../constant';
import router from '@/router';
import axios from '@/axios.js';
export default {
  async otpSent({ commit }, payload) {
    const email = payload.email;
    const userDetails = {
      email,
    };
    try {
      console.log('hello');
      const resObj = await axios.post(
        constants.apiUrl + `/api/send_otp/`,
        userDetails
      );
      console.log('resObj', resObj.data);
      return true;
    } catch (err) {
      return false;
      console.log('not hello');
      throw err;
    }
  },
  login({ commit }, payload) {
    return new Promise((resolve, reject) => {
      jwt
        .login(payload.userDetails.password, payload.userDetails.email)
        .then((response) => {
          console.log('response.data.usersData', response.data);
          // If there's user data in response
          if (response.data.usersData) {
            // Navigate User to homepage

            // Set accessToken
            localStorage.setItem('accessToken', response.data.accessToken);
            const userData = response.data.usersData;
            commit('UPDATE_USER_INFO', userData, { root: true });

            commit('SET_BEARER', response.data.accessToken);

            resolve(response);
          } else {
            reject({ message: 'Wrong Email or Password' });
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  registerUser({ commit }, payload) {
    const { firstName, lastName, email, password, confirmPassword } =
      payload.userDetails;

    return new Promise((resolve, reject) => {
      // Check confirm password
      if (password !== confirmPassword) {
        reject({ message: "Password doesn't match. Please try again." });
      }

      jwt
        .registerUser(firstName, lastName, email, password)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  logOut({ commit }) {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('accessToken');

    window.location.reload();
    // find a way to logout without refresh
    commit('LOGOUT', null, { root: true });
  },
  updateUserDetails({ commit }, payload) {
    return new Promise((resolve, reject) => {
      jwt
        .updateUser(payload)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  changePassword({ commit }, payload) {
    return new Promise((resolve, reject) => {
      jwt
        .changePassword(payload)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  fetchAccessToken() {
    return new Promise((resolve) => {
      jwt.refreshToken().then((response) => {
        cosnole.log('response', response);
        resolve(response);
      });
    });
  },
  sendOtp({ commit }, payload) {
    return new Promise((resolve, reject) => {
      jwt
        .sendOtp(payload)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  verifyOtp({ commit }, payload) {
    return new Promise((resolve, reject) => {
      jwt
        .verifyOtp(payload)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  // for Metamask
  getNonce({ commit }, payload) {
    return new Promise((resolve, reject) => {
      jwt
        .generateNonce(payload)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  sendSignature({ commit }, payload) {
    return new Promise((resolve, reject) => {
      jwt
        .verifySignature(payload)
        .then((response) => {
          // If there's user data in response
          if (response.data.usersData) {
            // Set accessToken
            localStorage.setItem('accessToken', response.data.accessToken);
            const userData = response.data.usersData;
            commit('UPDATE_USER_INFO', userData, { root: true });

            // Set bearer token in axios
            commit('SET_BEARER', response.data.accessToken);

            resolve(response);
          } else {
            reject({ message: 'Wrong Email or Password' });
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  //metamask wallet address
  saveWalletAddress({ commit }, payload) {
    return new Promise((resolve, reject) => {
      jwt
        .saveAddress(payload)
        .then((res) => {
          commit('GET_WALLET_ADDRESS', res.data.status);
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  removeWalletAddress({ commit }, val) {
    commit('GET_WALLET_ADDRESS', val);
    return val;
  },

  addURLS({ commit }, data) {
    commit('ADD_URLS', data);
    return true;
  },
  setOpen({ commit }, data) {
    commit('SET_OPEN', true);
    return true;
  },
  eventDetail({ commit }, payload) {
    return new Promise((resolve, reject) => {
      jwt
        .eventDetail(payload)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  submitSheet({ commit }, payload) {
    return new Promise((resolve, reject) => {
      jwt
        .submitSheet(payload)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  sendResetEmail({ commit }, payload) {
    return new Promise((resolve, reject) => {
      jwt
        .sendResetEmail(payload)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  resetPassword({ commit }, payload) {
    return new Promise((resolve, reject) => {
      jwt
        .resetPassword(payload)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  sendAccessToken({ commit }, payload) {
    return new Promise((resolve, reject) => {
      jwt
        .generateAccessToken(payload)
        .then((response) => {
          // If there's user data in response
          if (response.data.usersData) {
            // Navigate User to homepage
            // router.push(router.currentRoute.query.to || '/');

            // Set accessToken
            localStorage.setItem('accessToken', response.data.accessToken);

            // Update user details
            /* const userData = {
                uid: 0,
                displayName: response.data.userData.profile.display_name,
                about: ''
              }; */
            const userData = response.data.usersData;
            commit('UPDATE_USER_INFO', userData, { root: true });

            // Set bearer token in axios
            commit('SET_BEARER', response.data.accessToken);

            resolve(response);
          } else {
            reject({ message: 'Wrong Email or Password' });
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  contactUs({ commit }, payload) {
    return new Promise((resolve, reject) => {
      jwt
        .contactUs(payload)
        .then((res) => {
          resolve(res.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
};
