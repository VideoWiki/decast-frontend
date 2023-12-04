<template>
  <div class="parent-1">
    <Navbar />
    <div class="head-cont">
      <h1>
        Pick the plan that supports your <br />
        video conferencing goals
      </h1>
    </div>
    <div class="bod-cont">
      <div>
        <img src="@/assets/images/hold.svg" />
        <h3>Free</h3>
        <h2>$0<span style="font-size: medium">/mo</span></h2>
        <p>For business just getting started.</p>
        <button>Start for free</button>
      </div>
      <div>
        <img src="@/assets/images/bank.svg" />
        <h3>Enterprise</h3>
        <small
          >For businesses looking to build a lasting brand and drive
          growth</small
        >
        <p>Custom solutions for teams of 10 or more users</p>
        <button @click="showPopUp()">Contact sales</button>
      </div>
    </div>
    <div v-if="showContactPopUp" class="popup-container">
      <ContactPopUp
        :showContactPopUp="showContactPopUp"
        @updateContactPopUp="updateContactPopUp"
      />
    </div>
    <FootSec />
  </div>
</template>

<script>
import Navbar from './Navbar.vue';
import ContactPopUp from './ContactPopUp.vue';
import FootSec from './FootSec.vue';
export default {
  data() {
    return {
      showContactPopUp: false,
    };
  },
  components: {
    Navbar,
    ContactPopUp,
    FootSec,
  },
  methods: {
    showPopUp() {
      this.showContactPopUp = true;
    },
    updateContactPopUp(value) {
      this.showContactPopUp = value;
    },
  },
};
</script>

<style scoped>
.parent-1 {
  background-image: linear-gradient(180deg, #000, #111, #222);
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 5rem;
  justify-content: center;
  /* border: 1px solid red; */
  position: relative;
}

.head-cont {
  width: 60%;
  margin: auto;
}

.head-cont h1 {
  font-weight: 700;
  color: #d7df23;
  text-align: center;
  font-size: 3em;
}

.bod-cont {
  display: flex;
  width: 85vw;
  margin: auto;
  justify-content: space-between;
}

.bod-cont div {
  width: 450px;
  height: 400px;
  background-color: #1f272f;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 20px;
  align-items: center;
  color: #a6a6a8;
  text-align: center;
}

.bod-cont div:nth-child(1) {
  border-top: 8px solid #264b57;
}

.bod-cont div:nth-child(2) {
  border-top: 8px solid #464775;
}

.bod-cont div img {
  width: 50px;
  height: 45px;
}

.bod-cont div h3 {
  color: #a6a6a8;
  font-size: 2em;
  font-weight: 500;
}

.bod-cont div h2 {
  font-size: 3em;
  color: #a6a6a8;
}

.bod-cont div button {
  cursor: pointer;
  height: 40px;
  border-radius: 5px;
  width: 180px;
  color: #ffffff;
  border: none;
  outline: none;
}

.bod-cont div:nth-child(1) button {
  background-color: #264b57;
}

.bod-cont div:nth-child(2) button {
  background-color: #464775;
}
.popup-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: none;
  padding: 20px;
  z-index: 1000;
}
</style>
