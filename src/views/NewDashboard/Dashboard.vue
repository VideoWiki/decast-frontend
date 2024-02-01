<template>
  <div class="full-screen-div flex flex-col justify-start items-center">
    <div
      class="dashboard_navbar max-w-6xl w-full items-center flex flex-row justify-between lg:px-12 md:px-4 px-3 py-4"
    >
      <div class="flex justify-start gap-4 w-1/3">
        <img
          src="@/assets/images/logot.svg"
          class="w-24 h-24 cursor-pointer"
          @click="redirectHome"
        />
        <div class="text-white flex flex-col justify-center h-24">
          <p class="welcome_msg text-2xl font-bold">
            //Welcome
            <span class="text-primary">{{ activeUserInfo.first_name }}</span
            >!
          </p>
          <p class="text-lg" style="color: #22c55e">
            /* what are we starting today? */
          </p>
        </div>
      </div>

      <div class="w-2/3 flex flex-row gap-4 justify-end h-24 items-center">
        <p class="text-lg">30x...TMTkV8LK4ZnX71</p>
        <img
          src="@/assets/images/pixel_wallet.svg"
          class="w-10 h-8 cursor-pointer"
        />
        <img
          src="@/assets/images/pixel_smile.svg"
          class="w-12 h-12 cursor-pointer"
        />
      </div>
    </div>

    <div
      class="dashboard_content max-w-6xl w-full flex flex-row gap-3 justify-start lg:px-12 md:px-4 px-3 py-4"
    >
      <div class="flex flex-col justify-start gap-4 w-1/6">
        <div class="w-24 h-24">
          <vx-tooltip text="/ Rooms" position="right">
            <img
              src="@/assets/images/pixel_call.svg"
              class="w-24 h-24 cursor-pointer object-contain"
              @click="handleShowRoom"
            />
          </vx-tooltip>
        </div>

        <div class="w-24 h-24">
          <vx-tooltip text="/ Casts" position="right">
            <img
              src="@/assets/images/pixel_cast.svg"
              class="w-24 h-24 cursor-pointer object-contain"
              @click="handleShowCast"
            />
          </vx-tooltip>
        </div>

        <div class="w-24 h-24">
          <vx-tooltip text="/ Communities" position="right">
            <img
              src="@/assets/images/pixel_com.svg"
              class="w-24 h-24 cursor-pointer object-contain"
              @click="handleShowCommunity"
            />
          </vx-tooltip>
        </div>
      </div>

      <div class="w-full flex flex-col justify-start gap-2">
        <div
          class="bg-white w-full flex flex-row justify-between items-center px-4 h-12"
        >
          <div class="bg-black w-4 h-4"></div>
          <div class="flex flex-row gap-2">
            <div class="bg-black w-4 h-4"></div>
            <div class="bg-black w-4 h-4"></div>
          </div>
        </div>

        <div
          class=""
          v-if="showRoomSection"
        >
          <RoomSection/>
        </div>

        <div
          class=""
          v-else-if="showCastSection"
        >
        <CastSection/>
        </div>

        <div
          class="basic_details_cont w-full p-4 px-6 flex flex-col gap-6 justify-start"
          v-else-if="showCommunitySection"
        >
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

          <div
            class="w-full h-full flex items-center justify-center text-white"
          >
            <h1 class="text-4xl text-white">Coming Soon</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RoomSection from './Room/RoomSection.vue';
import CastSection from './Cast/CastSection.vue';

export default {
  name: 'Dashboard',
  components:{
    RoomSection,
    CastSection,
},
  data() {
    return {
      focusYourRooms: true,
      showRoomSection: true,
      showCastSection: false,
      showCommunitySection: false,
    };
  },
  computed: {
    activeUserInfo() {
      return this.$store.state.AppActiveUser;
    },
  },
  methods: {
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
  border: 1px solid white;
  height: 70vh;
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
