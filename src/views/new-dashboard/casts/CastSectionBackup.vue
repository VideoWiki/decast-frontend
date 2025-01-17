<template>
  <div class="basic_details_cont w-full p-4 px-6 flex flex-col gap-6 justify-start">
    <div class="flex justify-between">
      <div class="text-white">
        <p class="font-bold text-2xl">//Casts</p>
        <p>Host large audience social events.</p>
      </div>

      <div class="cursor-pointer">
        <vx-tooltip text="/ Create Cast" position="left">
          <img src="@/assets/images/pixel_create.svg" @click="setActiveModal('createCastModal')" />
        </vx-tooltip>
      </div>
    </div>

    <CreateCastModal v-if="activeModal === 'createCastModal'" :closeModal="() => setActiveModal('')"
      :createCast="createCast" :stepOneProps="stepOneProps" :stepTwoProps="stepTwoProps" :getCastList="getCastList"/>

    <div class="flex flex-row gap-12 w-full">
      <div class="flex flex-col gap-6 w-1/2">
        <div class="choose-room">
          <button class="options-button border-none" @click="changeFocus(true)"
            :class="{ 'focused-button': focusYourRooms }">
            /upcoming casts
          </button>
          <button class="options-button border-none px-5" @click="handleButtonClick"
            :class="{ 'focused-button': !focusYourRooms }">
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
              <CastCard :streamInfo="streamInfo" :castsInfo="castsInfo" :cast="cast" :index="index"
                :getCastList="getCastList" @card-click="handleCardClick"/>
            </div>
          </div>
        </div>
      </div>
      <div class="cast_details w-1/2 p-5">
        <CastDetails :selectedCastId="selectedCastId"/>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment-timezone';
