<template>
  <div class="center-container-full">
    <div class="flex justify-between">
      <div class="heading-container">
        <h2 class="custom-heading" style="color: #a6a6a8; font-weight: 500; font-size: 24px">
          Casts
        </h2>
        <p class="sub-heading pt-2">
          Casts are social spaces for events and wide-range. Ideal for X Y Z.
          <a target="_blank" href="#" style="color: #31a2f4; text-decoration: underline; cursor: pointer">Learn more about
            Casts.</a>
        </p>
      </div>
      <div class="flex justify-between">
        <button class="header-button p-2" style="
            border: 1px solid #a6a6a8;
            border-radius: 5px;
            background-color: #1f272f;
            width: 28px;
            height: 28px;
          " @click="openCreate">
          <img src="@/assets/images/Plus.svg" alt="" />
        </button>
        <!-- <button class="header-button border-none dot">
          <img src="@/assets/images/Vector2.svg" class="h-7 p-1" alt="" />
        </button> -->
      </div>
    </div>

    <!-- <div class="bottom">
      <div class="coming-soon">
        <h3>COMING SOON</h3>
      </div>
      <div class="cast-featurea">
        <p>Cast feature coming soon some more</p>
        <p>description goes here.</p>
      </div>
    </div> -->

    <div class="rooms-container">
      <div class="choose-room">
        <button class="options-button border-none" @click="changeFocus(true)"
          :class="{ 'focused-button': focusYourRooms }">
          Scheduled Casts
        </button>
        <button class="options-button border-none px-5" @click="changeFocus(false)"
          :class="{ 'focused-button': !focusYourRooms }">
          Cast Recordings
        </button>
      </div>

      <div class="options-container">
        <div v-if="focusYourRooms">
          <div v-for="(cast, index) in casts" :key="index">
            <div class="child-options">
              <div class="inner-div1">
                <div class="inner-child1">
                  <p>{{ cast.event_name }}</p>
                  <button>
                    {{
                      moment(cast.event_date).format('ll').split(',')[0] +
                      ' ' +
                      moment(cast.event_time.split('.')[0], 'HH:mm:ss').format(
                        'h:mm A'
                      )
                    }}
                  </button>
                </div>
                <div v-if="cast.invitee_list.length === 0" @click="invite = true" class="inner-child2">
                  <span class="invite-text" href="#">Invite Attendees</span>
                  <img src="@/assets/images/user.svg" />
                </div>
                <div v-else class="inner-child2 my-4">
                  <p class="invite-text" @click="invite = true">
                    {{ cast.invitee_list.length }} attendees invited
                  </p>
                  <div class="flex my-1">
                    <span v-for="(image, imageIndex) in cast.invitee_list" :key="imageIndex" alt="">
                      <span class="attendee">
                        {{ image.email.slice(0, 2) }}
                      </span>
                    </span>
                  </div>
                </div>
                <!-- <p>{{ totalImagesCount[index] }}</p> -->
              </div>

              <div class="inner-div2">
                <button class="k-btn" @click="
                  togglePopup(
                    index,
                    cast.public_meeting_id,
                    cast.invitee_list
                  )
                  ">
                  <img src="@/assets/images/Vector2.svg" class="h-7 p-2" alt="" />
                </button>
                <div class="cast-popup" v-if="showPopup === index" @click="closePopup(index)">
                  <button>
                    <img src="@/assets/images/manage.svg" alt="" />Manage
                    attendees
                  </button>
                  <button>
                    <img src="@/assets/images/call.svg" alt="" />Call settings
                  </button>
                  <button>
                    <img src="@/assets/images/stream.svg" alt="" />Stream
                    settings
                  </button>
                  <button>
                    <img src="@/assets/images/drops.svg" alt="" />Drops
                  </button>
                  <button class="zt-btn" @click="togglePostpone(cast.public_meeting_id, index)" >
                    <img src="@/assets/images/reschedule.svg" alt="" />Reschedule cast
                  </button>
                  <button>
                    <img src="@/assets/images/clock.svg" alt="" />Set reminder
                  </button>
                  <button>
                    <img src="@/assets/images/pen.svg" alt="" />Edit
                  </button>
                  <button>
                    <img src="@/assets/images/prepone.svg" alt="" />Prepone cast
                  </button>
                  <button @click="deleteCast(cast.public_meeting_id, index)">
                    <img src="@/assets/images/delete.svg" />
                    Delete
                  </button>
                </div>

                <div class="post-time" v-if="cast.postPoneVisible">
                  <postPoneCast :cast_id="cast.public_meeting_id" :cast_name="cast.event_name"
                    :allow_moderator_to_unmute_user="castsInfo[cast.public_meeting_id].details.allow_moderator_to_unmute_user"
                    :auto_start_recording="castsInfo[cast.public_meeting_id].details.auto_start_recording"
                    :description="castsInfo[cast.public_meeting_id].details.description"
                    :cast_type="castsInfo[cast.public_meeting_id].details.cast_type"
                    :collect_attendee_email="castsInfo[cast.public_meeting_id].details.collect_attendee_email"
                    :private_otp="castsInfo[cast.public_meeting_id].details.otp_private"
                    :timezone="castsInfo[cast.public_meeting_id].details.timezone"
                    :logo="castsInfo[cast.public_meeting_id].details.logo"
                    :cover_image="castsInfo[cast.public_meeting_id].details.cover_image" 
                    :primary_color="castsInfo[cast.public_meeting_id].details.primary_color"
                    :welcome_text="castsInfo[cast.public_meeting_id].details.welcome_text"
                    :banner_text="castsInfo[cast.public_meeting_id].details.banner_text"
                    :guest_policy="castsInfo[cast.public_meeting_id].details.guest_policy"
                    :moderator_only_text="castsInfo[cast.public_meeting_id].details.moderator_only_text"
                    :logout_url="castsInfo[cast.public_meeting_id].details.logout_url"
                    :is_streaming="castsInfo[cast.public_meeting_id].details.is_streaming"
                    :public_stream="castsInfo[cast.public_meeting_id].details.public_stream"
                    :bbb_stream_url="castsInfo[cast.public_meeting_id].details.bbb_stream_url"
                    :record="castsInfo[cast.public_meeting_id].details.record"
                    :password_auth="castsInfo[cast.public_meeting_id].details.password_auth"
                    :end_when_no_moderator="castsInfo[cast.public_meeting_id].details.end_when_no_moderator"
                    :mute_on_start="castsInfo[cast.public_meeting_id].details.mute_on_start"
                    :webcam_only_for_moderator="castsInfo[cast.public_meeting_id].details.webcam_only_for_moderator"
                    :disable_cam="castsInfo[cast.public_meeting_id].details.disable_cam"
                    :disable_mic="castsInfo[cast.public_meeting_id].details.disable_mic"
                    :lock_layout="castsInfo[cast.public_meeting_id].details.lock_layout"
                    :viewer_mode="castsInfo[cast.public_meeting_id].details.viewer_mode"
                    :schedule="castsInfo[cast.public_meeting_id].details.schedule_time"
                    :timeLeft="castsInfo[cast.public_meeting_id].details.duration"
                    @closePostpone="closePostpone"
                    @post-closed="togglePostpone(cast.public_meeting_id, index)"/>
                </div>

                <div class="inner-child3">
                  <button v-if="cast.is_running === 'true'" class="live-btn">
                    Cast is live
                  </button>
                  <div class="inner-child4">
                    <button class="active" @click="toggleCopy(index)">
                      <img src="@/assets/images/dashboard/copy.svg" alt="" />
                    </button>
                    <div id="copy-pop" v-if="cast.showCopy">
                      <button id="copy-btn-1" @click="copy(cast.public_meeting_id, cast.h_ap)">
                        <img src="@/assets/images/co-host.svg" />
                        Copy Participant url
                      </button>
                      <br />
                      <button id="copy-btn-2">
                        <img src="@/assets/images/Participant.svg" />
                        Copy Co-host url
                      </button>
                    </div>
                    <button v-if="cast.is_running === 'false'" @click="joinNow(cast.public_meeting_id)" id="go-btn">
                      Go live now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <div v-if="recordingList.length">
            <div class="recordings flex justify-between items-center mb-4" v-for="(recording, index) in recordingList"
              :key="index">
              <div class="w-3/4 flex justify-between items-center">
                <p>
                  {{ recording.url['Start Time (Readable)'].split(' ')[0] }}
                </p>
                <p>{{ recording.room_name }}</p>
                <p>
                  {{
                    recording.url['Playback Data']['Playback Size'].split('.') +
                    ' ' +
                    recording.url['Playback Data']['Playback Size'].split(
                      ' '
                    )[1]
                  }}
                </p>
              </div>
              <button class="side-btn border-none">
                <img src="@/assets/images/Vector2.svg" class="h-7 p-2" alt="" />
              </button>
            </div>
          </div>
          <div v-else class="flex flex-col items-center justify-items-center">
            <img src="@/assets/images/dashboard/NoRecording.svg" class="w-1/2" />
            <img src="@/assets/images/dashboard/NoRecordingText1.svg" class="mb-3" />
            <img src="@/assets/images/dashboard/NoRecordingText.svg" />
          </div>
        </div>
      </div>
    </div>

    <div class="footer-content m-auto">
      <p>
        You can only create one cast per week in our free plan want to create
        more try our premium plan.
      </p>
    </div>
    <div class="popup" @click="closeAllPopups" v-if="create">
      <set-up-cast :getList="getCastList" :closeCreate="closeCreate"></set-up-cast>
    </div>
    <div class="popup" @click="closeAllPopups" v-if="stream">
      <stream-card :closeStream="() => (stream = false)"></stream-card>
    </div>
    <div class="popup" @click="closeAllPopups" v-if="invite">
      <invite-card :Id="meetingId" :invites="invites" :closeInvite="() => (invite = false)"></invite-card>
    </div>
  </div>
