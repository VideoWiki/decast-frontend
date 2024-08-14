<template>
  <div class="full-container">
    <div class="logo">
      <img class="py-4" src="@/assets/images/logot.svg" alt="" />
    </div>
    <div class="w-full flex flex-col items-center join-wrapper">
      <div class="bg-white w-full flex flex-row justify-between items-center px-4 h-8">
        <div class="bg-black w-4 h-4"></div>
        <div class="flex flex-row gap-2">
          <div class="bg-black w-4 h-4"></div>
          <div class="bg-black w-4 h-4"></div>
        </div>
      </div>
      <div class="join-body">
        <!-- <p class="join-type" v-if="castType === 'public'">/* Public Cast */</p>
        <p class="join-type" v-else>/* Private Cast */</p> -->
        <p class="join-by">/* Hosted by {{ creator }} */</p>
        <h2 class="room-name">{{ eventName }}</h2>
        <!-- <p class="room-status"><span></span> LIVE</p> -->

        <div class="join-input-content">
          <label>user.name</label>
          <input v-model="name" type="text" @keydown.enter="joinRoom" autocomplete="off"
            placeholder="e.g John G. Miguel" />
          <button :disabled="isJoining" v-if="isJoining"><span>/Joining...</span></button>
          <button :disabled="isJoining" @click="joinRoom" v-else><span>/Join.room</span></button>
        </div>
        <!-- <p class="join-type" v-if="castType === 'public'">/* This is a public cast. Please enter your name to join the cast*/</p>
        <p class="join-type" v-else>/* This is a private cast. Please verify your email before joining the cast. This does not
          create your decast account */</p> -->
        <!-- <div class="join-body-bottom">
          <p>>> user.email > <span>sushil@gmail.com</span></p>
        </div> -->
      </div>
    </div>
    <!-- <div class="h-full w-full flex justify-center items-center">
      <div class="flex idgf">
        <div class="left">
          <img src="@/assets/images/dashboard/Onlinemeeting.svg" alt="" />
        </div>
        <div class="right">
          <div class="heading-part">
            <div class="join-text">You're joining the room</div>
            <div class="class-info">{{ eventName }}</div>
            <div class="host-info">Hosted by “{{ creator }}”</div>
          </div>
          <div class="dynamic-part" v-if="loggedOut">
            <div class="inputName">
              <p>Joining name</p>
              <input
                v-model="name"
                type="text"
                @keydown.enter="joinRoom"
                placeholder="e.g John G. Miguel"
              />
            </div>
            <button class="button" @click="joinRoom">Join</button>
            <div class="separator">
              <div class="line"></div>
              <div>or</div>
              <div class="line"></div>
            </div>
            <button class="sing-in">Sign in</button>
            <div class="text">
              Do not have an account?
              <p>Sign up</p>
            </div>
          </div>
          <div class="dynamic-part" v-else>
            <div class="inputName">
              <p>Joining name</p>
              <input
                type="text"
                v-model="name"
                @keydown.enter="joinRoom"
                placeholder="e.g John G. Miguel"
              />
            </div>
            <button class="button" @click="joinRoom">Join</button>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>
<script>
import axios from '../../../axios';
export default {
  name: 'JoinRoom',
  data() {
    return {
      loggedOut: false,
      name: '',
      roomId: this.$route.params.meeting_id,
      code: '',
      eventName: '',
      creator: '',
      castType: '',
      disabled: false,
      isJoining: false,
    };
  },
  mounted() {
    document.getElementById('loading-bg').style.display = 'block';
    this.name = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).first_name : '';
    this.getUserDetails();
  },
  methods: {
    joinRoom() {
      if (this.isJoining) {
        return;
      }
      this.isJoining = true;
      // setTimeout(() => {
      //   this.isJoining = false;
      // }, 1000);
      if (this.name === '') {
        this.$vs.notify({
          title: 'Name is required',
          color: 'danger',
        });
        return;
      }
      fetch('https://api.room.video.wiki/api/join/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: this.name,
          public_meeting_id: this.roomId,
          password: this.code,
        }),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          //console.log('Join API response:', data);
          const roomUrl = data.room_url;
          window.location.href = roomUrl;
          this.isJoining = false;
          this.$vs.notify({
            title: 'Success',
            text: data.message,
            color: 'success',
          });
        })
        .catch(error => {
          ////console.log('Join API error:', error);
          this.isJoining = false;
          this.$vs.notify({
            title: 'OOPS',
            text: error.message,
            color: 'danger',
          });
        });
    },
    async getUserDetails() {
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://api.room.video.wiki/api/room/fetch/info/?room_id=${this.roomId}`,
      };

      try {
        const response = await axios(config);
        const responseData = response.data;
        this.eventName = responseData.details.event_name;
        this.creator = responseData.details.creator_name;
        this.castType = responseData.details.cast_type;
        document.getElementById('loading-bg').style.display = 'none';
      } catch (error) {
        ////console.log(error);
      }
    },
  },
};
</script>

