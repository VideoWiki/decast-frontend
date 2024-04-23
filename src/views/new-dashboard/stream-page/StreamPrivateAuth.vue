<template>
  <div class="h-full">
    <div class="h-full flex flex-col justify-between">
      <div v-if="formLevel !== '3'">
        <p class="join-type">/* Private Straming */</p>
        <h2 class="mt-4 text-white">Join Stream</h2>
        <p class="join-type mt-4">/* Your information is not mapped to your email or name. It is saved with encryption and
          only used for the airdrop configured by the cast host. */</p>
      </div>
      <form>
        <div v-if="formLevel === '1'">
          <div class="flex flex-col">
            <span class="text-white">user.email</span>
            <div>
              <input class="w-4/5 p-2 mt-2" v-validate="'required'" type="email" name="email" placeholder="//enter email"
                autocomplete="off" v-model="email" />
              <p class="intro-text mt-2">
                We will send an OTP to your email to verify your invite. This
                does not create your VideoWiki account.
              </p>
            </div>
          </div>
          <div class="flex items-center">
            <button class="mint-custm-button mt-2" :disabled="!validateEmail"
              @click.prevent="requestOtp">/request.OTP</button>
          </div>
        </div>
        <div v-else-if="formLevel === '2'">
          <div class="flex flex-col">
            <span class="text-white">user.OTP</span>
            <div>
              <input class="w-4/5 p-2 mt-2" v-validate="'required'" name="Name" placeholder="Enter Otp" autocomplete="off"
                v-model="otp" />
              <p class="intro-text mt-2">
                please enter the OTP sent on your email id.
              </p>
            </div>
          </div>
          <div class="flex items-center">
            <button class="mint-custm-button mt-2" :disabled="!validateOtp"
              @click.prevent="userVerification">/verify.OTP</button>
          </div>
        </div>
        <div v-else-if="formLevel === '3'">
          <span v-if="give_nft">
            <Private :payload="this.payload" />
          </span>
          <div>
            <div class="detail-heading mt-8">
              <h3>/cast.details</h3>
              <span v-if="streamDetails.running" class="label-live">•Live</span>
              <span v-else class="label-off">•Offline</span>
            </div>
            <div class="detail-content">
              <p>>> Stream Name > <span class="event-name">{{ streamDetails.event_name }}</span></p>
              <p>>> Host Name > <span>{{ streamDetails.event_creator_name }}</span></p>
              <p>>> Scheduled Time > <span>{{ streamDetails.time }}</span></p>
              <p>>> Scheduled Date > <span>{{ streamDetails.date }}</span></p>
              <p v-if="public_stream">>> Stream Access > <span>Public</span></p>
              <p v-else>>> Stream Access > <span>Private</span></p>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<!-- <template>
  <div class="background-container">
    <div class="par-cont">
      <section class="flex" v-if="public_stream == false">
        <div class="line"></div>
        <div class="step first">
          <span class="flex" v-if="!this.verified">
            <div class="circle">
              <span class="text-2xl font-semibold">1</span>
            </div>
            <div class="mx-3">
              <h2 class="mb-2">Verification</h2>
              <h4 class="step-text">
                Enter your Email id for otp verification
              </h4>
            </div>
          </span>
          <span class="flex" v-else>
            <img src="@/assets/images/verification/green-tick.png" />
            <h2 class="mb-2">Verified</h2>
          </span>
        </div>
        <div class="step second" v-if="give_nft">
          <span class="flex" v-if="!this.skippedStep && !this.walletAddress">
            <div class="circle">
              <span class="text-2xl font-semibold">2</span>
            </div>
            <div class="mx-3">
              <h2 class="mb-2">Connect Wallet</h2>
              <h4 class="step-text">Connect your wallet or skip this step.</h4>
            </div>
          </span>
          <span class="flex" v-if="this.walletAddress">
            <img src="@/assets/images/verification/green-tick.png" />
            <h2 class="mb-2">Wallet Connected</h2>
          </span>
          <span class="flex" v-if="this.skippedStep">
            <img src="@/assets/images/verification/green-tick.png" />
            <h2 class="mb-2">Step Skipped</h2>
          </span>
        </div>
        <div class="step third">
          <span class="flex">
            <div class="circle">
              <span class="text-2xl font-semibold">{{
                !this.give_nft ? 2 : 3
              }}</span>
            </div>
            <div class="mx-3">
              <h2 class="mb-2">Join the event</h2>
              <h4 class="step-text">Click on the button to join the meeting</h4>
            </div>
          </span>
        </div>
      </section>

      <div class="flex flex-col height md:flex-row">
        <div>
          <div
            v-if="
              ((!this.skippedStep && !this.walletAddress) || !this.verified) &&
              public_stream == false
            "
          >
            <form v-if="!this.verified">
              <div class="flex mt-16">
                <h6 class="text-xl my-4">
                  Email
                  <span class="text-danger">*</span>
                </h6>
              </div>

              <input
                class="verification-input text-xl"
                v-validate="'required'"
                type="email"
                name="email"
                placeholder="Enter Email"
                autocomplete="off"
                v-model="email"
              />
              <p>
                We will send an OTP to your email to verify your invite. This
                does not create your VideoWiki account.
              </p>
              <div class="flex flex-wrap my-3">
                <vs-button
                  v-if="!this.otpField"
                  class="flex-1 font-bold h-16"
                  :disabled="!validateEmail"
                  @click.prevent="requestOtp"
                  >Request OTP</vs-button
                >
              </div>
              <span v-if="this.otpField">
                <div class="flex">
                  <h6 class="text-xl my-4">
                    OTP
                    <span class="text-danger">*</span>
                  </h6>
                </div>
                <input
                  class="verification-input text-xl"
                  v-validate="'required'"
                  name="Name"
                  placeholder="Enter Otp"
                  autocomplete="off"
                  v-model="otp"
                />
                <div class="flex flex-wrap my-3">
                  <vs-button
                    class="flex-1 font-bold h-16"
                    :disabled="!validateOtp"
                    @click.prevent="userVerification"
                    >Verify</vs-button
                  >
                </div>
              </span>
            </form>

            <span v-if="give_nft && this.otpField && this.verified">
              <Private :payload="this.payload" />
              <div class="flex flex-wrap my-5">
                <vs-button
                  type="border"
                  class="flex-1 font-bold h-16"
                  @click.prevent="skipStep"
                  >Skip Step</vs-button
                >
              </div>
            </span>
          </div>
          <StreamJoin
            v-if="this.skippedStep || this.walletAddress || public_stream"
          />
        </div>
      </div>
    </div>
  </div>
