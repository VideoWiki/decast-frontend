<template>
  <div class="margin">
    <div class="cross-img">
      <img
        @click="closeCreate"
        class="cursor-pointer"
        src="@/assets/images/create-event/Vector30.svg"
        alt=""
      />
    </div>
    
    <div class="popup-svg">
      <img src="@/assets/images/create-event/trophy.svg" />
    </div>
    <div class="popup-text2">Great your cast was created</div>
    <div class="extra-text">Next steps: </div>
    <div class="extra-text2">Add attendees, Add drops, Share ...etc</div>
    <div class="my-5 flex justify-center bottom">
      <button
        class="success-btn button flex  items-center"
      >
        <img src="@/assets/images/create-event/tabler.svg" /> Add drops
      </button>
      <button
        @click="changeStatus('invite')"
        class="success-btn button flex  items-center"
      >
        <img src="@/assets/images/create-event/tabler-icon.svg" />Invite your audience
      </button>
      <button
        class="success-btn button flex  items-center "
      >
        <img src="@/assets/images/create-event/Vector29.svg" />Share your cast
      </button>
    </div>
    <div class="skip">
      Skip for now
      <div class="underline"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: 'Hello, Vue!',
      showPopup: false, // Initially, the pop-up is hidden
    };
  },
  props: ['closeCreate', 'changeStatus'],
  mounted() {
    document.getElementById('loading-bg').style.display = 'none';
  },
  methods: {
    closePopup() {
      this.showPopup = false; // Close the popup when the SVG is clicked
      console.log('Popup closed');
    },
  },
};
</script>
<style scoped>
*:not(i) {
  font-family: 'Karla', sans-serif;
}
.margin {
  margin: 18px;
  display: flex;
  flex-direction: column;

}
.popup-text {
  font-family: Karla;
  font-size: 14px;
  font-weight: 600;
  line-height: 16.37px;
  letter-spacing: 0em;
  text-align: left;
  color: #a6a6a8;
}

.popup-svg {
  width: 133px;
  height: 120px;
  left: 2543px;
  margin: 0 auto;
  margin-top: 35px;
}

.popup-text2 {
  font-family: Karla;
  font-size: 20px;
  font-weight: 600;
  line-height: 23px;
  letter-spacing: 0em;
  text-align: center;
  color: #d7df23;
  padding-top: 22px;
}

.success-btn {
  display: flex;
  font-size: 12px;
  font-family: Karla;
  padding: 15px;
  font-weight: 600;
  border-radius: 6px;
  height: 40px;
  border: 1px;
  cursor: pointer;
 
}
.success-btn img{
  margin-right: 10px;
  margin-left: 80px;
}
.button{
  width: 297px;
  background-color: #31394E;
  color: #A6A6A8;
  margin-top: 15px;
}
.bottom{
  flex-direction: column;
  align-items: center;
}
.extra-text ,.extra-text2 {
  text-align: center;
  font-size: 500;
  font-weight: 16px;
  color: #647181;
}
.skip{
  margin-top: 50px;
  font-size: 16px;
  font-weight: 500;
  color: #647181;
  align-self: flex-end;
}
.underline{
  width: 93px;
  height: 2px;
  background-color: #31394E;
  margin-top: 3px;
}
.cross-img{
  align-self: flex-end;
  width: 12px;
  height: 12px;
}
</style>
