<template>
  <div class="center-container">
    <div class="flex justify-between items-center">
      <!-- <h6 class="custom-heading" style="color: #a6a6a8">Welcome back!</h6> uncomment after design fix and remove the below line -->
      <h6 class="custom-heading" style="color: #a6a6a8">Sign Up</h6>
      <button class="close-icon" @click="closeForm">✕</button>
    </div>

    <div class="flex justify-between items-center mt-8 mb-4">
      <div
        class="child-1 cursor-pointer"
        id="google-login"
        @click="loginWithGoogle"
      >
        <p class="flex justify-start items-center">
          <img src="@/assets/images/login/google.png" class="h-6 px-3" />
          <!-- Log in with Google uncomment after design fix and remove the below line -->
          Sign up with Google
        </p>
        <!-- <GoogleLogin/> -->
      </div>

      <div class="child-1 cursor-pointer" @click.prevent="loginWithMetamask">
        <p class="flex justify-start items-center">
          <img src="@/assets/images/Wallet.svg" class="h-6 px-3" />Log in with
          Wallet
        </p>
        <!-- <SignInMetaMask/> -->
      </div>
    </div>

    <!-- Statement "or sign up with email" with lines -->
    <div class="or-divider">
      <div class="or-line"></div>
      <p class="or-text text-sm">or sign-in with email</p>
      <div class="or-line"></div>
    </div>

    <form
      class="mt-6 rounded-lg px-4 form-container"
      @submit.prevent="loginJWT"
    >
      <div class="vx-row mb-6">
        <input
          v-model="email"
          type="email"
          name="email"
          placeholder="Email"
          class="w-full p-4 input-box"
          autocomplete="off"
          :style="{ 'border-color': emailIsValid ? '' : 'red' }"
          @input="ValidMail"
        />
        <div v-if="!emailIsValid" class="text-sm mt-2" style="color: red">
          Please mention a valid email
        </div>
      </div>

      <div class="vx-row mb-6">
        <input
          v-model="password"
          type="password"
          name="password"
          placeholder="Password"
          class="w-full p-4 input-box"
          autocomplete="off"
        />
      </div>

      <div
        class="vx-row flex justify-between items-center mt-8 mb-4 font-semibold"
      >
        <div>
          <vs-checkbox v-model="checkbox_remember_me" class="text-sm">
            Remember me
          </vs-checkbox>
        </div>
        <div>
          <router-link
            class="route cursor-pointer text-sm font-semibold"
            style="color: #a6a6a8; text-decoration: underline"
            :to="{ path: '/resetPassword' }"
          >
            Forget password?
          </router-link>
        </div>
      </div>

      <div class="vx-row mb-3">
        <button
          :class="[
            'w-full p-3 mt-6 mb-4',
            'enabled-btn',
            { 'disabled-btn': !validateForm },
          ]"
          style="
            text-size-adjust: text-sm;
            border: none;
            border-radius: 10px;
            margin: auto;
          "
          :disabled="!validateForm"
        >
          <h3><b class="text-lg">Sign In</b></h3>
        </button>
      </div>
      <div class="flex justify-center">
        <router-link
          class="route cursor-pointer text-sm font-semibold"
          style="color: #a6a6a8; text-decoration: underline"
          :to="{ path: '/signup' }"
        >
          Don't have an account? Sign Up
        </router-link>
      </div>
      <input type="submit" value="" class="text-xs" style="display: none" />
    </form>
  </div>
</template>

<script>
import constants from '../../../constant';
import Web3 from 'web3';
export default {
  data() {
    return {
      constants,
      email: '',
      password: '',
      ValidMail: 'example@mail.com',
      checkbox_remember_me: false,
    };
  },
  computed: {
    emailIsValid() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return this.email === '' || emailRegex.test(this.email);
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
    loginJWT() {
      // Loading
      this.$vs.loading();
      const payload = {
        checkbox_remember_me: this.checkbox_remember_me,
        userDetails: {
          email: this.email,
          password: this.password,
        },
      };
      this.$store
        .dispatch('auth/login', payload)
        .then((response) => {
          this.$cookies.set(
            'Token',
            response.data.accessToken,
            null,
            null,
            'https://cast.video.wiki'
          );
          this.$cookies.set(
            'userId',
            response.data.usersData.id,
            null,
            null,
            'https://cast.video.wiki'
          );
          this.$cookies.set(
            'Token',
            response.data.accessToken,
            null,
            null,
            'https://class.video.wiki'
          );
          this.$cookies.set(
            'userId',
            response.data.usersData.id,
            null,
            null,
            'https://class.video.wiki'
          );
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            event: 'login',
            authenticationMethod: 'Email',
            userId: response.data.usersData.id, // this should be replaced with an actual ID
          });
          console.log(this.activeUserInfo.userRole);
          this.$acl.change(this.activeUserInfo.userRole);
          this.$vs.loading.close();
          this.$router.push('/');
          this.$vs.notify({
            title: 'Success',
            text: 'Login Successfull',
            iconPack: 'feather',
            color: 'success',
          });
        })
        .catch((error) => {
          console.log(error);
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
      this.$refs.form.reset();
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
              this.$acl.change(this.activeUserInfo.userRole);
              this.$router.push('/');
              this.$vs.loading.close();
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

<style>
/* Add styles for the center container as mentioned in the previous response */
*:not(i, #google-login) {
  font-family: 'Karla', sans-serif;
}

#google-login {
  font-family: 'Montserrat', Helvetica, Arial, sans-serif !important;
}

.center-container {
  justify-content: center;
  align-items: center;
  border: 1px solid #31394e;
  padding: 20px;
  border-radius: 10px;
  max-width: 500px;
  min-height: 75vh;
  background-color: #1f272f;
  color: #a6a6a8;
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
  border: 1px solid black;
  padding: 10px;
  width: 48%;
  text-align: center;
  border-radius: 5px;
  border: 1px solid #31394e;
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
  background-color: #f0f0a3;
  cursor: not-allowed;
}

.custom-heading {
  font-size: 15px;
  font-weight: bold;
  color: #a6a6a8;
}
</style>