</template> -->

<script>
import Private from '@/layouts/components/navbar/components/Connect_Wallet.vue';
export default {
  name: 'StreamPrivateAuth',
  components: { Private },
  data() {
    return {
      email: '',
      otp: '',
      payload: {},
      formLevel: '1',
    };
  },
  props: ['streamDetails', 'public_stream', 'give_nft', 'setSessionVerified'],
  computed: {
    validateEmail() {
      return !this.errors.any() && this.email !== '';
    },
    validateOtp() {
      return !this.errors.any() && this.email !== '' && this.otp !== '';
    },
    walletAddress() {
      return this.$store.state.auth.isGetWalletAddress;
    },
  },
  mounted() {
    if (sessionStorage.getItem('username') !== null) {
      this.formLevel = '3';
      // this.callFunctionInChildComponent();
    }
  },
  methods: {
    requestOtp() {
      this.payload = {
        email: this.email.toLowerCase(),
        cast_id: this.streamDetails.public_meeting_id,
      };
      // Loading
      this.$vs.loading();

      this.$store
        .dispatch('auth/sendOtp', this.payload)
        .then((res) => {
          this.$vs.loading.close();
          if (res.data.status === true) {
            this.formLevel = '2';
            this.$vs.notify({
              // title: 'Error',
              text: this.$t('Verification.otpsent'),
              iconPack: 'feather',
              icon: 'icon-alert-circle',
              color: 'success',
            });
          }
        })
        .catch(() => {
          this.$vs.loading.close();
          this.$vs.notify({
            title: 'Error',
            text: this.$t('Verification.try'),
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger',
          });
        });
    },
    userVerification() {
      console.log(this.streamDetails,'stream details');
      const payload = {
        email: this.email,
        cast_id: this.streamDetails.public_meeting_id,
        otp: this.otp,
      };
      // Loading
      this.$vs.loading();
      this.$store
        .dispatch('auth/verifyOtp', payload)
        .then((res) => {
          this.$vs.loading.close();
          if (res.data.status === true) {
            sessionStorage.setItem('username', this.email);
            this.setSessionVerified(true);
            this.formLevel = '3';
          }
        })
        .catch(() => {
          this.$vs.loading.close();
          this.$vs.notify({
            title: 'Error',
            text: this.$t('Verification.correctotp'),
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger',
          });
        });
    },
  },
};
</script>

