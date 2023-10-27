<template>
  <div class="container-full flex">
    <div class="logo">
      <img src="@/assets/images/dashboard/Cast-Draft-Logo-02.svg" alt="" />
    </div>
    <div class="left-side">
      <!-- <div class="time flex">
        <div class="number flex">
          02
          <p>hr</p>
          <p class="dot">:</p>
        </div>
        <div class="number flex">
          06
          <p>min</p>
          <p class="dot">:</p>
        </div>
        <div class="number flex">
          08
          <p>sec</p>
        </div>
      </div> -->
      <div v-if="running" class="info-part flex">
        <div><span v-if="sentOtp">Private </span>Cast is live</div>
        <img src="@/assets/images/dashboard/Live.svg" alt="" />
      </div>
      <div v-else class="info-part flex text-danger">
        <div><span v-if="sentOtp">Private </span>Cast is not live</div>
      </div>
      <div class="class-name">
        <p>{{ eventName }}</p>
        <div class="host-name">Hosted by “{{ creator }}”</div>
      </div>
      <div class="bottom-text">
        {{ eventDescription }}
      </div>
    </div>
    <div v-if="sentOtp && !verified" class="right-side">
      <p class="heading">
        This is a private secure event, so let's just verify that it is really
        you.
      </p>
      <form
        @submit.prevent="requestOtp"
        v-if="activeSection === 'Verification' && !verified"
      >
        <div v-if="!otpSent" class="name">
          Enter Your Email
          <input
            class="verification-input text-xl"
            v-validate="'required'"
            type="email"
            name="email"
            placeholder="xyz@example.com"
            autocomplete="off"
            v-model="email"
          />
          <p class="otp-text pt-3">
            We will send an OTP to your email to verify your email. This does
            not create your VideoWiki account.
          </p>
          <div class="button">
            <button v-if="!otpField" @click.prevent="requestOtp">
              Request OTP
            </button>
          </div>
        </div>
        <span v-if="otpField">
          <div class="flex name">
            <p class="text-grey">Check your email for OTP</p>
          </div>
          <input
            class="verification-input text-xl"
            v-validate="'required'"
            name="Name"
            placeholder="Enter OTP"
            autocomplete="off"
            v-model="otp"
          />
          <div class="flex flex-wrap my-3 w-full">
            <vs-button
              class="flex items-center join-btn mr-4 text-black bg-white"
              :disabled="!validateOtp"
              @click.prevent="userVerification"
              >Verify</vs-button
            >
            <vs-button
              class="flex items-center text-black go-back-btn bg-white"
              @click.prevent="goBack"
              >Cancel</vs-button
            >
          </div>
        </span>
      </form>
    </div>
    <div v-else class="right-side">
      <div class="heading">You're joining the cast</div>
      <div class="name">Joining name</div>
      <input
        placeholder="e.g John G. Miguel"
        @keydown.enter="accessCast"
        v-model="joiningName"
      />
      <div class="button">
        <button class="cursor-pointer" @click="accessCast">Access cast</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'WaitForJoin',
  data() {
    return {
      joiningName: '',
      meeting_id: this.$route.params.meetingID,
      eventName: '',
      eventDescription: '',
      creator: '',
      disabled: false,
      running: false,
      activeSection: 'Verification',
      email: '',
      name: '',
      verified: false,
      otpField: false,
      otp: '',
      skippedStep: false,
      otpSent: false,
      payload: {},
      sentOtp: false,
    };
  },
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
    document.getElementById('loading-bg').style.display = 'block';
    this.getMeetingDetails();
  },
  methods: {
    async getMeetingDetails() {
      const res = await this.$store.dispatch(
        'cast/meetingInfo',
        this.meeting_id
      );
      const details = res.data.meeting_info;
      console.log(details);
      this.sentOtp = details.send_otp;
      console.log(this.sentOtp);
      this.eventName = details.event_name;
      this.eventDescription = details.description;
      this.creator = details.event_creator_name;
      this.running = details.running;
      document.getElementById('loading-bg').style.display = 'none';
    },
    accessCast() {
      if (this.disabled) {
        return;
      }
      this.disabled = true;
      setTimeout(() => {
        this.disabled = false;
      }, 1000);
      if (this.joiningName.length === 0) {
        this.$vs.notify({
          title: 'Name require',
          color: 'danger',
        });
        return;
      }
      var data = JSON.stringify({
        id: this.meeting_id,
        pass: this.$route.query.pass,
        name: this.joiningName,
      });
      this.$vs.loading();
      console.log(178);
      this.$store
        .dispatch('studio/magicJoin', data)
        .then((res) => {
          console.log(res.data.url, 181);
          if (res.data.url) {
            console.log(184);
            this.$vs.notify({
              title: 'Success',
              color: 'success',
            });
            location.href = res.data.url;
          } else {
            this.$vs.loading.close();
            this.disabled = false;
            this.$vs.notify({
              title: 'Wrong Link',
              text: 'You have the wrong link to join',
              color: 'danger',
            });
          }
        })
        .catch((e) => {
          this.$vs.loading.close();
          console.log(e.response);
        });
    },
    requestOtp() {
      if (this.otpField) {
        this.userVerification();
      } else {
        this.payload = {
          email: this.email.toLowerCase(),
          meeting_id: this.$route.params.meetingID,
        };

        // Loading
        if (this.email === '') {
          this.$vs.notify({
            title: 'Email Require',
            text: 'Enter Email to Proceed Further',
            color: 'danger',
          });
          return;
        }
        this.$vs.loading();
        this.$store
          .dispatch('auth/sendingOtp', this.payload)
          .then((res) => {
            console.log(res.data);
            this.$vs.loading.close();

            if (res.data.status) {
              this.otpField = true;
              this.otpSent = true;
              this.$vs.notify({
                // title: 'Error',
                text: this.$t('Verification.otpsent'),
                iconPack: 'feather',
                icon: 'icon-alert-circle',
                color: 'success',
              });
            }
          })
          .catch((e) => {
            console.log(e.response.data);
            this.$vs.loading.close();
            if (e.response.data.message === 'invalid email')
              this.$vs.notify({
                title: 'Unauthorized',
                text: 'Invalid Email',
                iconPack: 'feather',
                icon: 'icon-alert-circle',
                color: 'danger',
              });
            else {
              this.$vs.notify({
                title: 'Error Occurred',
                text: 'Try Again',
                color: 'danger',
              });
            }
          });
      }
    },
    userVerification() {
      const payload = {
        email: this.email,
        meeting_id: this.$route.params.meetingID,
        otp: this.otp,
      };
      // Loading
      this.$vs.loading();

      this.$store
        .dispatch('auth/verifyingOtp', payload)
        .then((res) => {
          this.$vs.loading.close();
          if (res.data.status) {
            this.verified = true;
          }
          this.$vs.notify({
            title: 'Congrats',
            text: 'Verified',
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'success',
          });
          this.activeSection = 'Join';
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
    goBack() {
      this.otpSent = false;
      this.otpField = false;
    },
  },
};
</script>
<style scoped>
*:not(i) {
  font-family: 'Karla', sans-serif !important;
}
.container-full {
  background: linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)),
    url('../assets/images/dashboard/background.png');
  width: 100%;
  height: 100vh;
  background-repeat: no-repeat;
  background-position-y: bottom;
}

