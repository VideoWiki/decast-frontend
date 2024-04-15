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
        <div v-if="(accessToken || loggedIn) && activeUserInfo.email== ''" class="flex gap-6">
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
        <div class="w-24 h-24">
          <vx-tooltip text="/ Rooms" position="right">
            <img src="@/assets/images/pixel_call.svg" class="w-24 h-24 cursor-pointer object-contain"
              @click="handleShowRoom" />
          </vx-tooltip>
        </div>

        <div class="w-24 h-24">
          <vx-tooltip text="/ Casts" position="right">
            <img src="@/assets/images/pixel_cast.svg" class="w-24 h-24 cursor-pointer object-contain"
              @click="handleShowCast" />
          </vx-tooltip>
        </div>

        <div class="w-24 h-24">
          <vx-tooltip text="/ Communities" position="right">
            <img src="@/assets/images/pixel_com.svg" class="w-24 h-24 cursor-pointer object-contain"
              @click="handleShowCommunity" />
          </vx-tooltip>
        </div>
      </div>

      <div class="w-full flex flex-col justify-start gap-2">
        <!-- <div class="bg-white w-full flex flex-row justify-between items-center px-4 h-12">
          <div class="bg-black w-4 h-4"></div>
          <div class="flex flex-row gap-2">
            <div class="bg-black w-4 h-4"></div>
            <div class="bg-black w-4 h-4"></div>
          </div>
        </div> -->

        <div class="" v-if="showRoomSection">
          <RoomSection />
        </div>

        <div class="" v-else-if="showCastSection">
          <CastSection />
        </div>

        <div class="basic_details_cont w-full p-4 px-6 flex flex-col gap-6 justify-start"
          v-else-if="showCommunitySection">
          <div class="flex justify-between">
            <div class="text-white">
              <p class="font-bold text-2xl">//Communities</p>
              <p>Create large communities with like minded people.</p>
            </div>
            <div class="cursor-pointer">
              <vx-tooltip text="/ Create your own community" position="left">
                <img src="@/assets/images/pixel_create.svg" />
              </vx-tooltip>
            </div>
          </div>

          <div class="w-full h-full flex items-center justify-center text-white">
            <h1 class="text-4xl text-white">Coming Soon</h1>
          </div>
        </div>
      </div>
    </div>
    <ResetPasswordModal v-if="activeModal === 'resetPassModal'" :toggleActiveModal="toggleActiveModal" />
    <ProfileModal v-if="activeModal === 'profileModal'" :toggleActiveModal="toggleActiveModal" />
  </div>
</template>

<script>
import RoomSection from './Room/RoomSection.vue';
import CastSection from './Cast/CastSection.vue';
import constants from '../../../constant';
import { utils } from '@/mixins/index';
import SimpleMenu from '@/components/common/simpleMenu/SimpleMenu.vue';
import ResetPasswordModal from '@/views/dashboard/components/ResetPasswordModal';
import ProfileModal from '@/views/dashboard/components/ProfileModal';
export default {
  name: 'Dashboard',
  components: {
    RoomSection,
    CastSection,
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
      activeModal: '',
      offset: 0,
      url: constants.challengeUri,
      iframe: false,
      userMenuVisible: false,
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
          label: "Guide",
          icon: () => import("@/assets/svgs/menu-icons/guide.vue"),
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
  mounted() {
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

    handleShowRoom() {
      this.showRoomSection = true;
      this.showCastSection = false;
      this.showCommunitySection = false;
    },

    handleShowCast() {
      this.showRoomSection = false;
      this.showCastSection = true;
      this.showCommunitySection = false;
    },

    handleShowCommunity() {
      this.showCommunitySection = true;
      this.showRoomSection = false;
      this.showCastSection = false;
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
</style>
