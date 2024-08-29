<template>
  <div class="reg-main flex flex-col justify-start items-center pt-8 p-4 pb-32 gap-8">
    <div class="parent_2 flex w-full max-w-6xl bg-white h-10 flex justify-between items-center pl-8 pr-8">
      <div>
        <div class="basic_child_2 bg-dark-black w-32 h-4"></div>
      </div>
      <div class="flex gap-4 items-center justify-center">
        <div class="basic_child_3 lg:block block hidden bg-dark-black w-32 h-4"></div>
        <div class="basic_child_4 bg-dark-black w-16 h-4"></div>
      </div>
    </div>
    <div
      class="reg-main-wrapper flex lg:flex-row flex-col flex-col justify-between gap-16 items-center max-w-6xl w-full m-auto">
      <div class="reg-left flex-col flex items-start justify-start gap-12 w-full">
        <img class="w-auto lg:h-16 h-12" src="@/assets/images/decast-logo.svg" />
        <h1 class="lg:text-5xl text-3xl font-bold text-white">{{ eventName }}</h1>
        <h3 class="text-blue-500 text-xl font-semibold">By: {{ eventCreator }}</h3>
        <p class="text-lg text-neutral-100">{{ eventDescription }}</p>
      </div>
      <div class="reg-basic_right_ flex items-center lg:justify-end justify-center w-full">
        <div class="right-blur flex flex-col gap-8 p-8 pb-16 relative">
          <span v-if="this.meeting_running">
            <h2 class="text-white lg:text-4xl text-3xl font-bold">Your cast is</h2>
            <h2 class="text-white lg:text-4xl text-3xl font-bold">Live</h2>
          </span>
          <span v-else-if="this.event_not_started">
            <h2 class="text-white lg:text-4xl text-3xl font-bold">Your cast has</h2>
            <h2 class="text-white lg:text-4xl text-3xl font-bold">Not started yet</h2>
          </span>
          <span v-else>
            <h2 class="text-white lg:text-4xl text-3xl font-bold">Your cast will</h2>
            <h2 class="text-white lg:text-4xl text-3xl font-bold">Be Live in</h2>
          </span>
          <div>
            <div class="join-page-details w-full">
              <p v-if="this.meeting_running" style="color: #6ce733" class="flex flex-wrap items-center">
                <vs-icon icon-pack="feather" icon="icon-radio" size="18px" rounded="true" color="#6CE733 "
                  style="align-self: flex-end; line-height: 0.4" class="mr-2"></vs-icon>
                Event is Live
              </p>
              <p v-else-if="this.isExpired" style="color: #fa3f3f">
                Event Ended
                {{ moment(eventDate).fromNow() }}
              </p>
              <p v-else-if="this.event_not_started" style="color: #6ce733">
                Event will start soon!
              </p>
              <vue-countdown-timer :start-time="`${startDate}`" :end-time="`${eventDate}`" @start_callback="timeStart()"
                @end_callback="timeUp()" :interval="1000" label-position="begin" :end-text="''" :day-txt="'days'"
                :hour-txt="'hours'" :minutes-txt="'minutes'" :seconds-txt="'seconds'"
                class="timerWrapper flex lg:gap-16 gap-8 w-full items-center justify-center">
                <template slot="countdown" slot-scope="scope">
                  <span
                    class="dtm bg-white flex flex-col lg:w-24 w-16 h-auto pl-4 pr-4 pt-2 pb-2 items-center justify-center gap-2 text-black">
                    <p class="p lg:text-4xl text-3xl font-bold">{{ scope.props.days }}</p>
                    <div class="cnt text-black font-semibold">Days</div>
                  </span>
                  <span
                    class="dtm bg-white flex flex-col lg:w-24 w-16 h-auto pl-4 pr-4 pt-2 pb-2 items-center justify-center gap-2 text-black">
                    <p class="p lg:text-4xl text-3xl font-bold">{{ scope.props.hours }}</p>
                    <div class="cnt text-black font-semibold">HRS</div>
                  </span>
                  <span
                    class="dtm bg-white flex flex-col lg:w-24 w-16 h-auto pl-4 pr-4 pt-2 pb-2 items-center justify-center gap-2 text-black">
                    <p class="p lg:text-4xl text-3xl font-bold">{{ scope.props.minutes }}</p>
                    <div class="cnt text-black font-semibold">MIN</div>
                  </span>
                  <span
                    class="dtm bg-white flex flex-col lg:w-24 w-16 h-auto pl-4 pr-4 pt-2 pb-2 items-center justify-center gap-2 text-black">
                    <p class="p lg:text-4xl text-3xl font-bold">{{ scope.props.seconds }}</p>
                    <div class="cnt text-black font-semibold">SEC</div>
                  </span>
                </template>
              </vue-countdown-timer>
            </div>
          </div>
          <p class="text-white lg:text-2xl text:xl">
            You can close this page and come back later or refresh when the time
            runs out
          </p>
          <button class="regButton lg:pl-32 pl-24 pr-32 pt-4 pb-4 flex justify-center items-center gap-4"
            @click="onCloseClick">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M12 8V16" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M8 12H16" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

            Register
          </button>
        </div>
      </div>
    </div>
    <div v-if="this.isFrameOpen" class="regFrame max-w-6xl">
      <button @click="onCloseClick">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 6.00098L6 18.001" stroke="#ffffff" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round" />
          <path d="M6 6.00098L18 18.001" stroke="#ffffff" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round" />
        </svg>
      </button>
      <iframe :src="url" title="Registration"></iframe>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import constants from '../../../../constant';
