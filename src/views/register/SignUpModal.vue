<template>
  <div class="centered-container">
    <div class="w-full flex flex-col items-center top-panel">
      <div class="bg-white w-full flex flex-row justify-between items-center px-4 h-8">
        <div class="bg-black w-4 h-4"></div>
        <div class="flex flex-row gap-2">
          <div class="bg-black w-4 h-4"></div>
          <div class="bg-black w-4 h-4"></div>
        </div>
      </div>

      <div class="container">
        <div class="flex flex-col justify-between cc-label">
          <h6 class="custom-heading mb-2">//Sign Up</h6>
          <p class="cursor-pointer" @click="navigateToLogin">/* Already have an account? Login */</p>
        </div>
        <div class="flex">
          <div class="flex flex-col mt-8 flex-1 mr-4">
            <span class="text-white">user.firstName</span>
            <div>
              <input class="p-2 mt-2 w-full" v-model="firstName" type="text" placeholder="//First name"/>
            </div>
          </div>
          <div class="flex flex-col mt-8 flex-1">
            <span class="text-white">user.lastName</span>
            <div>
              <input class="p-2 mt-2 w-full" v-model="lastName" type="text" placeholder="//Last name"/>
            </div>
          </div>
        </div>
        <div class="flex">
          <div class="flex flex-col mt-4 flex-1 mr-4">
            <span class="text-white">user.email</span>
            <div>
              <input class="p-2 mt-2 w-full" v-model="email" type="text" placeholder="//example@email.com"/>
            </div>
          </div>
          <div class="flex flex-col mt-4 flex-1">
            <span class="text-white">user.password</span>
            <div class="password-input flex flex-row p-2 mt-2 items-center justify-between" >
              <input id="signupPassword" v-model="password" type="password" placeholder="//password" autocomplete="off"/>
              <span class="toggle-password flex items-center justify-between" @click="togglePasswordVisibility('signupPassword')">
                  <EyeVisible v-if="isPasswordVisible" />
                  <EyeHide v-else />
                </span>
            </div>
          </div>
        </div>
        <div class="checkbox mt-8">
          <input type="checkbox" id="checkbox" v-model="isTermsConditionAccepted" class="custom-checkbox" />
          <label class="font-medium" for="checkbox">I agree to the Video wiki
            <span class="underline">
              <a href="#" class="underline"> User Agreement</a>
            </span>
            and
            <span class="underline"><a href="#" class="underline"> Privacy Policy</a></span>
          </label>
        </div>
        <div>
          <button class="custm-button mt-8" :disabled="!validateForm"
            @click.prevent="registerUserJWt">/user.signup
          </button>
        </div>

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
        
        <div class="singUp-box">
          <div @click="loginWithGoogle"
            class="google box flex justify-items-start items-center font-normal cursor-pointer">
            <img src="@/assets/images/login/google.png" class="h-6 pr-3" />
            <p class="google">Signup with Google</p>
          </div>
          <div @click="loginWithMetamask"
            class="wallet box flex justify-items-start items-center font-normal cursor-pointer">
            <img src="@/assets/images/Wallet.svg" class="h-6 pr-3" />
            <p>Signup with Wallet</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import GAuth from 'vue-google-oauth2';
import Web3 from 'web3';
import Vue from 'vue';
import { detectIncognito } from 'detectincognitojs';
import constants from '../../../constant';
import EyeHide from "@/assets/svgs/EyeHide.vue";
import EyeVisible from "@/assets/svgs/EyeVisible.vue";

