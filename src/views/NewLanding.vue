<template>
  <div class="landing">
    <div class="nav-cont">
      <nav>
        <div class="wiki-logo">
          <img src="@/assets/images/dashboard/Cast-Draft-Logo-02.svg" />
        </div>

        <div class="opt-cont">
          <div><a href="#">Features</a></div>
          <div><a href="#">Pricing</a></div>
          <div><a href="#">About</a></div>
          <div><a href="#">Faq</a></div>
          <div><a href="#">Contact</a></div>
        </div>

        <div class="log-cont">
          <div class="child-1 cursor-pointer" @click="open">
            <button>Login</button>
            <div class="vertical-line sideOne"></div>
            <button>Signup</button>
          </div>
          <div class="child-2">
            <button>Book a Demo</button>
          </div>
        </div>
      </nav>
    </div>
    <div class=""><img src="@/assets/images/Home.jpg" class="img" /></div>
    <div :class="{ 'close-container': iframe, hidden: !iframe }">
      <loading />
      <!-- <button class="close-icon" @click="closeForm">✕</button> -->
    </div>
    <iframe :src="url" :class="{ iframe: iframe, hidden: !iframe }"></iframe>
  </div>
</template>

<script>
import constants from '../../constant';
import Loading from './Loading.vue';

export default {
  data() {
    return {
      iframe: false,
    };
  },
  computed: {
    accessToken() {
      return this.$store.state.auth.accessToken;
    },
    loggedIn() {
      return this.$store.state.auth.loggedIn;
    },
  },
  components: {
    Loading,
  },
  mounted() {
    document.getElementById('loading-bg').style.display = 'none';
    console.log(this.accessToken || this.loggedIn, 'prof');
    window.addEventListener('message', (event) => {
      // if (event.data === 'closeIframe') {
      //   this.iframe = false;
      //   this.url = '';
      //   document.getElementsByClassName('close-container')[0].style.height =
      //     '66%';
      //   document.getElementsByClassName('close-container')[0].style.width =
      //     '32%';
      // }
      // if (event.data === 'navigateToSignUp') {
      //   alert();
      //   document.getElementsByClassName('close-container')[0].style.height =
      //     '78%';
      //   document.getElementsByClassName('close-container')[0].style.width =
      //     '33%';
      //   document.getElementsByTagName('iframe')[0].style.height = '79%';
      //   document.getElementsByTagName('iframe')[0].style.width = '33%';
      // }
      // if (event.data === 'navigateToLogin') {
      //   document.getElementsByClassName('close-container')[0].style.height =
      //     '66%';
      //   document.getElementsByClassName('close-container')[0].style.width =
      //     '32%';
      //   document.getElementsByTagName('iframe')[0].style.height = '66.7%';
      //   document.getElementsByTagName('iframe')[0].style.width = '32%';
      // }
      // if (event.data === 'navigateToPassword') {
      //   alert();
      //   document.getElementsByClassName('close-container')[0].style.height =
      //     '41%';
      //   document.getElementsByTagName('iframe')[0].style.height = '41.6%';
      // }
      if (event.data === 'loginSuccess') {
        console.log(this.$store.state.auth.loggedIn, 'loggedIn');
        this.$store.dispatch('auth/fetched');
        this.$acl.change('user');
        this.$store.commit('auth/SET_LOGGEDIN', true);
        this.$router.push('/full');
        this.url = '';
      }
    });
  },
  methods: {
    open() {
      window.open(constants.challengeUri, '_blank', 'width=600,height=600');
      // console.log('open');
      // this.iframe = !this.iframe;
      // this.url = constants.challengeUri;
      // // this.url = 'http://localhost:8080/login';
      // document.getElementsByTagName('iframe')[0].style.height = '66.7%';
      // document.getElementsByTagName('iframe')[0].style.width = '32%';
      // console.log(this.iframe);
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
.wiki-logo img {
  /* border: 1px solid red; */
  height: 91px;
  width: 91px;
}

.nav-cont {
  /* border: 1px solid white; */
  width: 100%;
  height: 100px;
  padding-top: 30px;
  background-color: #000000;
}

.close-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 66%;
  border-radius: 10px;
  width: 32%;
}

.nav-cont nav {
  display: flex;
  /* border: 1px solid yellow; */
  width: 85%;
  max-width: 1400px;
  margin: auto;
  justify-content: space-between;
}

.sideOne {
  border-left: 1px solid #a6a6a6;
  width: 1px;
  margin: auto;
  height: 13px;
}

.opt-cont {
  width: fit-content;
  /* border: 1px solid green; */
  display: flex;
  gap: 20px;
  color: #a6a6a6;
  margin: auto;
  font-size: 12px;
  font-weight: 500;
}

.opt-cont div a {
  text-decoration: none;
  color: #a6a6a6;
}

.log-cont {
  /* border: 1px solid blue; */
  width: fit-content;
  display: flex;
  gap: 15px;
  /* margin: auto; */
}

.child-1 {
  display: flex;
  gap: 5px;
}

.child-1 button {
  background-color: #000000;
  border: none;
  color: #a6a6a6;
  font-weight: 500;
  cursor: pointer;
}

.child-2 {
  margin: auto;
}

.child-2 button {
  background-color: #d7df23;
  padding: 8px;
  border: none;
  border-radius: 3px;
  font-weight: 600;
  cursor: pointer;
}
</style>
