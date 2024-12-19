import posthog from "posthog-js";
import constants from '../../constant.js';

export default {
  install(Vue) {
    // Initialize PostHog
    posthog.init(`${constants.POSTHOG_KEY}`, {
      api_host: 'https://us.i.posthog.com',
    });

    // Add PostHog to Vue's prototype
    Vue.prototype.$posthog = posthog;
  },
};