export default {
  name: 'SignUpModal',
  props: {
    popup: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      isTermsConditionAccepted: true,
      isPasswordVisible: false,
    };
  },
  components: {
    EyeHide,
    EyeVisible,
  },
  mounted() {
    this.initilizeGAuth();
  },
  computed: {
    validateForm() {
      console.log(
        this.password,
        !this.errors.any(),
        this.firstName !== '',
        this.lastName !== '',
        this.validateEmail(),
        this.password !== '',
        this.isTermsConditionAccepted === true
      );
      return (
        !this.errors.any() &&
        this.firstName !== '' &&
        this.lastName !== '' &&
        this.validateEmail() &&
        this.password !== '' &&
        this.isTermsConditionAccepted === true
      );
    },
    activeUserInfo() {
      return this.$store.state.AppActiveUser;
    },
  },
  created() {
    document.getElementById('loading-bg').style.display = 'none';
    detectIncognito().then((result) => {
      console.log('this is working ', result.browserName, result.isPrivate);
      if (result.isPrivate && result.browserName.toLowerCase() === 'chrome') {
        this.isIncognito = true;
      } else {
        this.isIncognito = false;
      }
    });
  },
  methods: {
    togglePasswordVisibility(field) {
      this.isPasswordVisible = !this.isPasswordVisible;
      const input = document.getElementById(field);
      if (input) {
        input.type = this.isPasswordVisible ? 'text' : 'password';
      }
    },
    register() {
      if (this.validateForm) {
        this.registerUserJWt();
      } else {
        console.log('some error');
      }
    },
    validateEmail() {
      // eslint-disable-next-line no-useless-escape
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,12})+$/.test(this.email);
    },
    checkLogin() {
      if (this.$store.state.auth.isUserLoggedIn()) {
        this.$vs.notify({
          title: 'Login Attempt',
          text: 'You are already logged in!',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'warning',
        });

        return false;
      }
      return true;
    },
    registerUserJWt() {
      // If form is not validated or user is already login return
      // if (!this.validateForm || !this.checkLogin()) return;
      console.log('yessss');
      this.$vs.loading();

      const payload = {
        userDetails: {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
        },
        notify: this.$vs.notify,
      };
      this.$store
        .dispatch('auth/userRegister', payload)
        .then((response) => {
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            event: 'register',
            authenticationMethod: 'Email',
            userId: response.data.data.user_id, // this should be replaced with an actual ID
          });
          this.$vs.notify({
            title: 'Registration Successful',
            text: 'You have successfully registered!',
            iconPack: 'feather',
            icon: 'icon-check-circle',
            color: 'success',
          });
          console.log('Registration successful - after notification');
          console.log('ye res', response);
          location.href = constants.challengeUri;
        })
        .catch((error) => {
          this.$vs.loading.close();
          console.log(
            error.response.data.message,
            error.response.data.message === 'username already exists'
          );
          this.$vs.notify({
            title: 'Login Error',
            text:
              error.response.data.message === 'username already exists'
                ? 'Email already exists'
                : error.response.data.message,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger',
          });
        });
    },
    navigateToLogin() {
      // window.parent.postMessage('navigateToLogin', '*');
      this.$router.push('/login');
    },
    // Metamsask Connection
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
          })
          .then((res) => {
            // uncomment the statment below before pushing wile
            this.$vs.loading.close();

            // Remove the statment below before pushing wile
            this.$vs.notify({
              title: this.$t('Login.notify.title'),
              text: 'Login Successfull',
              iconPack: 'feather',
              icon: 'icon-alert-circle',
              color: 'success',
            });
            this.$acl.change(this.activeUserInfo.userRole);
            this.$router.push('/');
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
      const accounts = await window.ethereum.request({
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

    walletUse() {
      console.log(178);
      this.loginWithMetamask();
    },
    // Google Login
    initilizeGAuth() {
      const gauthOption = {
        clientId:
          '819083977574-sq0gi88sfdb5skebh2kjk62t41nuegfv.apps.googleusercontent.com',
        scope: ' profile email',
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
            .dispatch('auth/sendAccessTokenReg', {
              access_token: this.gAccessToken,
              login_type: 'web2',
              login_challenge: this.$route.query.login_challenge,
            })
            .then((response) => {
              console.log(5);
              this.$acl.change(this.activeUserInfo.userRole);
              this.$router.push('/');
              this.$vs.loading.close();
              this.$vs.notify({
                title: this.$t('Login.notify.title'),
                text: 'Successfully signed up with Google!',
                iconPack: 'feather',
                icon: 'icon-check-circle',
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
*:not(i) {
  /* font-family: 'Karla', sans-serif !important; */
  font-family: 'JetBrains Mono' !important;
}
.faded {
  opacity: 0.6;
  cursor: not-allowed;
}

.password-input{
  background: #fff;
  height: 34.8px;
}

.password-input input{
  outline: none;
  border: none;
}

.top-panel {
  max-width: 500px;
  margin-bottom: 10px;
}
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

.centered-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #000000;
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

.container {
  height: 550px;
  max-width: 500px;
  background-color: #000000;
  padding: 20px 25px;
  position: relative;
  border: 1px solid #FFFFFF;
  margin-top: 10px;
}

.signUp-text {
  font-family: 'Karla', sans-serif;
  font-size: 15px;
  font-weight: bold;
  color: #a6a6a8;
}

.signUp-icon {
  position: absolute;
  top: 5px;
  right: 5px;
}

.signUp-icon i {
  font-size: 2em;
  color: #a6a6a8;
}

.singUp-box {
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
}

.box {
  height: 40px;
  padding: 10px;
  width: 48%;
  text-align: center;
  border-top: 1px solid #FFFFFF;
  border-left: 1px solid #FFFFFF;
  border-bottom: 3px solid #FFFFFF;
  border-right: 3px solid #FFFFFF;
}

.box p {
  color: #a6a6a8;
  font-family: 'Karla', sans-serif;
  font-weight: regular;
}

.close-icon {
  font-size: 20px;
  cursor: pointer;
  color: #a6a6a8;
  background: none;
  border: none;
}

.box i {
  padding-right: 15px;
  color: #a6a6a8;
}

.input-name {
  margin-top: 25px;
  display: flex;
  justify-content: space-between;
}

.input-name input {
  height: 40px;
  width: 49%;
  border: 1px solid #31394e;
  background-color: #18191b;
  color: #a6a6a8;
  border-radius: 6px;
  padding: 20px;
}

.input-box input {
  margin-top: 20px;
  height: 40px;
  width: 100%;
  border: 1px solid #31394e;
  background-color: #18191b;
  color: #a6a6a8;
  border-radius: 6px;
  padding: 20px;
}

.checkbox {
  display: flex;
  align-items: center;
}

.checkbox input {
  margin-right: 10px;
}

.checkbox label {
  font-size: 11px;
  color: #FFFFFF;
  cursor: pointer;
}

.custom-checkbox {
  background-color: #18191b;
  color: #18191b;
}

.enb-button {
  margin-top: 30px;
  height: 45px;
  width: 100%;
  background-color: #d7df23;
  border: 1px solid #31394e;
  border-radius: 6px;
  cursor: pointer;
}

.bottom-text {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #a6a6a8;
  font-family: 'Karla', sans-serif;
  font-weight: regular;
}

.partition {
  margin-top: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.horizontal-line {
  border: 0.8px solid #a6a6a8;
  width: 33%;
}

.partition-text {
  color: #a6a6a8;
  font-family: 'Karla', sans-serif;
}

.underline {
  text-decoration: underline;
  color: #d3d3d3 !important;
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
