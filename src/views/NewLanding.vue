<!-- =========================================================================================
    File Name: ResetPassword.vue
    Description: Reset Password Page
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div class="landing">
    <div class="nav-bar flex">
      <div class="leftPart">
        <div class="wiki-logo">
          <img src="@/assets/images/dashboard/Cast-Draft-Logo-02.svg" />
        </div>
      </div>
      <div class="rightPart flex">
        <div class="search-bar flex">
          <input placeholder="Search" type="text" />
          <img src="@/assets/images/dashboard/Search.svg" />
        </div>
        <div class="wallet">
          <img src="@/assets/images/dashboard/Wallet.svg" />
        </div>
        <div class="setting">
          <div class="">
            <button class="butt cursor-pointer" @click="open">Login</button>
          </div>
          <!-- <img src="@/assets/images/dashboard/Setting.svg" /> -->
        </div>
      </div>
    </div>
    <div class=""><img src="@/assets/images/Home.jpg" class="img" /></div>
    <div class="close-container">
      <iframe :src="url" :class="{ iframe: iframe, hidden: !iframe }"></iframe>
      <!-- <button class="close-icon" @click="closeForm">✕</button> -->
    </div>
  </div>
</template>

<script>
import constants from '../../constant';
export default {
  data() {
    return {
      iframe: false,
    };
  },
  mounted() {
    console.log(this.accessToken || this.loggedIn, 'prof');
    window.addEventListener('message', (event) => {
      if (event.data === 'closeIframe') {
        this.iframe = false;
        this.url = '';
        console.log(this.iframe);
      }
      if (event.data === 'navigateToSignUp') {
        document.getElementsByTagName('iframe')[0].style.height = '79%';
        document.getElementsByTagName('iframe')[0].style.width = '33%';
      }
      if (event.data === 'navigateToLogin') {
        document.getElementsByTagName('iframe')[0].style.height = '66.7%';
        document.getElementsByTagName('iframe')[0].style.width = '32%';
      }
      if (event.data === 'navigateToPassword') {
        document.getElementsByTagName('iframe')[0].style.height = '41.6%';
      }
      if (event.data === 'loginSuccess') {
        this.iframe = false;
        this.$router.push('/full');
        this.url = '';
      }
    });
  },
  methods: {
    open() {
      console.log('open');
      this.iframe = !this.iframe;
      this.url = constants.challengeUri;
      // this.url = 'http://localhost:8080/login';
      document.getElementsByTagName('iframe')[0].style.height = '66.7%';
      document.getElementsByTagName('iframe')[0].style.width = '32%';
      console.log(this.iframe);
      // window.location.href = constants.challengeUri;
    },
  },
};
</script>

<style scoped>
.iframe {
  position: absolute;
  border: 1px solid #31394e;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 66.5%;
  width: 32%;
  border-radius: 10px;
  z-index: 100;
  overflow: hidden;
}

.butt {
  background: #d7df23;
  padding: 10px 25px;
  border: none;
  border-radius: 5px;
  color: #1f272f;
  font-weight: 700;
  font-size: 12px;
}
.img {
  width: 98vw;
  height: 83vh;
}

.landing {
  height: 100vh;
  width: 100%;
  background: #000000;
}
.nav-bar {
  padding: 20px 67px 0px 67px;
  align-items: center;
  justify-content: space-between;
}
.wiki-logo img {
  height: 91px;
  width: 91px;
}
.rightPart {
  align-items: center;
}
.search-bar {
  height: 40px;
  width: 197px;
  border: 1px solid #31394e;
  border-radius: 6px;
  align-items: center;
  justify-content: space-between;
  padding: 12px 10px 12px 10px;
}
.search-bar input {
  background-color: #181a20;
  border: none;
  color: #ffffff;
  font-weight: 500;
  font-size: 12px;
  line-height: 14.03px;
}
.search-bar img {
  width: 16px;
  height: 16px;
  color: #7a7a7a;
}
.wallet {
  margin-left: 68px;
  width: 16px;
  height: 16px;
  color: #637181;
}
.setting {
  margin-left: 24px;
  color: #637181;
}
</style>
