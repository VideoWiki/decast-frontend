<template>
  <div class="center">
    <div class="w-full flex flex-col items-center top-panel">
      <div class="bg-white w-full flex flex-row justify-between items-center px-4 h-8">
        <div class="bg-black w-4 h-4"></div>
        <div class="flex flex-row gap-2">
          <div class="bg-black w-4 h-4"></div>
          <div class="bg-black w-4 h-4"></div>
        </div>
      </div>
      <div class="center-container">
        <div class="flex flex-col justify-between cc-label">
          <!-- <h6 class="custom-heading" style="color: #a6a6a8">Welcome back!</h6> uncomment after design fix and remove the below line -->
          <h6 class="custom-heading mb-2">//Login</h6>
          <p @click="navigateToSignUp">/* Don't have an account? <span>Sign Up</span> */</p>
          <!-- <div class="flex justify-center">
            <p class="route cursor-pointer text-sm font-semibold" style="color: #a6a6a8; text-decoration: underline"
              @click="navigateToSignUp">
              Don't have an account? Sign Up
            </p>
          </div> -->
          <!-- <button class="close-icon" @click="closeForm">✕</button> -->
        </div>

        <form class="mt-6 rounded-lg form-container" @submit.prevent="loginJWT">
          <!-- <div class="vx-row mb-6">
            <input v-model="email" type="email" name="email" placeholder="Email" class="w-full p-4 input-box"
              autocomplete="off" :style="{ 'border-color': emailIsValid ? '' : 'red' }" @input="ValidMail" />
            <div v-if="!emailIsValid" class="text-sm mt-2" style="color: red">
              Please mention a valid email
            </div>
          </div> -->
          <div class="flex flex-col mt-8">
            <span>user.email</span>
            <div>
              <input class="w-4/5 p-2 mt-2" v-model="email" type="email" name="email" placeholder="//example@email.com"
                autocomplete="off" :style="{ 'border-color': emailIsValid ? '' : 'red' }" @input="ValidMail" />
              <p v-if="!emailIsValid" class="text-danger my-2 p-0">>> email is required</p>
            </div>
          </div>

          <!-- <div class="vx-row mb-6">
            <input v-model="password" type="password" name="password" placeholder="Password" class="w-full p-4 input-box"
              autocomplete="off" />
          </div> -->
          <div class="flex flex-col mt-4">
            <span>user.password</span>
            <div>
              <input class="w-4/5 p-2 mt-2" v-model="password" type="password" name="password" placeholder="//password"
                autocomplete="off" />
            </div>
          </div>

          <div class="w-4/5 flex justify-between items-center mt-4 mb-4 font-semibold">
            <div>
              <vs-checkbox v-model="checkbox_remember_me" class="text-sm font-normal">
                Remember me
              </vs-checkbox>
            </div>
            <div>
              <p class="route cursor-pointer text-sm font-semibold" style="color: #848484; text-decoration: underline"
                @click="navigateToPassword">
                /* Forgot Password */
              </p>
            </div>
          </div>

          <div class="mb-3">
            <!-- <button :class="[
              'w-full p-3 mt-6 mb-4',
              'enabled-btn',
              { 'disabled-btn': !validateForm },
            ]" style="
              text-size-adjust: text-sm;
              border: none;
              border-radius: 10px;
              margin: auto;
            " :disabled="!validateForm">
              <h3><b class="text-lg">Sign In</b></h3>
            </button> -->
            <button class="custm-button mt-2" :disabled="!validateForm">/user.login</button>
          </div>
          <input type="submit" value="" class="text-xs" style="display: none" />
        </form>

        <!-- Statement "or sign up with email" with lines -->
        <div class="or-divider">
          <div class="or-line"></div>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25.882 2.08587V0H2.93743V2.08587L25.882 2.08587Z" fill="#31394e" />
            <path d="M0.851562 25.0304H2.93743V2.08587H0.851562V25.0304Z" fill="#31394e" />
            <path d="M25.882 27.1163V25.0304H2.93743V27.1163H25.882Z" fill="#31394e" />
            <path d="M27.9678 2.08587L25.882 2.08587V25.0304H27.9678V2.08587Z" fill="#31394e" />
            <rect x="2.69141" y="1.83844" width="23.4395" height="23.4395" fill="black" />
            <path
              d="M9.86136 19.4198C9.17503 19.4198 8.57694 19.2924 8.06709 19.0375C7.56705 18.7727 7.17976 18.405 6.90523 17.9344C6.6405 17.454 6.50813 16.8902 6.50813 16.2431V11.5662C6.50813 10.9191 6.6405 10.3602 6.90523 9.88961C7.17976 9.40918 7.56705 9.0415 8.06709 8.78658C8.57694 8.52185 9.17503 8.38949 9.86136 8.38949C10.5575 8.38949 11.1556 8.52185 11.6556 8.78658C12.1557 9.0415 12.5381 9.40918 12.8028 9.88961C13.0773 10.3602 13.2146 10.9142 13.2146 11.5515V16.2431C13.2146 16.8902 13.0773 17.454 12.8028 17.9344C12.5381 18.405 12.1557 18.7727 11.6556 19.0375C11.1556 19.2924 10.5575 19.4198 9.86136 19.4198ZM9.86136 17.8021C10.3614 17.8021 10.7389 17.6697 10.9938 17.405C11.2487 17.1304 11.3762 16.7431 11.3762 16.2431V11.5662C11.3762 11.0564 11.2487 10.6691 10.9938 10.4044C10.7389 10.1396 10.3614 10.0073 9.86136 10.0073C9.36132 10.0073 8.98383 10.1396 8.72891 10.4044C8.47399 10.6691 8.34652 11.0564 8.34652 11.5662V16.2431C8.34652 16.7431 8.47399 17.1304 8.72891 17.405C8.99364 17.6697 9.37112 17.8021 9.86136 17.8021ZM15.3855 19.2728V8.53656H18.7828C19.4986 8.53656 20.1163 8.66892 20.6359 8.93365C21.1654 9.19838 21.5772 9.57096 21.8713 10.0514C22.1655 10.522 22.3126 11.0809 22.3126 11.728C22.3126 12.4339 22.1312 13.0566 21.7684 13.5958C21.4154 14.1351 20.935 14.5175 20.3271 14.743L22.4596 19.2728H20.4006L18.5328 15.0077H17.2239V19.2728H15.3855ZM17.2239 13.3899H18.7828C19.3025 13.3899 19.7094 13.2477 20.0035 12.9634C20.2977 12.6791 20.4448 12.2869 20.4448 11.7868C20.4448 11.277 20.2977 10.8799 20.0035 10.5956C19.7094 10.3014 19.3025 10.1543 18.7828 10.1543H17.2239V13.3899Z"
              fill="#31394e" />
          </svg>
          <div class="or-line"></div>
        </div>

        <div class="flex justify-between items-center mt-8 mb-4">
          <div class="child-1 cursor-pointer" id="google-login" @click="loginWithGoogle">
            <p class="flex justify-start items-center">
              <img src="@/assets/images/login/google.png" class="h-6 px-3" />
              <!-- Log in with Google uncomment after design fix and remove the below line -->
              Login with Google
            </p>
            <!-- <GoogleLogin/> -->
          </div>

          <div class="child-1 cursor-pointer" @click.prevent="loginWithMetamask">
            <p class="flex justify-start items-center">
              <img src="@/assets/images/Wallet.svg" class="h-6 px-3" />Login with Wallet
            </p>
            <!-- <SignInMetaMask/> -->
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import constants from '../../../constant';
import Web3 from 'web3';
import GAuth from 'vue-google-oauth2';
import Vue from 'vue';
import { detectIncognito } from 'detectincognitojs';

