<template>
  <div class="stream-cont">
    <div class="head-container">
      <h3>Share setting</h3>
      <button>
        <img src="@/assets/images/cross.svg" />
      </button>
    </div>

    <div class="main-cont">
      <div class="child-div-1">
        <div class="inner-div-1">
          <img src="@/assets/images/meeting.svg" />
        </div>
        <div class="inner-div-2">
          <h3>VideoWiki Streaming</h3>
          <p>For streaming the event on VideoWiki, choose this option, and
            you will receive the stream page address in your email.
          </p>
        </div>
      </div>

      <div class="toggle-switch" @click="toggleSwitch1">
        <input type="checkbox" v-model="isChecked1" class="checkbox" />
        <label class="slider"></label>
      </div>
    </div>

    <div class="mid-stroke">
      <div>
        <h3>Third Party Streaming</h3>
      </div>

      <div></div>
    </div>

    <div class="main-cont">
      <div class="child-div-1">
        <div class="inner-div-1">
          <img src="@/assets/images/youtube.svg" />
        </div>
        <div class="inner-div-2">
          <h3>YouTube</h3>
          <p class="desc">You can stream your event on YouTube. - Server URL address: - Stream name/key:
          </p>
        </div>
      </div>

      <div class="toggle-switch" @click="toggleSwitch2">
        <input type="checkbox" v-model="isChecked2" class="checkbox" />
        <label class="slider"></label>
      </div>
    </div>

    <div class="isVisible"  v-if="showContent">
      <div>
        <label>Youtube RTMP Url</label>
        <input/>
      </div>
      <div>
        <label>Youtube Secret Key</label>
        <input/>
      </div>
    </div>

    <div class="main-cont">
      <div class="child-div-1">
        <div class="inner-div-1">
          <img src="@/assets/images/facebook.svg" />
        </div>
        <div class="inner-div-2">
          <h3>Facebook</h3>
          <p class="desc">You can stream your event on Facebook. - Server URL address: - Stream name/key:
          </p>
        </div>
      </div>

      <div class="toggle-switch" @click="toggleSwitch3">
        <input type="checkbox" v-model="isChecked3" class="checkbox" />
        <label class="slider"></label>
      </div>
    </div>

    <div class="main-cont">
      <div class="child-div-1">
        <div class="inner-div-1">
          <img src="@/assets/images/twitch.svg" />
        </div>
        <div class="inner-div-2">
          <h3>Twitch</h3>
          <p class="desc">You can stream your event on Twitch. - Server URL address: - Stream name/key:
          </p>
        </div>
      </div>

      <div class="toggle-switch" @click="toggleSwitch4">
        <input type="checkbox" v-model="isChecked4" class="checkbox" />
        <label class="slider"></label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StreamCard',
  props: {
    showStream: Boolean,
  },
  data() {
    return {
      isChecked1: false, 
      isChecked2: false,
      isChecked3: false,
      isChecked4: false,
      showContent:false,
    }
  },
  mounted() {
    document.getElementById('loading-bg').style.display = 'none';
  },
  methods: {
    toggleSwitch1() {
      this.isChecked1 = !this.isChecked1;
    },
    toggleSwitch2() {
      this.isChecked2 = !this.isChecked2;
      this.showContent = !this.showContent;
    },
    toggleSwitch3() {
      this.isChecked3 = !this.isChecked3;
    },
    toggleSwitch4() {
      this.isChecked4 = !this.isChecked4;
    },
  }
}
</script>


<style scoped>
.toggle-switch {
  display: inline-block;
  position: relative;
  width: 33px;
  height: 16px;
  margin-top: 6px;
}

.checkbox {
  display: none;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #353D4E;
  transition: 0.4s;
  border-radius: 30px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 2px;
  /* bottom: 2px; */
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

.checkbox:checked+.slider {
  background-color: #2196f3;
}

.checkbox:checked+.slider:before {
  transform: translateX(16px);
}
</style>

<style>
.stream-cont {
  /* position: absolute; */
  width: 590px;
  height: auto;
  border-radius: 10px;
  background-color: #1f272f;
  border: 1px solid #31394e;
  padding: 15px;
  padding-bottom: 25px;
  margin: auto;
  margin-top: 20px;
  /* top: 40vh; */
  /* right: 75%; */
  /* transform: translate(-50%, -50%); */
  /* z-index: 10000; */
}

.head-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  color: #a6a6a8;
}

.head-container h3 {
  font-size: 14px;
  font-weight: 600px;
  color: #a6a6a8;
}

.head-container button {
  background-color: #1f272f;
  border: none;
  cursor: pointer;
}

.main-cont {
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 30px;
}

.child-div-1 {
  display: flex;
  width: 360px;
  gap: 10px;
}

.inner-div-1 {
  width: fit-content;
}

.inner-div-1 img {
  width: 18px;
  height: auto;
  max-height: 19.5px;
}

.inner-div-2 {
  width: fit-content;
}

.inner-div-2 h3 {
  font-size: 13px;
  font-weight: 600;
  line-height: 15.2px;
  color: #A6A6A8;
}

.inner-div-2 p {
  font-size: 11px;
  font-weight: 400;
  line-height: 14.03px;
  color: #637181;
  width: 355px;
  /* border: 1px solid red; */
  margin-top: 6px;
}

.mid-stroke {
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
}

.mid-stroke div h3 {
  font-size: 13px;
  font-weight: 600;
  line-height: 15.2px;
  color: #A6A6A8;
}

.mid-stroke div:nth-child(2) {
  width: 395px;
  border: 1px solid #31394E;
  margin: auto;
}

.desc {
  width: max-content !important;
  /* border: 1px solid red; */
}

.isVisible{
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 15px;
  gap: 15px;
}

.isVisible label{
  color: #637181;
  font-size: 12px;
  font-weight: 600;
}

.isVisible input{
  background-color: #1D232B;
  width: 271px;
  height: 40px;
  border: 1px solid #31394E;
  border-radius: 6px;
  padding: 6px;
  color: #A6A6A8;
}
</style>