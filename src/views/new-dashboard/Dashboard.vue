<template>
  <div class="full-screen-div flex flex-col justify-start items-center">
    <div
      class="dashboard_navbar max-w-6xl w-full items-center flex flex-row justify-between lg:px-12 md:px-4 px-3 py-4">
      <div class="flex justify-start gap-4 w-2/5">
        <img src="@/assets/images/logot.svg" class="w-24 h-24 cursor-pointer mr-10" @click="redirectHome" />
        <div class="text-white flex flex-col justify-center h-24">
          <p class="welcome_msg text-2xl font-bold">
            //Welcome
            <span class="text-primary">{{ activeUserInfo.first_name }}</span>!
          </p>
          <p class="text-lg" style="color: #22c55e; flex-wrap: nowrap;">
            /* what are we starting today? */
          </p>
        </div>
      </div>

      <div class="w-3/5 flex flex-row gap-6 justify-end h-24 items-center">
        <div v-if="(accessToken || loggedIn) && activeUserInfo.email == ''" class="flex gap-6">
          <img src="@/assets/images/pixel_wallet.svg" class="w-8 h-6 cursor-pointer" />
          <p class="text-lg">{{ activeUserInfo.username }}</p>
        </div>

        <div v-else class="flex gap-6">
          <img src="@/assets/images/pixel_email.svg" class="w-8 h-6 cursor-pointer" />
          <p class="text-lg">{{ activeUserInfo.email }}</p>
        </div>
        <!-- <img src="@/assets/images/pixel_smile.svg" class="w-12 h-12 cursor-pointer" /> -->
        <div class="">
          <div v-if="accessToken || loggedIn">
            <SimpleMenu :menuList="profileMenuItems">
              <template #menuButton>
                <div class="pfp">
                  <vs-avatar :text="getFirstLetter" color="primary" class="m-0 shadow-md" :src="activeUserInfo.profile_pic
                    ? activeUserInfo.profile_pic
                    : ''
                    " size="40px" />
                </div>
              </template>
            </SimpleMenu>
          </div>
          <button v-else class="butt cursor-pointer" @click="open">
            Login
          </button>
        </div>
      </div>
    </div>

    <div class="dashboard_content max-w-6xl w-full flex flex-row gap-3 justify-start lg:px-12 md:px-4 px-3 py-4">
      <div class="flex flex-col justify-start gap-4 mr-10">

        <vx-tooltip text="/ Rooms" position="right">
          <div class="w-24 h-24 cursor-pointer flex flex-col items-center justify-center gap-2" @click="onRoom"
            :class="{ 'calls_btn_': true, 'calls_clicked': isClicked1 }">
            <img :src="callSrc" alt="Image">
            <p class="font-semibold text-base">CALLS</p>
          </div>
        </vx-tooltip>


        <vx-tooltip text="/ Casts" position="right">
          <div class="w-24 h-24 cursor-pointer flex flex-col items-center justify-center gap-2" @click="onCasts"
            :class="{ 'casts_btn': true, 'cast_clicked': isClicked2 }">
            <img :src="castSrc" alt="Image">
            <p class="font-semibold text-base">CASTS</p>
          </div>
        </vx-tooltip>


        <vx-tooltip text="/ Decast" position="right">
          <div class="w-24 h-24 cursor-pointer flex flex-col items-center justify-center gap-2" @click="onDecasts"
            :class="{ 'decast_btn': true, 'decast_clicked': isClicked3 }">
            <img :src="decastSrc" alt="Image">
            <p class="font-semibold text-base">DECAST</p>
          </div>
        </vx-tooltip>

      </div>

      <div class="w-full flex flex-col justify-start gap-2">


        <div>
          <router-view />
        </div>

      </div>
    </div>
    <ResetPasswordModal v-if="activeModal === 'resetPassModal'" :toggleActiveModal="toggleActiveModal" />
    <ProfileModal v-if="activeModal === 'profileModal'" :toggleActiveModal="toggleActiveModal" />
  </div>
</template>

