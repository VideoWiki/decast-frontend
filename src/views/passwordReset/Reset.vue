<template>
   <div
    class="lg:h-screen flex w-full bg-dark-black vx-row no-gutter items-center justify-center"
    id="page-login"
  >
    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-2/4 xl:w-1/3 sm:m-0 m-4">
      <div class="bg-white w-full flex flex-row justify-between items-center px-4 h-8">
        <div class="bg-black w-4 h-4"></div>
        <div class="flex flex-row gap-2">
          <div class="bg-black w-4 h-4"></div>
          <div class="bg-black w-4 h-4"></div>
        </div>
      </div>
      <div class="div--content bg-dark-black mt-2">
        <div class="p-4">
          <div class="text-center">
            <img
              src="@/assets/images/logot.svg"
              @click="navigateTohome"
              class="mr-2 mt- h-16"
            />
            <h1
              v-if="$route.name === 'Reset Password'"
              class="text-white font-bold text-3xl text-left"
            >
              //Change Password
            </h1>
            <h1 class="text-white font-bold text-3xl text-left" v-else>//Forgot Password</h1>
          </div>
          <ResetPassword v-if="$route.name === 'Reset Password'" />
          <password-email v-else />
        </div>
      </div>
      <h5 class="w-full justify-center text-sm items-center text-center text-white mt-4">
        Data policies aligned with
        <a
          href="https://principles.fairdatasociety.org/"
          style="text-decoration: underline"
          target="_blank"
          >Fair Data Society Principles</a
        >
      </h5>
    </div>
  </div>
</template>

<script>
import PasswordEmail from './PasswordEmail.vue';
import ResetPassword from './ResetPassword.vue';
export default {
  components: {
    ResetPassword,
    PasswordEmail,
  },
  methods: {
    navigateTohome() {
      this.$router.push('/');
    },
  },
};
</script>

<style lang="scss">
*:not(i) {
  /* font-family: 'Karla', sans-serif !important; */
  font-family: 'JetBrains Mono' !important;
}
.login-tabs-container {
  min-height: 505px;
  padding-top: 2rem;
  margin-right: 60px;

  .con-tab {
    padding-bottom: 14px;
  }

  .con-slot-tabs {
    margin-top: 1rem;
  }
}

.div--content{
  border-radius: none;
  border: 1px solid #ffffff !important;
}

.company-logo {
  top: 5%;
  left: 10%;
}

.fairsociety-link {
  bottom: 10%;
  left: 10%;
}

.left-panel::after {
  content: '';
  position: absolute;
  top: 0%;
  left: 0%;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 40;
}
.vx-logo-text {
  font-size: 22px;
  font-weight: 600;
  animation: 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) 0s normal forwards 1 fadein;
}
</style>
<style scoped>
@media screen and (max-height: 5000px) {
  .fix_screen {
    display: flex;
    max-height: 1200%;
  }
}
#page-login{
  min-height: 100vh ;
  height: 100% !important ;
}
</style>
