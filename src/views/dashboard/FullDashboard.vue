<template>
  <div class="container-full">
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
    <div class="buttomPart">
      <div class="vertical-line sideOne flex justify-items-center">
        <LeftPart />
      </div>
      <div class="middleOne vertical-line">
        <Rooms />
      </div>
      <div class="sideOne last">
        <RightPart />
      </div>
    </div>
    <div class="close-container">
      <iframe :src="url" :class="{ iframe: iframe, hidden: !iframe }"></iframe>
      <!-- <button class="close-icon" @click="closeForm">✕</button> -->
    </div>
  </div>
</template>
<script>
import LeftPart from './components/LeftPart.vue';
import RightPart from './components/RightPart.vue';
import Rooms from '../login/Room.vue';
import constants from '../../../constant';
export default {
  name: 'FullDashBoard',
  components: {
    LeftPart,
    RightPart,
    Rooms,
  },
  data() {
    return {
      url: constants.challengeUri,
      iframe: false,
    };
  },
  mounted() {
    window.addEventListener('message', (event) => {
      console.log(event.data, 'data');
      console.log(this.iframe);
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
        document.getElementsByTagName('iframe')[0].style.height = '66.5%';
        document.getElementsByTagName('iframe')[0].style.width = '32%';
      }
      if (event.data === 'navigateToPassword') {
        document.getElementsByTagName('iframe')[0].style.height = '41.6%';
      }
    });
  },
  methods: {
    closeIframe() {
      var iframe = document.getElementById('myIframe');
      iframe.style.display = 'none';
    },
    open() {
      console.log('open');
      this.iframe = !this.iframe;
      this.url = constants.challengeUri;
      // this.url = 'http://localhost:8080/login';
      document.getElementsByTagName('iframe')[0].style.height = '66.5%';
      document.getElementsByTagName('iframe')[0].style.width = '32%';
      console.log(this.iframe);
      // window.location.href = constants.challengeUri;
    },
  },
};
</script>
<style scoped>
*:not(i) {
  font-family: 'Karla', sans-serif !important;
}
.container-full {
  background-color: #181a20;
  /* border: 1px solid red; */
  overflow-y: scroll;
  height: 100vh;
}

.container-full::-webkit-scrollbar {
  width: 3px;
}

.container-full::-webkit-scrollbar-thumb {
  background-color: #31394e;
  border-radius: 4px;
  height: 10px;
}

.middleOne {
  width: 35%;
  padding: 0px 37px 0px 37px;
  /* border: 1px solid red; */
  height: 518px;
}

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

.sideOne {
  width: 30%;
  /* border: 1px solid yellow; */
  height: 518px;
  padding-right: 37px;
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
.buttomPart {
  height: fit-content !important;
  margin: auto;
  display: flex;
  margin: auto;
  /* border: 1px solid red; */
  width: 100%;
  margin-top: 20px;
}
.vertical-line {
  border-right: 1px solid #31394e;
}
@media (max-width: 900px) {
  .buttomPart {
    margin: 60px auto;
    flex-direction: column;
    height: 1700px;
    width: 100%;
  }
  .sideOne {
    width: 100%;
    justify-content: center;
  }
  .middleOne {
    width: 100%;
    padding: 60px 0px;
    justify-content: center;
  }
  .last {
    display: flex;
    justify-content: center;
    width: 35% !important;
  }
}
</style>