<style scoped>
*:not(i) {
  /* font-family: 'Karla', sans-serif !important; */
  font-family: 'JetBrains Mono' !important;
}

.logo {
  height: 100px;
  display: flex;
  align-items: center;
}

.logo img {
  height: inherit;
}

.full-container {
  background-color: #000000;
  /* background-image: url('../assets/images/joiningPage/left.png'),
    url('../assets/images/joiningPage/right.png'); */
  background-position: left center, right top;
  background-size: 30% 70%, contain;
  background-repeat: no-repeat, no-repeat;
  height: 100vh;
  width: 100%;
  padding-left: 67px;
  padding-right: 67px;
  display: flex;
  flex-direction: column;
}

.join-wrapper {
  height: calc(100vh - 100px);
}

.join-body {
  width: 100%;
  padding: 20px;
  border: 1px solid #FFFFFF;
  margin-top: 10px;
}

.join-type {
  color: #5B96EB;
  width: 60%;
}

.join-by {
  color: #22C55E;
}

.join-input-content {
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  margin-bottom: 36px;
}

.join-input-content label {
  color: #FFFFFF;
}

.join-input-content input {
  background-color: #FFFFFF;
  color: #000000;
  border: none;
  outline: none;
  padding: 10px;
  margin: 5px 0px 10px 0px;
  max-width: 350px;
}

.join-input-content button {
  background-color: #D7DF23;
  color: #000000;
  border: 2px solid #000000;
  outline: none;
  padding: 10px;
  width: fit-content;
  cursor: pointer;
  font-weight: 600;
  -webkit-box-shadow: 5px 5px 0px -1px rgba(255, 255, 255, 1);
  -moz-box-shadow: 5px 5px 0px -1px rgba(255, 255, 255, 1);
  box-shadow: 5px 5px 0px -1px rgba(255, 255, 255, 1);
}

.join-input-content button:disabled {
  opacity: 0.5;
}

.join-input-content button span {
  margin-right: 30px;
}

.room-name {
  color: #FFFFFF;
  font-weight: 700;
  max-width: 450px;
  margin-top: 10px;
  margin-bottom: 10px;
}

.room-status {
  color: #EF4444;
  display: flex;
  align-items: center;
}

.room-status span {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: #EF4444;
  margin-right: 5px;
}

.join-body-bottom {
  margin-top: 5px;
  color: #FFFFFF;
}

.join-body-bottom span {
  color: #22C55E;
}

.left {
  width: 229px;
  height: 194px;
}

.left img {
  object-fit: cover;
}

.right {
  margin-left: 52px;
}

.join-text {
  color: #a6a6a8;
  font-weight: 600;
  font-size: 12px;
}

.class-info {
  color: #a6a6a8;
  font-weight: 500;
  font-size: 24px;
  margin-top: 20px;
}

.host-info {
  font-weight: 500;
  font-size: 16px;
  color: #647181;
  margin-top: 14px;
}

.dynamic-part {
  margin-top: 45px;
}

.inputName p {
  font-weight: 600;
  font-size: 12px;
  color: #637181;
  margin-bottom: 6px;
}

.inputName input {
  width: 319px;
  height: 40px;
  border: 1px solid #31394e;
  border-radius: 6px;
  background-color: #1d232b;
  padding-left: 14px;
  color: #a6a6a8;
  font-size: 12px;
  font-weight: 500;
  display: flex;
  align-items: center;
}

.button {
  margin-top: 18px;
  width: 319px;
  height: 40px;
  background-color: #d7df23;
  border: 1px solid #31394e;
  cursor: pointer;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  color: #181a20;
}

.separator {
  width: 319px;
  margin-top: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.line {
  border: 1px solid #31394e;
  width: 135px;
  height: 1px;
}

.sing-in {
  margin-top: 14px;
  width: 319px;
  height: 40px;
  border: 1px solid #31394e;
  border-radius: 6px;
  background-color: #1f272f;
  font-weight: 500;
  font-size: 12px;
  color: #a6a6a8;
}

.text {
  margin-top: 15px;
  font-weight: 500;
  font-size: 12px;
  color: #a6a6a8;
  display: flex;
  align-items: center;
  justify-content: center;
}

.text p {
  font-weight: 600;
  font-size: 13px;
  margin-left: 5px;
}

@media (max-width: 499px) {
  .full-container {
    padding-left: 10px;
    padding-right: 10px;
  }

  /* .join-input-content input {
    width: unset !important;
  } */

  .idgf {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* border: 1px solid red; */
  }

  .left {
    /* border: 1px solid yellow; */
    width: 200px;
    height: 150px;
    margin: auto;
    margin-top: -50px;
  }

  .left img {
    object-fit: conatin;
  }

  .right {
    /* border: 1x solid white; */
    margin: auto;
  }

  .class-info {
    margin-top: 10px;
  }

  .host-info {
    margin-top: 10px;
  }

  .dynamic-part {
    margin-top: 15px;
  }
}
</style>
