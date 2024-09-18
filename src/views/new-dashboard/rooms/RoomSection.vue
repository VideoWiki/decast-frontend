<template>
  <div class="w-full flex flex-col gap-6 justify-start">
    <div class="flex justify-between">
      <div class="text-white">
        <p class="font-bold text-2xl">//Calls</p>
        <p>Conference rooms for private calls.</p>
      </div>
    </div>

  <div class="basic_child_parent__ w-1/2 flex items-center justify-between pr-5">
    <div class="choose-room">
      <button class="options-button border-none" @click="changeFocus(true)"
        :class="{ 'focused-button': focusYourRooms }">
        /rooms
      </button>
      <button class="options-button border-none px-5" @click="handleButtonClick"
        :class="{ 'focused-button': !focusYourRooms }">
        /recordings
      </button>
    </div>

    <div class="cursor-pointer">
      <vx-tooltip text="/ Create Room" position="left">
        <img @click="$router.push('/dashboard/rooms/create')" src="@/assets/images/pixel_create.svg" />
      </vx-tooltip>
    </div>
  </div>

  <div class="flex flex-row gap-12 w-full">
    <div class="flex flex-col gap-6 w-1/2">
      <!-- <div class="choose-room">
          <button class="options-button border-none" @click="changeFocus(true)"
            :class="{ 'focused-button': focusYourRooms }">
            /rooms
          </button>
          <button class="options-button border-none px-5" @click="handleButtonClick"
            :class="{ 'focused-button': !focusYourRooms }">
            /recordings
          </button>
        </div> -->

      <div class="flex flex-col gap-4">
        <div class="room_list_cont" v-if="focusYourRooms">
          <div v-if="isRoomsLoading">
            <RoomCardShimmer />
            <RoomCardShimmer :style="{ opacity: 0.7 }" />
            <RoomCardShimmer :style="{ opacity: 0.4 }" />
          </div>
          <div v-else-if="rooms.length">
            <div v-for="(room, index) in rooms" :key="index">
              <RoomCard :getRoomList="getList" :room="room" :index="index" :roomsList="rooms"
                @room-click="handleRoomClick" />
            </div>
          </div>
        </div>

        <div v-else class="room_list_cont">
          <div v-if="isRecordingLoading">
            <RecordingCardShimmer />
            <RecordingCardShimmer :style="{ opacity: 0.7 }" />
            <RecordingCardShimmer :style="{ opacity: 0.4 }" />
          </div>
          <div v-else-if="recordingList.length">
            <div v-for="(recording, index) in recordings" :key="index">
              <RecordingCard :recording="recording" :index="index" :getRecordings="getRecordings" />
            </div>
          </div>
          <div v-else class="recording flex flex-col items-center justify-items-center">
            <h1 class="text-4xl text-white font-bold">Oops! No Recordings Found. :(</h1>
          </div>
        </div>
      </div>
    </div>

    <div v-if="firstRoomId !== null" class="room_details w-1/2 p-5">
      <RoomDetails :selectedRoomDetails="selectedRoomDetails" :firstRoomId="firstRoomId" />
    </div>
  </div>
  <CreateRoomModal v-if="activeModal === 'createRoomModal'" :closeModal="closeCreateModal" />
  </div>
</template>

<script>
import RoomCard from './components/RoomCard.vue';
import RoomCardShimmer from './components/RoomCardShimmer.vue';
import RecordingCard from './components/RecordingCard.vue';
import RecordingCardShimmer from './components/RecordingCardShimmer.vue';
import CreateRoomModal from '@/views/new-dashboard/rooms/components/CreateRoomModal.vue';
import RoomDetails from '@/views/new-dashboard/rooms/components/RoomDetails.vue';
export default {
  name: 'RoomSection',
  components: {
    RoomCard,
    RoomCardShimmer,
    RecordingCard,
    RecordingCardShimmer,
    CreateRoomModal,
    RoomDetails,
  },
  data() {
    return {
      activeModal: '', //createRoomModal
      isRecordingLoading: false,
      focusYourRooms: true,
      rooms: [],
      isRoomsLoading: false,
      recordings: [],
      email: '',
      roomUrl: '',
      selectedRoomDetails: null,
      firstRoomId: null,
    };
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
      //console.log(newList);
      this.rooms = [...newList];
      this.firstRoomId = newList.length > 0 ? newList[0] : null;
      //console.log(this.firstRoomId, 'firstRoomId');
      //console.log(this.rooms);
    },
    recordingList(newList) {
      //console.log(newList);
      this.recordings = [...newList];
      //console.log(this.recordings);
    },
    '$route'(to, from) {
      if (to.params.action === 'create') {
        this.setActiveModal('createRoomModal');
      }
    }
  },
  mounted() {
    if (this.$route.params.action === 'create') {
      this.setActiveModal('createRoomModal')
    }
    this.getList();
  },
  methods: {
    closeCreateModal() {
      this.setActiveModal('');
      this.$router.push('/dashboard/rooms');
      localStorage.removeItem("LOG_BOARDID");
      localStorage.removeItem("LOG_REDIRECT");
      localStorage.removeItem("LOG_TOKEN");
    },
    handleRoomClick(details) {
      this.selectedRoomDetails = details;
      //console.log(this.selectedRoomDetails, 'jfkll')
    },
    changeFocus(toYourRooms) {
      this.focusYourRooms = toYourRooms;
    },
    setActiveModal(modalName) {
      this.activeModal = modalName;
    },
    getList() {
      this.isRoomsLoading = true;
      this.$store
        .dispatch('room/getList')
        .then((res) => {
          //console.log(res);
          this.isRoomsLoading = false;
        })
        .catch((e) => {
          //console.log(e);
          this.isRoomsLoading = false;
        });
    },
    async getRecordings() {
      this.isRecordingLoading = true;
      try {
        const res = await this.$store.dispatch('room/getRecordings');
        this.isRecordingLoading = false;
        //console.log(res);
      } catch (e) {
        this.isRecordingLoading = false;
        console.error('Error getting recordings', e);
      }
    },
    async handleButtonClick() {
      this.changeFocus(false);
      this.isRecordingLoading = true;
      try {
        await this.getRecordings();
      } catch (e) {
        console.error('Error getting recordings', e);
      }
      this.isRecordingLoading = false;
    },
  },
};
</script>

<style scoped>
* {
  font-family: 'JetBrains Mono', monospace !important;
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

.room_details {
  border: 2px solid #272727;
  box-shadow: 3px 3px 0px 0px #272727;
  height: 60vh;
}

@media screen and (max-width: 1000px) {
    .room_details {
        display: none;
    }
}


.room_header {
  background-color: #272727;
}

.room_list_cont {
  overflow: scroll !important;
  height: 64vh;
  max-width: 645px;
}

.basic_child_parent__ {
  /* max-width: 644px; */
}

.room_list_cont::-webkit-scrollbar {
  display: none;
}
</style>