<style scoped>
*:not(i) {
  font-family: 'JetBrains Mono' !important;
}

.intro-text {
  color: #5B96EB;
}

.join-type {
  color: #5B96EB;
}

.detail-heading {
  background-color: #272727;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.detail-heading h3 {
  color: #FFFFFF;
}

.detail-heading .label-off {
  color: #5B96EB;
}

.detail-heading .label-live {
  color: #EF4444;
}

.detail-content {
  padding: 10px;
}

.detail-content p {
  color: #545454;
  line-height: 2;
}

.detail-content span {
  color: #FFFFFF;
}

.detail-content .event-name {
  color: #22C55E !important;
}

.background-container {
  background: #000000;
  background-image: url('../../../assets/images/back.jpeg');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: bottom;
  height: 100vh;
  width: 100%;
  overflow: hidden;
}

.par-cont {
  backdrop-filter: brightness(0.2);
  height: 100vh;
  width: 100%;
  overflow: hidden;
}

.log-cont img {
  margin: 20px;
}

.line {
  position: absolute;
  width: 40rem;
  height: 0px;
  top: 25rem;
  left: -15rem;
  border: 1px solid rgba(175, 165, 165, 0.527);
  transform: rotate(90.23deg);
}

.height {
  height: 80vh;
}

.step {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 3.5em;
}

.circle {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3em;
  width: 3em;
  height: 3em;
  background: #c4c4c4;
}

.first {
  top: 10rem;
}

.second {
  top: 23rem;
}

.third {
  top: 36rem;
}

.completed-step {
  background: #1dc202;
}

.verification-box {
  margin-top: 5em;
  margin: auto;
  padding: 5em;
  min-width: fit-content;
  max-width: auto;
}

.verification-box>h2 {
  align-items: center;
  justify-content: center;
  display: flex;
}

.verification-input {
  height: 60px;
  border: none;
  background: #f3f3f3;
  font-family: Montserrat;
  border-radius: 4px;
  padding: 10px;
  width: 100%;
}

.verification-img {
  position: absolute;
  bottom: 0px;
  right: 3.5em;
  z-index: -1;
  padding: 0px;
  margin: 0px;
  width: 35%;
}

.step-text {
  margin-top: 0.2rem;
  width: 25rem;
  text-align: justify;
}

@media screen and (max-device-width: 480px) {
  .first {
    top: 6rem;
  }

  .second {
    top: 15rem;
  }

  .third {
    top: 24rem;
  }

  .line {
    top: 20rem;
    width: 30rem;
    left: -13rem;
  }

  .step {
    left: 1em;
  }

  .verification-box {
    padding: 1.6em;
    margin: 0;
    margin-top: 2rem;
    width: 100% !important;
  }

  .verification-img {
    display: none !important;
  }
}
</style>