import CastCard from './components/CastCard.vue';
import CastCardShimmer from './components/CastCardShimmer.vue';
import CreateCastModal from './components/CreateCastModal.vue';
import CastDetails from './components/CastDetails.vue';
export default {
  name: 'CastSection',
  data() {
    return {
      activeModal: '',
      focusYourRooms: true,
      isCastsLoading: false,
      showCastIsLive: false,
      index: '',
      moment,
      casts: [],
      castsInfo: [],
      castInfo: {},
      streamInfo: {},
      isStream: false,
      viewer: false,
      selectedCastId: null,
      formData: new FormData(),
      stepOneProps: {
        mint_function_name: '',
        mintfnc_name_error: false,
        contract_address: '',
        contract_address_error: false,
        aib: '',
        aib_error: false,
        parameter: '',
        parameter_error: false,
        network: '',
        audienceAirdrop: true,
        give_vc: false,
        airdropType: 'NFTs',
        price: '',
        price_error: false,
        nft_description: '',
        nft_description_error: false,
        nft_image: '',
        data_token: false,
        nft_image_error: false,
        password_auth: false,
        auth_type: 'public',
        meeting_auth_error: false,
        send_otp: false,
        public_auth: false, // Changed from the first object's 'true' to the second object's 'false'
        public_otp: false,
        give_nft: false,
        public_stream_nfts: 'true',
        public_nft_flow: false,
        nft_t_ype: 'NFTs', // Appears only in the first object, I'll keep it here
        nft_type: 'NFTs', // Appears only in the first object, I'll keep it here
        generated_event_title: '',
        event_name: '',
        invalidTimeError: false,
        moderator_password: '',
        attendee_password: '',
        meeting_type: 'public',
        schedule_time: '',
        description: '',
        max_participant: 100,
        short_description: '',
        hide_users: false,
        event_name_error: false,
        moderator_password_error: false,
        attendee_password_error: false,
        viewer_password_error: false,
        description_error: false,
        description_length_error: false,
        schedule_time_error: false,
        meeting_type_error: false,
        event_name_length_error: false,
        start_now: false,
        startTime: '0:00:00',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        timeZoneList: [],
        event_tag: ['videowiki'],
        startD: moment().format('YYYY-MM-DD'),
      },
      stepTwoProps: {
        BackImageURL: '',
        imageURL: '',
        primary_color: '#D7DF23',
        secondary_color: '',
        logo: '',
        back_image: '',
        cover_image: '',
        cover_image_error: false,
        back_image_error: false,
        banner_text: '',
        moderator_only_text: 'You are a Moderator, you can control who presents and participates in the live cast',
        guest_policy: '',
        welcome_text: '',
        showText: true,
        duration: '60',
        logout_url: 'https://decast.live/dashboard',
      },
      stepThreeProps: {
        vw_stream: false,
        vw_stream_url: [{ vw_stream: '' }, { urls: [] }],
        is_streaming: false,
        public_stream: true,
      },
      stepFourProps: {
        start_stop_recording: true,
        record: true,
        mute_on_start: true,
        end_when_no_moderator: true,
        allow_moderator_to_unmute_user: false,
        webcam_only_for_moderator: false,
        auto_start_recording: false,
        allow_start_stop_recording: false,
        disable_cam: false,
        disable_mic: false,
        lock_layout: true,
        lock_on_join: false,
        viewer_mode: false,
        viewer_password: false,
        listen_only_mode: true,
        webcam_enable: false,
        screen_sharing: true,
        restrict_participants: false,
        meeting_settings: false,
        checkBox: '',
      },
    };
  },
  components: {
    CastCard,
    CastCardShimmer,
    CreateCastModal,
    CastDetails,
  },
  mounted() {
    this.getCastList();
  },
  computed: {
    totalImagesCount() {
      return this.casts.map((cast) => cast.images.length);
    },
  },
  methods: {
    handleCardClick(details) {
      this.selectedCastId = details;
    },
    validateFormOne() {
      if (
        this.stepOneProps.event_name === '' ||
        this.stepOneProps.description === '' ||
        (this.stepOneProps.audienceAirdrop &&
          this.stepOneProps.airdropType === 'NFTs' &&
          (this.stepOneProps.mint_function_name === '' ||
            this.stepOneProps.contract_address === '' ||
            this.stepOneProps.aib === '' ||
            this.stepOneProps.nft_description === '' ||
            this.stepOneProps.nft_image === '')) ||
        (this.stepOneProps.auth_type === 'private' &&
          this.stepOneProps.send_otp === false &&
          this.stepOneProps.password_auth === false) ||
        (!this.stepOneProps.start_now &&
          this.stepOneProps.schedule_time_error) ||
        this.stepOneProps.invalidTimeError
      ) {
        this.stepOneProps.event_name_error =
          this.stepOneProps.event_name === '';
        this.stepOneProps.description_error =
          this.stepOneProps.description === '';

        if (
          this.stepOneProps.audienceAirdrop &&
          this.stepOneProps.airdropType === 'NFTs'
        ) {
          this.stepOneProps.mintfnc_name_error =
            this.stepOneProps.mint_function_name === '';
          this.stepOneProps.contract_address_error =
            this.stepOneProps.contract_address === '';
          this.stepOneProps.aib_error = this.stepOneProps.aib === '';
          this.stepOneProps.nft_image_error =
            this.stepOneProps.nft_image === '';
          this.stepOneProps.nft_description_error =
            this.stepOneProps.nft_description === '';
        }

        if (
          this.stepOneProps.auth_type === 'private' &&
          this.stepOneProps.send_otp === false &&
          this.stepOneProps.password_auth === false
        ) {
          this.stepOneProps.meeting_auth_error = true;
          // Here, adjust stepOneProps based on the 'private' auth_type
          this.stepOneProps.moderator_password = '';
          // Add more properties to reset as necessary
        }

        this.stepOneProps.public_nft_flow =
          this.stepOneProps.public_stream_nfts === 'true';
        this.stepOneProps.meeting_type = this.stepOneProps.auth_type;
        return false;
      } else {
        this.stepOneProps.meeting_type = this.stepOneProps.auth_type;
        this.stepOneProps.public_nft_flow =
          this.stepOneProps.public_stream_nfts === 'true';
        window.scroll(0, 0);
        localStorage.setItem('Step1', JSON.stringify(this.stepOneProps));
        return true;
      }
    },
    setCreateEventData() {
      // console.log('12');
      this.startNow = this.stepOneProps.start_now;
      for (let [key, value] of Object.entries(this.stepOneProps)) {
        if (value.length === 0) {
          value = '';
        } else {
          if (value === false) {
            value = 'False';
          } else if (value === true) {
            value = 'True';
          } else if (value === '') {
            value = '';
          }
        }
        this.formData.append(key, value);
      }
      // console.log('123');
      this.stepTwoProps.imageURL = '';
      this.stepTwoProps.BackImageURL = '';
      for (let [key, value] of Object.entries(this.stepTwoProps)) {
        if (value.length === 0) {
          value = '';
        } else {
          if (value === false) {
            value = 'False';
          } else if (value === true) {
            value = 'True';
          } else if (value === '') {
            value = '';
          }
        }
        this.formData.append(key, value);
      }
      // console.log('1234');
      for (let [key, value] of Object.entries(this.stepThreeProps)) {
        if (value.length === 0) {
          value = '';
        } else {
          if (value === false) {
            value = 'False';
          } else if (value === true) {
            value = 'True';
          } else if (value === '') {
            value = '';
          }
        }
        this.formData.append(key, value);
      }
      for (let [key, value] of Object.entries(this.stepFourProps)) {
        // console.log(value);

        if (value.length === 0) {
          value = '';
        } else {
          if (value === false) {
            value = 'False';
          } else if (value === true) {
            value = 'True';
          } else if (value === '') {
            value = '';
          }
        }
        this.formData.append(key, value);
      }
    },
    formSubmitted() {
      // console.log(
      //   this.stepFourProps.record,
      //   this.stepFourProps.start_stop_recording,
      //   this.stepOneProps
      // );
      this.stepFourProps.start_stop_recording = this.stepFourProps.record;
      this.stepFourProps.allow_start_stop_recording = this.stepFourProps.record;
      this.stepOneProps.schedule_time =
        this.stepOneProps.startD + ' ' + this.stepOneProps.startTime;
      if (moment().isAfter(this.stepOneProps.schedule_time)) {
        const fiveMin = moment().add(5, 'minutes');
        this.stepOneProps.schedule_time =
          `${fiveMin._d.getFullYear()}-${String(
            fiveMin._d.getMonth() + 1
          ).padStart(2, '0')}-${String(fiveMin._d.getDate()).padStart(
            2,
            '0'
          )}` +
          ' ' +
          fiveMin._d.getHours() +
          ':' +
          fiveMin._d.getMinutes() +
          ':00';
      }
      this.setCreateEventData();
      this.$vs.loading();
      return this.$store
        .dispatch('cast/submitForm', this.formData)
        .then(async (response) => {
          await this.getCastList();
          this.status = 'success';
          this.$vs.loading.close();
          this.responsedata = response.data.message;
          this.$vs.notify({
            title: 'Success',
            text: response.data.message,
            color: 'success',
          });
          this.status = 'success';
          this.castId = response.data.meeting_id;
          return
        })
        .catch((error) => {
          this.$vs.loading.close();
          this.formData = new FormData();

          if (error) {
            this.$vs.notify({
              title: 'Error!',
              text: error.response.data.message,
              color: 'danger',
            });
          } else {
            this.$vs.notify({
              title: 'Fields Missing!',
              text: 'Some Fields are Missing',
              color: 'danger',
            });
          }
        });
    },
    createCast() {
      if (this.validateFormOne) {
        return this.formSubmitted();
      }
    },
    setActiveModal(modalName) {
      this.activeModal = modalName;
    },
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
    // setProps(id) {
    //   const details = this.castsInfo[id].details;
    //   console.log('details', details);
    //   this.stepOneProps = {
    //     event_name: details.event_name,
    //     moderator_password: '',
    //     attendee_password: '',
    //     meeting_type: '',
    //     schedule_time: details.schedule_time,
    //     description: details.description,
    //     startTime: '0:00:00',
    //     timezone: details.timezone,
    //     startD: moment().format('YYYY-MM-DD'),
    //     password_auth: details.password_auth,
    //     auth_type: details.cast_type,
    //     send_otp: details.otp_private,
    //     public_auth: false,
    //     public_otp: details.collect_attendee_email,
    //   };
    //   this.stepTwoProps = {
    //     BackImageURL: '',
    //     imageURL: '',
    //     primary_color: details.primary_color,
    //     secondary_color: '',
    //     logo: details.logo,
    //     back_image: '',
    //     cover_image: details.cover_image,
    //     cover_image_error: false,
    //     back_image_error: false,
    //     banner_text: details.banner_text,
    //     moderator_only_text:
    //       'You are a Moderator, you can control who presents and participates in the live cast',
    //     guest_policy: details.guest_policy,
    //     welcome_text: details.welcome_text,
    //     showText: true,
    //     duration: details.duration,
    //     logout_url: details.logout_url,
    //   };
    //   this.stepThreeProps = {
    //     vw_stream: false,
    //     vw_stream_url: details.bbb_stream_url,
    //     is_streaming: details.is_streaming,
    //     public_stream: details.public_stream,
    //   };
    //   this.stepFourProps = {
    //     start_stop_recording: details.record,
    //     record: details.record,
    //     mute_on_start: details.mute_on_start,
    //     end_when_no_moderator: details.end_when_no_moderator,
    //     allow_moderator_to_unmute_user: details.allow_moderator_to_unmute_user,
    //     webcam_only_for_moderator: details.webcam_only_for_moderator,
    //     auto_start_recording: details.auto_start_recording,
    //     allow_start_stop_recording: details.record,
    //     disable_cam: details.disable_cam,
    //     disable_mic: details.disable_mic,
    //     lock_layout: details.lock_layout,
    //     lock_on_join: false,
    //     viewer_mode: details.viewer_mode,
    //     viewer_password: false,
    //     listen_only_mode: true,
    //     webcam_enable: false,
    //     screen_sharing: true,
    //     restrict_participants: false,
    //     meeting_settings: false,
    //   };
    // },
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
      // console.log("castInfoPromises", casts, streamInfoList, castInfoList)
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

.cast_list_cont {
  overflow: scroll !important;
  height: 45vh;
}

.cast_list_cont::-webkit-scrollbar {
  display: none;
}
</style>
