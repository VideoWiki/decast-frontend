<template>
  <div class="flex flex-col justify-center items-center w-full h-full min-h-screen p-4" style="min-width: 100vw;">

    <div
    class="flex flex-col absolute bg-black bg-opacity-50 min-h-screen z-50"
    style="min-width: 100vw; backdrop-filter: blur(5px);"
    @click="closePopUp"
    ></div>

      <div class="wrapper flex flex-col justify-center items-center gap-6 w-full lg:w-7/12 max-w-md px-4 py-8 lg:px-6 lg:py-8" >
      <div class="heading-part w-full flex justify-between">
        <h3>Contact Us</h3>
        <img class="cursor-pointer" src="@/assets/images/create-event/Vector.svg" @click="closePopUp" />
      </div>
      <div class="input-part flex flex-col lg:flex-row gap-4 justify-center lg:justify-between w-full">
        <input placeholder="Your Name" type="text" class="input-box w-full" />
        <input placeholder="Your Email" type="email" class="input-box w-full" />
      </div>
      <div class="input-part flex flex-col lg:flex-row gap-4 justify-center lg:justify-between w-full">
        <input placeholder="Your Phone No." class="input-box w-full" />
        <input placeholder="Other Phone" class="input-box w-full" />
      </div>
      <div class="input-msg flex flex-col lg:flex-row gap-4 justify-center lg:justify-between w-full">
        <textarea class="msg w-full" placeholder="Your Message"></textarea>
      </div>
      <button>Send</button>
    </div>
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
  height: auto;
  background-color: #181a20;
  border-radius: 8px;
  display: flex;
  z-index: 999;
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
  display: flex;
}
.input-box {
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
  height: 109px;
  resize: none;
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
}

</style>
