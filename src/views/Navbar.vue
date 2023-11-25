<template>
  <div
    class="flex w-full justify-center items-center"
    :class="{ 'nav-cont': true, scrolled: isNavbarScrolled }"
  >
    <nav
      class="max-w-5xl w-full items-center flex flex-row justify-between lg:px-16 md:px-6 px-4 py-6"
    >
      <a href="/" class="w-16 h-16">
        <img
          class="w-full h-full object-cover"
          src="@/assets/images/logo square.svg"
        />
      </a>

      <div class="opt-cont items-center gap-10 md:flex hidden">
        <div><a class="" href="/features">Features</a></div>
        <div
          class="dropbtn flex flex-col items-center relative"
          @click="dropOpen"
        >
          <a class="flex gap-2 items-center" href="#">
            Join
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="8"
              viewBox="0 0 14 8"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.70734 7.70698C7.51981 7.89445 7.26551 7.99976 7.00034 7.99976C6.73518 7.99976 6.48087 7.89445 6.29334 7.70698L0.636343 2.04998C0.540833 1.95773 0.464651 1.84739 0.412242 1.72538C0.359833 1.60338 0.332246 1.47216 0.331092 1.33938C0.329939 1.2066 0.355241 1.07492 0.405521 0.952023C0.455802 0.829127 0.530055 0.717474 0.623948 0.623581C0.717841 0.529689 0.829492 0.455436 0.952389 0.405155C1.07529 0.354874 1.20696 0.329572 1.33974 0.330726C1.47252 0.33188 1.60374 0.359466 1.72575 0.411875C1.84775 0.464284 1.9581 0.540466 2.05034 0.635976L7.00034 5.58598L11.9503 0.635976C12.1389 0.453818 12.3915 0.353024 12.6537 0.355302C12.9159 0.357581 13.1668 0.46275 13.3522 0.648158C13.5376 0.833566 13.6427 1.08438 13.645 1.34658C13.6473 1.60877 13.5465 1.86137 13.3643 2.04998L7.70734 7.70698Z"
                fill="#a6a6a6"
              />
            </svg>
          </a>
          <div
            id="Navdrop"
            class="flex-col absolute py-2 px-4 rounded-sm Navdrop hideNav bg-black items-center"
            style="top: 100%"
          >
            <router-link class="" to="/creators" style="width: fit-content"
              >Creators</router-link
            >
            <router-link class="" to="/sponsors" style="width: fit-content"
              >Sponsers</router-link
            >
            <router-link class="" to="/operators" style="width: fit-content"
              >Operators</router-link
            >
          </div>
        </div>
        <div><a href="/pricing">Pricing</a></div>
        <div><a href="/about">About</a></div>
        <div><a href="/faq">Faq</a></div>
        <div><a href="#" @click="redirectTo">Contact</a></div>
      </div>

      <div class="log-cont" v-if="!isLoggedIn">
        <div
          class="cursor-pointer"
          :class="{ 'child-1': true, 'slog-cont': isNavbarScrolled }"
          @click="open"
        >
          <button>Login</button>
          <div class="vertical-line sideOne"></div>
          <button>Signup</button>
        </div>
        <!-- <div class="child-2">
                        <button>Book a Demo</button>
                    </div> -->
      </div>

      <div class="nam-con" v-else>
        <p>Hi, {{ username }}!</p>
        <button>
          <router-link
            to="/dashboard"
            style="font-size: small; font-weight: 500; color: #000"
          >
            Dashboard
          </router-link>
        </button>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      username: '',
      isLoggedIn: false,
      isNavbarScrolled: false,
    };
  },
  computed: {
    accessToken() {
      return this.$store.state.auth.accessToken;
    },
    loggedIn() {
      return this.$store.state.auth.loggedIn;
    },
    activeUserInfo() {
      return this.$store.state.AppActiveUser;
    },
  },
  mounted() {
    document.getElementById('loading-bg').style.display = 'none';
    this.handleLogin();
    // this.handleScroll();
  },
  created() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    open() {
      window.open(constants.challengeUri, '_blank', 'width=600,height=600');
    },
    dropOpen() {
      document.getElementById('Navdrop').classList.toggle('showNav');
    },
    handleScroll(event) {
      const scrollPosition = window.scrollY;
      this.scrollPosition = event.target.documentElement.scrollTop;
      const threshold = 10;
      if (scrollPosition > threshold) {
        this.isNavbarScrolled = true;
      } else {
        this.isNavbarScrolled = false;
      }
    },
    handleLogin() {
      const userInfo = localStorage.getItem('userInfo');
      const accessToken = localStorage.getItem('accessToken');
      if (userInfo && accessToken) {
        this.isLoggedIn = true;
        this.username = this.activeUserInfo.first_name || 'User';
      } else {
        console.log('false');
      }
    },
  },
};
</script>

<style scoped>
.hideNav {
  display: none;
}

.showNav {
  display: flex !important;
}

.basic__section__1 {
  background-image: url('../assets/images/leftPart.svg');
  background-position: left;
  background-repeat: no-repeat;
  background-size: contain;
}

.basic__section__2 {
  background-image: url('../assets/images/rightPart.svg');
  background-position: right;
  background-repeat: no-repeat;
  background-size: contain;
}

.basic__section__img img {
  box-shadow: 50px 50px 100px -12px rgba(214, 224, 36, 0.1);
  transition: all 0.5s ease-in-out;
}

.basic__section__img img:hover {
  box-shadow: 50px 50px 80px -12px rgba(214, 224, 36, 0.2);
}

button {
  font-family: 'Montserrat' !important;
}

.nam-con {
  padding: 6px;
  width: fit-content;
  display: flex;
  gap: 15px;
}

.nam-con p {
  font-size: medium;
  font-weight: 500;
  color: #a6a6a6;
  margin: auto;
}

.nam-con button {
  background-color: #d7df23;
  height: 40px;
  border-radius: 5px;
  padding: 6px;
  outline: none;
  cursor: pointer;
  border: none;
  margin: auto;
}

.nav-cont {
  width: 100%;
  background-color: #000000;
  transition: background-color 0.3s;
  position: sticky;
  top: 0%;
  z-index: 99;
}

.scrolled {
  background-color: #141318;
}

.opt-cont div a {
  text-decoration: none;
  color: #a6a6a6;
  border-bottom: 2px solid transparent;
  padding: 4px 0px;
  transition: all 0.3s ease-in;
}

.opt-cont div a:hover {
  border-bottom: 2px solid #d7df23;
}

.log-cont {
  /* border: 1px solid blue; */
  width: fit-content;
  display: flex;
  gap: 15px;
  font-family: 'Montserrat' !important;
  /* margin: auto; */
}

.slog-cont,
.child-1 {
  display: flex;
  gap: 5px;
  font-size: 2xl;
}

.child-1 {
  transition: background-color 0.3s;
}

.child-1 button {
  background-color: #000000;
  border: none;
  font-size: 2xl;
  color: #a6a6a6;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
}

.slog-cont button {
  background-color: #141318;
  border: none;
  font-size: 2xl;
  color: #a6a6a6;
  font-weight: 500;
  cursor: pointer;
}

.child-2 {
  margin: auto;
  font-size: 2xl;
}

.child-2 button {
  background-color: #d7df23;
  padding: 8px 12px 8px 12px;
  border: none;
  font-size: 2xl;
  border-radius: 3px;
  font-weight: 600;
  cursor: pointer;
}

.sideOne {
  border-left: 1px solid #a6a6a6;
  width: 1px;
  margin: auto;
  height: 13px;
}
</style>
