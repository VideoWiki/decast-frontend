<template>
  <div class="center-container-full">
    <div class="flex justify-between">
      <div class="heading-container">
        <h2 style="color: #a6a6a8; font-weight: 500; font-size: 24px">Rooms</h2>
        <p class="sub-heading pt-2">
          Rooms are social spaces for direct communication. Ideal for X Y Z.
          <a target="_blank" href="#" style="color: #31a2f4; text-decoration: underline; cursor: pointer">Learn more about
            Rooms.</a>
        </p>
      </div>
      <div class="flex flex-shrink justify-between">
        <vs-button style="
            border: 1px solid #a6a6a8 !important;
            background-color: #1f272f !important;
            padding: 0px !important;
            height: 28px;
            width: 28px;
          " @click="toggleCreateRoomModal">
          <AddIcon />
        </vs-button>
        <!-- <button class="header-button p-2" @click="createPopup = true" style="
                      border: 1px solid #a6a6a8;
                      border-radius: 5px;
                      background-color: #1f272f;
                      width: 28px;
                      height: 28px;
                    ">
          <img src="@/assets/images/Rooms/Plus.svg" alt="" />
        </button> -->
        <!-- <button class="header-button button border-none dot">
          <img
            src="@/assets/images/dashboard/dots.svg"
            class="h-7 p-1"
            alt="dots"
          />
        </button> -->
      </div>
    </div>

    <div class="rooms-container">
      <div class="choose-room">
        <button class="options-button border-none" @click="changeFocus(true)"
          :class="{ 'focused-button': focusYourRooms }">
          Your Rooms
        </button>
        <button class="options-button border-none px-4" @click="handleButtonClick"
          :class="{ 'focused-button': !focusYourRooms }">
          Room Recordings
        </button>
      </div>

      <div class="options-container">
        <div v-if="focusYourRooms">
          <div v-if="isRoomsLoading">
            <RoomCardShimmer />
            <RoomCardShimmer :style="{opacity: 0.7}" />
            <RoomCardShimmer :style="{opacity: 0.4}" />
          </div>
          <div v-else-if="rooms.length">
            <div v-for="(room, index) in rooms" :key="index">
              <RoomCard :room="room" :index="index" :roomsList="rooms" />
            </div>
          </div>
        </div>
        <div v-else>
          <div v-if="recordingList.length">
            <div v-for="(recording, index) in recordings" :key="index">
              <RecordingCard :recording="recording" :index="index" />
            </div>
          </div>
          <div v-else-if="isRecordingLoading">
            <RecordingCardShimmer />
            <RecordingCardShimmer :style="{opacity: 0.7}" />
            <RecordingCardShimmer :style="{opacity: 0.4}" />
          </div>
          <div v-else class="recording flex flex-col items-center justify-items-center">
            <img src="@/assets/images/dashboard/NoRecording.svg" class="w-1/2" />
            <img src="@/assets/images/dashboard/NoRecordingText1.svg" class="mb-3" />
            <img src="@/assets/images/dashboard/NoRecordingText.svg" />
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="footer-content m-auto">
      <p class="m-auto">3/3</p>
      <p>
        Need more dedicated room?
        <a target="_blank" href="#" style="color: #31a2f4; cursor: pointer"
          >Contact us for a tailored plan</a
        >
      </p>
    </div> -->
    <!-- <div class="popup" v-if="createPopup" @click="closeAllPopups">
      <div class="createPopup">
        <div class="container">
          <div class="first-row">
            <h6 class="popup-heading">Create new room</h6>
            <button class="close-icon" @click="createPopup = false">✕</button>
          </div>
          <div class="text">Room Name</div>
          <div class="input">
            <input placeholder="Name" type="text" v-model="text" />
          </div>

          <div class="button">
            <button class="button-text cursor-pointer" @click="createRoom">
              Create Room
            </button>
          </div>
        </div>
      </div>
    </div> -->
    <div class="popup" v-if="sharePopup" @click="closeAllPopups">
      <div class="centered-container">
        <div class="container">
          <div class="first-row">
            <h6 class="popup-heading">Share room</h6>
            <button class="close-icon" @click="sharePopup = false">✕</button>
          </div>
          <div class="text">User Email</div>
          <div class="input">
            <input placeholder="Email" type="text" v-model="email" />
          </div>
          <div class="button">
            <button class="button-text cursor-pointer" @click="shareRoom">
              Share Room
            </button>
          </div>
        </div>
      </div>
    </div>
    <CreateRoomModal v-if="createRoomModalActive" :closeModal="toggleCreateRoomModal" />
  </div>
