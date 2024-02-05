<template>
  <div>
    <CastCardShimmer v-if="isLoading" />
    <div v-else class="cast_list flex flex-col justify-between items-center mb-4 w-full py-1 px-4 pb-3"
      @click="handleCardClick">
      <div class="inner-child1 flex flex-row w-full justify-between items-center">
        <p class="font-semibold text-lg flex items-center gap-4">{{ castDetails.event_name }}
          <span class="text-red-500 text-sm flex items-center gap-2" v-if="castDetails.is_running === 'true'"><span
              class="basic_live_dot_ rounded-full"></span>LIVE</span>
        </p>
        <div class="inner-div2 flex justify-between items-center">
          <vs-button class="custm-style" @click="setActiveModal('castOptionsModal')">
            <img src="@/assets/images/menu.svg" />
          </vs-button>

          <SimpleMenu :menuList="castCopyMenuItems">
            <template #menuButton>
              <vs-button class="custm-style">
                <img src="@/assets/images/copy.svg" />
              </vs-button>
            </template>
          </SimpleMenu>
          <vs-button class="custm-style">
            <img v-if="isCastStart" src="@/assets/images/end.svg" />
            <img v-if="castDetails.is_running === 'false' && !isCastStart" @click="joinNow(castDetails.public_meeting_id)"
              src="@/assets/images/start.svg" />
            <img v-if="castDetails.is_running === 'true'" src="@/assets/images/end.svg" />
          </vs-button>
        </div>
      </div>

      <div class="text-left w-full">
        <span class="basic_date_btn_ text-white text-md">
          {{
            moment(castDetails.event_date).format('DD MMM') +
            ' ' +
            NewTime(castDetails.event_date, castDetails.event_time)
          }}
        </span>
      </div>

      <div v-if="castDetails.stream_urls" class="mt-6 flex flex-col justify-between gap-4 w-full">
        <p class="text-left font-semibold">Live Casting :</p>
        <div v-if="hasDecastStream"
          class="basic_stream_div_ flex flex-row justify-between items-center gap-12 w-full py-1 px-2">
          <div>https://decast.live/live</div>
          <div class="flex gap-2 justify-center items-center">
            <vs-button class="custm-style">
              <img src="@/assets/images/copy.svg" />
            </vs-button>
            <div class="basic_stream_btn_cont_">
              <vx-tooltip v-if="castDetails.stream_status" text="Pause Stream" position="bottom">
                <vs-button class="custm-style" @click="toggleStream(castDetails.public_meeting_id, 'pause')">
                  <img src="@/assets/images/pause_stream.svg" alt="" />
                </vs-button>
              </vx-tooltip>
              <vx-tooltip v-else text="Start Stream" position="bottom">
                <vs-button class="custm-style" @click="toggleStream(castDetails.public_meeting_id, 'start')">
                  <img src="@/assets/images/start_stream.svg" alt="" />
                </vs-button>
              </vx-tooltip>
            </div>
          </div>
        </div>
        <div v-if="hasTwitchStream"
          class="basic_stream_div_ flex flex-row justify-between items-center gap-12 w-full py-1 px-2">
          <div>www.twitch.tv</div>
          <div class="flex gap-2 justify-center items-center">
            <vs-button class="custm-style">
              <img src="@/assets/images/copy.svg" />
            </vs-button>
            <div class="basic_stream_btn_cont_">
              <vx-tooltip v-if="castDetails.stream_status" text="Pause Stream" position="bottom">
                <vs-button class="custm-style" @click="toggleStream(castDetails.public_meeting_id, 'pause')">
                  <img src="@/assets/images/pause_stream.svg" alt="" />
                </vs-button>
              </vx-tooltip>
              <vx-tooltip v-else text="Start Stream" position="bottom">
                <vs-button class="custm-style" @click="toggleStream(castDetails.public_meeting_id, 'start')">
                  <img src="@/assets/images/start_stream.svg" alt="" />
                </vs-button>
              </vx-tooltip>
            </div>
          </div>
        </div>
        <div v-if="hasYoutubeStream"
          class="basic_stream_div_ flex flex-row justify-between items-center gap-12 w-full py-1 px-2">
          <div>www.youtube.com</div>
          <div class="flex gap-2 justify-center items-center">
            <vs-button class="custm-style">
              <img src="@/assets/images/copy.svg" />
            </vs-button>
            <div class="basic_stream_btn_cont_">
              <vx-tooltip v-if="castDetails.stream_status" text="Pause Stream" position="bottom">
                <vs-button class="custm-style" @click="toggleStream(castDetails.public_meeting_id, 'pause')">
                  <img src="@/assets/images/pause_stream.svg" alt="" />
                </vs-button>
              </vx-tooltip>
              <vx-tooltip v-else text="Start Stream" position="bottom">
                <vs-button class="custm-style" @click="toggleStream(castDetails.public_meeting_id, 'start')">
                  <img src="@/assets/images/start_stream.svg" alt="" />
                </vs-button>
              </vx-tooltip>
            </div>
          </div>
        </div>
        <div v-if="hasFacebookStream"
          class="basic_stream_div_ flex flex-row justify-between items-center gap-12 w-full py-1 px-2">
          <div>www.facebook.com</div>
          <div class="flex gap-2 justify-center items-center">
            <vs-button class="custm-style">
              <img src="@/assets/images/copy.svg" />
            </vs-button>
            <div class="basic_stream_btn_cont_">
              <vx-tooltip v-if="castDetails.stream_status" text="Pause Stream" position="bottom">
                <vs-button class="custm-style" @click="toggleStream(castDetails.public_meeting_id, 'pause')">
                  <img src="@/assets/images/pause_stream.svg" alt="" />
                </vs-button>
              </vx-tooltip>
              <vx-tooltip v-else text="Start Stream" position="bottom">
                <vs-button class="custm-style" @click="toggleStream(castDetails.public_meeting_id, 'start')">
                  <img src="@/assets/images/start_stream.svg" alt="" />
                </vs-button>
              </vx-tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
    <EditCastSchedule v-if="activeModal === 'editCastSchedule'" :closeModal="() => setActiveModal('')"
      :setActiveModal="setActiveModal" :stepOneProps="stepOneProps" :stepTwoProps="stepTwoProps" />
    <EditCastDetail v-else-if="activeModal === 'editCastDetail'" :closeModal="() => setActiveModal('')"
      :stepOneProps="stepOneProps" :stepTwoProps="stepTwoProps" :createCast="createCast" />

    <CastOptionsModal v-else-if="activeModal === 'castOptionsModal'" :closeModal="() => setActiveModal('')"
      :setActiveModal="setActiveModal" />
    <DeleteCastModal v-else-if="activeModal === 'deleteCastModal'" :closeModal="() => setActiveModal('')"
      :castName="castDetails.event_name" :confirmDelete="() => deleteCast(castDetails.public_meeting_id)" />
    <CreateNftModal v-else-if="activeModal === 'nftDropModal'" :closeModal="() => setActiveModal('')" />
  </div>