.logo {
  width: 91px;
  height: 91px;
}
.left-side {
  width: 425px;
  margin-left: 300px;
  margin-top: 200px;
}
.number {
  font-weight: 600;
  font-size: 20px;
  color: #d7df23;
}
.number p {
  font-size: 13px;
  font-weight: 500;
  color: #647181;
  display: flex;
  align-self: flex-end;
  padding-bottom: 4px;
  padding-left: 2px;
}
.dot {
  margin: 5px 32px 0px 32px;
  width: 6px;
  height: 28px;
  color: #64718180;
  display: flex;
}
.info-part {
  margin-top: 30px;
  align-items: center;
}
.info-part div {
  font-weight: 600;
  font-size: 14px;
  color: #d7df23;
}
.info-part img {
  margin-left: 8px;
  width: 16px;
  height: 12px;
}
.class-name p {
  margin-top: 15px;
  font-weight: 500;
  font-size: 24px;
  color: #a6a6a8;
}
.host-name {
  margin-top: 5px;
  font-weight: 500;
  font-size: 16px;
  color: #647181;
}
.bottom-text {
  margin-top: 33px;
  font-weight: 500;
  font-size: 12px;
  color: #a6a6a8;
}
.right-side {
  margin-top: 200px;
  margin-left: 14px;
  margin-right: 50px;
  width: 376px;
  height: 266px;
  background-color: #1f272f;
  border: 1px solid #31394e;
  border-radius: 6px;
  padding: 30px;
}
.heading {
  font-size: 12px;
  font-weight: 600;
  color: #a6a6a8;
}
.name {
  margin-top: 18px;
  font-size: 12px;
  font-weight: 600;
  color: #637181;
  margin-bottom: 5px;
}
.right-side input {
  width: 319px;
  height: 40px;
  background-color: #1d232b;
  border-radius: 6px;
  border: 1px solid #31394e;
  padding: 0px 15px;
  font-weight: 500;
  font-size: 12px;
  color: #a6a6a8;
}
.button {
  margin-top: 20px;
}
.button button {
  width: 319px;
  height: 40px;
  border-radius: 6px;
  border: 1px solid #31394e;
  font-weight: 600;
  font-size: 12px;
  color: #181a20;
  background-color: #d7df23;
}
</style>
