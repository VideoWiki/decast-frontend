<template>
  <BaseModal :title="''" @close="closeModal">
    <template #modalContent>
      <div class="main-container" v-if="showPostpone">
        <!-- <div class="close-btn-cont">
          <button @click="closeModal">
            <img src="@/assets/images/cross.svg" />
          </button>
        </div> -->
        <div class="choice-container">
          <div class="choose-opt">
            <button class="options-button-cont border-none" @click="changeFocus(true)"
              :class="{ 'focused-btn': focusReschedule }">
              Reschedule
            </button>
            <button class="options-button-cont border-none px-5" @click="changeFocus(false)"
              :class="{ 'focused-btn': !focusReschedule }">
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
                <div id="date">
                  <Calendar :stepOneProps="stepOneProps" class="calendar" @date-selected="handleDateChange" />
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
                    <span class="timeOption" v-for="time in timeOptions" @click="setStartTime(time)" :key="time.label">
                      {{ time.label }}
                    </span>
                  </div>
                </div>
              </div>
              <div class="child2" id="endTimeSelect" @click="openPopup('selectEnd')">
                <p>End time</p>
                <p>{{ endTime }}</p>
              </div>
              <div v-if="selectEnd" class="options-list2">
                <span class="timeOption" v-for="time in timeOptions" @click="setEndTime(time)" :key="time.label">
                  {{ time.label }}
                </span>
              </div>
            </div>

            <div class="resc-btn">
              <button @click="formSubmit">
                Reschedule
                <svg v-if="isLoading" aria-hidden="true"
                  class="inline w-3 h-3 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400"
                  viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor" />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="#d7df23" />
                </svg>
              </button>
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
  </BaseModal>
</template>
  
<script>
import { TimeFrames } from '@/views/dashboard/cast-section/components/Tabs/TimeFrames';
import Calendar from '@/views/login/Calendar.vue';
import moment from 'moment-timezone';
import BaseModal from "@/components/common/BaseModal.vue";

export default {
  name: 'ResheduleCastModal',
  components: {
    Calendar,
    BaseModal,
  },
  props: {
    isLoading: false,
    cast_id: null,
    cast_name: null,
    description: null,
    timezone: null,
    cast_type: null,
    logo: null,
    cover_image: null,
    primary_color: null,
    banner_text: null,
    private_otp: null,
    welcome_text: null,
    guest_policy: null,
    logout_url: null,
    is_streaming: Boolean,
    allow_moderator_to_unmute_user: Boolean,
    auto_start_recording: Boolean,
    moderator_only_text: null,
    public_stream: null,
    bbb_stream_url: null,
    disable_cam: Boolean,
    disable_mic: Boolean,
    password_auth: Boolean,
    schedule: null,
    timeLeft: null,
    lock_layout: Boolean,
    mute_on_start: Boolean,
    end_when_no_moderator: Boolean,
    webcam_only_for_moderator: Boolean,
    viewer_mode: Boolean,
    record: null,
    collect_attendee_email: Boolean,
    closeModal: null,
    toPostpone: Boolean,
    getCastList: null,
  },
  data() {
    return {
      focusReschedule: this.toPostpone,
      stepOneProps: {},
      moment,
      selectedDate: null,
      startTime: null,
      endTime: null,
      selectStart: false,
      selectEnd: false,
      timeOptions: TimeFrames,
      showPostpone: true,
    };
  },
  watch: {
    schedule: {
      immediate: true,
      handler(newSchedule) {
        if (newSchedule) {
          const scheduleMoment = moment(newSchedule, 'YYYY-MM-DD HH:mm:ss');
          this.selectedDate = scheduleMoment.format('YYYY-MM-DD');
          this.stepOneProps = { startD: this.selectedDate };
          this.startTime = scheduleMoment.format('HH:mm:ss');
          if (this.timeLeft !== null && this.startTime !== null) {
            const startTimeMoment = moment(
              this.selectedDate + ' ' + this.startTime,
              'YYYY-MM-DD HH:mm:ss'
            );
            const endTimeMoment = startTimeMoment
              .clone()
              .add(this.timeLeft, 'minutes');
            this.endTime = endTimeMoment.format('HH:mm:ss');
            console.log(this.endTime);
            console.log(this.timeLeft);
          }
        }
      },
    },
  },
  mounted() {
    window.addEventListener('click', this.closePopups);
  },
  beforeDestroy() {
    window.removeEventListener('click', this.closePopups);
  },
  methods: {
    handleDateChange(selectedDate) {
      this.selectedDate = selectedDate;
      console.log(selectedDate, 'date');
    },
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
      if (this.selectStart) this.selectStart = false;
      if (this.selectEnd) this.selectEnd = false;
    },
    async formSubmit(id) {
      this.isLoading = true;
      const startTimeMoment = moment(
        this.selectedDate + ' ' + this.startTime,
        'YYYY-MM-DD HH:mm'
      );
      const endTimeMoment = moment(
        this.selectedDate + ' ' + this.endTime,
        'YYYY-MM-DD HH:mm'
      );
      const durationMinutes = endTimeMoment.diff(startTimeMoment, 'minutes');

      const formattedDate = moment(this.selectedDate).format('YYYY-MM-DD');
      const formattedStartTime = moment(this.startTime, 'hh:mm A').format(
        'HH:mm:ss'
      );

      // Combine the date and time in the correct format
      const scheduleTime = `${formattedDate} ${formattedStartTime}`;
      const payload = {
        allow_moderator_to_unmute_user: this.allow_moderator_to_unmute_user,
        auto_start_recording: this.auto_start_recording,
        bbb_stream_url: this.bbb_stream_url,
        cast_id: this.cast_id,
        cast_name: this.cast_name,
        cast_type: this.cast_type,
        description: this.description,
        duration: durationMinutes,
        disable_cam: this.disable_cam,
        disable_mic: this.disable_mic,
        date: this.selectedDate,
        startTime: this.startTime,
        endTime: this.endTime,
        end_when_no_moderator: this.end_when_no_moderator,
        mute_on_start: this.mute_on_start,
        lock_layout: this.lock_layout,
        is_streaming: this.is_streaming,
        public_stream: this.public_stream,
        private_otp: this.private_otp,
        password_auth: this.password_auth,
        schedule_time: scheduleTime,
        cover_image: this.cover_image,
        guest_policy: this.guest_policy,
        welcome_text: this.welcome_text,
        webcam_only_for_moderator: this.webcam_only_for_moderator,
        logo: this.logo,
        record: this.record,
        logout_url: this.logout_url,
        primary_color: this.primary_color,
        timezone: this.timezone,
        viewer_mode: this.viewer_mode,
        moderator_only_text: this.moderator_only_text,
        banner_text: this.banner_text,
        collect_attendee_email: this.collect_attendee_email,
      };
      try {
        await this.$store.dispatch('cast/formSubmit', payload);
        this.$vs.notify({
          title: 'Success',
          text: 'Changes Saved',
          color: 'success',
        });
        this.getCastList();
        this.isLoading = false;
        this.closeModal();
      } catch (e) {
        console.log(e);
        this.isLoading = false;
        this.$vs.notify({
          title: 'Error',
          text: 'Changes Not Saved',
          color: 'danger',
        });
      }
    },
  },
};
</script>
  