</template>
<script>
import moment from 'moment-timezone';
import SetupCast from '@/views/dashboard/cast-section/components/SetupCast.vue';
import CreateCastModal from '@/views/dashboard/cast-section/components/CreateCastModal.vue';
import InviteCard from '@/views/dashboard/InviteCard.vue';
import postPoneCast from '@/views/dashboard/postPoneCast.vue';
import SettingsTab from '@/views/dashboard/cast-section/components/Tabs/SettingsTab.vue';
import StreamingTab from '@/views/dashboard/cast-section/components/Tabs/StreamingTab.vue';
import SetUpEditCast from '@/views/EditCast/SetUpEditCast.vue';
import SimpleMenu from '@/components/common/simpleMenu/SimpleMenu.vue';
import CopyIcon from '@/assets/svgs/button-icons/copy.vue';
import MoreIcon from '@/assets/svgs/button-icons/more.vue';
import CallSettingsModal from '@/views/dashboard/cast-section/components/CallSettingsModal.vue';
import StreamSettingsModal from '@/views/dashboard/cast-section/components/StreamSettingsModal.vue';
import ResheduleCastModal from '@/views/dashboard/cast-section/components/ResheduleCastModal.vue';
import EditCastModal from '@/views/dashboard/cast-section/components/EditCast/EditCastModal.vue';
import ConfirmationModal from '@/views/dashboard/components/ConfirmationModal.vue';
import ManageAudNftModal from '@/views/dashboard/nft/ManageAudNftModal.vue';
import BaseModal from '@/components/common/BaseModal.vue';

