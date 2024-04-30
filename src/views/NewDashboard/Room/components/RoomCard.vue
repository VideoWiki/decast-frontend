<template>
  <div>
    <RoomCardShimmer v-if="isLoading" />
    <div v-else class="room_list flex justify-between items-center mb-4 w-full py-2 px-6" @click="handleRoomClick">
      <div>
        <p style="font-size: 16px; font-weight: 600; width: 50%">
          {{ truncateText(room.room_name, 20) }}
        </p>
      </div>

      <div class="flex justify-between items-center">
        <!-- <SimpleMenu :menuList="roomCardMenuItems">
          <template #menuButton>
            <vs-button class="custm-style">
              <img src="@/assets/images/menu.svg" />
            </vs-button>
          </template>
        </SimpleMenu> -->
        <vs-button class="custm-style" @click="setActiveModal('roomOptionsModal')">
          <img src="@/assets/images/menu.svg" />
        </vs-button>
        <div class="copy-btn-cont">
          <vx-tooltip :text="'https://decast.live/j/'+room.short_code" position="bottom">
            <vs-button class="custm-style" @click="copy(room.short_code)">
              <img src="@/assets/images/copy.svg" />
            </vs-button>
          </vx-tooltip>
        </div>

        <vs-button class="custm-style">
          <img v-if="!isRoomStart" @click.prevent="start(room.room_url)" src="@/assets/images/start.svg" />
          <img v-if="isRoomStart" src="@/assets/images/end.svg" />
        </vs-button>
      </div>
    </div>
    <ShareRoomModal v-if="activeModal === 'shareRoomModal'" :room="room" :closeModal="() => setRoomModal('')" />
    <RoomOptionsModal v-if="activeModal === 'roomOptionsModal'" :closeModal="() => setActiveModal('')"
      :setActiveModal="setActiveModal" />
    <CustomRoomUrl v-if="activeModal === 'customRoomUrl'" :closeModal="() => setActiveModal('')" :room="room" :getRoomList="getRoomList"/>
    <RenameRoomModal v-if="activeModal === 'renameRoomModal'" :closeModal="() => setActiveModal('')" :roomDetails="room" :getRoomList="getRoomList"/>
    <DeleteRoomModal v-if="activeModal === 'deleteRoomModal'" :closeModal="() => setActiveModal('')"
      :roomName="room.room_name" :confirmDelete="() => deleteRoom(room)" />
  </div>
</template>
<script>
import axios from '@/axios';
import SimpleMenu from '@/components/common/simpleMenu/SimpleMenu.vue';
import MoreIcon from '@/assets/svgs/button-icons/more.vue';
import ShareRoomModal from './options-components/ShareRoomModal.vue';
import RoomCardShimmer from './RoomCardShimmer.vue';
import RoomOptionsModal from './RoomOptionsModal.vue';
import DeleteRoomModal from './options-components/DeleteRoomModal.vue';
import CustomRoomUrl from './options-components/CustomRoomUrl.vue';
import RenameRoomModal from './options-components/RenameRoomModal.vue';

export default {
  name: 'RoomCard',
  props: ['room', 'index', 'roomsList', 'getRoomList'],
  data() {
    return {
      isLoading: false,
      activeModal: '', //roomOptionsModal
      text: '',
      rooms: [],
      sharePopup: false,
      recordings: [],
      isRoomStart: false,
      // roomCardMenuItems: [
      //   {
      //     label: 'Share',
      //     icon: () => import('@/assets/svgs/button-icons/share.vue'),
      //     onClick: () => this.setRoomModal('shareRoom'),
      //   },
      //   {
      //     label: 'Delete',
      //     icon: () => import('@/assets/svgs/button-icons/delete.vue'),
      //     onClick: () => this.setRoomModal('deleteRoom'),
      //   },
      // ],
    };
  },
  components: {
    SimpleMenu,
    MoreIcon,
    ShareRoomModal,
    RoomCardShimmer,
    RoomOptionsModal,
    DeleteRoomModal,
    CustomRoomUrl,
    RenameRoomModal
},
  methods: {
    handleRoomClick() {
      let newId = this.room.room_url.split('/');
      this.$emit('room-click', {
        id: newId[newId.length - 1],
        roomLs: this.roomsList,
        room:this.room,
        type: this.room.type,
        room_name: this.room.room_name,
      });
    },
    setActiveModal(modalName) {
      this.activeModal = modalName;
    },
    setRoomModal(setModal) {
      this.activeModal = setModal;
    },
    truncateText(text, maxLength) {
      if (text.length > maxLength) {
        return text.slice(0, maxLength) + '...';
      } else {
        return text;
      }
    },
    copy(shortCode) {
      navigator.clipboard.writeText('https://decast.live/j/' + shortCode);
    },
    getList() {
      this.$store
        .dispatch('room/getList')
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    start(url) {
      let id = url.split('/');
      id = id[id.length - 1];
      this.$store
        .dispatch('room/start', id)
        .then((res) => {
          this.isRoomStart = true;
          window.open(res.data.room_url, '_blank');
        })
        .catch((e) => {
          console.log(e);
        });
    },
    deleteRoom(room) {
      this.isLoading = true;
      this.setActiveModal('');
      const options = {
        method: 'DELETE',
        url: 'https://api.room.video.wiki/api/delete/room/',
        data: { public_meeting_id: room.room_url.split('/').pop() },
      };

      axios
        .request(options)
        .then((response) => {
          console.log(response.data);
          const index = this.roomsList.indexOf(room);
          if (index !== -1) {
            var newRooms = this.roomsList;
            newRooms.splice(index, 1);
            this.$store.commit('room/setRooms', newRooms);
          }
          this.isLoading = false;
        })
        .catch((error) => {
          this.isLoading = false;
          console.error(error);
        });
    },
  },
};
</script>

<style scoped>
* {
  font-family: 'JetBrains Mono', monospace !important;
}

.custm-style {
  background: none !important;
  outline: none !important;
  border: none !important;
  background-color: transparent !important;
}

.custm-style:hover {
  box-shadow: none !important;
}
.room_list {
  border-top: 1px solid white;
  border-left: 1px solid white;
  border-right: 2px solid white;
  border-bottom: 2px solid white;
  box-shadow: 3px 3px 0px 0px white;
}

.room_list:hover {
  border-top: 1px solid #D7DF23;
  border-left: 1px solid #D7DF23;
  border-right: 2px solid #D7DF23;
  border-bottom: 2px solid #D7DF23;
  box-shadow: 3px 3px 0px 0px #D7DF23;
}
</style>

