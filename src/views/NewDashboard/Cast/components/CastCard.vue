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
        <CastOptionsModal v-if="activeModal === 'castOptionsModal'" :closeModal="() => setActiveModal('')" />

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
          class="basic_stream_div_ flex flex-row flex-wrap justify-between items-center w-full py-1 px-2">
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
        <div v-if="hasTwitchStream || hasYoutubeStream || hasFacebookStream"
          class="basic_stream_div_ flex flex-row justify-start items-center gap-5 w-full py-1 px-2">
          <div v-if="hasTwitchStream"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="35" height="35"
              viewBox="0,0,256,256" style="fill:#000000;">
              <g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt"
                stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0"
                font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal">
                <g transform="scale(5.12,5.12)">
                  <path
                    d="M5.3125,1l-0.25,0.65625l-3,8l-0.0625,0.15625v33.1875h11v6h7.40625l0.3125,-0.28125l5.71875,-5.71875h8.96875l0.3125,-0.28125l12.28125,-12.28125v-29.4375zM6.6875,3h39.3125v26.59375l-11.40625,11.40625h-9l-6,6h-4.59375v-6h-11v-30.8125zM10,5v30h8v7.40625l1.71875,-1.6875l5.71875,-5.71875h11.96875l0.3125,-0.28125l6,-6l0.28125,-0.3125v-23.40625zM12,7h30v20.5625l-5.4375,5.4375h-11.96875l-0.3125,0.28125l-4.28125,4.28125v-4.5625h-8zM20,13v14h6v-14zM30,13v14h6v-14zM22,15h2v10h-2zM32,15h2v10h-2z">
                  </path>
                </g>
              </g>
            </svg></div>

          <div v-if="hasYoutubeStream">
            <svg fill="#ffffff" height="35px" width="35px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve">
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <g>
                  <g>
                    <path
                      d="M435.574,59.858H76.426C34.285,59.858,0,94.143,0,136.284v171.023c0,4.427,3.589,8.017,8.017,8.017 c4.427,0,8.017-3.589,8.017-8.017V136.284c0-33.3,27.092-60.393,60.393-60.393h359.148c33.3,0,60.393,27.092,60.393,60.393 v239.432c0,33.3-27.092,60.393-60.393,60.393H76.426c-33.3,0-60.393-27.092-60.393-60.393v-34.205 c0-4.427-3.589-8.017-8.017-8.017c-4.427,0-8.017,3.589-8.017,8.017v34.205c0,42.141,34.285,76.426,76.426,76.426h359.148 c42.141,0,76.426-34.285,76.426-76.426V136.284C512,94.143,477.715,59.858,435.574,59.858z">
                    </path>
                  </g>
                </g>
                <g>
                  <g>
                    <path
                      d="M362.982,249.278l-34.205-22.233c-3.712-2.412-8.677-1.359-11.091,2.353c-2.412,3.712-1.36,8.677,2.353,11.091 l23.864,15.511l-148.296,96.394V159.607l98.779,64.206c3.711,2.411,8.678,1.359,11.09-2.353c2.414-3.712,1.36-8.677-2.353-11.091 l-111.165-72.256c-5.24-3.407-12.384,0.491-12.384,6.721v222.33c0,6.226,7.142,10.131,12.385,6.721l171.023-111.165 C367.761,259.615,367.76,252.385,362.982,249.278z">
                    </path>
                  </g>
                </g>
              </g>
            </svg>
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

              <div v-if="hasFacebookStream"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="35" height="35"
                  viewBox="0,0,256,256" style="fill:#000000;">
                  <g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt"
                    stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0"
                    font-family="none" font-weight="none" font-size="none" text-anchor="none"
                    style="mix-blend-mode: normal">
                    <g transform="scale(5.12,5.12)">
                      <path
                        d="M9,4c-2.74952,0 -5,2.25048 -5,5v32c0,2.74952 2.25048,5 5,5h16.83203c0.10799,0.01785 0.21818,0.01785 0.32617,0h5.67383c0.10799,0.01785 0.21818,0.01785 0.32617,0h8.8418c2.74952,0 5,-2.25048 5,-5v-32c0,-2.74952 -2.25048,-5 -5,-5zM9,6h32c1.66848,0 3,1.33152 3,3v32c0,1.66848 -1.33152,3 -3,3h-8v-14h3.82031l1.40039,-7h-5.2207v-2c0,-0.55749 0.05305,-0.60107 0.24023,-0.72266c0.18718,-0.12159 0.76559,-0.27734 1.75977,-0.27734h3v-5.63086l-0.57031,-0.27149c0,0 -2.29704,-1.09766 -5.42969,-1.09766c-2.25,0 -4.09841,0.89645 -5.28125,2.375c-1.18284,1.47855 -1.71875,3.45833 -1.71875,5.625v2h-3v7h3v14h-16c-1.66848,0 -3,-1.33152 -3,-3v-32c0,-1.66848 1.33152,-3 3,-3zM32,15c2.07906,0 3.38736,0.45846 4,0.70117v2.29883h-1c-1.15082,0 -2.07304,0.0952 -2.84961,0.59961c-0.77656,0.50441 -1.15039,1.46188 -1.15039,2.40039v4h4.7793l-0.59961,3h-4.17969v16h-4v-16h-3v-3h3v-4c0,-1.83333 0.46409,-3.35355 1.28125,-4.375c0.81716,-1.02145 1.96875,-1.625 3.71875,-1.625z">
                      </path>
                    </g>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ManageAudModal v-if="activeModal === 'manageAudienceModal'" :closeModal="() => setActiveModal('')"
      :castDetails="castDetails" :handleEditCast="handleEditCast" :isAirdrop="castDetails.airdrop"
      :setActiveModal="setActiveModal" :pub_nft_flow="castDetails.pub_nft_flow"
      :public_nft_status="castDetails.public_nft_status" :changePublicNftStatus="changePublicNftStatus"
      :nft_details_submitted="castDetails.nft_details_submitted" :vc_details_submitted="castDetails.vc_details_submitted"
      :event_nft_enabled="!castDetails.pub_nft_flow && castDetails.nft_details_submitted" :certificate_enabled="castDetails.vc_details_submitted"
      :castId="castDetails.public_meeting_id" :invites="castDetails.invitee_list"
      :isStream="castDetails.stream_urls !== null" :viewer="castDetails.viewer_mode" />

    <EditSetupDetail v-else-if="activeModal === 'editSetupDetail'" :closeModal="() => setActiveModal('')"
      :stepOneProps="stepOneProps" :stepTwoProps="stepTwoProps" :handleEditCast="handleEditCast" />
    <EditBasicDetail v-else-if="activeModal === 'editBasicDetail'" :closeModal="() => setActiveModal('')"
      :stepOneProps="stepOneProps" :stepTwoProps="stepTwoProps" :handleEditCast="handleEditCast" />
    <EditBrandingDetail v-else-if="activeModal === 'editBrandingDetail'" :closeModal="() => setActiveModal('')"
      :stepTwoProps="stepTwoProps" :handleEditCast="handleEditCast" />
    <EditAdvanceDetail v-else-if="activeModal === 'editAdvanceDetail'" :closeModal="() => setActiveModal('')"
      :stepOneProps="stepOneProps" :stepFourProps="stepFourProps" :handleEditCast="handleEditCast" />
    <CastOptionsModal v-else-if="activeModal === 'castOptionsModal'" :closeModal="() => setActiveModal('')"
      :setActiveModal="setActiveModal" :castDetails="castDetails" />
    <CreateNftModal v-else-if="activeModal === 'nftDropModal'" :closeModal="() => setActiveModal('')"
      :castDetails="castDetails" :getCastList="getCastList" />
    <EditNftModal v-else-if="activeModal === 'editNftDropModal'" :closeModal="() => setActiveModal('')"
      :castDetails="castDetails" :getCastList="getCastList" />
    <DeleteCastModal v-else-if="activeModal === 'deleteCastModal'" :closeModal="() => setActiveModal('')"
      :castName="castDetails.event_name" :confirmDelete="() => deleteCast(castDetails.public_meeting_id)" />
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
import CreateNftModal from '@/views/NewDashboard/nft/CreateNftModal.vue';
import EditSetupDetail from './options-components/EditSetupDetail.vue';
import EditBasicDetail from './options-components/EditBasicDetail.vue';
import EditBrandingDetail from './options-components/EditBrandingDetail.vue';
import ManageAudModal from './options-components/ManageAudModal.vue'
import EditNftModal from '@/views/NewDashboard/nft/EditNftModal.vue';
import EditAdvanceDetail from './options-components/EditAdvanceDetail.vue';

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
    ManageAudModal,
    EditSetupDetail,
    EditBasicDetail,
    EditBrandingDetail,
    EditNftModal,
    EditAdvanceDetail
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
        date: this.castDetails.event_date,
        type: this.castDetails.cast_type,
        recording: this.castDetails.recording_available,
        name: this.castDetails.event_name,
        nftEnable: this.castDetails.nft_details_submitted,
        time: this.castDetails.event_time,
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
      this.stepOneProps.startTime = this.castDetails.schedule_time.split(" ")[1];
      this.stepOneProps.timezone = this.castDetails.timezone;
      this.stepOneProps.startD = this.castDetails.schedule_time.split(" ")[0];
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
    formSubmitted() {
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
      this.$vs.loading();
      var data = new FormData();
      data.append('cast_id', this.castDetails.public_meeting_id);
      data.append('cast_name', this.stepOneProps.event_name);
      data.append('logo', this.stepTwoProps.logo);
      data.append('cover_image', this.stepTwoProps.cover_image);
      data.append('back_image', this.stepTwoProps.back_image);
      data.append('description', this.stepOneProps.description);
      data.append('cast_type', this.stepOneProps.auth_type);
      data.append('collect_attendee_email', this.stepOneProps.public_otp ? 'True' : 'False');
      data.append('schedule_time', `${this.stepOneProps.startD} ${this.stepOneProps.startTime}`);
      data.append('timezone', this.stepOneProps.timezone);
      data.append('primary_color', this.stepTwoProps.primary_color);
      data.append('welcome_text', this.stepTwoProps.welcome_text);
      data.append('banner_text', this.stepTwoProps.banner_text);
      data.append('guest_policy', this.stepTwoProps.guest_policy);
      data.append('moderator_only_text', this.stepTwoProps.moderator_only_text);
      data.append('duration', this.stepTwoProps.duration);
      data.append('logout_url', this.stepTwoProps.logout_url);
      data.append('is_streaming', this.stepThreeProps.is_streaming ? 'True' : 'False');
      data.append('public_stream', this.stepThreeProps.public_stream ? 'True' : 'False');
      data.append('bbb_stream_url', this.stepThreeProps.vw_stream_url);
      data.append('record', this.stepFourProps.record ? 'True' : 'False');
      data.append('end_when_no_moderator', this.stepFourProps.end_when_no_moderator ? 'True' : 'False');
      data.append('allow_moderator_to_unmute_user', this.stepFourProps.allow_moderator_to_unmute_user ? 'True' : 'False');
      data.append('auto_start_recording', this.stepFourProps.auto_start_recording ? 'True' : 'False');
      data.append('mute_on_start', this.stepFourProps.mute_on_start ? 'True' : 'False');
      data.append('webcam_only_for_moderator', this.stepFourProps.webcam_only_for_moderator ? 'True' : 'False');
      data.append('disable_cam', this.stepFourProps.disable_cam ? 'True' : 'False');
      data.append('disable_mic', this.stepFourProps.disable_mic ? 'True' : 'False');
      data.append('lock_layout', this.stepFourProps.lock_layout ? 'True' : 'False');
      data.append('viewer_mode', this.stepFourProps.viewer_mode ? 'True' : 'False');
      data.append('private_otp', this.stepOneProps.send_otp ? 'True' : 'False');
      data.append('password_auth', this.stepOneProps.password_auth ? 'True' : 'False');
      this.$store
        .dispatch('cast/formSubmit', data)
        .then((response) => {
          setTimeout(() => {
            this.$vs.loading.close();
          }, 5000);
          this.getCastList();
          this.responsedata = response.data.message;
          this.$vs.notify({
            title: 'Success',
            text: response.data.message,
            color: 'success',
          });
          this.closeModal();
          // if (
          //   this.startNow ||
          //   (this.startNow === 'True' &&
          //     response.data &&
          //     response.data.url !== '')
          // ) {
          //   window.open(`/user_details/${response.data.meeting_id}`, '_blank');
          //   window.location.href = response.data.url;
          // } else this.$router.push('/dashboard');
        })
        .catch((error) => {
          this.$vs.loading.close();
          this.formData = new FormData();
          console.log(JSON.stringify(error));
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
      // this.$emit('updateShowEditCast', false);
    },
    handleEditCast() {
      if (this.validateFormOne) {
        console.log('success validated');
        this.formSubmitted();
      }
    },
    async changePublicNftStatus(castId, curr_status) {
      try {
        this.$vs.loading();
        await this.$store
          .dispatch('studio/publicNftActivate', {
            cast_id: castId,
            nft_activate: curr_status,
          })
          .then((res) => {
            // eslint-disable-next-line camelcase
            this.castDetails.public_nft_status = curr_status === 'True';
            this.$vs.loading.close();
          });
      } catch (err) {
        this.$vs.loading.close();
        this.$vs.notify({
          title: 'Error',
          text: 'Try again !',
          color: 'Danger',
        });
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