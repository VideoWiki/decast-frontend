<template>
  <div>
    <div class="main-container">
      <div class="close-btn-cont">
        <button>
          <img src="@/assets/images/cross.svg" />
        </button>
      </div>
      <div class="choice-container">
        <div class="choose-opt">
          <button
            class="options-button border-none"
            @click="changeFocus(true)"
            :class="{ 'focused-button': focusReschedule }"
          >
            Reschedule
          </button>
          <button
            class="options-button border-none px-5"
            @click="changeFocus(false)"
            :class="{ 'focused-button': !focusReschedule }"
          >
            Postpone
          </button>
        </div>

        <div v-if="focusReschedule" class="reschedule">
          <div class="fisrt-desc">
            <p>
              Choose a day and time in the future you want your cast to be live.
            </p>
          </div>

          <div class="cal-cont">
            <div>
              <img src="@/assets/images/date.svg" />
            </div>

            <div>
              <p>Date</p>
              <div class="date">
                <Calendar :stepOneProps="stepOneProps" class="calendar" />
              </div>
            </div>
          </div>

          <div class="time-cont">
            <div class="child1">
              <div>
                <img src="@/assets/images/timer.svg" />
              </div>

              <div id="startTimeSelect" @click="openPopup('selectStart')">
                <p>Start time</p>
                <p>{{ startTime }}</p>
                <div v-if="selectStart" class="options-list1">
                  <span
                    class="timeOption"
                    v-for="time in timeOptions"
                    @click="setStartTime(time)"
                    :key="time.label"
                  >
                    {{ time.label }}
                  </span>
                </div>
              </div>
            </div>
            <div
              class="child2"
              id="endTimeSelect"
              @click="openPopup('selectEnd')"
            >
              <p>End time</p>
              <p>{{ endTime }}</p>
            </div>
            <div v-if="selectEnd" class="options-list2">
              <span
                class="timeOption"
                v-for="time in timeOptions"
                @click="setEndTime(time)"
                :key="time.label"
              >
                {{ time.label }}
              </span>
            </div>
          </div>

          <div class="resc-btn">
            <button>Reschedule</button>
          </div>
        </div>

        <div v-else class="postpone">
          <div class="sec-desc">
            <p>This cast has been postponed.</p>
          </div>

          <div class="text-ar">
            <textarea placeholder="Send message to all participants">
            </textarea>
          </div>

          <div class="send-btn">
            <button>Send</button>
          </div>
        </div>
      </div>
    </div>
    <div class="choice-container">
      <div class="choose-opt">
        <button
          class="options-button border-none"
          @click="changeFocus(true)"
          :class="{ 'focused-button': focusReschedule }"
        >
          Reschedule
        </button>
        <button
          class="options-button border-none px-5"
          @click="changeFocus(false)"
          :class="{ 'focused-button': !focusReschedule }"
        >
          Postpone
        </button>
      </div>

      <div v-if="focusReschedule" class="reschedule">
        <div class="fisrt-desc">
          <p>
            Choose a day and time in the future you want your cast to be live.
          </p>
        </div>

        <div class="cal-cont">
          <div>
            <img src="@/assets/images/date.svg" />
          </div>

          <div>
            <p>Date</p>
            <p>November 7,2023</p>
          </div>
        </div>

        <div class="time-cont">
          <div class="child1">
            <div>
              <img src="@/assets/images/timer.svg" />
            </div>

            <div>
              <p>Start time</p>
              <p>12:30 pm</p>
            </div>
          </div>
          <div class="child2">
            <p>End time</p>
            <p>02:30 pm</p>
          </div>
        </div>

        <div class="resc-btn">
          <button>Reschedule</button>
        </div>
      </div>

      <div v-else class="postpone">
        <div class="sec-desc">
          <p>This cast has been postponed.</p>
        </div>

        <div class="text-ar">
          <textarea placeholder="Send message to all participants"> </textarea>
        </div>

        <div class="send-btn">
          <button>Send</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { TimeFrames } from '../../SetUpCasts/Tabs/TimeFrames';
import Calendar from '../login/Calendar.vue';
import moment from 'moment-timezone';
export default {
  name: 'postPoneCast',
  components: {
    Calendar,
  },
  props: {
    showPostpone: Boolean,
  },
  data() {
    return {
      focusReschedule: true,
      stepOneProps: {},
      moment,
      startTime: null,
      endTime: null,
      selectStart: false,
      selectEnd: false,
      timeOptions: TimeFrames,
    };
  },
  mounted() {
    document.getElementById('loading-bg').style.display = 'none';
    window.addEventListener('click', this.closePopups);
  },
  beforeDestroy() {
    window.removeEventListener('click', this.closePopups);
  },
  methods: {
    changeFocus(toPostpone) {
      this.focusReschedule = toPostpone;
      console.log('EEEE');
    },
    openPopup(popup) {
      setTimeout(() => {
        console.log(this[popup]);
        this[popup] = !this[popup];
      }, 1);
    },
    setStartTime(time) {
      this.startTime = time.label;
      this.selectStart = false;
      console.log('Start');
    },
    setEndTime(time) {
      this.endTime = time.label;
      this.selectEnd = false;
      console.log('End');
    },
    closePopups() {
      console.log('click');
      if (this.selectStart) this.selectStart = false;
      if (this.selectEnd) this.selectEnd = false;
    },
  },
};
</script>

