<template>
  <div class="center-container-full">
    <div class="flex justify-between">
      <div class="heading-container">
        <h2
          class="custom-heading"
          style="color: #a6a6a8; font-weight: 500; font-size: 24px"
        >
          Rooms
        </h2>
        <p class="sub-heading pt-2">
          Rooms are social spaces for direct communication. Ideal for X Y Z.
          <a
            target="_blank"
            href="#"
            style="color: #31a2f4; text-decoration: underline; cursor: pointer"
            >Learn more about Rooms.</a
          >
        </p>
      </div>
      <div class="flex justify-between">
        <button
          class="header-button p-2"
          @click="createPopup = true"
          style="
            border: 1px solid #a6a6a8;
            border-radius: 5px;
            background-color: #1f272f;
            width: 28px;
            height: 28px;
          "
        >
          <img src="./Rooms/Plus.svg" alt="" />
        </button>
        <button class="header-button border-none dot">
          <img src="./Rooms/Vector2.svg" class="h-7 p-1" alt="" />
        </button>
      </div>
    </div>

    <div class="rooms-container">
      <div class="choose-room">
        <button
          class="options-button border-none"
          @click="changeFocus(true)"
          :class="{ 'focused-button': focusYourRooms }"
        >
          Your Rooms
        </button>
        <button
          class="options-button border-none px-4"
          @click="changeFocus(false)"
          :class="{ 'focused-button': !focusYourRooms }"
        >
          Room Recordings
        </button>
      </div>

      <div class="options-container">
        <div v-if="focusYourRooms">
          <div v-for="(room, index) in rooms" :key="index">
            <div class="child-options flex justify-between items-center mb-4">
              <div>
                <p style="font-size: 14px; font-weight: 500">
                  {{ room.room_name }}
                </p>
              </div>
              <div class="flex justify-between">
                <button class="copy-link">
                  <img src="./Rooms/copy.svg" alt="" />
                </button>
                <button
                  class="session-button ml-4"
                  @click="start(room.room_url)"
                >
                  Start Session
                </button>
                <button class="header-button border-none">
                  <img src="./Rooms/Vector2.svg" class="h-7 p-2" alt="" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="flex flex-col items-center justify-items-center">
          <img src="@/assets/images/dashboard/NoRecording.svg" class="w-1/2" />
          <img
            src="@/assets/images/dashboard/NoRecordingText1.svg"
            class="mb-3"
          />
          <img src="@/assets/images/dashboard/NoRecordingText.svg" />
        </div>
      </div>
    </div>

    <div class="footer-content m-auto">
      <p class="m-auto">3/3</p>
      <p>
        Need more dedicated room?
        <a target="_blank" href="#" style="color: #31a2f4; cursor: pointer"
          >Contact us for a tailored plan</a
        >
      </p>
    </div>
    <vs-popup
      title="Login/Register"
      id="login-popup"
      ref="login-popup"
      :active.sync="createPopup"
      ><template>
        <div class="centered-container">
          <div class="container">
            <div class="first-row">
              <h6 class="custom-heading">Create new room</h6>
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
      </template>
    </vs-popup>
  </div>
</template>
<script>
import axios from '../../axios';