import NftEdit from '@/views/dashboard/nft/NftEdit.vue';
import ShareNftLink from '@/views/dashboard/nft/ShareNftLink.vue';
import CastOptionsModal from './CastOptionsModal.vue';
import CastCardShimmer from '@/views/NewDashboard/Cast/components/CastCardShimmer.vue';
import DeleteCastModal from './options-components/DeleteCastModal.vue';
import CreateNftModal from '../../nft/CreateNftModal.vue';
import EditCastSchedule from './options-components/EditCastSchedule.vue';
import EditCastDetail from './options-components/EditCastDetail.vue';

export default {
  name: 'CastCard',
  props: [
    'castDetails',
    'index',
    // 'setProps',
    // 'stepOneProps',
    // 'stepTwoProps',
    // 'stepThreeProps',
    // 'stepFourProps',
    'getCastList',
  ],
  data() {
    return {
      isLoading: false,
      activeModal: '', //castOptionsModal, deleteCastModal, nftDropModal, manageAudienceModal, editCastSetupModal, editCastDetailModal, editCastBrandingModal, editCastAdvanceModal, 
      showModal: false,
      isMobileView: false,
      expandedRoom: null,
      isCastStart: false,
      showDeletePopup: false,
      focusYourRooms: true,
      toShow: false,
      create: false,
      showCastIsLive: false,
      stream: false,
      invite: false,
      showPopup: false,
      showRecord: false,
      showCopy: false,
      showTooltip: false,
      showTooltip2: false,
      showSettings: false,
      moment,
      casts: [],
      remainingTime: [],
      invites: [],
      recordingList: [],
      postPoneVisible: false,
      castInfo: {},
      toPostpone: false,
      showPostpone: false,
      showEditCast: false,
      isStream: false,
      viewer: false,
      castCopyMenuItems: [
        {
          label: 'Copy participant url',
          icon: () => import('@/assets/svgs/menu-icons/participant.vue'),
          onClick: () => this.copy(this.castDetails.public_meeting_id, this.castDetails.h_ap),
        },
        {
          label: 'Copy co-host url',
          icon: () => import('@/assets/svgs/menu-icons/co-host.vue'),
          onClick: () => this.copy(this.castDetails.public_meeting_id, this.castDetails.h_mp),
        },
        {
          label: 'Copy stream url',
          icon: () => import('@/assets/svgs/menu-icons/stream.vue'),
          onClick: () => this.copy(this.castDetails.public_meeting_id, undefined),
        },
      ],

      isAirdrop: false,
      pub_nft_flow: false,
      public_nft_status: false,
      event_nft_enabled: false,
      certificate_enabled: false,
      nft_details_submitted: false,
      vc_details_submitted: false,

      stepOneProps: {
        event_name: '',
        moderator_password: '',
        attendee_password: '',
        meeting_type: '',
        schedule_time: '',
        description: '',
        startTime: '0:00:00',
        timezone: '',
        startD: moment().format('YYYY-MM-DD'),
        password_auth: '',
        auth_type: '',
        send_otp: '',
        public_auth: false,
        public_otp: '',
      },
      stepTwoProps: {
        BackImageURL: '',
        imageURL: '',
        primary_color: '',
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
        duration: '',
        logout_url: '',
      },
      stepThreeProps: {
        vw_stream: false,
        vw_stream_url: '',
        is_streaming: '',
        public_stream: '',
      },
      stepFourProps: {
        start_stop_recording: '',
        record: '',
        mute_on_start: '',
        end_when_no_moderator: '',
        allow_moderator_to_unmute_user: '',
        webcam_only_for_moderator: '',
        auto_start_recording: '',
        allow_start_stop_recording: '',
        disable_cam: '',
        disable_mic: '',
        lock_layout: '',
        lock_on_join: false,
        viewer_mode: '',
        viewer_password: false,
        listen_only_mode: true,
        webcam_enable: false,
        screen_sharing: true,
        restrict_participants: false,
        meeting_settings: false,
      },
    };
  },
  components: {
    SetupCast,
    SetUpEditCast,
    InviteCard,
    postPoneCast,
    SettingsTab,
    StreamingTab,
    CreateCastModal,
    SimpleMenu,
    CopyIcon,
    MoreIcon,
    CastCardShimmer,
    CallSettingsModal,
    StreamSettingsModal,
    ResheduleCastModal,
    EditCastModal,
    ConfirmationModal,
    ManageAudNftModal,
    BaseModal,
    NftEdit,
    ShareNftLink,
    CastOptionsModal,
    DeleteCastModal,
    CreateNftModal,
    EditCastSchedule,
    EditCastDetail
  },
  mounted() {
    this.setProps();
  },
  computed: {
    hasYoutubeStream() {
      return this.castDetails.stream_urls && this.castDetails.stream_urls.includes('youtube.com');
    },
    hasTwitchStream() {
      return this.castDetails.stream_urls && this.castDetails.stream_urls.includes('twitch.tv');
    },
    hasFacebookStream() {
      return this.castDetails.stream_urls && this.castDetails.stream_urls.includes('facebook.com');
    },
    hasDecastStream() {
      return this.castDetails.stream_urls && this.castDetails.stream_urls.includes('video.wiki');
    },
  },
  methods: {
    handleCardClick() {
      this.$emit('card-click', {
        castLs: this.castDetails,
        id: this.castDetails.public_meeting_id,
        attendee: this.castDetails.invitee_list.length,
        isLive: this.castDetails.is_running,
      });
    },
    setActiveModal(modalName) {
      this.activeModal = modalName;
    },
    async toggleStream(id, action) {
      // this.resetShowTooltip2();
      console.log(action);
      try {
        this.$vs.loading();
        if (action === 'start') {
          await this.$store.dispatch('studio/startStream', {
            cast_id: id,
          });
          this.$vs.notify({
            title: 'Successful',
            text: 'Stream Started',
            color: 'success',
          });
          this.castDetails.stream_status = !this.castDetails.stream_status;
        } else {
          await this.$store.dispatch('studio/endStream', {
            cast_id: id,
          });
          this.$vs.notify({
            title: 'Successful',
            text: 'Stream Ended',
            color: 'success',
          });
          // this.resetShowTooltip2();
          this.castDetails.stream_status = !this.castDetails.stream_status;
        }
      } catch (err) {
        this.$vs.notify({
          title: 'An Error occurred',
          text:
            err.response != null ? err.response.data.message : 'Try again !',
          color: 'danger',
        });
      } finally {
        this.$vs.loading.close();
      }
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
    setProps() {
      this.stepOneProps.event_name = this.castDetails.event_name;
      this.stepOneProps.moderator_password = '';
      this.stepOneProps.attendee_password = '';
      this.stepOneProps.meeting_type = '';
      this.stepOneProps.schedule_time = this.castDetails.schedule_time;
      this.stepOneProps.description = this.castDetails.description;
      this.stepOneProps.startTime = '0:00:00';
      this.stepOneProps.timezone = this.castDetails.timezone;
      this.stepOneProps.startD = moment().format('YYYY-MM-DD');
      this.stepOneProps.password_auth = this.castDetails.password_auth;
      this.stepOneProps.auth_type = this.castDetails.cast_type;
      this.stepOneProps.send_otp = this.castDetails.otp_private;
      this.stepOneProps.public_auth = false;
      this.stepOneProps.public_otp = this.castDetails.collect_attendee_email;

      this.stepTwoProps.BackImageURL = '';
      this.stepTwoProps.imageURL = '';
      this.stepTwoProps.primary_color = this.castDetails.primary_color;
      this.stepTwoProps.secondary_color = '';
      this.stepTwoProps.logo = this.castDetails.logo;
      this.stepTwoProps.back_image = '';
      this.stepTwoProps.cover_image = this.castDetails.cover_image;
      this.stepTwoProps.cover_image_error = false;
      this.stepTwoProps.back_image_error = false;
      this.stepTwoProps.banner_text = this.castDetails.banner_text;
      this.stepTwoProps.moderator_only_text = 'You are a Moderator, you can control who presents and participates in the live cast';
      this.stepTwoProps.guest_policy = this.castDetails.guest_policy;
      this.stepTwoProps.welcome_text = this.castDetails.welcome_text;
      this.stepTwoProps.showText = true;
      this.stepTwoProps.duration = this.castDetails.duration;
      this.stepTwoProps.logout_url = this.castDetails.logout_url;

      this.stepThreeProps.vw_stream = false;
      this.stepThreeProps.vw_stream_url = this.castDetails.bbb_stream_url;
      this.stepThreeProps.is_streaming = this.castDetails.is_streaming;
      this.stepThreeProps.public_stream = this.castDetails.public_stream;

      this.stepFourProps.start_stop_recording = this.castDetails.record;
      this.stepFourProps.record = this.castDetails.record;
      this.stepFourProps.mute_on_start = this.castDetails.mute_on_start;
      this.stepFourProps.end_when_no_moderator = this.castDetails.end_when_no_moderator;
      this.stepFourProps.allow_moderator_to_unmute_user = this.castDetails.allow_moderator_to_unmute_user;
      this.stepFourProps.webcam_only_for_moderator = this.castDetails.webcam_only_for_moderator;
      this.stepFourProps.auto_start_recording = this.castDetails.auto_start_recording;
      this.stepFourProps.allow_start_stop_recording = this.castDetails.record;
      this.stepFourProps.disable_cam = this.castDetails.disable_cam;
      this.stepFourProps.disable_mic = this.castDetails.disable_mic;
      this.stepFourProps.lock_layout = this.castDetails.lock_layout;
      this.stepFourProps.lock_on_join = false;
      this.stepFourProps.viewer_mode = this.castDetails.viewer_mode;
      this.stepFourProps.viewer_password = false;
      this.stepFourProps.listen_only_mode = true;
      this.stepFourProps.webcam_enable = false;
      this.stepFourProps.screen_sharing = true;
      this.stepFourProps.restrict_participants = false;
      this.stepFourProps.meeting_settings = false;
    },
    copy(id, pass) {
      if (pass === undefined) {
        navigator.clipboard.writeText('https://decast.live/live/' + id);
        return;
      }
      navigator.clipboard.writeText(
        'https://decast.live/join-cast/' + id + '/?pass=' + pass
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
        this.isCastStart = true;
        window.open(res.url, '_blank');
      } catch (e) {
        console.log('error', e);
      }
    },
    async deleteCast(deleteCastId) {
      this.isLoading = true;
      this.setActiveModal('');
      await this.$store.dispatch('cast/deleteCast', deleteCastId);
      // const newCasts = this.casts.filter((item) => {
      //   return item.public_meeting_id !== deleteCastId;
      // });
      // this.casts = newCasts;
      this.isLoading = false;
      this.getCastList();
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

.cast_list {
  border-top: 1px solid white;
  border-left: 1px solid white;
  border-right: 2px solid white;
  border-bottom: 2px solid white;
  box-shadow: 3px 3px 0px 0px white;
}

.cast_list:hover {
  border-top: 1px solid #d7df23;
  border-left: 1px solid #d7df23;
  border-right: 2px solid #d7df23;
  border-bottom: 2px solid #d7df23;
  box-shadow: 3px 3px 0px 0px #d7df23;
}

.inner-div1 {
  border: 1px solid yellow;

}

.basic_stream_btn_cont_ {
  /* width: 33px;
  height: 33px; */
}

/* .inner-child1 {
  /* border: 1px solid red; 
  width: 35vw;
} */

.basic_live_dot_ {
  background-color: red !important;
  height: 8px;
  width: 8px;
}

.basic_stream_div_ {
  border: 1px solid #fff;
}

.basic_stream_div_:hover {
  border: 1px solid #d7df23 !important;
  cursor: pointer;
}
</style>