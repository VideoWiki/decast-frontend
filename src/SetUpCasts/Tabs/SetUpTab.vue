<template>
  <div class="wrapper">
    <div class="cast-name">
      <div class="event-name">Cast name</div>
      <input
        id="eventName"
        type="text"
        v-model="stepOneProps.event_name"
        placeholder="e.g my friend hang out"
        @keyup="nameError = stepOneProps.event_name === ''"
      />
      <p v-if="nameError" class="text-danger m-0 p-0">Name is required</p>
    </div>
    <div class="cast-desc">
      <vs-textarea
        id="description"
        v-model="stepOneProps.description"
        placeholder="Quick description"
        class="desc"
        height="90px"
        @keyup="descriptionError = stepOneProps.description === ''"
      />
      <p v-if="descriptionError" class="text-danger m-0 p-0">
        description is required
      </p>
    </div>
    <div class="cast-time flex">
      <div class="date">
        <label class="text">Schedule your cast date and time</label>
        <div class="date">
          <Calendar :stepOneProps="stepOneProps" />
        </div>
      </div>
      <div class="input-date">
        <label for="startTimeSelect" class="text">Start Time</label>
        <div
          id="startTimeSelect"
          @click="openPopup('selectStart')"
          class="custom-dropdown1 input-box"
        >
          {{ stepOneProps.startTime }}
          <i class="arrow"></i>
          <div v-if="selectStart" class="options-list">
            <span
              class="timeOption"
              v-for="time in timeOptions"
              @click="stepOneProps.startTime = time.value"
              :key="time.label"
            >
              {{ time.label }}
            </span>
          </div>
        </div>
      </div>
      <div>
        <label for="endTimeSelect" class="text">End Time</label>
        <div
          id="endTimeSelect"
          @click="openPopup('selectEnd')"
          class="custom-dropdown1 input-box"
        >
          {{ selectedEndTime }}
          <i class="arrow"></i>
          <div v-if="selectEnd" class="options-list">
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
      </div>
      <div class="time-zone">
        <label class="text">Time zone</label>
        <div
          @click="openPopup('selectTimeZone')"
          class="timezone-dropdown1 input-box"
        >
          {{ this.stepOneProps.timezone }}
          <div v-if="selectTimeZone" class="options-list w-full">
            <span
              class="timeOption"
              v-for="(item, index) in allTimeZone"
              @click="stepOneProps.timezone = item.value"
              :key="index"
            >
              {{ item.label }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="schedule-info">
      This call will take place on the
      {{ moment(stepOneProps.startD).format('ll') }} from
      {{ stepOneProps.startTime }} until
      {{ selectedEndTime }}
    </div>
    <div class="button cursor-pointer">
      <button class="cursor-pointer" @click="goNext">Next</button>
    </div>
  </div>
</template>
<script>
import allTimeZone from './allTimeZone';
import Calendar from '../../views/login/Calendar.vue';
import { TimeFrames } from './TimeFrames';
import moment from 'moment-timezone';
export default {
  name: 'SetUpTab',
  components: {
    Calendar,
  },
  props: ['stepOneProps', 'changeActiveTab'],
  data() {
    return {
      startH: null,
      moment,
      selectStart: false,
      selectTimeZone: false,
      selectEnd: false,
      selectedEndTime: null,
      timeOptions: TimeFrames,
      nameError: false,
      descriptionError: false,
      mostUsedTimezone: [
        { text: 'Asia/Calcutta', value: 'Asia/Kolkata' },
        { text: 'Europe/Lisbon', value: 'Europe/Lisbon' },
        { text: 'GMT', value: 'GMT' },
      ],
      allTimeZone,
      timezone: null,
    };
  },
  mounted() {
    const currentTime = moment();
    for (let i = 0; i < this.timeOptions.length; i++) {
      const time = moment(this.timeOptions[i].value, 'HH:mm:ss');
      console.log(time.isAfter(currentTime), this.timeOptions[i].value);
      if (time.isAfter(currentTime)) {
        this.stepOneProps.startTime = this.timeOptions[i].value;
        this.selectedEndTime = this.timeOptions[i + 1].value;
        console.log();
        break;
      }
    }
    window.addEventListener('click', () => {
      this.closePopups();
    });
  },
  watch: {
    selectEnd(newV, oldV) {
      console.log(newV);
    },
  },
  methods: {
    openPopup(popup) {
      setTimeout(() => {
        console.log(this[popup]);
        this[popup] = !this[popup];
      }, 1);
    },
    closePopups() {
      console.log('click');
      if (this.selectStart) this.selectStart = false;
      if (this.selectEnd) this.selectEnd = false;
      if (this.selectTimeZone) this.selectTimeZone = false;
    },
    setEndTime(time) {
      console.log(time);
      this.selectedEndTime = time.value;
      console.log(this.selectEnd);
    },
    goNext() {
      if (this.stepOneProps.event_name === '') {
        this.nameError = true;
      } else if (this.stepOneProps.description === '') {
        this.descriptionError = true;
      } else {
        this.changeActiveTab('Branding');
      }
    },
  },
};
</script>
<style>
textarea {
  height: 100% !important;
}
</style>
<style scoped>
*:not(i) {
  font-family: 'Karla', sans-serif;
}
.wrapper {
  margin-top: 22px;
  display: flex;
  flex-direction: column;
}
.event-name {
  font-weight: 600;
  font-size: 12px;
  color: #637181;
  margin-bottom: 6px;
}

.timeOption {
  padding: 10px;
  display: inline-block;
  width: 100%;
}

.timeOption:hover {
  background-color: #31394e93;
  color: white;
}

.cast-name input {
  width: 541px;
  height: 40px;
  border: 1px solid #31394e;
  background-color: #1d232b;
  border-radius: 6px;
  color: #a6a6a8;
  font-size: 14px;
  font-weight: 500;
  padding-left: 14px;
}
.cast-desc {
  margin-top: 20px;
}

.desc {
  background-color: transparent !important;
  border: none !important;
  width: 541px;
  height: 100px;
  border: 1px solid #31394e !important;
  background-color: #1d232b !important;
  border-radius: 6px !important;
  color: #a6a6a8;
  font-size: 12px;
  font-weight: 500;
  margin: 0 !important;
}
.cast-time {
  margin-top: 12px;
}

.date {
  width: 196px;
}
.text {
  font-weight: 600;
  font-size: 12px;
  color: #637181;
  margin-bottom: 5px;
}
.input-box {
  border: 1px solid #31394e;
  background-color: #1f272f;
  color: #a6a6a8;
  font-weight: 500;
  font-size: 12px;
  text-align: justify;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  cursor: pointer;
  position: relative;
}

.options-list {
  position: absolute;
  bottom: 100%;
  left: 0;
  height: 300px;
  overflow: auto;
  background: #1d232b;
  width: 100px;
  overflow: hidden;
}

.options-list::-webkit-scrollbar {
  width: 5px;
}

.options-list::-webkit-scrollbar-thumb {
  background-color: #31394e;
  border-radius: 4px;
  height: 10px;
}

.arrow {
  border: solid #a6a6a8;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 2px;
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
}

.date input {
  width: 196px;
  border-radius: 6px;
  padding: 10px;
}
.time-zone {
  margin-left: 10px;
  min-width: 130px;
}
.zone {
  width: 125px;
}
.schedule-info {
  margin-top: 5px;
  font-weight: 400;
  font-size: 11px;
  color: #637181;
}
.button {
  align-self: flex-end;
  margin-top: 35px;
}
.button button {
  width: 141px;
  height: 40px;
  border: 1px solid #31394e;
  background-color: #d7df23;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  color: #1f272f;
}
.custom-dropdown1 {
  width: 100px;
  border-radius: 6px 0px 0px 6px;
  padding-left: 10px;
}

.timezone-dropdown1 {
  width: 100%;
  border-radius: 6px;
  padding-left: 10px;
}
.custom-dropdown2 {
  width: 100px;
  border-radius: 0px 6px 6px 0px;
  padding-left: 10px;
}
.input-date {
  margin-left: 10px;
}
</style>
