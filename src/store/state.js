/* =========================================================================================
  File Name: state.js
  Description: Vuex Store - state
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== */

import navbarSearchAndPinList from '@/layouts/components/navbar/navbarSearchAndPinList';
import themeConfig from '@/../themeConfig.js';
import colors from '@/../themeConfig.js';

// /////////////////////////////////////////////
// Helper
// /////////////////////////////////////////////

// *From Auth - Data will be received from auth provider
const userDefaults = {
  uid: 0, // From Auth
  //displayName: 'John Doe', // From Auth
  // about:
  //   'Dessert chocolate cake lemon drops jujubes. Biscuit cupcake ice cream bear claw brownie brownie marshmallow.',
  email: '',
 //  profile_image: null, require('@/assets/images/user-icon-placeholder.png'), // From Auth
  status: 'online',
  userRole: 'user',
};

// const userInfoLocalStorage = JSON.parse(localStorage.getItem('userInfo')) || {};

// Set default values for active-user
// More data can be added by auth provider or other plugins/packages
const getUserInfo = () => {
  const userInfo = {};
  const userInfoLocalStorage =
    JSON.parse(localStorage.getItem('userInfo')) || {};
  // Update property in user
  Object.keys(userDefaults).forEach((key) => {
    // If property is defined in localStorage => Use that
    userInfo[key] = userInfoLocalStorage[key]
      ? userInfoLocalStorage[key]
      : userDefaults[key];
  });

  // Include properties from localStorage
  Object.keys(userInfoLocalStorage).forEach((key) => {
    if (userInfo[key] === undefined && userInfoLocalStorage[key] !== null)
      userInfo[key] = userInfoLocalStorage[key];
  });

  return userInfo;
};

// Check if device is touch device
// This is used to remove perfect scrollbar from touch devices
// Using Dynamic components
const is_touch_device = () => {
  var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
  var mq = function (query) {
    return window.matchMedia(query).matches;
  };

  if ('ontouchstart' in window || window.DocumentTouch) {
    return true;
  }

  // include the 'heartz' as a way to have a non matching MQ to help terminate the join
  // https://git.io/vznFH
  var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
  return mq(query);
};

// /////////////////////////////////////////////
// State
// /////////////////////////////////////////////

const state = {
  AppActiveUser: getUserInfo(),
  bodyOverlay: false,
  isVerticalNavMenuActive: false,
  isVerticalNavMenuActiveStudio: true,
  is_touch_device: is_touch_device(),
  mainLayoutType: themeConfig.mainLayoutType || 'vertical',
  navbarSearchAndPinList: navbarSearchAndPinList,
  reduceButton: themeConfig.sidebarCollapsed,
  verticalNavMenuWidth: 'default',
  verticalNavMenuItemsMin: false,
  scrollY: 0,
  insideIframe: false,
  starredPages: navbarSearchAndPinList.pages.data.filter(
    (page) => page.is_bookmarked
  ),
  theme: themeConfig.theme || 'light',
  themePrimaryColor: colors.primary,
  authPopup: false,
  nftPopup: false,
  // Can be used to get current window with
  // Note: Above breakpoint state is for internal use of sidebar & navbar component
  windowWidth: null,
  windowHeight: null,
  globalProgressBar: true,

  // wallet
  accountAddress: null,
  isWalletConnected: false,
  currentTransactionStep: 1,
};

export default state;