export default {
  data() {
    return {
      constants,
      email: '',
      password: '',
      ValidMail: 'example@mail.com',
      checkbox_remember_me: false,
      isIncognito: false,
      gAccessToken: '',
      required: false,
    };
  },
  props: {
    popup: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  mounted() {
    document.getElementById('loading-bg').style.display = 'none';
    this.initilizeGAuth();
  },
  created() {
    detectIncognito().then((result) => {
      console.log('this is working ', result.browserName, result.isPrivate);
      if (result.isPrivate && result.browserName.toLowerCase() === 'chrome') {
        this.isIncognito = true;
      } else {
        this.isIncognito = false;
      }
    });
  },
  computed: {
    emailIsValid() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return this.email === '' || emailRegex.test(this.email);
    },
    activeUserInfo() {
      return this.$store.state.AppActiveUser;
    },

    validateForm() {
      return (
        this.emailIsValid &&
        this.email !== '' &&
        this.password !== '' &&
        this.ValidMail
      );
    },
  },
  methods: {
    navigateToPassword() {
      this.$router.push('/resetPassword');
    },
    navigateToSignUp() {
      this.$router.push('/signup');
    },
    loginJWT() {
      // Loading
      this.$vs.loading();
      const payload = {
        checkbox_remember_me: this.checkbox_remember_me,
        userDetails: {
          email: this.email,
          password: this.password,
        },
        params: {
          login_type: 'web1',
          login_challenge: this.$route.query.login_challenge,
        },
      };
      this.$store
        .dispatch('auth/login', payload)
        .then((response) => {
          console.log(response,'This is login re')
          this.$vs.loading();
          window.location.replace(response.data.redirect_to);
          this.$store.commit('reload/setReloadFlag', true);
          this.$acl.change(this.activeUserInfo.userRole);
          this.$vs.loading.close();
          this.$vs.notify({
            title: 'Success',
            text: 'Login Successfull',
            iconPack: 'feather',
            color: 'success',
          });
        })
        .catch((error) => {
          console.log(error);
          window.location.href = constants.challengeUri;
          this.$vs.loading.close();
          if (
            error.response.data.message ===
            "user doesn't exist , register yourself" ||
            error.response.data.message === 'invalid Password!'
          )
            this.$vs.notify({
              time: 6000,
              title: 'Error',
              text: 'Wrong ID or wrong password',
              iconPack: 'feather',
              icon: 'icon-alert-circle',
              color: 'danger',
            });
          else {
            this.$vs.notify({
              time: 6000,
              title: 'Error',
              text: 'Something Went Wrong Try Again',
              iconPack: 'feather',
              icon: 'icon-alert-circle',
              color: 'danger',
            });
          }
        });
    },
    async handleSignMessage(publicAddress, nonce) {
      // Loading
      this.$vs.loading();
      try {
        const web3 = new Web3(Web3.givenProvider);
        const signature = await web3.eth.personal.sign(
          `I am signing my one-time nonce: ${nonce}`,
          publicAddress,
          '' // MetaMask will ignore the password argument here
        );
        this.signature = signature;
        this.nonce = nonce;
        // Send signature to backend for auth...
        this.$store
          .dispatch('auth/sendSignature', {
            signature: this.signature,
            nonce: this.nonce,
            login_type: 'web3',
            login_challenge: this.$route.query.login_challenge,
          })
          .then((res) => {
            window.location.replace(res.data.redirect_to);
            this.$vs.notify({
              title: this.$t('Login.notify.title'),
              text: 'Login Successfull',
              iconPack: 'feather',
              icon: 'icon-alert-circle',
              color: 'success',
            });
          });
      } catch (err) {
        this.$vs.loading.close();
        this.$vs.notify({
          title: this.$t('Login.notify.title'),
          text: this.$t('Metamasklogin.signmessage'),
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'warning',
        });
      }
    },
    async loginWithMetamask() {
      // if (!this.checkLogin()) return;
      this.publicAddress = '';
      this.signature = '';
      this.nonce = '';
      this.coinbase = '';
      const web3 = new Web3(Web3.givenProvider);
      if (!web3.givenProvider) {
        this.$vs.notify({
          title: this.$t('Login.notify.title'),
          text: this.$t('Metamasklogin.install'),
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'warning',
        });
      }
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });
      const account = accounts[0];
      const coinbase = await web3.eth.getCoinbase();
      if (!coinbase) {
        this.$vs.notify({
          title: this.$t('Login.notify.title'),
          text: this.$t('Metamasklogin.activate'),
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'warning',
        });
      }
      this.publicAddress = account.toLowerCase();
      this.$store
        .dispatch('auth/getNonce', { public_add: this.publicAddress })
        .then((res) =>
          // Popup MetaMask confirmation to sign message
          this.handleSignMessage(this.publicAddress, res.data.nonce)
        )
        .catch((err) => {
          console.log(err);
          this.$vs.notify({
            title: this.$t('Login.notify.title'),
            text: this.$t('Metamasklogin.tryagain'),
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger',
          });
        });
    },
    submitForm() {
      if (this.validateForm) {
        console.log('Email:', this.email);
        console.log('Password:', this.password);
      } else {
        this.$vs.notify({
          title: 'Fill all the details',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'warning',
        });
      }
    },
    closeForm() {
      window.parent.postMessage('closeIframe', '*');
      // this.$refs.form.reset();
    },
    initilizeGAuth() {
      this.isIncognito = false;
      const gauthOption = {
        clientId:
          '819083977574-sq0gi88sfdb5skebh2kjk62t41nuegfv.apps.googleusercontent.com',
        scope: 'profile email',
        prompt: 'consent',
        fetch_basic_profile: true,
      };
      Vue.use(GAuth, gauthOption);
    },
    async loginWithGoogle() {
      // Loading
      this.$vs.loading();
      try {
        const googleUser = await this.$gAuth.signIn();
        if (googleUser) {
          this.gAccessToken = googleUser.getAuthResponse().access_token;
          this.$store
            .dispatch('auth/sendAccessToken', {
              access_token: this.gAccessToken,
              login_type: 'web2',
              login_challenge: this.$route.query.login_challenge,
            })
            .then((response) => {
              console.log(5);
              console.log(response);
              window.location.replace(response.data.redirect_to);
              this.$acl.change(this.activeUserInfo.userRole);
              if (this.popup) this.$emit('loggedIn');
              this.$vs.loading.close();
              this.$vs.notify({
                title: 'Success',
                text: 'Login Successfull',
                iconPack: 'feather',
                color: 'success',
              });
            });
        } else {
          this.$vs.notify({
            title: this.$t('Login.notify.title'),
            text: this.$t('GoogleLogin.notverified'),
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger',
          });
          this.$vs.loading.close();
        }
      } catch (error) {
        console.log(error, 'err');
        if (this.isIncognito) {
          this.$vs.notify({
            title: this.$t('Login.notify.title'),
            text: 'Allow Third Party Cookies',
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger',
          });
        } else {
          this.$vs.notify({
            title: this.$t('Login.notify.title'),
            text: 'User not verified',
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger',
          });
        }
        this.$vs.loading.close();
      }
    },
  },
};
</script>