var moment = require('moment');

export default {
  name: 'EventRegister',
  data() {
    return {
      eventName: '',
      eventCreator: '',
      eventDescription: '',
      eventDate: new Date().getTime() + 5000,
      startDate: '',
      eventCreatorEmail: '',
      isFrameOpen: false,
      meeting_running: false,
      isExpired: false,
      moment: moment,
      event_not_started: false,
      url: '',
    };
  },
  methods: {
    onCloseClick() {
      this.isFrameOpen = !this.isFrameOpen;
    },
    timeUp() {
      this.event_not_started = true;
    },
    timeStart() {
      this.event_not_started = false;
    },
  },
  mounted() {
    if (this.$route.params.cast_Id === 'vw.svg') {
      return;
    }
    this.$vs.loading();
    axios({
      method: 'GET',
      url: `${constants.apiCastUrl}/api/event/meeting/info/?public_meeting_id=${this.$route.params.cast_Id}`,
    }).then((res) => {
      this.eventName = res.data.meeting_info.event_name;
      this.eventDescription = res.data.meeting_info.description;
      this.eventCreatorEmail = res.data.meeting_info.event_creator_email;
      this.eventCreator = res.data.meeting_info.event_creator_name;
      this.meeting_running = res.data.meeting_info.running;
      this.isExpired = res.data.meeting_info.expired;
      this.url = `https://gtbrdd.typeform.com/decast#event_name=${encodeURI(
        this.eventName
      )}&creater_email=${this.eventCreatorEmail}`;
      var timeRemaining = moment
        .utc(this.event_date + ' ' + this.event_time, moment.defaultFormat)
        .fromNow();
      if (timeRemaining.endsWith('ago') && this.isExpired !== true) {
        this.event_not_started = true;
      }

      this.eventDate = moment
        .utc(
          res.data.meeting_info.date + ', ' + res.data.meeting_info.time,
          'YYYY-MM-DD, HH:mm:ss'
        )
        .local()
        .format('YYYY-MM-DD HH:mm:ss');
      this.startDate = moment.utc().format('yyyy-MM-DD HH:mm:ss');
      this.$vs.loading.close();
    });
  },
};
</script>

<style scoped>
* {
  font-family: 'JetBrains Mono', monospace !important;
}

.reg-main {
  background: url('./images/Registration.svg');
  background-repeat: no-repeat;
  background-size: cover;
  /* background-position: center;  */
  min-height: 100vh;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
}

.right-blur {
  max-width: 600px;
  width: 98%;
  backdrop-filter: blur(4px);
  background: hsla(0, 0%, 100%, .2);
}

.regButton {
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
}

.regFrame {
  position: absolute;
  width: 85%;
  height: 80%;
}

.regFrame iframe {
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 10px;
}

.regFrame button {
  position: absolute;
  right: -20px;
  top: -20px;
  outline: none;
  border: none;
  background: none;
  cursor: pointer;
}
</style>
