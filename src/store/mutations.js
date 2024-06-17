/* =========================================================================================
  File Name: mutations.js
  Description: Vuex Store - mutations
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== */
import Web3 from 'web3';
const mutations = {
  // /////////////////////////////////////////////
  // COMPONENTS
  // /////////////////////////////////////////////
  // Vertical NavMenu

  TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE(state, value) {
    state.isVerticalNavMenuActive = value;
  },
  TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE_STUDIO(state, value) {
    state.isVerticalNavMenuActiveStudio = value;
  },
  TOGGLE_REDUCE_BUTTON(state, val) {
    state.reduceButton = val;
  },
  UPDATE_MAIN_LAYOUT_TYPE(state, val) {
    state.mainLayoutType = val;
  },
  UPDATE_VERTICAL_NAV_MENU_ITEMS_MIN(state, val) {
    state.verticalNavMenuItemsMin = val;
  },
  UPDATE_VERTICAL_NAV_MENU_WIDTH(state, width) {
    state.verticalNavMenuWidth = width;
  },
  TOGGLE_LOGIN_POPUP(state, value) {
    state.authPopup = value;
  },
  TOGGLE_NFT_POPUP(state, value) {
    state.nftPopup = value;
  },
  TOGGLE_PROGRESS_BAR(state, value) {
    state.globalProgressBar = value;
  },
  // VxAutoSuggest

  UPDATE_STARRED_PAGE(state, payload) {
    // find item index in search list state
    const index = state.navbarSearchAndPinList.pages.data.findIndex(
      (item) => item.url === payload.url
    );

    // update the main list
    state.navbarSearchAndPinList.pages.data[index].is_bookmarked = payload.val;

    // if val is true add it to starred else remove
    if (payload.val) {
      state.starredPages.push(state.navbarSearchAndPinList.pages.data[index]);
    } else {
      // find item index from starred pages
      const index = state.starredPages.findIndex(
        (item) => item.url === payload.url
      );

      // remove item using index
      state.starredPages.splice(index, 1);
    }
  },

  // Navbar-Vertical

  ARRANGE_STARRED_PAGES_LIMITED(state, list) {
    const starredPagesMore = state.starredPages.slice(10);
    state.starredPages = list.concat(starredPagesMore);
  },
  ARRANGE_STARRED_PAGES_MORE(state, list) {
    let downToUp = false;
    const lastItemInStarredLimited = state.starredPages[10];
    const starredPagesLimited = state.starredPages.slice(0, 10);
    state.starredPages = starredPagesLimited.concat(list);

    state.starredPages.slice(0, 10).map((i) => {
      if (list.indexOf(i) > -1) downToUp = true;
    });

    if (!downToUp) {
      state.starredPages.splice(10, 0, lastItemInStarredLimited);
    }
  },

  // ////////////////////////////////////////////
  // UI
  // ////////////////////////////////////////////

  TOGGLE_CONTENT_OVERLAY(state, val) {
    state.bodyOverlay = val;
  },
  UPDATE_PRIMARY_COLOR(state, val) {
    state.themePrimaryColor = val;
  },
  UPDATE_THEME(state, val) {
    state.theme = val;
  },
  UPDATE_WINDOW_WIDTH(state, width) {
    state.windowWidth = width;
  },
  UPDATE_WINDOW_HEIGHT(state, height) {
    state.windowHeight = height;
  },
  UPDATE_WINDOW_SCROLL_Y(state, val) {
    state.scrollY = val;
  },
  SET_IFRAME_STATUS(state, value) {
    state.insideIframe = value;
  },

  // /////////////////////////////////////////////
  // User/Account
  // /////////////////////////////////////////////

  // Updates user info in state and localstorage
  UPDATE_USER_INFO(state, payload) {
    // Get Data localStorage
    const userInfo =
      JSON.parse(localStorage.getItem('userInfo')) || state.AppActiveUser;

    for (const property of Object.keys(payload)) {
      if (property === 'username' && payload[property].startsWith('0x')) {
        console.log(property, payload[property], 'formula u');
        const walletAddress = payload[property];

        // Connect to the Ethereum network
        const web3 = new Web3(window.ethereum);
        console.log(console.log(web3.eth.ens));
        // web3.eth.ens.autoConfigure();
        // console.log(web3.eth.ens.autoConfigure())
        web3.eth.ens
          .getOwner(walletAddress)
          .then((ensName) => {
            if (
              ensName &&
              ensName !== '0x0000000000000000000000000000000000000000'
            ) {
              console.log('ENS Name:', ensName);
              userInfo['first_name'] = ensName;
              userInfo['username'] = payload[property]; // Keep username as wallet address
              localStorage.setItem('userInfo', JSON.stringify(userInfo));
            } else {
              state.AppActiveUser[property] = payload[property];
              userInfo[property] = payload[property];
              console.log('No ENS name found for the address.');
              this.$vs.notify({
                title: 'No ENS found',
                text: 'Please make sure ens is associated with the wallet address!',
                color: 'warning',
              });
            }
          })
          .catch((error) => {
            this.$vs.notify({
              title: 'ENS fetch failed',
              text: 'Please try again later!',
              color: 'warning',
            });
            console.error('Failed to fetch ENS name:', error);
          });
      } else {
        state.AppActiveUser[property] = payload[property];
        userInfo[property] = payload[property];
      }
    }
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  },

  LOGOUT(state, payload) {
    state.AppActiveUser = payload;
  },

  CONNECT(state, accountAddress) {
    state.accountAddress = accountAddress;
    state.isWalletConnected = true;
  },

  DISCONNECT(state) {
    state.isWalletConnected = false;
    state.accountAddress = null;
  },
  SET_CURRENT_TRANSACTION_STEP(state, value) {
    state.currentTransactionStep = value;
  },
};

export default mutations;
