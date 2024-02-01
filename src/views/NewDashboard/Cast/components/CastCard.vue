<template>
  <div>
    <CastCardShimmer v-if="isLoading" />
    <div
      class="cast_list flex justify-between items-center mb-4 w-full py-2 px-6"
    >
      <div class="inner-div1">
        <div class="inner-child1">
          <p>{{ cast.event_name }}</p>
          <button>
            {{
              moment(cast.event_date).format('ll').split(',')[0] +
              ' ' +
              NewTime(cast.event_date, cast.event_time)
            }}
          </button>
        </div>
      </div>

      <div class="inner-div2">
        <!-- <SimpleMenu :menuList="castOptionMenuItems">
          <template #menuButton>
            <vs-button class="custm-style">
              <img src="@/assets/images/menu.svg" />
            </vs-button>
          </template>
        </SimpleMenu> -->
        <vs-button class="custm-style" @click="setActiveModal('castOptionsModal')">
          <img src="@/assets/images/menu.svg" />
        </vs-button>

        <CastOptionsModal v-if="activeModal==='castOptionsModal'" :closeModal="() => setActiveModal('')"/>

        <div class="inner-child3">
          <div class="inner-child4">
            <div v-if="streamInfo[cast.public_meeting_id]">
              <vx-tooltip
                v-if="streamInfo[cast.public_meeting_id].stream_status"
                text="Pause Stream"
                position="bottom"
              >
                <vs-button
                  class="vs-cast-copy-button"
                  style="padding: 4px !important; width: 36px !important"
                  @click="toggleStream(cast.public_meeting_id, 'pause')"
                >
                  <img
                    style="width: 33px !important; height: 33px !important"
                    src="@/assets/images/pause.png"
                    alt=""
                  />
                </vs-button>
              </vx-tooltip>
              <vx-tooltip v-else text="Start Stream" position="bottom">
                <vs-button
                  class="vs-cast-copy-button"
                  @click="toggleStream(cast.public_meeting_id, 'start')"
                >
                  <img src="@/assets/images/dashboard/Live.svg" alt="" />
                </vs-button>
              </vx-tooltip>
            </div>

            <SimpleMenu :menuList="castCopyMenuItems">
              <template #menuButton>
                <vs-button class="custm-style">
                  <img src="@/assets/images/copy.svg" />
                </vs-button>
              </template>
            </SimpleMenu>
            <vs-button class="custm-style">
              <img
                v-if="cast.is_running === 'false'"
                @click="joinNow(cast.public_meeting_id)"
                src="@/assets/images/start.svg"
              />
              <img
                v-if="cast.is_running === 'true'"
                src="@/assets/images/end.svg"
              />
            </vs-button>
          </div>
        </div>
      </div>
    </div>
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
import CastCardShimmer from '@/views/dashboard/cast-section/components/CastCardShimmer.vue';
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

