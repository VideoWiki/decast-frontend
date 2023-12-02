<template>
  <div class="wrapper">
    <div class="heading-part">
      <h3>Contact Us</h3>
      <img src="@/assets/images/create-event/Vector.svg" @click="closePopUp" />
    </div>
    <div class="input-part">
      <input placeholder="Your Name" type="text" class="input-box" />
      <input placeholder="Your Email" type="email" class="input-box" />
    </div>
    <div class="input-part">
      <input placeholder="Your Phone No." class="input-box" />
      <input placeholder="Other Phone" class="input-box" />
    </div>
    <div class="input-msg">
      <textarea class="msg" placeholder="Your Message"></textarea>
    </div>
    <button>Send</button>
  </div>
</template>
<script>
export default {
  name: 'ContactPopUp',
  props: {
    showContactPopUp: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    closePopUp() {
      this.$emit('updateContactPopUp', false);
    },
  },
};
</script>
<style scoped>
.wrapper {
  width: 638px;
  height: auto;
  background-color: #181a20;
  padding: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.heading-part {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
h3 {
  font-size: 16px;
  font-weight: 500;
  color: #a6a6a8;
}
.input-part {
  padding: 12px;
  display: flex;
  justify-content: space-between;
}
.input-box {
  width: 49%;
  height: 45px;
  border: 1px solid #1f272f;
  background-color: #31394e;
  border-radius: 4px;
  padding: 0px 12px;
  color: #a6a6a8;
  font-size: 13px;
  font-weight: 600;
}
.msg {
  padding: 12px;
  margin: 12px !important;
  width: 96%;
  height: 109px;
  background-color: #31394e;
  border: 1px solid #1f272f;
  color: #a6a6a8;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 600;
}
button {
  width: 191px;
  height: 45px;
  background-color: #d7df23;
  border: 1px solid #1f272f;
  color: #000000;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  margin: 20px auto;
}
</style>