<style scoped>
.main-container {
  width: 100% !important;
  /* height: 310px; */
  height: unset !important;
  margin: auto;
  background-color: #1f272f;
  /* border: 1px solid #31394e; */
  border: none !important;
  border-radius: 10px;
  padding: 0px !important;
  /* padding: 10px; */
  margin-top: 0.5rem !important;
  z-index: 999;
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
  width: 100% !important;
  background-color: #31394e;
  border-radius: 6px;
  height: 27px;
  display: flex;
}

.options-button-cont {
  background: transparent;
  font-size: 12px;
  color: #a6a6a8;
  border: none;
  cursor: pointer;
  /* width: 90px; */
  flex: 1;
  height: 27px;
  border-radius: 6px;
}

#startTimeSelect {
  position: relative;
}

.focused-btn {
  background-color: #31a2f4;
  color: #fff;
}

.fisrt-desc {
  /* width: 255px; */
  width: 100% !important;
  margin-top: 10px;
}

.fisrt-desc p {
  font-size: 12px;
  text-align: left;
  color: #637181;
}

.sec-desc {
  /* width: 255px; */
  width: 100%;
  margin-top: 10px;
}

.sec-desc p {
  font-size: 12px;
  text-align: left;
  color: #637181;
}

.text-ar {
  /* width: 255px; */
  width: 100%;
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
  /* width: 260px; */
  display: flex;
  height: 60px;
  border: 1px solid #31394e;
  border-radius: 6px;
  margin-top: 10px;
  background-color: #242936;
  padding: 10px;
  width: 100% !important;
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
  text-align: left !important;
}

.cal-cont div p:nth-child(2) {
  font-size: 14px;
  color: #a6a6a6;
}

.child1 {
  width: 50%;
  justify-content: left;
  display: flex;
  gap: 10px;
  border-right: 1px solid #31394e;
  text-align: left !important;
}

.child1 div img {
  width: 13px;
  height: 14px;
}

.child1 div p {
  font-size: 12px;
  text-align: left !important;
}

.child1 div p:nth-child(2) {
  font-size: 14px;
  text-align: left !important;
  color: #a6a6a6;
}

.child2 p:nth-child(2) {
  font-size: 14px;
  color: #a6a6a6;
  text-align: left !important;
}

.child2 {
  width: 50%;
  padding-left: 10px;
}

.child2 p {
  font-size: 12px;
  text-align: left !important;
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
  width: 85px;
  padding: 6px;
  overflow-y: scroll;
  cursor: pointer;
  text-align: left !important;
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
  height: 150px;
  width: 85px;
  padding: 6px;
  text-align: left !important;
  overflow-y: scroll;
  cursor: pointer;
  /* top: 10%; */
  bottom: 20.5rem !important;
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

#date .calendar .calendar-container .custom-date-pick input {
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

#date .vdpInnerWrap {
  margin-top: -12.3rem;
  margin-left: -45px;
  width: 285px;
  height: 310px;
}

@media (max-width: 499px) {
  #date .vdpInnerWrap {
    width: 285px;
    height: 310px;
    margin-left: 40%;
    /* margin-right: -20%; */
    margin-top: 100px;
  }

  #date .vdpOuterWrap {
    background: transparent;
    width: 285px;
  }

  .child1,
  .child2 {
    position: relative;
  }

  .options-list2 {
    background-color: #31394e;
    border-radius: 6px;
    color: #a6a6a6;
    font-size: 12px;
    position: absolute;
    z-index: 999;
    height: 150px;
    width: 85px;
    padding: 6px;
    text-align: left !important;
    overflow-y: scroll;
    cursor: pointer;
    /* top: 10%; */
    bottom: auto !important;
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
}
</style>
  