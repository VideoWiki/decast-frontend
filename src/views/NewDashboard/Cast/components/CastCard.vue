<template>
  <div>
    <CastCardShimmer v-if="isLoading" />
    <div class="cast_list flex flex-col justify-between items-center mb-4 w-full py-1 px-4 pb-3">
      <div class="inner-child1 flex flex-row justify-between items-center pl-2">
        <p class="font-semibold text-lg flex items-center gap-4">{{ cast.event_name }}
          <span class="text-red-500 text-sm flex items-center gap-2" v-if="cast.is_running === 'true'"><span
              class="basic_live_dot_ rounded-full"></span>LIVE</span>
        </p>
        <div class="inner-div2 flex justify-between items-center">
          <SimpleMenu :menuList="castOptionMenuItems">
            <template #menuButton>
              <vs-button class="custm-style">
                <img src="@/assets/images/menu.svg" />
              </vs-button>
            </template>
          </SimpleMenu>

          <SimpleMenu :menuList="castCopyMenuItems">
            <template #menuButton>
              <vs-button class="custm-style">
                <img src="@/assets/images/copy.svg" />
              </vs-button>
            </template>
          </SimpleMenu>
          <vs-button class="custm-style">
            <img v-if="isCastStart" src="@/assets/images/end.svg" />
            <img v-if="cast.is_running === 'false' && !isCastStart" @click="joinNow(cast.public_meeting_id)"
              src="@/assets/images/start.svg" />
            <img v-if="cast.is_running === 'true'" src="@/assets/images/end.svg" />
          </vs-button>
        </div>


      </div>

      <div class="text-left w-full">
        <span class="basic_date_btn_ text-white text-md">
          {{
            moment(cast.event_date).format('DD MMM') +
            ' ' +
            NewTime(cast.event_date, cast.event_time)
          }}
        </span>
      </div>

      <div v-if="streamInfo[cast.public_meeting_id]" class="mt-6 flex flex-col justify-between gap-4 w-full">
        <p class="text-left font-semibold">Live Casting Config :</p>
        <div v-if="hasDecastStream"
          class="basic_stream_div_ flex flex-row justify-between items-center gap-12 w-full py-1 px-2">
          <div>https://decast.live/live</div>
          <div class="flex gap-2 justify-center items-center">
            <vs-button class="custm-style">
              <img src="@/assets/images/copy.svg" />
            </vs-button>
            <div class="basic_stream_btn_cont_">
              <vx-tooltip v-if="streamInfo[cast.public_meeting_id].stream_status" text="Pause Stream" position="bottom">
                <vs-button class="custm-style" @click="toggleStream(cast.public_meeting_id, 'pause')">
                  <img src="@/assets/images/pause_stream.svg" alt="" />
                </vs-button>
              </vx-tooltip>
              <vx-tooltip v-else text="Start Stream" position="bottom">
                <vs-button class="custm-style" @click="toggleStream(cast.public_meeting_id, 'start')">
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
              <vx-tooltip v-if="streamInfo[cast.public_meeting_id].stream_status" text="Pause Stream" position="bottom">
                <vs-button class="custm-style" @click="toggleStream(cast.public_meeting_id, 'pause')">
                  <img src="@/assets/images/pause_stream.svg" alt="" />
                </vs-button>
              </vx-tooltip>
              <vx-tooltip v-else text="Start Stream" position="bottom">
                <vs-button class="custm-style" @click="toggleStream(cast.public_meeting_id, 'start')">
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
              <vx-tooltip v-if="streamInfo[cast.public_meeting_id].stream_status" text="Pause Stream" position="bottom">
                <vs-button class="custm-style" @click="toggleStream(cast.public_meeting_id, 'pause')">
                  <img src="@/assets/images/pause_stream.svg" alt="" />
                </vs-button>
              </vx-tooltip>
              <vx-tooltip v-else text="Start Stream" position="bottom">
                <vs-button class="custm-style" @click="toggleStream(cast.public_meeting_id, 'start')">
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
              <vx-tooltip v-if="streamInfo[cast.public_meeting_id].stream_status" text="Pause Stream" position="bottom">
                <vs-button class="custm-style" @click="toggleStream(cast.public_meeting_id, 'pause')">
                  <img src="@/assets/images/pause_stream.svg" alt="" />
                </vs-button>
              </vx-tooltip>
              <vx-tooltip v-else text="Start Stream" position="bottom">
                <vs-button class="custm-style" @click="toggleStream(cast.public_meeting_id, 'start')">
                  <img src="@/assets/images/start_stream.svg" alt="" />
                </vs-button>
              </vx-tooltip>
            </div>
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

export default {
  name: 'CastCard',
  props: [
    'streamInfo',
    'castsInfo',
    'cast',
    'index',
    'setProps',
    'stepOneProps',
    'stepTwoProps',
    'stepThreeProps',
    'stepFourProps',
    'getCastList',
  ],
  data() {
    return {
      isLoading: false,
      activeModal: '',
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
            this.setProps(this.cast.public_meeting_id);
            this.setCastModal('callSettingsModal');
          },
        },
        {
          label: 'Stream settings',
          icon: () => import('@/assets/svgs/menu-icons/stream.vue'),
          onClick: () => {
            this.setProps(this.cast.public_meeting_id);
            this.setCastModal('streamingModal');
          },
        },
        {
          label: 'Reschedule cast',
          icon: () => import('@/assets/svgs/menu-icons/reschedule.vue'),
          onClick: () => {
            this.setProps(this.cast.public_meeting_id);
            this.setCastModal('resheduleCastModal');
          },
        },
        {
          label: 'Edit',
          icon: () => import('@/assets/svgs/menu-icons/pen.vue'),
          onClick: () => {
            this.setProps(this.cast.public_meeting_id);
            this.setCastModal('editCastModal');
          },
        },
        {
          label: 'Postpone cast',
          icon: () => import('@/assets/svgs/menu-icons/prepone.vue'),
          onClick: () => {
            this.setProps(this.cast.public_meeting_id);
            this.setCastModal('postponeCastModal');
          },
        },
        {
          label: 'Delete',
          icon: () => import('@/assets/svgs/menu-icons/delete.vue'),
          onClick: () => {
            this.setProps(this.cast.public_meeting_id);
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
  },
  mounted() {
  },
  computed: {
    hasYoutubeStream() {
      const streamInfo = this.streamInfo[this.cast.public_meeting_id];
      return streamInfo && streamInfo.stream_urls.includes('youtube.com');
    },
    hasTwitchStream() {
      const streamInfo = this.streamInfo[this.cast.public_meeting_id];
      return streamInfo && streamInfo.stream_urls.includes('twitch.tv');
    },
    hasFacebookStream() {
      const streamInfo = this.streamInfo[this.cast.public_meeting_id];
      return streamInfo && streamInfo.stream_urls.includes('facebook.com');
    },
    hasDecastStream() {
      const streamInfo = this.streamInfo[this.cast.public_meeting_id];
      return streamInfo && streamInfo.stream_urls.includes('video.wiki');
    },
  },
  methods: {
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
          // this.resetShowTooltip2();
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
  max-width: 495px;
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

.inner-child1 {
  /* border: 1px solid red; */
  width: 35vw;
  max-width: 480px;
}

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
}</style>
