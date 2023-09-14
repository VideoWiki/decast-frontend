<template>
  <div class="main-containr">
    <div class="center-containr">
      <div class="heading-part flex">
        <div class="heading">Set up your cast</div>
        <img src="@/assets/images/editor/cross.svg" alt="" />
      </div>
      <div class="buttons flex">
        <button
          class="button-1"
          :style="{
            backgroundColor: activeTab === 'Set up' ? '#464775' : '#1F272F',
            color:
              activeTab === 'Set up'
                ? 'rgba(255, 255, 255, 0.8) '
                : 'rgba(166, 166, 168, 0.8)',
          }"
          @click="activeTab = 'Set up'"
        >
          Set up
        </button>
        <button
          class="button-2"
          :style="{
            backgroundColor: activeTab === 'Branding' ? '#464775' : '#1F272F',
            color:
              activeTab === 'Branding'
                ? 'rgba(255, 255, 255, 0.8)'
                : 'rgba(166, 166, 168, 0.8)',
          }"
          @click="activeTab = 'Branding'"
        >
          Branding
        </button>
        <button
          class="button-3"
          :style="{
            backgroundColor: activeTab === 'Settings' ? '#464775' : '#1F272F',
            color:
              activeTab === 'Settings'
                ? 'rgba(255, 255, 255, 0.8)'
                : 'rgba(166, 166, 168, 0.8)',
          }"
          @click="activeTab = 'Settings'"
        >
          Settings
        </button>
      </div>
      <div class="tab-content">
        <SetUpTab v-if="activeTab === 'Set up'" :stepOneProps="stepOneProps" />
        <BrandingTab
          v-else-if="activeTab === 'Branding'"
          :stepTwoProps="stepTwoProps"
        />
        <SettingsTab v-else :stepFourProps="stepFourProps" />
      </div>
    </div>
  </div>
</template>
<script>
import BrandingTab from './Tabs/BrandingTab.vue';
import SettingsTab from './Tabs/SettingsTab.vue';
import SetUpTab from './Tabs/SetUpTab.vue';
export default {
  name: 'SetUpCast',
  components: {
    BrandingTab,
    SettingsTab,
    SetUpTab,
  },
  data() {
    return {
      activeTab: 'Set up',
      stepOneProps: {
        generated_event_title: '',
        event_name: '',
        invalidTimeError: false,
        moderator_password: '',
        attendee_password: '',
        meeting_type: '',
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
        mint_function_name: '',
        mintfnc_name_error: false,
        contract_address: '',
        contract_address_error: false,
        aib: '',
        aib_error: false,
        parameter: '',
        parameter_error: false,
        network: '4',
        audienceAirdrop: false,
        airdropType: 'NFTs',
        price: '',
        startD: 0,
        price_error: false,
        nft_description: '',
        nft_description_error: false,
        nft_image: '',
        nft_image_error: false,
        password_auth: false,
        auth_type: 'public',
        meeting_auth_error: false,
        send_otp: false,
        public_auth: true,
        public_otp: false,
        give_nft: false,
        public_stream_nfts: 'true',
        public_nft_flow: false,
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
        moderator_only_text:
          'You are a Moderator, you can control who presents and participates in the live cast',
        guest_policy: '',
        welcome_text: '',
        showText: true,
        duration: '60',
        logout_url: 'https://cast.video.wiki/postCast',
      },
      stepThreeProps: {
        vw_stream: false,
        vw_stream_url: [{ vw_stream: '' }, { urls: [] }],
        is_streaming: false,
        public_stream: false,
      },
      stepFourProps: {
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
        lock_on_join: '',
        viewer_mode: '',
        viewer_password: '',
        listen_only_mode: true,
        webcam_enable: false,
        screen_sharing: true,
        restrict_participants: false,
        meeting_settings: false,
      },
    };
  },
  mounted() {
    document.getElementById('loading-bg').style.display = 'none';
  },
  methods: {
    changeActiveTab(tab) {
      this.activeTab = tab;
    },
  },
};
</script>
<style scoped>
*:not(i) {
  font-family: 'Karla', sans-serif;
}
.main-containr {
  max-height: 600px;
  min-width: auto;
  overflow: auto;
  width: 583px;
  border: 1px solid #31394e;
  background-color: #1f272f;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  margin: auto;
  padding: 18px;
  margin-top: 100px;
}
.heading-part {
  justify-content: space-between;
}
.heading-part img {
  width: 12px;
  height: 12px;
  color: #647181;
  cursor: pointer;
}
.heading {
  color: #a6a6a8;
  font-size: 14px;
  font-weight: 600;
}
.buttons {
  margin-top: 23px;
}
.buttons button {
  width: 180px;
  height: 40px;
  border: 1px solid #31394e;
  font-size: 12px;
  font-weight: 600;
  color: #a6a6a8;
  background-color: #1f272f;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.button-1 {
  border-radius: 6px 0px 0px 6px;
}
.button-3 {
  border-radius: 0px 6px 6px 0px;
}
</style>