</template>
<script>
import moment from 'moment';
import SetUpCast from '../../../SetUpCasts/SetUpCast.vue';
import StreamCard from '../StreamCard.vue';
import InviteCard from '../InviteCard.vue';
import postPoneCast from '../postPoneCast.vue';
export default {
  components: { SetUpCast, StreamCard, InviteCard, postPoneCast },
  name: 'rightpart',
  data() {
    return {
      focusYourRooms: true,
      create: false,
      showCastIsLive: false,
      stream: false,
      invite: false,
      showPopup: false,
      showCopy: false,
      moment,
      casts: [],
      invites: [],
      recordingList: [],
      postPoneVisible: false,
      castInfo: {},
    };
  },
  mounted() {
    this.getCastList();
    this.getRecordings();
    window.addEventListener('click', this.handleGlobalClick);
  },
  beforeDestroy() {
    window.removeEventListener('click', this.handleGlobalClick);
  },
  computed: {
    totalImagesCount() {
      return this.casts.map((cast) => cast.images.length);
    },
  },
  methods: {
    closeAllPopups(e) {
      if (e.currentTarget === e.target) {
        this.create = false;
        this.stream = false;
        this.invite = false;
      }
    },
    handleGlobalClick(event) {
      const isOutsideRoomPopup = !event.target.closest('.cast-popup');
      const isNotTogglePopupButton = !event.target.closest('.k-btn');
      if (isOutsideRoomPopup && isNotTogglePopupButton && this.showPopup !== null) {
        this.showPopup = null;
      }
    },
    async getRecordings() {
      const res = await this.$store.dispatch('cast/recordingList');
      console.log(res.data);
      this.recordingList = res.data.recordings || [];
    },
    // getCastList() {
    //   this.$store.dispatch('cast/getUserCasts').then((res) => {
    //     this.casts = res.data.my_events;
    //   });
    // },

    closePostpone() {
      console.log('close');
      this.postPoneVisible = false;
      this.$emit('closePostpone');
    },
    changeFocus(toYourRooms) {
      this.focusYourRooms = toYourRooms;
    },
    copy(id, pass) {
      navigator.clipboard.writeText(
        'https://dev.stream.video.wiki/join-cast/' + id + '/?pass=' + pass
      );
    },
    async joinNow(id) {
      const data = {
        email: '',
        name: '',
        password: '',
        public_meeting_id: id,
        redirect: true,
        room_type: 'private',
        avatar_url: '',
        guest: false,
        attendee_password: '',
        meetingId: '',
      };
      try {
        const res = await this.$store.dispatch('cast/joinNow', data);
        window.location.href = res.url;
      } catch (e) {
        console.log('error', e);
      }
      console.log(id);
    },
    async getCastList() {
      const response = await this.$store.dispatch('cast/getUserCasts');
      const casts = response.data.my_events;

      const castInfoPromises = casts.map(async (cast) => {
        try {
          const castDetails = await this.$store.dispatch('cast/editEvent', cast.public_meeting_id);
          return { castId: cast.public_meeting_id, details: castDetails.data };
        } catch (error) {
          console.error(error);
          return null;
        }
      });
      const castInfoList = await Promise.all(castInfoPromises);
      const validCastInfoList = castInfoList.filter((info) => info !== null);
      const castsInfo = {};
      validCastInfoList.forEach((info) => {
        castsInfo[info.castId] = info.details;
      });
      this.castsInfo = castsInfo;
      this.casts = casts;
      console.log(castsInfo, "TTTT");
      console.log(casts, "pppp");
    },
    togglePostpone(id, index) {
      console.log(index)
      this.$set(this.casts[index], 'postPoneVisible', !this.casts[index].postPoneVisible);
    },
    togglePopup(index, id, inviteList) {
      console.log(id);
      this.meetingId = id;
      this.invites = inviteList;
      this.postPoneVisible = false;
      this.showPopup = this.showPopup === index ? null : index;
    },
    closePopup(index) {
      this.showPopup = null;
    },
    toggleCopy(index) {
      this.postPoneVisible = false;
      this.$set(this.casts[index], 'showCopy', !this.casts[index].showCopy);
    },
    async deleteCast(id, index) {
      console.log(id, index);
      const res = await this.$store.dispatch('cast/deleteCast', id);
      console.log(res);
      this.casts.splice(index, 1);
    },
    openCreate() {
      this.create = true;
    },
    closeCreate() {
      this.create = false;
    },
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
  width: 100%;
  /* max-width: 500px; */
  margin: auto;
  margin-left: 37px;
  /* border: 1px solid white; */
  height: 100%;
}

.active:active {
  border: 1px solid #d7df23;
}

.options-button {
  background: none;
  color: #a6a6a8;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
}

.heading-container {
  width: 270px;
}

.footer-content {
  text-align: center;
  margin-top: 40px !important;
  color: #d7df23;
  width: 350px;
  margin: auto;
}

.choose-room {
  margin-top: 20px;
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
  margin-left: 15px;
}

.focused-button {
  color: #d7df23;
  text-decoration: underline;
  text-underline-offset: 7px;
  text-decoration-thickness: 2px;
}

.options-container {
  height: 303px;
  overflow: auto;
  margin-top: 30px;
}

.options-container::-webkit-scrollbar {
  width: 5px;
}

.options-container::-webkit-scrollbar-thumb {
  background-color: #31394e;
  border-radius: 4px;
  height: 10px;
}

.images-container {
  width: 140px;
  height: 30px !important;
  padding: 0;
  margin: 0;
  overflow: hidden;
  /* border: 1px solid red; */
  z-index: 99;
  position: absolute;
  top: 70%;
}

.attendee {
  width: 27px;
  height: 27px;
  border-radius: 50%;
  border: 1px solid #31394e;
  margin-top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #31394e;
  /* position: absolute; */
}

.cast-popup {
  position: absolute;
  width: 150px;
  height: fit-content;
  background-color: #1f272f;
  border: 1px solid #31394e;
  color: #31394e;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  top: 30%;
  left: 60%;
  z-index: 99;
  padding: 10px;
  margin: auto;
  text-align: left;
}

.cast-popup button {
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

.cast-popup button img {
  width: 10px;
  height: 10px;
  margin: auto;
}

#copy-pop {
  position: absolute;
  z-index: 999;
  background-color: #1f272f;
  width: 140px;
  border: 1px solid #31394e;
  border-radius: 6px;
  top: 35px;
  height: 60px;
  margin: 0 !important;
  padding: 0 !important;
}

#copy-btn-2 {
  margin-top: -21px;
}