<script>
import RoomSection from './rooms/RoomSection.vue';
import CastSection from './casts/CastSection.vue';
import DecastSection from './decast/DecastSection.vue';
import constants from '../../../constant';
import { utils } from '@/mixins/index';
import SimpleMenu from '@/components/common/simpleMenu/SimpleMenu.vue';
import ResetPasswordModal from '@/views/dashboard/components/ResetPasswordModal';
import ProfileModal from '@/views/dashboard/components/ProfileModal';
import callIcon from '@/assets/images/call-icon.svg';
import callIconAlt from '@/assets/images/call-icon-alt.svg';
import castIcon from '@/assets/images/cast-icon.svg';
import castIconAlt from '@/assets/images/cast-icon-alt.svg';
import decastIcon from '@/assets/images/decast-icon.svg';
import decastIconAlt from '@/assets/images/decast-icon-alt.svg';
export default {
  name: 'Dashboard',
  components: {
    RoomSection,
    CastSection,
    DecastSection,
    SimpleMenu,
    ResetPasswordModal,
    ProfileModal,
  },
  data() {
    return {
      focusYourRooms: true,
      showRoomSection: true,
      showCastSection: false,
      showCommunitySection: false,
      rooms: true,
      casts: false,
      decasts: false,
      isClicked1: true,
      isClicked2: false,
      isClicked3: false,
      activeModal: '',
      offset: 0,
      url: constants.challengeUri,
      iframe: false,
      userMenuVisible: false,
      callSrc: callIcon,
      castSrc: castIcon,
      decastSrc: decastIcon,
      profileMenuItems: [
        {
          label: "My Profile",
          icon: () => import("@/assets/svgs/menu-icons/usermenu.vue"),
          onClick: () => this.toggleActiveModal('profileModal')
        },
        {
          label: "Reset Password",
          icon: () => import("@/assets/svgs/menu-icons/setting.vue"),
          onClick: () => this.toggleActiveModal('resetPassModal')
        },
        {
          label: "Wallet",
          icon: () => import("@/assets/svgs/menu-icons/wallet.vue"),
          onClick: () => this.$router.push('/addfunds')
        },
        {
          label: "Help Center",
          icon: () => import("@/assets/svgs/menu-icons/help.vue"),
        },
        {
          label: "Logout",
          icon: () => import("@/assets/svgs/menu-icons/export.vue"),
          onClick: () => {
            this.$cookies.remove('userId');
            this.$cookies.remove('Token');
            this.$router.push('/');
            return this.$store.dispatch('auth/logOut');
          }
        }
      ]
    };
  },
  computed: {
    activeUserInfo() {
      return this.$store.state.AppActiveUser;
    },
    accessToken() {
      return this.$store.state.auth.accessToken;
    },
    loggedIn() {
      return this.$store.state.auth.loggedIn;
    },
    getFirstname() {
      return this.activeUserInfo.first_name;
    },
    getFirstLetter() {
      return this.activeUserInfo.first_name[0];
    },
  },
  created() {
    if (this.$router.currentRoute.path === '/dashboard/decast') {
      this.clicked = true; this.isClicked2 = false;
      this.isClicked1 = false;
      this.isClicked3 = true;
    } else if (this.$router.currentRoute.path === '/dashboard/casts') {
      this.isClicked2 = true;
      this.isClicked1 = false;
      this.isClicked3 = false;
    } else if (this.$router.currentRoute.path === '/dashboard/rooms') {
      this.isClicked2 = false;
      this.isClicked1 = true;
      this.isClicked3 = false;
    }
  },
  mounted() {
    const gb_redirect = localStorage.getItem("LOG_REDIRECT")
    if (gb_redirect) {
      localStorage.removeItem("LOG_REDIRECT");
      const url = new URL(gb_redirect);
      const path = url.pathname + url.search + url.hash; // Extract path, query, and hash
      this.$router.push(path);
    }
    this.verifyAuthToken();
    // this.userInfo = { ...this.$store.state.AppActiveUser };
    // this.$store.commit('UPDATE_USER_INFO', this.userInfo);
    setTimeout(function () {
      const ifram = document.getElementById('extFrame');
      const wind = ifram.contentWindow;
      const message = JSON.stringify(localStorage.getItem("accessToken"));
      wind.postMessage(message, 'https://live1.decast.live');
    }, 2000);
    console.log(this.activeUserInfo);
    this.onRoom();
  },
  methods: {
    verifyAuthToken() {
      this.$store.dispatch('auth/verifyAuthToken');
    },
    toggleActiveModal(setModal) {
      this.activeModal = setModal;
    },
    scroll(offset) {
      this.offset = offset;
    },
    closeIframe() {
      var iframe = document.getElementById('myIframe');
      iframe.style.display = 'none';
    },
    open() {
      console.log('open');
      this.iframe = !this.iframe;
      this.url = constants.challengeUri;
      // this.url = 'http://localhost:8080/login';
      document.getElementsByTagName('iframe')[0].style.height = '66.7%';
      document.getElementsByTagName('iframe')[0].style.width = '32%';
      console.log(this.iframe);
      // window.location.href = constants.challengeUri;
    },
    toggleUserMenu() {
      console.log('Clicked');
      this.userMenuVisible = !this.userMenuVisible;
    },
    redirectHome() {
      this.$router.push('/');
    },

    changeFocus(toYourRooms) {
      this.focusYourRooms = toYourRooms;
    },
    onRoom() {
      this.$router.push('/dashboard/rooms');
      this.isClicked2 = false;
      this.isClicked1 = true;
      this.isClicked3 = false;

      // Update image sources based on the clicked state
      this.callSrc = callIcon;
      this.castSrc = castIconAlt;
      this.decastSrc = decastIconAlt;
    },

    onCasts() {
      this.$router.push('/dashboard/casts');
      this.isClicked2 = true;
      this.isClicked1 = false;
      this.isClicked3 = false;

      // Update image sources based on the clicked state
      this.callSrc = callIconAlt;
      this.castSrc = castIcon;
      this.decastSrc = decastIconAlt;
    },

    onDecasts() {
      this.$router.push('/dashboard/decast');
      this.isClicked2 = false;
      this.isClicked1 = false;
      this.isClicked3 = true;

      // Update image sources based on the clicked state
      this.callSrc = callIconAlt;
      this.castSrc = castIconAlt;
      this.decastSrc = decastIcon;
    },

  },
};
</script>

<style scoped>
* {
  font-family: 'JetBrains Mono', monospace !important;
}

.full-screen-div {
  width: 100%;
  height: 100%;
  background: #0a0b0f;
  color: white;
}

.dashboard_navbar {
  height: 16vh;
}

.dashboard_content {
  height: 84vh;
}

.basic_details_cont {
  /* border: 1px solid white;
  height: 70vh; */
}

.options-button {
  background: none;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
}

.focused-button {
  color: #d7df23;
}

.con-vs-tooltip {
  border-radius: 0px !important;
  /* border: 1px solid red; */
  color: #0a0b0f !important;
}

.calls_btn_ {
  background-color: black;
  border: 1px solid white;
  color: white;
}

.calls_clicked {
  background-color: white;
  color: black;
}

.casts_btn {
  background-color: black;
  border: 1px solid white;
  color: white;
}

.cast_clicked {
  background-color: white;
  color: black;
}

.decast_btn {
  background-color: black;
  border: 1px solid white;
  color: white;
}

.decast_clicked {
  background-color: white;
  color: black;
}
</style>