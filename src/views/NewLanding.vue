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
    <!-- <div class=""><img src="@/assets/images/Home.jpg" class="img" /></div> -->
    <div class="home-cont">
      <div class="cont-1">
        <img id="img-1" src="@/assets/images/leftPart.svg" />
      </div>
      <div class="cont-2">
        <div class="op-1">
          <h1>Cast your content</h1>
          <h1>from the future!</h1>
        </div>
        <div class="op-2 mt-2">
          <p>
            We re-engineered the service we built for secure business meetings,
          </p>
          <p>Cast Meet, to make it free and available for all.</p>
        </div>
        <div class="op-3">
          <button><img src="@/assets/images/meet.svg" />New Meeting</button>
          <button>
            <img src="@/assets/images/key.svg" />Enter a code or link
          </button>
        </div>
        <div class="op-4">
          <img src="@/assets/images/homeSlide.svg" />
        </div>
      </div>
      <div class="cont-3">
        <img id="img-2" src="@/assets/images/rightPart.svg" />
      </div>
    </div>
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
.home-cont {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  /* overflow: hidden; */
}

.cont-3,
.cont-2,
.cont-1 {
  height: auto;
}

.cont-2 {
  padding-top: 6rem;
}

.cont-1 {
  padding-top: 5rem;
  /* min-width: 220px; */
  width: auto;
}

#img-1,
#img-2 {
  max-height: 70vh;
  width: 100%;
  /* min-width: 210px; */
}

.op-1,
.op-2 {
  margin: auto;
  width: fit-content;
  text-align: center;
}

.op-1 h1 {
  font-size: 60px;
  color: #a6a6a8;
  font-weight: 700;
}

.op-2 p {
  font-size: 2xl;
  color: #a6a6a8;
  font-weight: 500;
}

.op-3 {
  display: flex;
  margin: auto;
  gap: 10px;
  width: fit-content;
  margin-top: 30px;
}

.op-3 button:nth-child(1) {
  display: flex;
  justify-content: center;
  gap: 20px;
  width: 180px;
  height: 40px;
  background-color: #d7df23;
  font-size: 13px;
  font-style: italic;
  align-items: center;
  font-weight: 600;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.op-3 button:nth-child(2) {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 250px;
  height: 40px;
  background-color: #181a20;
  font-size: 13px;
  font-style: italic;
  color: #a6a6a6;
  font-weight: 600;
  border: 1px solid #31394e;
  border-radius: 4px;
  cursor: pointer;
}
.op-4 {
  margin: auto;
  max-width: 800px;
  width: fit-content;
  margin-top: 20px;
}

.op-4 img {
  /* width: auto; */
  width: 700px;
  height: auto;
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
  overflow: hidden;
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

@media screen and (max-device-width: 700px) {

  .home-cont{
    background-image: url('../assets/images/rightPart.svg');
    background-repeat: no-repeat;
    background-size: contain;
    background-position: right;
  }
  .cont-1,
  .cont-3 {
    display: none;
  }

  .cont-2 {
    width: auto;
    margin: auto;
    padding-top:10px;
    /* margin-top: -30px; */
  }

  .op-1 h1 {
    font-size: 4xl;
    color: #a6a6a8;
    font-weight: 600;
    text-align: center;
    word-wrap: break-word;
  }

  .op-2 {
    max-width: 95%;
    width: auto;
    margin: auto;
  }
  .op-2 p {
    display: inline;
    font-size: 12px;
    color: #a6a6a8;
    font-weight: 500;
  }

  .op-4 {
    margin: auto;
    max-width: 100%;
    /* width: fit-content; */
    width: 100%;
    margin-top: 20px;
  }

  .op-4 img {
    /* width: auto; */
    margin: auto;
    width: 95%;
    max-width: 97%;
    width: auto;
    height: auto;
  }

  .op-3 button:nth-child(1) {
    display: flex;
    justify-content: center;
    gap: 20px;
    width: 130px;
    height: 40px;
    background-color: #d7df23;
    font-size: 12px;
    font-style: italic;
    align-items: center;
    font-weight: 600;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .op-3 button:nth-child(2) {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    width: 165px;
    height: 40px;
    background-color: #181a20;
    font-size: 12px;
    font-style: italic;
    color: #a6a6a6;
    font-weight: 600;
    border: 1px solid #31394e;
    border-radius: 4px;
    cursor: pointer;
  }

  .opt-cont {
    display: none;
  }

  .child-2 {
    display: none;
  }

  .child-2 button {
    display: none;
  }

  .wiki-logo img {
    /* border: 1px solid red; */
    height: 60px;
    width: 60px;
  }

  .nav-cont {
    /* border: 1px solid white; */
    width: 100%;
    height: 60px;
    padding-top: 10px;
    background-color: #000000;
  }

  .nav-cont nav {
    display: flex;
    /* border: 1px solid yellow; */
    width: 95%;
    max-width: 98%;
    margin: auto;
    justify-content: space-between;
  }
}

</style>