#copy-pop button {
  background: transparent !important;
  font-size: 11px !important;
  display: flex;
  text-align: left;
  gap: 8px;
  border: none;
  outline: none;
  width: 140px !important;
  height: 30px;
  padding: 6px !important;
  font-family: 'Karla', sans-serif;
  color: #a6a6a8;
}

#copy-pop button img {
  width: 15px;
  height: 15px;
}

.child-options {
  max-width: 480px;
  width: 97%;
  height: 140px;
  display: flex;
  justify-content: space-between;
  border: 1px solid #31394e;
  background-color: #1f272f;
  color: #a6a6a8;
  border-radius: 6px;
  padding: 10px;
  margin-bottom: 30px;
  position: relative;
}

.inner-div1 {
  width: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100px;
  /* border: 1px solid green; */
}

.inner-child1 button {
  margin-top: 5px;
  background-color: #31394e85;
  padding: 5px;
  font-size: 12px;
  border-radius: 6px;
  border: none;
  color: #a6a6a8;
  cursor: pointer;
}

.inner-child2 {
  gap: 5px;
}

.inner-child2 div {
  max-width: 180px;
  overflow: hidden;
  height: 50px;
  gap: 5px;
}

.invite-text {
  text-decoration: underline;
  color: #a6a6a8;
  font-size: 12px;
  cursor: pointer;
}

.inner-div2 {
  width: max-content;
  justify-content: right;
  text-align: right;
  /* border: 1px solid yellow; */
}

.inner-div2 button {
  background: none;
  border: none;
  align-items: right;
  cursor: pointer;
}

.inner-child3 {
  position: relative;
  width: 156px;
}

.inner-child3 button {
  background-color: #f84330;
  border-radius: 6px;
  color: #ffffff;
  padding: 5px;
  height: 33px;
  width: 115px;
}

.live-btn {
  z-index: 999;
  margin-top: 40px;
}

.inner-child4 {
  display: flex;
  gap: 8px;
  margin-top: 5px;
  z-index: 5;
  position: absolute;
  top: 35px !important;
  /* left: 20px; */
}

.inner-child4 button:nth-child(1) {
  background: none;
  border: 1px solid #31394e;
  width: 33px;
  height: 33px;
}

#go-btn {
  background-color: #d7df23 !important;
  color: #31394e;
}

.popup {
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-content: center;
  position: absolute;
  top: 0;
  left: 0;
  background: #0000007e;
  z-index: 100;
}

.post-time {
  position: fixed !important;
  z-index: 1000 !important;
  margin: auto !important;
  left: 40%;
  top: 10%;
  overflow: visible;
}
</style>