<style>
.main-container {
  width: 285px;
  height: 310px;
  margin: auto;
  background-color: #1f272f;
  border: 1px solid #31394e;
  border-radius: 10px;
  padding: 10px;
  margin-top: 2rem;
}

.close-btn-cont {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.close-btn-cont button {
  width: 14px;
  height: 14px;
  background: transparent;
  border: none;
  cursor: pointer;
}

.close-btn-cont button img {
  width: 12px;
  height: 12px;
}

.choose-opt {
  width: 180px;
  background-color: #31394e;
  border-radius: 6px;
  height: 27px;
}

.options-button {
  background: transparent;
  font-size: 12px;
  color: #a6a6a8;
  border: none;
  cursor: pointer;
  width: 90px;
  height: 27px;
  border-radius: 6px;
}

#startTimeSelect {
  width: 100%;
  position: relative;
}

.focused-button {
  background-color: #31a2f4;
  color: #fff;
}

.fisrt-desc {
  width: 255px;
  margin-top: 10px;
}

.fisrt-desc p {
  font-size: 12px;
  color: #637181;
}

.sec-desc {
  width: 255px;
  margin-top: 10px;
}

.sec-desc p {
  font-size: 12px;
  color: #637181;
}

.text-ar {
  width: 255px;
  height: 145px;
  background-color: #1d232b;
  border-radius: 6px;
  margin-top: 10px;
}

.text-ar textarea {
  background: transparent;
  width: 100%;
  border-radius: 6px;
  height: 100%;
  border-color: #31394e;
  color: #a6a6a8;
  padding: 5px;
  font-size: 12px;
  resize: none;
}

.cal-cont,
.time-cont {
  width: 260px;
  display: flex;
  height: 60px;
  border: 1px solid #31394e;
  border-radius: 6px;
  margin-top: 10px;
  background-color: #242936;
  padding: 10px;
}

.cal-cont:active {
  border: 1px solid #d7df23;
}

.time-cont:active {
  border: 1px solid #d7df23;
}

.resc-btn,
.send-btn {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.resc-btn button,
.send-btn button {
  background-color: #31394e;
  border-radius: 6px;
  font-size: 12px;
  color: #a6a6a6;
  width: 95px;
  height: 27px;
  margin-top: 20px;
  border: none;
  cursor: pointer;
}

.cal-cont {
  gap: 10px;
}

.cal-cont div img {
  width: 13px;
  height: 14px;
}

.cal-cont div p {
  font-size: 12px;
}

.cal-cont div p:nth-child(2) {
  font-size: 14px;
  color: #a6a6a6;
}

.child1 {
  width: 50%;
  display: flex;
  gap: 10px;
  border-right: 1px solid #31394e;
}

.child1 div img {
  width: 13px;
  height: 14px;
}

.child1 div p {
  font-size: 12px;
}

.child1 div p:nth-child(2) {
  font-size: 14px;
  color: #a6a6a6;
}

.child2 p:nth-child(2) {
  font-size: 14px;
  color: #a6a6a6;
}

.child2 {
  width: 50%;
  padding-left: 10px;
}

.child2 p {
  font-size: 12px;
}

.custom-date-pick input {
  height: 30px !important;
  background: transparent;
  border: none;
  padding: 0;
  width: 120px;
  font-size: 14px;
}

.vdpClearInput {
  outline: none;
}

.vdpInnerWrap {
  margin-top: 0;
  margin-left: -42.5px;
}

.options-list1 {
  background-color: #31394e;
  border-radius: 6px;
  color: #a6a6a6;
  font-size: 12px;
  text-align: justify;
  position: absolute;
  z-index: 999;
  bottom: 100%;
  height: 150px;
  width: 100%;
  padding: 6px;
  overflow-y: scroll;
  cursor: pointer;
}

.timeOption {
  display: inline-block;
  width: 100%;
}

.timeOption:hover {
  background-color: #31394e93;
  color: white;
}

.options-list1::-webkit-scrollbar {
  width: 5px;
}

.options-list1::-webkit-scrollbar-thumb {
  background-color: #1d232b;
  border-radius: 4px;
  height: 8px;
}

.options-list2 {
  background-color: #31394e;
  border-radius: 6px;
  color: #a6a6a6;
  font-size: 12px;
  position: absolute;
  z-index: 999;
  height: 200px;
  width: 80px;
  padding: 6px;
  overflow-y: scroll;
  cursor: pointer;
  margin-top: 40px;
  margin-left: 130px;
}

.options-list2::-webkit-scrollbar {
  width: 5px;
}

.options-list2::-webkit-scrollbar-thumb {
  background-color: #1d232b;
  border-radius: 4px;
  height: 8px;
}
</style>