<style scoped>
/* Add styles for the center container as mentioned in the previous response */
*:not(i) {
  /* font-family: 'Karla', sans-serif !important; */
  font-family: 'JetBrains Mono' !important;
}

#google-login {
  font-family: 'Montserrat', Helvetica, Arial, sans-serif !important;
}

.top-panel {
  max-width: 500px;
  margin-bottom: 10px;
}

.custm-button {
  background-color: #D7DF23;
  color: #000000;
  border: 2px solid #000000;
  outline: none;
  padding: 10px;
  width: fit-content;
  cursor: pointer;
  font-weight: 600;
  -webkit-box-shadow: 5px 5px 0px -1px rgba(255, 255, 255, 1);
  -moz-box-shadow: 5px 5px 0px -1px rgba(255, 255, 255, 1);
  box-shadow: 5px 5px 0px -1px rgba(255, 255, 255, 1);
}
.custm-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.center {
  height: 100vh;
  width: 100vw;
  background: #000000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.center-container {
  width: 100%;
  padding: 20px;
  max-width: 500px;
  min-height: 75vh;
  background-color: #000000;
  color: #FFFFFF;
  border: 1px solid #FFFFFF;
  margin-top: 10px;
}

.vs-checkbox {
  padding-right: 5px;
}

.input-box {
  border-radius: 8px;
  background-color: #18191d;
  color: #a6a6a8;
  border: 1px solid #31394e;
}

/* Add styles for the "or sign up with email" statement and lines */
.or-divider {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
}

.or-line {
  flex: 1;
  height: 1px;
  background-color: #31394e;
}

.or-text {
  margin: 0 10px;
  font-size: 14px;
  color: #a6a6a8;
}

.child-1 {
  padding: 10px;
  width: 48%;
  text-align: center;
  border-top: 1px solid #FFFFFF;
  border-left: 1px solid #FFFFFF;
  border-bottom: 3px solid #FFFFFF;
  border-right: 3px solid #FFFFFF;
}

/* Add styles for close icon button */
.close-icon {
  font-size: 20px;
  cursor: pointer;
  color: #a6a6a8;
  background: none;
  border: none;
}

.enabled-btn {
  background-color: #d7df23;
  cursor: pointer;
}

.disabled-btn {
  background-color: #d7df23;
  cursor: not-allowed;
  opacity: 0.6;
}

.cc-label p {
  color: #5B96EB;
  text-decoration: underline;
}

.custom-heading {
  font-size: 24px;
  font-weight: bold;
  color: #FFFFFF;
}
</style>
