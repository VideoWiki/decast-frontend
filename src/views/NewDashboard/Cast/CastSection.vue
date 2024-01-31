<template>
  <div
    class="basic_details_cont w-full p-4 px-6 flex flex-col gap-6 justify-start"
  >
    <div class="flex justify-between">
      <div class="text-white">
        <p class="font-bold text-2xl">//Casts</p>
        <p>Host large audience social events.</p>
      </div>

      <div class="cursor-pointer">
        <vx-tooltip text="/ Create Casts" position="left">
          <img src="@/assets/images/pixel_create.svg" />
        </vx-tooltip>
      </div>
    </div>

    <div class="flex flex-row gap-12 w-full">
      <div class="flex flex-col gap-6 w-1/2">
        <div class="choose-room">
          <button
            class="options-button border-none"
            @click="changeFocus(true)"
            :class="{ 'focused-button': focusYourRooms }"
          >
            /upcoming casts
          </button>
          <button
            class="options-button border-none px-5"
            @click="handleButtonClick"
            :class="{ 'focused-button': !focusYourRooms }"
          >
            /past casts
          </button>
        </div>

        <div class="flex flex-col gap-4">
          <div class="cast_list_cont" v-if="focusYourRooms">
            <div v-if="isCastsLoading">
              <CastCardShimmer />
              <CastCardShimmer :style="{ opacity: 0.6 }" />
            </div>
            <div v-else v-for="(cast, index) in casts" :key="index">
              <CastCard
                :streamInfo="streamInfo"
                :castsInfo="castsInfo"
                :cast="cast"
                :index="index"
                :setProps="setProps"
                :stepOneProps="stepOneProps"
                :stepTwoProps="stepTwoProps"
                :stepThreeProps="stepThreeProps"
                :stepFourProps="stepFourProps"
                :getCastList="getCastList"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="cast_details w-1/2 p-5">
        <div
          class="cast_header flex justify-between items-center w-full h-16 px-4 py-2"
        >
          <p class="text-xl font-bold">/cast.details</p>
          <p class="text-red font-bold">
            <span class="font-bold text-4xl">.</span> LIVE
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment-timezone';
import CastCard from './components/CastCard.vue';
import CastCardShimmer from './components/CastCardShimmer.vue';
export default {
  name: 'CastSection',
  data() {
    return {
      focusYourRooms: true,
      isCastsLoading: false,
      showCastIsLive: false,
      index: '',
      stepFourProps: {},
      stepOneProps: {},
      stepTwoProps: {},
      stepThreeProps: {},
      moment,
      casts: [],
      castsInfo: [],
      castInfo: {},
      streamInfo: {},
      isStream: false,
      viewer: false,
    };
  },
  components: {
    CastCard,
    CastCardShimmer,
  },
  mounted() {
    this.getCastList();
  },
  computed:{
    totalImagesCount() {
      return this.casts.map((cast) => cast.images.length);
    },
  },
  methods: {
    changeFocus(toYourRooms) {
      this.focusYourRooms = toYourRooms;
    },
    async handleButtonClick() {
      this.changeFocus(false);
    },
    NewTime(date, time) {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const a = moment(date + ' ' + time)
        .clone()
        .tz(timezone);
      // var timeAbbr = moment().tz(timezone).zoneAbbr();
      var newTime = moment(a._d).tz(timezone).format('h:mm A');
      return newTime;
    },
    calculateRemainingTime(cast) {
      const eventDateTime = moment.utc(cast.event_date + ' ' + cast.event_time);
      const currentTime = moment();
      const duration = moment.duration(eventDateTime.diff(currentTime));
      const hours = Math.floor(duration.asHours());
      const minutes = moment.utc(duration.asMilliseconds()).format('mm');
      if (hours === 0) {
        return `${minutes}`;
      }
    },
    showRemainingTime(cast) {
      const eventDateTime = moment.utc(cast.event_date + ' ' + cast.event_time);
      const currentTime = moment();
      return eventDateTime.isAfter(currentTime);
    },
    updateRemainingTime() {
      setInterval(() => {
        this.$forceUpdate();
      }, 1000);
    },
    truncateText(text, maxLength) {
      if (text.length > maxLength) {
        return text.slice(0, maxLength) + '...';
      } else {
        return text;
      }
    },
    setProps(id) {
      const details = this.castsInfo[id].details;
      console.log('details', details);
      this.stepOneProps = {
        event_name: details.event_name,
        moderator_password: '',
        attendee_password: '',
        meeting_type: '',
        schedule_time: details.schedule_time,
        description: details.description,
        startTime: '0:00:00',
        timezone: details.timezone,
        startD: moment().format('YYYY-MM-DD'),
        password_auth: details.password_auth,
        auth_type: details.cast_type,
        send_otp: details.otp_private,
        public_auth: false,
        public_otp: details.collect_attendee_email,
      };
      this.stepTwoProps = {
        BackImageURL: '',
        imageURL: '',
        primary_color: details.primary_color,
        secondary_color: '',
        logo: details.logo,
        back_image: '',
        cover_image: details.cover_image,
        cover_image_error: false,
        back_image_error: false,
        banner_text: details.banner_text,
        moderator_only_text:
          'You are a Moderator, you can control who presents and participates in the live cast',
        guest_policy: details.guest_policy,
        welcome_text: details.welcome_text,
        showText: true,
        duration: details.duration,
        logout_url: details.logout_url,
      };
      this.stepThreeProps = {
        vw_stream: false,
        vw_stream_url: details.bbb_stream_url,
        is_streaming: details.is_streaming,
        public_stream: details.public_stream,
      };
      this.stepFourProps = {
        start_stop_recording: details.record,
        record: details.record,
        mute_on_start: details.mute_on_start,
        end_when_no_moderator: details.end_when_no_moderator,
        allow_moderator_to_unmute_user: details.allow_moderator_to_unmute_user,
        webcam_only_for_moderator: details.webcam_only_for_moderator,
        auto_start_recording: details.auto_start_recording,
        allow_start_stop_recording: details.record,
        disable_cam: details.disable_cam,
        disable_mic: details.disable_mic,
        lock_layout: details.lock_layout,
        lock_on_join: false,
        viewer_mode: details.viewer_mode,
        viewer_password: false,
        listen_only_mode: true,
        webcam_enable: false,
        screen_sharing: true,
        restrict_participants: false,
        meeting_settings: false,
      };
    },
    async getCastList() {
      this.isCastsLoading = true;
      const response = await this.$store.dispatch('cast/getUserCasts');
      let casts = response.data.my_events;
      casts = casts.sort((a, b) => b.event_id - a.event_id);
      const castInfoPromises = casts.map(async (cast) => {
        try {
          const castDetails = await this.$store.dispatch(
            'cast/editEvent',
            cast.public_meeting_id
          );
          return { castId: cast.public_meeting_id, details: castDetails.data };
        } catch (error) {
          console.error(error);
          return null;
        }
      });

      const streamInfoPromise = casts.map(async (cast) => {
        try {
          const castDetails = await this.$store.dispatch(
            'auth/eventDetail',
            cast.public_meeting_id
          );
          return {
            castId: cast.public_meeting_id,
            details: castDetails.data.meeting_info,
          };
        } catch (error) {
          console.log(error);
        }
      });
      const streamInfoList = await Promise.all(streamInfoPromise);
      const castInfoList = await Promise.all(castInfoPromises);
      const validCastInfoList = castInfoList.filter((info) => info !== null);
      const validStreamInfo = streamInfoList.filter((info) => info !== null);
      const castsInfo = {};
      const streamInfo = {};
      validCastInfoList.forEach((info) => {
        castsInfo[info.castId] = info.details;
      });
      validStreamInfo.forEach((info) => {
        if (info.details.stream_urls !== null)
          streamInfo[info.castId] = info.details;
      });
      this.streamInfo = streamInfo;
      this.castsInfo = castsInfo;
      this.casts = casts;
      this.isCastsLoading = false;
      console.log(streamInfo, 'streamInfo');
    },
    toggleCopy(index) {
      this.showCopy = this.showCopy === index ? null : index;
      console.log(index, 'copy');
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

.cast_details {
  border: 2px solid #272727;
  box-shadow: 3px 3px 0px 0px #272727;
  height: 53vh;
}

.cast_header {
  background-color: #272727;
}
.cast_list_cont{
  overflow: scroll !important;
  height: 45vh;
}

.cast_list_cont::-webkit-scrollbar{
  display: none;
}
</style>