</template>
<script>
import axios from '@/axios';
import SimpleMenu from '@/components/common/simpleMenu/SimpleMenu.vue';
import RoomCard from '@/views/dashboard/room-section/components/RoomCard.vue';
import AddIcon from '@/assets/svgs/button-icons/add.vue';
import CreateRoomModal from '@/views/dashboard/room-section/components/CreateRoomModal.vue'
import RecordingCard from './components/RecordingCard.vue';
import RoomCardShimmer from './components/RoomCardShimmer.vue';
import RecordingCardShimmer from './components/RecordingCardShimmer.vue';

export default {
  name: 'RoomSection',
  data() {
    return {
      isRecordingLoading: false,
      isRoomsLoading: false,
      createRoomModalActive: false,
      isMobileView: false,
      expandedRoom: null,
      createPopup: false,
      focusYourRooms: true,
      showTooltip: [],
      showTooltip3: false,
      items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' },
      ],
      text: '',
      rooms: [],
      showPopup: null,
      sharePopup: false,
      recordings: [],
      email: '',
      roomUrl: '',
      mouse: 0,
    };
  },
  components: {
    SimpleMenu,
    RoomCard,
    AddIcon,
    CreateRoomModal,
    RecordingCard,
    RoomCardShimmer,
    RecordingCardShimmer,
  },
  computed: {
    roomsList() {
      return this.$store.state.room.rooms;
    },
    recordingList() {
      return this.$store.state.room.recordings;
    },
  },
  watch: {
    // whenever question changes, this function will run
    roomsList(newList) {
      console.log(newList);
      this.rooms = [...newList];
      console.log(this.rooms);
    },
    recordingList(newList) {
      console.log(newList);
      this.recordings = [...newList];
      console.log(this.recordings);
    },
    showPopup(newQuestion, oldQuestion) {
      if (newQuestion) {
        console.log('yes');
      }
    },
  },
  methods: {
    toggleCreateRoomModal() {
      this.createRoomModalActive = !this.createRoomModalActive;
    },
    checkScreenWidth() {
      // Define your breakpoint for mobile view (e.g., 768 pixels)
      const mobileBreakpoint = 480;

      // Check if the screen width is below the mobile breakpoint
      this.isMobileView = window.innerWidth < mobileBreakpoint;
    },
    toggleEditTool(index) {
      this.showTooltip3 = this.showTooltip3 === index ? null : index;
    },
    truncateText(text, maxLength) {
      if (text.length > maxLength) {
        return text.slice(0, maxLength) + '...';
      } else {
        return text;
      }
    },
    expandRoom(index) {
      if (this.expandedRoom === index) {
        this.expandedRoom = null;
      } else {
        this.expandedRoom = index;
      }
    },
    getColor(index) {
      const colors = ['#FCB92d', '#FB7E84', '#2CC2D3', '#79FC9E', '#D971BC'];
      return colors[index % colors.length];
    },
    closeAllPopups(e) {
      if (e.currentTarget === e.target) {
        this.sharePopup = false;
        this.createPopup = false;
      }
    },
    // openRecording(recording) {
    //   // this.$router.push(`/recording/${recording.url['Record ID']}`);
    //   console.log(recording, 'mmmmmmm');
    //   const playbackURL =
    //     recording.url['Playback Data']['Playback URL'] + '/video-0.m4v';
    //   window.open(playbackURL, '_blank');
    //   // window.location.href = '/recording/' + room.url['Record ID'];
    // },
    // copyRecording(room, index) {
    //   navigator.clipboard.writeText(
    //     'https://api.room.video.wiki/recording/' + room.url['Record ID']
    //   );
    //   this.$set(
    //     this.recordings[index],
    //     'showPopup',
    //     !this.recordings[index].showPopup
    //   );
    // },
    // editRecord(recording) {
    //   // console.log(recording,'pppp');
    //   const meetingId = recording.url['Record ID'];
    //   console.log(meetingId, 'mid');
    //   setTimeout(() => {
    //     const url = `https://beta.editor.video.wiki/studio?meetingId=${meetingId}`;
    //     window.open(url, '_blank');
    //   }, 2000);
    // },
    copy(url) {
      let id = url.split('/');
      id = id[id.length - 1];
      navigator.clipboard.writeText(
        'https://decast.live/join-room/' + id
      );
    },
    createRoom() {
      this.$store
        .dispatch('room/addRoom', this.text)
        .then(async (res) => {
          console.log(res.data);
          // this.rooms.push(room);
          this.createPopup = false;
          this.closeModal();
          // getList();
          // if (joinNow) {
          //   window.location.href = r;es.data.join_now_url;
          //   return;
          // }
        })
        .catch((e) => {
          console.log(e.resonse);
        });
    },
    changeFocus(toYourRooms) {
      this.focusYourRooms = toYourRooms;
    },
    openShare(room) {
      this.showPopup = false;
      this.sharePopup = true;
      this.roomUrl = room.room_url;
    },
    getList() {
      this.isRoomsLoading = true;
      this.$store
        .dispatch('room/getList')
        .then((res) => {
          console.log(res);
          this.isRoomsLoading = false;
        })
        .catch((e) => {
          console.log(e);
          this.isRoomsLoading = false;
        });
    },
    start(url) {
      let id = url.split('/');
      id = id[id.length - 1];
      this.$store
        .dispatch('room/start', id)
        .then((res) => {
          console.log(res.data);
          window.location.href = res.data.room_url;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    togglePopup(index) {
      // this.$set(this.rooms[index], 'showPopup', !this.rooms[index].showPopup);
      this.showPopup = this.showPopup === index ? null : index;
      setTimeout(() => {
        const roomPopups = document.querySelectorAll('.room-popup');
        if (this.mouse > 222) {
          console.log('yes', roomPopups);
          roomPopups.forEach((item) => (item.style.top = '-85%'));
        } else {
          roomPopups.forEach((item) => (item.style.top = '85%'));
        }
      }, 0);
    },
    closePopup(index) {
      this.showPopup = null;
    },
    toggleRecordingPopup(index) {
      this.showPopup = this.showPopup === index ? null : index;
      setTimeout(() => {
        const roomPopups = document.querySelectorAll('.room-popup');
        if (this.mouse > 222) {
          console.log('yes', roomPopups);
          roomPopups.forEach((item) => (item.style.top = '-85%'));
        } else {
          roomPopups.forEach((item) => (item.style.top = '85%'));
        }
      }, 0);
    },
    async getRecordings() {
      try {
        const res = await this.$store.dispatch('room/getRecordings');
        console.log(res);
      } catch (e) {
        console.error('Error getting recordings', e);
      }
    },
    // deleteRoom(room) {
    //   const options = {
    //     method: 'DELETE',
    //     url: 'https://api.room.video.wiki/api/delete/room/',
    //     data: { public_meeting_id: room.room_url.split('/').pop() },
    //   };

    //   axios
    //     .request(options)
    //     .then((response) => {
    //       console.log(response.data);
    //       const index = this.rooms.indexOf(room);
    //       if (index !== -1) {
    //         var newRooms = this.rooms;
    //         newRooms.splice(index, 1);
    //         this.$store.commit('room/setRooms', newRooms);
    //         this.showPopup = null;
    //       }
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    //   console.log('delete');
    // },

    downloadRoom(room) {
      console.log('download');
    },

    shareRoom() {
      const options = {
        method: 'POST',
        url: 'https://api.room.video.wiki/api/share/room/',
        data: {
          public_id: this.roomUrl.split('/').pop(),
          user: this.email,
        },
      };

      axios
        .request(options)
        .then((response) => {
          console.log(response.data);
          this.sharePopup = false;
          this.showPopup = null;
          this.$vs.notify({
            color: 'success',
            title: 'Success',
            text: 'room shared successfully',
          });
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    handleGlobalClick(event) {
      const isOutsideRoomPopup = !event.target.closest('.room-popup');
      const isNotTogglePopupButton = !event.target.closest('.side-btn');
      if (
        isOutsideRoomPopup &&
        isNotTogglePopupButton &&
        this.showPopup !== null
      ) {
        this.showPopup = null;
      }
    },
    async handleButtonClick() {
      this.changeFocus(false);
      this.isRecordingLoading = true;
      try {
        await this.getRecordings();
      } catch (e) {
        console.error('Error getting recordings', e);
      } finally {
        this.isRecordingLoading = false;
      }
    },
  },
  mounted() {
    this.checkScreenWidth();
    window.addEventListener('resize', this.checkScreenWidth);
    console.log(this.room);
    window.addEventListener('click', this.handleGlobalClick);
    const container = document.querySelector('.options-container');
    container.addEventListener('mousemove', (e) => {
      // Get the mouse coordinates relative to the div
      const divRect = container.getBoundingClientRect();
      const mouseY = e.clientY - divRect.top;
      this.mouse = mouseY;
    });
    this.getList();
  },
  beforeDestroy() {
    // Remove the global click event listener when the component is destroyed
    window.removeEventListener('resize', this.checkScreenWidth);
  },
};
</script>

<style scoped>
*:not(i) {
  font-family: 'Karla', sans-serif;
}

.menuPosition {
  left: 0;
}

.create-room-button {
  overflow-wrap: break-word;
  font-size: 14px;
  font-weight: 400;
  background-color: #d7df23;
  color: rgb(0, 0, 0);
  border: 1px solid rgb(49, 57, 78);
  padding: 0.6rem 0.75rem;
  border-radius: 6px;
  margin: 0px;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.center-container-full {
  justify-content: center;
  align-items: center;
  color: #a6a6a8;
  width: 100%;
  max-width: 450px;
  margin: auto;
  /* border: 1px solid white; */
  height: 100%;
}

.heading-container {
  width: 270px;
}

.sub-heading {
  font-weight: 400;
  font-size: 11px;
  line-height: 12.86px;
}

.con-vs-popup .vs-popup {
  background: transparent !important;
}

.header-button {
  background: none;
  cursor: pointer;
  height: max-content;
  margin-left: 5px;
}

.side-btn {
  background: none;
  cursor: pointer;
  height: max-content;
  margin-left: 5px;
}

.options-button {
  background: none;
  color: #a6a6a8;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
}

.room-popup {
  position: absolute;
  width: 100px;
  height: fit-content;
  background-color: #1f272f;
  border: 1px solid #31394e;
  color: #31394e;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  top: 85%;
  left: 72%;
  z-index: 999;
  padding: 10px;
  margin: auto;
  text-align: left;
}

.room-popup>button {
  display: flex;
  cursor: pointer;
  font-size: 12px;
  gap: 7px;
  background-color: #1f272f;
  border: none;
  color: #647181;
  text-align: left;
  margin-top: 5px;
}

.room-popup>button img {
  width: 10px;
  height: 10px;
  margin: auto;
}

.focused-button {
  color: #d7df23;
  text-decoration: underline;
  text-underline-offset: 7px;
  text-decoration-thickness: 2px;
}

.child-options {
  position: relative;
  padding: 10px 0px 10px 15px;
  border: 1px solid #31394e;
  width: 100%;
  border-radius: 10px;
  height: 63px;
  font-weight: 600;
}

.child-options div p {
  width: 160px;
}

.session-button {
  background-color: #1f272f;
  border: 1px solid #31394e;
  padding: 8px 8px 8px 8px;
  color: #a6a6a8;
  border-radius: 5px;
  font-weight: 700;
  font-weight: 12px;
  width: 104px;
  height: 35px;
}

.session-button:hover {
  background-color: #d7df23;
  color: #1f272f;
  cursor: pointer;
}

.copy-link {
  cursor: pointer;
  background: none;
  border: 1px solid #31394e;
  border-radius: 6px;
  width: 35px;
  height: 34px;
  padding: 5px;
  position: relative;
}

.copy-link:active {
  border-color: #d7df23;
  color: #d7df23;
  fill: #d7df23;
}

.tooltip-container {
  position: relative;
}

.tooltip-button {
  position: relative;
  z-index: 1;
}

.tooltip {
  position: absolute;
  top: -10%;
  left: -20%;
  background-color: #31394e;
  color: #a6a6a8;
  font-size: 12px;
  font-weight: 500;
  width: 100px;
  height: 20px;
  padding: 5px;
  border-radius: 6px;
  display: none;
}

.tooltip-button:hover+.tooltip {
  display: block;
}

.tooltip2 {
  position: absolute;
  z-index: 5;
  color: #a6a6a8;
  display: flex;
  align-items: center;
  background-color: none;
  background: transparent;
  pointer-events: none;
  top: 30px;
  right: 7rem;
  width: 265px;
}

.tooltip2 div:nth-child(1) {
  background-color: #31394e;
  display: flex;
  font-size: 12px;
  border-radius: 4px;
  padding: 5px;
}

.triangle {
  width: 0px;
  height: 0px;
  background: transparent;
  border-left: 10px solid #31394e;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  margin: auto;
}

.popup {
  height: 100vh;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: #1f272f67;
  z-index: 999;
}

.createPopup {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.options-container {
  margin-top: 30px;
  height: 58vh;
  overflow: auto;
}

.options-container::-webkit-scrollbar {
  width: 5px;
}

.options-container::-webkit-scrollbar-thumb {
  background-color: #31394e !important;
  border-radius: 4px;
  height: 10px;
}

.footer-content {
  width: max-content;
  text-align: center;
  margin-top: 40px !important;
}

.dot {
  margin-left: 17px;
}

.choose-room {
  margin-top: 20px;
}
</style>

<style scoped>
*:not(i) {
  font-family: 'Karla', sans-serif;
}

.centered-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: fit-content;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.container {
  width: 500px;
  border: 1px solid #31394e;
  background-color: #1f272f;
  border-radius: 12px;
  padding: 25px;
}

.popup-heading {
  font-size: 18px;
  font-weight: 500;
  color: #a6a6a8;
}

.first-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  color: #a6a6a8;
  font-weight: regular;
  font-size: 14px;
  font-family: 'Karla', sans-serif;
}

.input input {
  margin-top: 14px;
  height: 45px;
  width: 100%;
  background-color: #18191b;
  border: 1px solid #31394e;
  padding: 20px;
  color: #a6a6a8;
  border-radius: 6px;
  border: 1px solid #31394e;
}

.close-icon {
  font-size: 20px;
  cursor: pointer;
  color: #a6a6a8;
  background: none;
  border: none;
}

.button {
  display: flex;
  justify-content: flex-end;
  padding-top: 20px;
}

.button-text {
  margin-top: 30px;
  height: 45px;
  width: 30%;
  background-color: #d7df23;
  border: 1px solid #31394e;
  border-radius: 6px;
}

.error-message {
  color: rgba(199, 70, 70, 0.869);
  font-weight: regular;
  font-size: 13px;
}

.icon {
  position: absolute;
  right: 5px;
  top: 5px;
  font-family: 'Montserrat', Helvetica, Arial, sans-serif !important;
}

.icon i {
  font-size: 2em;
  color: #647181;
}

.tooltip-container {
  position: relative;
}

.tooltip-button {
  position: relative;
}

.tooltip {
  display: none;
  position: absolute;
  background-color: #31394e85;
  color: #a6a6a8;
  font-size: 12px;
  font-weight: 400;
  padding: 5px;
  border-radius: 6px;
  top: calc(100%);
  left: 50%;
  transform: translateX(-50%);
  pointer-events: none;
  width: 65px;
  height: 30px;
}

.show-tooltip {
  display: block;
}
</style>

<style>
input {
  font-family: Montserrat;
}

body {
  background: none transparent;
}

.button {
  display: none;
}

@media (max-width: 499px) {
  .copy-link {
    border-radius: 10px;
  }

  .button .button-text {
    font-size: 12px;
    height: 30px;
  }

  .button-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
    /* Ensures content doesn't spill over */
    height: 62px;
  }

  .center-container-full {
    height: auto;
    border: 0.2px;
    border-color: #31394e;
    border-radius: 7px;
    border-style: solid;
    padding: 16px;
    background-color: #1f272f;
    margin-bottom: 5px;
    width: 305px;
    overflow: hidden;
    padding-bottom: 10px !important;
  }

  .options-container {
    margin-top: 20px;
    height: 43vh !important;
    padding-top: 0;
    overflow: auto;
    padding-bottom: 10px !important;
  }

  .sub-heading {
    font-weight: 400;
    font-size: 11px;
  }

  .footer-content {
    display: none;
  }

  .recording img {
    width: 100%;
    padding: 2px;
    margin: 10px;
  }

  .options-container {
    height: 200px;
    overflow: auto;
    overflow-x: hidden;
    margin-top: 30px;
    margin-bottom: 10px;
  }

  .tooltip-container,
  .session-button {
    display: none;
  }

  .createPopup {
    height: 100vh;
    max-width: 300px !important;
    min-width: 250px;
  }

  .centered-container {
    margin-top: -20rem !important;
  }

  .popup {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: transparent !important;
    z-index: 999;
  }

  .container {
    max-width: 330px !important;
    min-width: 250px;
  }
}
</style>
