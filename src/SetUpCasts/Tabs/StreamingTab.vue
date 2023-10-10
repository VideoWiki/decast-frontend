<template>
  <div class="wrapper">
    <div class="uppar-wrap">
      <div class="wiki-stream flex">
        <div class="left flex">
          <img src="@/assets/images/editor/Vector22.svg" />
          <div class="info-text">
            <p class="main-info">VideoWiki Streaming</p>
            <p class="extra-info">
              For streaming the event on VideoWiki, choose this option and you
              will receive the stream page address in your email.
            </p>
          </div>
        </div>
        <buttonToggle
          v-model="toggleValueStream"
          class="toggle-button"
        ></buttonToggle>
      </div>
      <div class="private-stream flex">
        <div class="side-left flex">
          <img src="@/assets/images/editor/Vector23.svg" />
          <p class="main-info">Stream privately</p>
        </div>
        <buttonToggle
          v-model="toggleValueStreamPrivate"
          class="toggle-button"
        ></buttonToggle>
      </div>
    </div>
    <div class="lower-wrap">
      <div class="horizontal-line"></div>
      <div class="third-party flex" @click="ChangeStream">
        <p class="main-info">Third Party Streaming</p>
        <img
          v-if="this.ThirdPartyStreaming"
          src="@/assets/images/editor/Vector24.svg"
         
        />
        <img
          v-else="!this.ThirdPartyStreaming"
          src="@/assets/images/editor/Vector25.svg"
         
        />
      </div>
      <div class="horizontal-line"></div>
    </div>
    <div v-if="!this.ThirdPartyStreaming" class="if-third-streaming">
      <div class="youtube flex box">
        <div class="left-one flex">
          <img src="@/assets/images/editor/Vector26.svg" class="stream-img" />
          <div class="full-info">
            <p class="main-info">YouTube</p>
            <p class="extra-info">
              You can stream your event on YouTube. - Server URL address: -
              Stream name/key:
            </p>
          </div>
        </div>
        <img
          v-if="!DropdownforYoutube"
          src="@/assets/images/editor/Group.svg"
          @click="toggleDropdownYoutube"
        />
        <img
          v-else
          src="@/assets/images/editor/Group1.svg"
          @click="toggleDropdownYoutube"
        />
      </div>
      <div v-if="!DropdownforYoutube" class="dropDown-for-youtube">
        <div class="box-input">
          <p class="input-text">Youtube RTMP Url</p>
          <input type="text" />
        </div>
        <div class="box-input">
          <p class="input-text">Youtube Secret Key</p>
          <input type="text" />
        </div>
      </div>
      <div class="facebook flex box">
        <div class="left-one flex">
          <img src="@/assets/images/editor/Vector27.svg" class="stream-img" />
          <div class="full-info">
            <p class="main-info">Facebook</p>
            <p class="extra-info">
              You can stream your event on Facebook. - Server URL address: -
              Stream name/key:
            </p>
          </div>
        </div>
        <img
          v-if="!DropdownforFacebook"
          src="@/assets/images/editor/Group.svg"
          @click="toggleDropdownFacebook"
        />
        <img
          v-else
          src="@/assets/images/editor/Group1.svg"
          @click="toggleDropdownFacebook"
        />
      </div>
      <div class="twitch flex box">
        <div class="left-one flex">
          <img src="@/assets/images/editor/Vector28.svg" class="stream-img" />
          <div class="full-info">
            <p class="main-info">Twitch</p>
            <p class="extra-info">
              You can stream your event on Twitch. - Server URL address: -
              Stream name/key:
            </p>
          </div>
        </div>
        <img
          v-if="!DropdownforTwich"
          src="@/assets/images/editor/Group.svg"
          @click="toggleDropdownTwich"
        />
        <img
          v-else
          src="@/assets/images/editor/Group1.svg"
          @click="toggleDropdownTwich"
        />
      </div>
    </div>
    <div class="button cursor-pointer">
      <button class="cursor-pointer" @click="handleSubmit">Create Cast</button>
    </div>
  </div>
</template>
<script>
import buttonToggle from './buttonToggle.vue';
export default {
  name: 'Streaming',
  props: [
    'createCast',
    'stepFourProps',
    'stepOneProps',
    'stepThreeProps',
    'stepTwoProps',
    'castId',
    'closeCreate',
  ],
  data() {
    return {
      toggleValueStream: false,
      toggleValueStreamPrivate: false,
      ThirdPartyStreaming: true,
      DropdownforYoutube: false,
      DropdownforFacebook: false,
      DropdownforTwich: false,
    };
  },
  components: {
    buttonToggle,
  },
  methods: {
    ChangeStream() {
      this.ThirdPartyStreaming = !this.ThirdPartyStreaming;
    },
    toggleDropdownYoutube() {
      this.DropdownforYoutube = !this.DropdownforYoutube;
    },
    toggleDropdownFacebook() {
      this.DropdownforFacebook = !this.DropdownforFacebook;
    },
    toggleDropdownTwich() {
      this.DropdownforTwich = !this.DropdownforTwich;
    },
    handleSubmit() {
      if (this.createCast) {
        this.createCast();
      } else {
        console.log(this.castId);
      }
    },
  },
};
</script>
<style scoped>
*:not(i) {
  font-family: 'Karla', sans-serif;
}
.wiki-stream {
  margin-top: 29px;
  justify-content: space-between;
  align-items: center;
}
.left {
  align-items: center;
  width: 375px;
}
.left img {
  height: 10px;
  width: 14px;
  align-self: self-start;
  margin-top: 5px;
}
.info-text,
.full-info {
  margin-left: 16px;
}
.main-info {
  font-size: 13px;
  font-weight: 600;
  color: #a6a6a8;
}
.extra-info {
  font-size: 12px;
  font-weight: 400;
  color: #637181;
  margin-top: 6px;
}
.private-stream {
  width: 515px;
  height: 40px;
  border-radius: 6px;
  border: 1px solid #31394e;
  padding: 0px 17px;
  align-items: center;
  justify-content: space-between;
  margin: 8px auto;
}
.side-left {
  align-items: center;
}
.side-left img {
  width: 10px;
  height: 13px;
  margin-right: 16px;
}
.lower-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 514px;
  margin: 20px auto;
}
.third-party {
  width: 192px;
  height: 40px;
  border: Mixed solid #31394e;
  border-radius: 6px;
  background-color: #31394e;
  align-items: center;
  padding: 0px 16px;
  cursor: pointer;
}
.third-party img {
  width: 12px;
  height: 12px;
  margin-left: 10px;
}
.horizontal-line {
  width: 151px;
  height: 1px !important;
  background-color: #31394e;
}
.if-third-streaming {
  margin-top: -10px;
}
.box {
  justify-content: space-between;
  margin-top: 21px;
}
.stream-img {
  width: 15px;
  height: 15px;
  margin-top: 5px;
}
.dropDown-for-youtube {
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
}
.input-text {
  font-size: 12px;
  font-weight: 600px;
  color: #637181;
}
.box-input input {
  width: 265px;
  height: 40px;
  border: 1px solid #31394e;
  border-radius: 6px;
  background-color: #1d232b;
  padding: 0px 12px;
  color: #a6a6a8;
  font-size: 12px;
  font-weight: 500;
}

.button{
  display: flex;
  justify-content: flex-end;
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
  margin-top: 20px;
  /* align-items: end; */
}
</style>