export default {
  name: 'CastCard',
  props: [
    'streamInfo',
    'castsInfo',
    'cast',
    'index',
    'getCastList',
  ],
  data() {
    return {
      isLoading: false,
      activeModal: '',
      showModal: false,
      isMobileView: false,
      expandedRoom: null,
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
      castOptionMenuItems: [
        {
          label: 'Manage attendees',
          icon: () => import('@/assets/svgs/menu-icons/manage.vue'),
          onClick: () => {
            this.openInviteAttendeesModal();
          },
        },
        {
          label: 'Call settings',
          icon: () => import('@/assets/svgs/menu-icons/call.vue'),
          onClick: () => {
            this.setCastModal('callSettingsModal');
          },
        },
        {
          label: 'Stream settings',
          icon: () => import('@/assets/svgs/menu-icons/stream.vue'),
          onClick: () => {
            this.setCastModal('streamingModal');
          },
        },
        {
          label: 'Reschedule cast',
          icon: () => import('@/assets/svgs/menu-icons/reschedule.vue'),
          onClick: () => {
            this.setCastModal('resheduleCastModal');
          },
        },
        {
          label: 'Edit',
          icon: () => import('@/assets/svgs/menu-icons/pen.vue'),
          onClick: () => {
            this.setCastModal('editCastModal');
          },
        },
        {
          label: 'Postpone cast',
          icon: () => import('@/assets/svgs/menu-icons/prepone.vue'),
          onClick: () => {
            this.setCastModal('postponeCastModal');
          },
        },
        {
          label: 'Delete',
          icon: () => import('@/assets/svgs/menu-icons/delete.vue'),
          onClick: () => {
            this.setCastModal('deleteCastModal');
          },
        },
      ],
      castCopyMenuItems: [
        {
          label: 'Copy participant url',
          icon: () => import('@/assets/svgs/menu-icons/participant.vue'),
          onClick: () => this.copy(this.cast.public_meeting_id, this.cast.h_ap),
        },
        {
          label: 'Copy co-host url',
          icon: () => import('@/assets/svgs/menu-icons/co-host.vue'),
          onClick: () => this.copy(this.cast.public_meeting_id, this.cast.h_mp),
        },
        {
          label: 'Copy stream url',
          icon: () => import('@/assets/svgs/menu-icons/stream.vue'),
          onClick: () => this.copy(this.cast.public_meeting_id, undefined),
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
    CastOptionsModal
},
  mounted() {
    this.setProps();
  },
  computed: {
    totalImagesCount() {
      return this.casts.map((cast) => cast.images.length);
    },
  },
  methods: {
    setActiveModal(modalName) {
      this.activeModal = modalName;
    },
    async toggleStream(id, action) {
      this.resetShowTooltip2();
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
          this.streamInfo[id].stream_status =
            !this.streamInfo[id].stream_status;
        } else {
          await this.$store.dispatch('studio/endStream', {
            cast_id: id,
          });
          this.$vs.notify({
            title: 'Successful',
            text: 'Stream Ended',
            color: 'success',
          });
          this.resetShowTooltip2();
          this.streamInfo[id].stream_status =
            !this.streamInfo[id].stream_status;
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
        console.log("castsInfoDismiss", this.castsInfo, this.cast)
        const details = this.castsInfo[this.cast.public_meeting_id].details;
        this.stepOneProps.event_name= details.event_name;
        this.stepOneProps.moderator_password= '';
        this.stepOneProps.attendee_password= '';
        this.stepOneProps.meeting_type= '';
        this.stepOneProps.schedule_time= details.schedule_time;
        this.stepOneProps.description= details.description;
        this.stepOneProps.startTime= '0:00:00';
        this.stepOneProps.timezone= details.timezone;
        this.stepOneProps.startD= moment().format('YYYY-MM-DD');
        this.stepOneProps.password_auth= details.password_auth;
        this.stepOneProps.auth_type= details.cast_type;
        this.stepOneProps.send_otp= details.otp_private;
        this.stepOneProps.public_auth= false;
        this.stepOneProps.public_otp= details.collect_attendee_email;

        this.stepTwoProps.BackImageURL= '';
        this.stepTwoProps.imageURL= '';
        this.stepTwoProps.primary_color= details.primary_color;
        this.stepTwoProps.secondary_color= '';
        this.stepTwoProps.logo= details.logo;
        this.stepTwoProps.back_image= '';
        this.stepTwoProps.cover_image= details.cover_image;
        this.stepTwoProps.cover_image_error= false;
        this.stepTwoProps.back_image_error= false;
        this.stepTwoProps.banner_text= details.banner_text;
        this.stepTwoProps.moderator_only_text='You are a Moderator, you can control who presents and participates in the live cast';
        this.stepTwoProps.guest_policy= details.guest_policy;
        this.stepTwoProps.welcome_text= details.welcome_text;
        this.stepTwoProps.showText= true;
        this.stepTwoProps.duration= details.duration;
        this.stepTwoProps.logout_url= details.logout_url;
      
        this.stepThreeProps.vw_stream= false;
        this.stepThreeProps.vw_stream_url= details.bbb_stream_url;
        this.stepThreeProps.is_streaming= details.is_streaming;
        this.stepThreeProps.public_stream= details.public_stream;
      
        this.stepFourProps.start_stop_recording= details.record;
        this.stepFourProps.record= details.record;
        this.stepFourProps.mute_on_start= details.mute_on_start;
        this.stepFourProps.end_when_no_moderator= details.end_when_no_moderator;
        this.stepFourProps.allow_moderator_to_unmute_user= details.allow_moderator_to_unmute_user;
        this.stepFourProps.webcam_only_for_moderator= details.webcam_only_for_moderator;
        this.stepFourProps.auto_start_recording= details.auto_start_recording;
        this.stepFourProps.allow_start_stop_recording= details.record;
        this.stepFourProps.disable_cam= details.disable_cam;
        this.stepFourProps.disable_mic= details.disable_mic;
        this.stepFourProps.lock_layout= details.lock_layout;
        this.stepFourProps.lock_on_join= false;
        this.stepFourProps.viewer_mode= details.viewer_mode;
        this.stepFourProps.viewer_password= false;
        this.stepFourProps.listen_only_mode= true;
        this.stepFourProps.webcam_enable= false;
        this.stepFourProps.screen_sharing= true;
        this.stepFourProps.restrict_participants= false;
        this.stepFourProps.meeting_settings= false;
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
        window.open(res.url, '_blank');
      } catch (e) {
        console.log('error', e);
      }
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
</style>
