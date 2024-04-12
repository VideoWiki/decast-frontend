<template>
  <div>
    <div class="calendar-container">
      <date-pick v-model="stepOneProps.startD" :hasInputElement="true" :startWeekOnSunday="true"
        :isDateDisabled="isFutureDate" :inputAttributes="{ readonly: true }"
        :selectableYearRange="{ from: new Date().getFullYear(), to: 2099 }" class="custom-date-pick"
        @input="emitSelectedDate" ></date-pick>
    </div>
  </div>
</template>
  
<script>
import DatePick from 'vue-date-pick';
import 'vue-date-pick/dist/vueDatePick.css';

export default {
  components: { DatePick },
  data: () => ({
    date: '',
  }),
  props: ['stepOneProps'],
  methods: {
    isFutureDate(date) {
      const currentDate = new Date();
      return date < currentDate;
    },
    clearDate() {
      this.date = ''; // Clear the selected date
    },
    emitSelectedDate(selectedDate) {
      this.$emit('date-selected', selectedDate);
    },
  },
};
</script>
  
<style>
.custom-date-pick input {
  font-family: 'JetBrains Mono';
  border: 0px;
  background-color: #FFFFFF;
  width: 196px;
  padding: 0.5rem;
  margin-top: 0.5rem;
  /* height: 40px; */
  border-radius: 0px;
  color: #000000;
}

.calendar-container {
  position: relative;
  display: inline-block;
}

.clear-button {
  position: absolute;
  bottom: 10px;
  left: 10px;
}

.vdpInnerWrap {
  width: 280px;
  height: 337px;
  border-radius: 0px;
  border-top: 1px solid #FFFFFF;
  border-bottom: 2px solid #FFFFFF;
  border-left: 1px solid #FFFFFF;
  border-right: 2px solid #FFFFFF;
  background-color: #000000;
  color: #FFFFFF;
  margin: auto;
}

.vdpHeader {
  background-color: #000000;
  color: #a6a6a8;
}

.vdpFloating.vdpPositionBottom {
  bottom: 80% !important;
}

/* .vdpArrowPrev {
    background-color: #1f272f;
    border: 1px solid #31394e;
    border-radius: 50%;
    width: 27px;
    height: 27px;
    margin: 10px;
  }
  
  .vdpArrowNext {
    background-color: #181a20;
    border: 1px solid #31394e;
    border-radius: 50%;
    width: 27px;
    height: 27px;
    margin: 10px;
  } */

.vdpHeadCellContent {
  color: #a6a6a8;
  font-size: 11px;
  font-weight: 600;
}

.vdpPeriodControls .vdpPrevDirection,
.vdpNextDirection,
.vdpPeriodControl {
  color: #a6a6a8;
}

.vdpPeriodControls .vdpPeriodControl>button {
  color: #a6a6a8;
}

.vdpPeriodControls .vdpPeriodControl>select {
  color: #a6a6a8;
  background-color: #1f272f;
  border-radius: 5px;
  border: 1px solid #31394e;
  font-size: 14px;
  padding: 2px;
}

.vdpPeriodControls .vdpPeriodControl>select::-webkit-scrollbar {
  width: 6px;
}

.vdpPeriodControls .vdpPeriodControl>select::-webkit-scrollbar-thumb {
  background-color: #31394e;
  border-radius: 10px;
}

.vdpPeriodControls .vdpPeriodControl>select::-webkit-scrollbar-track {
  background-color: #1f272f;
}

.vdpCell.selectable:hover .vdpCellContent,
.vdpCell.selected .vdpCellContent {
  background: #FFFFFF;
  color: #000000;
  height: 22px;
  width: 22px;
  border-radius: 6px;
  font-size: 12px;
}

.vdpCell.today {
  color: #31a2f4;
}

.vdpTimeUnit>input:hover,
.vdpTimeUnit>input:focus {
  border-bottom-color: #cc99cd;
}

@media (max-width: 499px) {
  .vdpInnerWrap {
    position: absolute;
    top: 0;
    left: 60%;
    z-index: 999;
    border: 1px solid #31394e;
  }

  .calendar-container .vdpOuterWrap {
    background: transparent;
  }
}
</style>
  