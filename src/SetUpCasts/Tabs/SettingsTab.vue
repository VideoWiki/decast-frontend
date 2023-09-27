<template>
  <div class="wrapper">
    <div class="tab-content" v-if="activeTab !== ''">
      <div class="button-first">
        <button  v-if="activeTab === 'BigMeetingPopup'" class="bigMeeting">
          <img src="@/assets/images/editor/Vector10.svg" @click="tabChange()" />
          <label>Big Meeting</label>
        </button>
        <button v-if="activeTab === 'WebinarPopup'" class="webinar">
          <img src="@/assets/images/editor/Vector10.svg" @click="tabChange()" />
          <label>Webinar</label>
        </button>
        <button v-if="activeTab === 'BroadcastPopup'" class="broadcast">
          <img src="@/assets/images/editor/Vector10.svg" @click="tabChange()" />
          <label>Broadcast</label>
        </button>
        <button v-if="activeTab === 'CustomPopup'" class="custom">
          <img src="@/assets/images/editor/Vector10.svg" @click="tabChange()" />
          <label>Custom</label>
        </button>
      </div>
      <big-meeting-popup :stepFourProps="stepFourProps" :activeTab="activeTab" />
    </div>
    <div v-if="activeTab === ''">
      <div class="heading-text">You can edit these settings at any time</div>
      <div class="first-row flex">
        <button @click="activeTab = 'BigMeetingPopup'" class="box box1">
          <div class="box-imges">
            <img
              src="@/assets/images/editor/Vector4.svg"
              class="left-img box1-left"
            />
          </div>
          <div class="define-text">Big Meeting</div>
          <div class="info-text">Collaborate with others and work together</div>
        </button>
        <button @click="activeTab = 'WebinarPopup'" class="box box2">
          <div class="box-imges">
            <img
              src="@/assets/images/editor/Vector6.svg"
              class="left-img box2-left"
            />
          </div>
          <div class="define-text">Webinar</div>
          <div class="info-text">Create an engaging experience</div>
        </button>
      </div>
      <div class="second-row flex">
        <button @click="activeTab = 'BroadcastPopup'" class="box box3">
          <div class="box-imges">
            <img
              src="@/assets/images/editor/Vector7.svg"
              class="left-img box3-left"
            />
          </div>
          <div class="define-text">Broadcast</div>
          <div class="info-text">Broadcast your screen to others all over</div>
        </button>
        <button @click="activeTab = 'CustomPopup'" class="box box4">
          <div class="box-imges">
            <img
              src="@/assets/images/editor/Vector8.svg"
              class="left-img box4-left"
            />
          </div>
          <div class="define-text">Custom</div>
          <div class="info-text">Share knowledge with others and engage</div>
        </button>
      </div>
    </div>
    <div class="button cursor-pointer">
      <button class="cursor-pointer" @click="createCast">Create Cast</button>
    </div>
  </div>
</template>
<script>
import BigMeetingPopup from './settingTabPopups/BigMeetingPopup.vue';

export default {
  name: 'SettingsTab',
  components: {
    BigMeetingPopup,
  },
  props: ['createCast', 'stepFourProps'],
  data() {
    return {
      activeTab: '',
    };
  },
  methods: {
    tabChange() {
      this.activeTab = '';
    },
  },
  mounted(){
    console.log(this.activeTab , "sTab")
  },
  computed: {
    activeTabComponent() {
      switch (this.activeTab) {
        case 'BigMeetingPopup':
          return BigMeetingPopup;
        case 'WebinarPopup':
          return BigMeetingPopup;
        case 'BroadcastPopup':
          return BigMeetingPopup; 
        case 'CustomPopup':
          return BigMeetingPopup;   
        default:
          return null;
      }
    },
  },
};
</script>
<style scoped>
*:not(i) {
  font-family: 'Karla', sans-serif;
}
.wrapper {
  display: flex;
  flex-direction: column;
}
.button-first {
  margin-top: 15px;
}
.button-first button {
  width: 541px;
  height: 42px;
  border-radius: 6px;
  display: flex;
  align-self: flex-start;
  align-items: center;
}
.bigMeeting{
  background-color: #1dd3c8;
  border: 1px solid #1dd3c8;
}
.custom{
  background-color: #33DB79;
  border: 1px solid #33DB79;
}
.broadcast{
  background-color: #ADEB5A;
  border: 1px solid #ADEB5A;
}
.webinar{
  background-color: #8CD0FF;
  border: 1px solid #8CD0FF;
}
.button-first button img {
  width: 12px;
  height: 10px;
  margin-left: 14px;
  cursor: pointer;
}
.button-first button label {
  font-weight: 600;
  font-size: 14px;
  color: #1f272f;
  margin-left: 12px;
}
.first-row,
.second-row {
  justify-content: space-between;
}
.heading-text {
  margin-top: 26px;
  font-weight: 600;
  font-size: 11px;
  color: #a6a6a8;
}
.box {
  margin-top: 12px;
  width: 261px;
  height: 128px;
  border-radius: 6px;
  padding: 5px;
  padding-left: 25px;
}
.box-imges {
  display: flex;
  justify-content: space-between;
}
.left-img {
  margin-top: 18px;
}
.box1-left {
  width: 21px;
  height: 15px;
}
.box1-right {
  width: 4px;
  height: 20px;
  margin-top: -3px;
  margin-right: 5px;
}
.define-text {
  margin-top: 35px;
  font-size: 14px;
  font-weight: 600;
  color: #1f272f;
  display: flex;
  align-self: flex-start;
}
.info-text {
  margin-top: 6px;
  font-size: 11px;
  font-weight: 500;
  color: #1f272f;
  display: flex;
  align-self: flex-start;
}
.box1 {
  background: #1dfbeccf;
  border: 1px solid #1dfbeccf;
}
.box2 {
  background: #8cd0ff;
  border: 1px solid #8cd0ff;
}
.box3 {
  background: #adeb5a;
  border: 1px solid #adeb5a;
}
.box4 {
  background: #33db79;
  border: 1px solid #33db79;
}
.box2-left {
  width: 16px;
  height: 16px;
}
.box3-left {
  width: 24px;
  height: 16px;
}
.box3-right {
  width: 20px;
  height: 20px;
  margin-top: -5px;
}
.box4-left {
  width: 16px;
  height: 16px;
}
.box4-right {
  width: 20px;
  height: 20px;
  margin-top: -5px;
}
.button {
  align-self: flex-end;
  margin-top: 25px;
}
.button button {
  width: 141px;
  height: 40px;
  border: 1px solid #31394e;
  background-color: #d7df23;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 700;
  color: #1f272f;
}
</style>
