<template>
  <div class="dashboard-container mx-auto">
    <div class="left-container flex justify-items-center flex-col">
      <div class="welcome-text">
        <div class="text">Welcome User!</div>
        <div class="text">What are we starting today?</div>
      </div>
      <div class="box">
        <div class="first-row flex">
          <div class="maintext">User’s Main Room</div>
          <img src="@/assets/images/dashboard/dots.svg" />
        </div>
        <div class="desc-text">Something here</div>
        <div class="button-full">
          <FullLengthButton :buttonName="forRoom" />
        </div>
      </div>
      <div class="box">
        <div class="first-row flex">
          <div class="maintext">Cast</div>
          <img src="@/assets/images/dashboard/dots.svg" />
        </div>
        <div class="desc-text">
          Start a cast now or schedule one for the future
        </div>
        <div class="button-full">
          <FullLengthButton :buttonName="forCast" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import FullLengthButton from './Buttons/fullLengthButton.vue';
export default {
  name: 'DashBoardLeftPart',
  components: {
    FullLengthButton,
  },
  data() {
    return {
      forRoom: 'Start Session',
      forCast: 'Create a Cast',
    };
  },
};
</script>
<style scoped>
*:not(i) {
  font-family: 'Karla', sans-serif !important;
}
.dashboard-container {
  font-family: 'Karla', sans-serif;
}

.text {
  font-style: italic;
  font-size: 24px;
  font-weight: 500;
  color: #ffffff;
}
.box {
  padding: 12px;
  margin-top: 40px;
  width: 239px;
  height: 143px;
  border-radius: 6px;
  border: 1px solid #31394e;
  background-color: #181a20;
}
.first-row {
  font-weight: 500;
  font-size: 16px;
  color: #a6a6a8;
  justify-content: space-between;
}
.first-row img {
  width: 4px;
  height: 16px;
}
.desc-text {
  margin-top: 12px;
  font-weight: 400;
  font-size: 11px;
  color: #a6a6a8;
}
.button-full {
  margin-top: 12px;
}
</style>
