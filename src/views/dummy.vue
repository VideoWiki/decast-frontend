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
          :style="{ display: showMobileMenu ? 'none' : 'block' }"
          class="w-full h-full object-cover"
          src="@/assets/images/logo square.svg"
        />
      </a>

      <!-- Desktop Navbar Options -->
      <div class="opt-cont items-center gap-10 md:flex hidden">
        
      </div>

      <!-- Mobile Menu Options -->
      <div class="md:hidden mob-opt" v-show="showMobileMenu">
        <div class="w-full flex flex-row justify-between text-a6a6a6">
          <div class="mob-con flex flex-col gap-3">
            <a v-if="!isLoggedIn" @click="open">Login</a>
            <a href="/dashboard" v-else>Dashboard</a>
            <a href="/features">Features</a>
            <a href="/creators">Creators</a>
            <a href="/sponsors">Sponsors</a>
            <a href="/operators">Operators</a>
            <a href="/pricing">Pricing</a>
            <a href="/about">About</a>
            <a href="/faq">Faq</a>
            <a href="/contact">Contact</a>
          </div>

          <button
            @click="toggleMobileMenu"
            v-show="showMobileMenu"
            class="text-black bg-transparent border-none outline-none"
          >
            <!-- Close button icon -->
            <svg
              v-if="showMobileMenu"
              xmlns="http://www.w3.org/2000/svg"
              class="h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="3"
                stroke="#d7df23"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Hamburger Menu -->

      <div class="md:hidden">
        <button
          @click="toggleMobileMenu"
          v-show="!showMobileMenu"
          class="text-black bg-transparent border-none outline-none"
        >
          <svg
            v-if="!showMobileMenu"
            xmlns="http://www.w3.org/2000/svg"
            class="h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="3"
              stroke="#d7df23"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
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
import constants from '../../constant';
import Loading from './Loading.vue';
export default {
  name: 'Navbar',
  data() {
    return {
      username: '',
      isLoggedIn: false,
      isNavbarScrolled: false,
      showMobileMenu: false,
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
    toggleMobileMenu() {
      this.showMobileMenu = !this.showMobileMenu;
    },
    closeMobileMenu() {
      this.showMobileMenu = false;
    },
  },
};
</script>