export default {
  name: 'DashBoardMiddlePart',
  data() {
    return {
      createPopup: false,
      focusYourRooms: true,
      text: '',
      rooms: [],
    };
  },
  methods: {
    createRoom() {
      axios({
        method: 'POST',
        url: 'https://dev.api.room.video.wiki/api/create/',
        data: {
          event_name: this.text,
          room_code: '',
          join_now: 'False',
        },
      })
        .then(async (res) => {
          console.log(res.data);
          var room = {
            room_name: this.text,
            room_url: 'https://room.video.wiki//b/' + res.data.public_cast_id,
          };
          this.rooms.push(room);
          this.createPopup = false;

          // getList();
          //   if (joinNow) {
          //     window.location.href = r;es.data.join_now_url;
          //     return;
          //   }
        })
        .catch((e) => {
          console.log(e.resonse);
        });
    },
    changeFocus(toYourRooms) {
      this.focusYourRooms = toYourRooms;
    },
    getList() {
      axios.get('https://dev.api.room.video.wiki/api/list/').then((res) => {
        console.log(res);
        this.rooms = res.data.room_data;
      });
    },
    start(url) {
      let id = url.split('/');
      id = id[id.length - 1];
      axios({
        method: 'POST',
        url: 'https://dev.api.room.video.wiki/api/join/',
        data: {
          name: 'Ritik',
          public_meeting_id: id,
          password: '',
        },
      }).then((res) => {
        console.log(res.data);
        window.location.href = res.data.room_url;
      });
    },
  },
  mounted() {
    this.getList();
    this.$refs['login-popup'].$el.childNodes[1].childNodes[0].style.display =
      'none';
    console.log(this.$refs['login-popup'].$el);
    console.log(document.getElementById('login-popup'));
    var styles = {
      padding: 0,
      margin: 0,
      width: '500px',
      overflow: 'hidden',
    };
    var obj = document.getElementsByClassName('vs-popup--content')[0];
    Object.assign(obj.style, styles);
    styles = {
      background: 'transparent',
      boxShadow: 'none',
      width: '500px',
      minWidth: '500px !important',
      overflow: 'hidden',
    };
    this.$refs['login-popup'].$el.childNodes[1].style.cssText =
      'min-width:500px !important';
    obj = document.getElementsByClassName('vs-popup')[0];
    Object.assign(obj.style, styles);
  },
};
</script>

<style scoped>
*:not(i) {
  font-family: 'Karla', sans-serif;
}

.center-container-full {
  justify-content: center;
  align-items: center;
  color: #a6a6a8;
  max-width: 420px;
  width: 410px;
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

.header-button {
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

.focused-button {
  color: #d7df23;
  text-decoration: underline;
  text-underline-offset: 7px;
  text-decoration-thickness: 2px;
}

.child-options {
  padding: 10px 10px 10px 15px;
  border: 1px solid #31394e;
  width: 380px;
  border-radius: 6px;
  height: 62px;
  font-weight: 600;
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

.copy-link:hover::before {
  content: 'https://room.video.wiki/b/dhe-ztu-y2w-lsi';
  /* Add your desired tooltip text */
  position: absolute;
  top: -45px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #1f272f;
  border: 1px solid #31394e;
  color: #a6a6a8;
  padding: 8px 12px;
  border-radius: 4px;
  white-space: nowrap;
  opacity: 0.9;
  z-index: 100000;
}

.options-container {
  margin-top: 30px;
  height: 303px;
  padding-top: 0;
  overflow-y: scroll;
}

.options-container::-webkit-scrollbar {
  width: 8px;
}

.options-container::-webkit-scrollbar-thumb {
  background-color: #31394e;
  border-radius: 4px;
  height: 10px;
}

.footer-content {
  width: max-content;
  text-align: center;
  margin-top: 100px !important;
}

.dot {
  margin-left: 17px;
}

.choose-room {
  margin-top: 20px;
}
</style>
<style scoped>
@import url(https://allfont.net/allfont.css?fonts=karla);

*:not(i) {
  font-family: 'Karla', sans-serif;
}

.centered-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
}

.container {
  height: 300px;
  width: 500px;
  border: 1px solid #31394e;
  background-color: #1f272f;
  border-radius: 12px;
  padding: 25px;
  position: relative;
}

.custom-heading {
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
  padding-top: 25px;
  font-weight: regular;
  font-size: 14px;
  font-family: 'Karla', sans-serif;
}

.input input {
  margin-top: 20px;
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
  position: absolute;
  font-size: 20px;
  cursor: pointer;
  color: #a6a6a8;
  background: none;
  border: none;
  top: 5px;
  right: 10px;
}

.button {
  display: flex;
  justify-content: flex-end;
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
</style>

<style>
input {
  font-family: Montserrat;
}

body {
  background: none transparent;
}
</style>
<style lang="scss" scoped>
iframe {
  overflow: hidden;
}

.vs-popup--content {
  margin: 0;
  padding: 0;
  border-radius: 10px;
  background: #1f272f;
}
</style>
