<template>
  <div>
    <div v-if="isNftGated">
      <JoinNftGatedCast :castDetailsProps="castDetails" />
    </div>
    <div v-else class="full-container">
      <div class="logo">
        <img class="py-4" src="@/assets/images/logot.svg" alt="" />
      </div>
      <div class="w-full flex flex-col items-center join-wrapper">
        <div class="bg-white w-full flex flex-row justify-between items-center px-4 h-8">
          <div class="bg-black w-4 h-4"></div>
          <div class="flex flex-row gap-2">
            <div class="bg-black w-4 h-4"></div>
            <div class="bg-black w-4 h-4"></div>
          </div>
        </div>
        <div class="join-body">
          <div :class="[verified && nft ? 'join-body-left join-body-left-half' : 'join-body-left']">
            <p class="join-type" v-if="sentOtp">/* Private Cast */</p>
            <p class="join-type" v-else>/* Public Cast */</p>
            <p class="join-by">/* Hosted by {{ creator }} */</p>
            <h2 class="room-name">{{ eventName }}</h2>
            <!-- <p v-if="running" class="room-status"><span></span> LIVE</p>
            <p v-else class="room-status"><span></span> Cast Offline</p> -->
            <div v-if="castDetails && castDetails.time">
              <CountDownTImer :castDetails="castDetails" />
            </div>

            <!-- ask for OTP -->
            <div v-if="sentOtp && !verified">
              <div v-if="!otpSent">
                <div class="join-input-content">
                  <label>user.email</label>
                  <input v-validate="'required'" type="email" name="email" placeholder="//example@email.com"
                    autocomplete="off" v-model="email" />
                  <button @click="requestOtp"><span>/send.OTP</span></button>
                </div>
                <p class="join-type">/* This is a private cast. Please verify your email before joining the cast. This
                  does
                  not create your decast account */</p>
              </div>
              <div v-else>
                <div class="join-input-content">
                  <label>user.OTP</label>
                  <input v-validate="'required'" name="Name" placeholder="Enter the OTP" autocomplete="off"
                    v-model="otp" />
                  <button @click="userVerification"><span>/confirm</span></button>
                </div>
                <p class="join-type">/* Please enter the OTP sent on the email below */</p>
                <div class="join-body-bottom">
                  <p>>> user.email > <span>{{ email }}</span></p>
                </div>
              </div>
            </div>

            <div v-else>
              <div class="join-input-content">
                <label>user.name</label>
                <input placeholder="e.g John G. Miguel" @keydown.enter="joinCast" v-model="joiningName"
                  autocomplete="off" />
                <button @click="joinCast"><span>/cast.join</span></button>
              </div>
              <p v-if="sentOtp" class="join-type">/* Please enter the OTP sent on the email below */</p>
              <div class="join-body-bottom">
                <p v-if="sentOtp">>> user.email > <span>{{ email }}</span></p>
                <p v-if="nft && walletAddress">>> wallet.status > <span>connected</span></p>
                <p v-if="nft && !walletAddress">>> wallet.status > <span>not connected</span></p>
              </div>
            </div>
          </div>
          <div class="join-body-right flex flex-col justify-between" v-if="verified && nft">
            <div>
              <p class="join-type w-full">/* Connect your Wallet (Optional) */</p>
              <div class="step-content">
                <!-- <span v-if="((nft && !skippedStep && !walletAddress) || !verified) && otpField && nft && verified">
                <Private :payload="newPay" />
              </span> -->
                <Private :payload="newPay" />
                <p v-if="walletAddress" class="join-by mt-4">/* Wallet Connected */</p>
              </div>
            </div>

            <div>
              <div class="flex">
                <svg class="mr-5 mb-5" width="37" height="35" viewBox="0 0 37 35" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <g opacity="0.4" clip-path="url(#clip0_362_1532)">
                    <path d="M35.9485 -0.000137329L20.1572 11.8073L23.0937 4.84884L35.9485 -0.000137329Z"
                      fill="#E17726" />
                    <path
                      d="M0.890501 0.0139465L13.7109 4.84984L16.4992 11.8995L0.890501 0.0139465ZM29.5943 25.1111L36.5738 25.2453L34.1346 33.619L25.618 31.2495L29.5943 25.1111ZM7.20833 25.1111L11.1698 31.2495L2.66762 33.6191L0.243164 25.2453L7.20833 25.1111Z"
                      fill="#E27625" />
                    <path
                      d="M16.1199 10.1041L16.4051 19.4134L7.87012 19.021L10.2979 15.3198L10.3286 15.2842L16.1199 10.1041ZM20.594 10.0002L26.4737 15.2845L26.5042 15.32L28.9319 19.0212L20.3988 19.4134L20.594 10.0002ZM11.4196 25.1383L16.0799 28.8077L10.6663 31.4489L11.4196 25.1383ZM25.3836 25.1378L26.1212 31.449L20.7227 28.8074L25.3836 25.1378Z"
                      fill="#E27625" />
                    <path
                      d="M20.8413 28.4617L26.3194 31.1422L21.2237 33.5894L21.2766 31.972L20.8413 28.4617ZM15.9583 28.4628L15.5401 31.9455L15.5745 33.5875L10.4668 31.1422L15.9583 28.4628Z"
                      fill="#D5BFB2" />
                    <path
                      d="M14.3768 20.6281L15.8084 23.6684L10.9346 22.2255L14.3768 20.6281ZM22.4251 20.6284L25.8836 22.2255L20.9938 23.6679L22.4251 20.6284Z"
                      fill="#233447" />
                    <path
                      d="M11.7916 25.1073L11.0038 31.6503L6.78125 25.2504L11.7916 25.1073ZM25.0101 25.1074L30.0206 25.2504L25.7822 31.6506L25.0101 25.1074ZM29.0548 18.6511L25.4084 22.4064L22.597 21.1082L21.251 23.9677L20.3686 19.0504L29.0548 18.6511ZM7.74471 18.6511L16.4327 19.0504L15.5501 23.9677L14.2039 21.1086L11.4073 22.4066L7.74471 18.6511Z"
                      fill="#CC6228" />
                    <path
                      d="M7.49902 17.8801L11.6246 22.1106L11.7675 26.2869L7.49902 17.8801ZM29.3065 17.8726L25.0303 26.2943L25.1913 22.1106L29.3065 17.8726ZM16.231 18.1379L16.397 19.194L16.8073 21.825L16.5435 29.9056L15.2964 23.4142L15.296 23.3471L16.231 18.1379ZM20.5683 18.1232L21.5057 23.3471L21.5053 23.4142L20.255 29.9219L20.2056 28.2941L20.0105 21.777L20.5683 18.1232Z"
                      fill="#E27525" />
                    <path
                      d="M25.5584 21.9424L25.4188 25.5709L21.0667 28.9974L20.187 28.3693L21.1731 23.2362L25.5584 21.9424ZM11.2588 21.9424L15.6289 23.2362L16.615 28.3693L15.7352 28.9974L11.383 25.5706L11.2588 21.9424Z"
                      fill="#F5841F" />
                    <path
                      d="M9.63379 30.3409L15.2018 33.0069L15.1782 31.8685L15.6441 31.4552H21.1549L21.6376 31.867L21.602 33.0046L27.1348 30.3476L24.4425 32.5958L21.1871 34.8552H15.5994L12.3462 32.5865L9.63379 30.3409Z"
                      fill="#C0AC9D" />
                    <path
                      d="M20.4427 28.1067L21.2299 28.6687L21.6912 32.3882L21.0236 31.8186H15.78L15.125 32.3997L15.5712 28.669L16.3587 28.1067H20.4427Z"
                      fill="#161616" />
                    <path
                      d="M34.9062 0.327042L36.8018 6.07349L35.6179 11.8839L36.4609 12.5409L35.3202 13.4204L36.1776 14.0895L35.0423 15.1341L35.7393 15.6442L33.8897 17.827L26.3036 15.5949L26.2379 15.5593L20.7713 10.8994L34.9062 0.327042ZM1.89558 0.327042L16.0306 10.8994L10.5638 15.5593L10.4981 15.5949L2.91208 17.827L1.06251 15.6442L1.75887 15.1346L0.624336 14.0895L1.47998 13.4211L0.322159 12.5392L1.19692 11.8817L0 6.07378L1.89558 0.327042Z"
                      fill="#763E1A" />
                    <path
                      d="M25.9325 15.1064L33.9704 17.4713L36.5817 25.6044H29.6923L24.9455 25.6648L28.3976 18.865L25.9325 15.1064ZM10.8691 15.1064L8.40351 18.865L11.8561 25.6648L7.11142 25.6044H0.234375L2.83106 17.4714L10.8691 15.1064ZM23.4875 4.80995L21.2393 10.946L20.7621 19.2351L20.5796 21.8333L20.5651 28.4704H16.2364L16.2223 21.8458L16.0392 19.233L15.5619 10.946L13.314 4.80995H23.4875Z"
                      fill="#F5841F" />
                  </g>
                  <defs>
                    <clipPath id="clip0_362_1532">
                      <rect width="36.8018" height="34.8648" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <svg class="mr-5 mb-5" width="31" height="35" viewBox="0 0 31 35" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <g opacity="0.4">
                    <path
                      d="M17.9906 34.8646C15.123 34.8654 12.2995 34.1587 9.77037 32.8073C7.24123 31.4558 5.08454 29.5013 3.49144 27.117C1.89834 24.7326 0.918029 21.9921 0.637395 19.1383C0.356761 16.2845 0.784469 13.4055 1.88261 10.7566C2.98076 8.1076 4.71542 5.77044 6.93286 3.95222C9.15031 2.134 11.782 0.89088 14.5948 0.333036C17.4076 -0.224808 20.3146 -0.0801476 23.0581 0.754196C25.8016 1.58854 28.2969 3.0868 30.3229 5.11618L24.477 10.9864C23.1995 9.71535 21.5741 8.85117 19.806 8.50294C18.0378 8.15471 16.2061 8.33804 14.5421 9.02978C12.878 9.72151 11.4561 10.8907 10.4559 12.3897C9.45563 13.8887 8.92182 15.6505 8.92182 17.4526C8.92182 19.2547 9.45563 21.0164 10.4559 22.5155C11.4561 24.0145 12.878 25.1837 14.5421 25.8754C16.2061 26.5671 18.0378 26.7505 19.806 26.4022C21.5741 26.054 23.1995 25.1898 24.477 23.9188L30.3472 29.789C28.7243 31.4084 26.7969 32.6906 24.6762 33.5617C22.5554 34.4329 20.2832 34.8757 17.9906 34.8646Z"
                      fill="#3A69E3" />
                  </g>
                </svg>
                <svg class="mr-5 mb-5" width="35" height="35" viewBox="0 0 35 35" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <g opacity="0.4">
                    <path
                      d="M24.2845 20.2042L28.2329 24.1497L17.5512 34.8314L6.86949 24.1512L10.8165 20.2042L17.5512 26.9738L24.2845 20.2042ZM31.0207 13.4694L34.9996 17.415L31.0555 21.3605L27.1085 17.415L31.0207 13.4694ZM17.5512 13.4694L21.4967 17.3801L17.5498 21.3271L13.6042 17.415L17.5512 13.4694ZM4.0803 13.4694L7.99388 17.415L4.08321 21.3257L0.134766 17.415L4.0803 13.4694ZM17.5527 0L28.23 10.6454L24.283 14.5895L17.5527 7.85621L10.8179 14.6258L6.87094 10.6803L17.5527 0Z"
                      fill="#EBB52C" />
                  </g>
                </svg>
              </div>
              <p class="join-type w-full">/* Your wallet information is not mapped to your email or name. It is saved
                with encryption and only used for the airdrop configured by the cast host. */</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <div class="idk-co">
    <div class="container-full flex">
      <div class="logo">
        <img src="@/assets/images/logot.svg" alt="" />
      </div>
      <div class="left-side">
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
            <div class="flex flex-wrap my-6 w-full px-16">
              <button
                class="sub-btn justify-center text-lg flex items-center"
                :style="{ backgroundColor: '#1D232B', color: '#A6A6A8' }"
                :disabled="!validateOtp"
                @click.prevent="userVerification"
              >
                Verify
              </button>

              <button
                class="sub-btn justify-center text-lg flex items-center text-black"
                @click.prevent="goBack"
              >
                Cancel
              </button>
            </div>
          </span>
        </form>
      </div>
      <div v-else class="right-side">
        <div class="heading">You're joining the cast</div>
        <div class="step w-full" v-if="this.nft">
          <div>
            <div
              v-if="this.walletAddress"
              @click="reloadStepTwo"
              class="title cursor wall-conn"
            >
              Wallet Connected
            </div>
            <div
              v-if="this.skippedStep"
              @click="reloadStepTwo"
              class="title cursor"
            >
              Step Skipped
            </div>

            <div class="step-content">
              <span
                v-if="
                  ((this.nft && !this.skippedStep && !this.walletAddress) ||
                    !this.verified) &&
                  this.otpField &&
                  this.nft &&
                  this.verified
                "
              >
                <Private :payload="this.newPay" />
              </span>
            </div>
          </div>
          <div v-if="!this.walletAddress" class="or-cont">
            <div class="border-line"></div>
            <h3 class="mx-auto or-wall" v-if="!this.walletAddress">Or skip</h3>
            <div class="border-line"></div>
          </div>
        </div>
        <br />
        <div class="name">Joining name</div>
        <input
          placeholder="e.g John G. Miguel"
          @keydown.enter="joinCast"
          v-model="joiningName"
        />
        <div class="button">
          <button class="cursor-pointer" @click="joinCast">Access cast</button>
        </div>
      </div>
    </div>
  </div> -->
</template>

<script>
import Private from '@/layouts/components/navbar/components/Connect_Wallet.vue';
import JoinNftGatedCast from './JoinNftGatedCast.vue';
import CountDownTImer from './CountDownTImer.vue';
import { POSTHOG_EVENT } from '@/enums/PosthogEnums.js';

export default {
  name: 'JoinCast',
  components: { Private, JoinNftGatedCast, CountDownTImer },
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
      newPay: {},
      sentOtp: false,
      password: '',
      nft: false,
      isNftGated: false,
      castDetails: null,
    };
  },
  // created() {
  //   const credentials = this.extractCredentials();
  //   if (credentials) {
  //     this.password = credentials.password;
  //     this.email = credentials.email;
  //   }
  // },
  computed: {
    validateEmail() {
      return !this.errors.any() && this.email !== '';
    },
    validateOtp() {
      return !this.errors.any() && this.email !== '' && this.otp !== '';
    },
    walletAddress() {
      console.log(this.$store.state.auth.isGetWalletAddress, 'getting wallet');
      return this.$store.state.auth.isGetWalletAddress;
    },
    activeUserInfo() {
      return this.$store.state.AppActiveUser;
    },
  },
  mounted() {
    document.getElementById('loading-bg').style.display = 'block';
    this.joiningName = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).first_name : '';
    const urlParams = new URLSearchParams(window.location.search);
    const emailParam = urlParams.get('email');
    if (emailParam) {
      this.email = decodeURIComponent(emailParam);
    }
    this.getMeetingDetails();
    this.castInfo();
    // console.log(this.newPay);
    // console.log(this.nft, 'nft');
  },
  methods: {
    // extractCredentials() {
    //   const url = window.location.href;
    //   const passStartIndex = url.indexOf('?pass=') + 6; // 6 is the length of '?pass='
    //   const passEndIndex = url.indexOf('%3Femail%3D', passStartIndex); // '%3Femail%3D' is the end of the password

    //   if (passStartIndex !== -1 && passEndIndex !== -1) {
    //     const passParam = url.substring(passStartIndex, passEndIndex);
    //     let emailParam = url.substring(passEndIndex + 10); // 10 is the length of '%3Femail%3D'
    //     emailParam = emailParam.substring(1); // remove the first character
    //     return {
    //       password: decodeURIComponent(passParam),
    //       email: emailParam ? decodeURIComponent(emailParam) : '',
    //     };
    //   }

    //   return null;
    // },
    async castInfo() {
      try {
        //this.$vs.loading();
        const payload = this.meeting_id;
        const response = await this.$store.dispatch(
          'auth/eventDetail',
          payload
        );

        this.castDetails = response.data.meeting_info;
        this.isNftGated = response.data.meeting_info.isNftGated;
        this.nft =
          response.data.meeting_info.give_nft ||
          response.data.meeting_info.vc_details_submitted;
        this.otpVerification = response.data.meeting_info.send_otp;
        this.password_auth = response.data.meeting_info.password_auth;
        this.public_otp = response.data.meeting_info.public_otp;
        this.is_public = !this.password_auth && !this.otpVerification;
        this.event_creator_name = response.data.meeting_info.event_creator_name;
        this.event_name = response.data.meeting_info.event_name;
        this.event_date = response.data.meeting_info.date;
        this.event_time = response.data.meeting_info.time;
        this.description = response.data.meeting_info.description;
        this.meeting_running = response.data.meeting_info.running;
        this.viewer_mode = response.data.meeting_info.viewer_mode;
        this.isExpired = response.data.meeting_info.expired;
        this.has_magic = this.$route.query.pass !== undefined;
        console.log(this.has_magic);
        //this.$vs.loading.close();
        this.data_loaded = true;
      } catch (err) {
        if (err.status === 404) {
          this.$router.push('/error/404.vue');
        } else {
          console.log(err);
        }
      }
    },
    async getMeetingDetails() {
      const res = await this.$store.dispatch(
        'cast/meetingInfo',
        this.meeting_id
      );
      const details = res.data.meeting_info;
      this.castDetails = details;
      this.isNftGated = details.isNftGated;
      this.sentOtp = details.send_otp;
      this.eventName = details.event_name;
      this.eventDescription = details.description;
      this.creator = details.event_creator_name;
      this.running = details.running;
      document.getElementById('loading-bg').style.display = 'none';
    },
    async joinCast() {
      // const credentials = this.extractCredentials();
      // console.log('my credentials are', credentials);
      const payload = {
        name: this.joiningName,
        email: !this.sentOtp ? '' : this.email,
        password: !this.sentOtp ? this.$route.query.pass : '',
        public_meeting_id: this.meeting_id,
        avatar_url: '',
        isPublic: !this.sentOtp,
      };
      if (this.payload) {
        this.email = this.payload.email;
      } else {
        this.email = '';
      }

      if (!this.sentOtp) {
        const joineePayload = {
          user_name: this.joiningName,
          user_email: payload.email || '',
          session_id: payload.public_meeting_id,
        };

        await this.$store
          .dispatch('studio/addJoinee', joineePayload)
          .then(async (response) => {
            if (response.data.status) {
              console.log('public path');
              this.$posthog.capture(POSTHOG_EVENT.USER_JOINED_CAST, {
                'cast_id': this.meeting_id,
                'is_user_authenticated': this.activeUserInfo.id ? true : false,
                'email': this.activeUserInfo.id ? this.activeUserInfo.email : 'null'
              });
              if (this.$route.query.pass !== undefined) {
                console.log(payload);
                await this.magicJoin(payload);
              } else {
                await this.joinCastUtil(payload);
              }
            }
          })
          .catch((err) => {
            console.log(err);
            this.$vs.loading.close();
            this.disabled = false;
            this.$vs.notify({
              title: 'Error Occurred',
              text:
                err.response != null
                  ? err.response.data.message
                  : 'Something went wrong! Try Again',
              color: 'danger',
            });
          });
      } else {
        this.$posthog.capture(POSTHOG_EVENT.USER_JOINED_CAST, {
          'cast_id': this.meeting_id,
          'is_user_authenticated': this.activeUserInfo.id ? true : false,
          'email': this.activeUserInfo.id ? this.activeUserInfo.email : 'null'
        });
        if (this.$route.query.pass !== undefined) {
          await this.magicJoin(payload);
        } else {
          this.joinCastUtil(payload);
        }
      }
    },
    storeData() {
      sessionStorage.setItem('verified', this.verified);
      // sessionStorage.setItem('email', this.email);
    },
    joinCastUtil(payload) {
      console.log('----->');
      this.$store
        .dispatch('studio/joinEvent', payload)
        .then((response) => {
          this.responsedata = response.data.url;
          window.location.href = response.data.url;
          this.$vs.notify({
            title: 'Success',
            text: response.data.message,
            color: 'success',
          });
        })
        .catch((e) => {
          console.log(e.response);
          this.$vs.loading.close();
          this.disabled = false;
          this.$vs.notify({
            title: 'Error Occurred',
            text:
              e.response != null
                ? e.response.data.message
                : 'Check either your password or the cast timing',
            color: 'danger',
          });
        });
    },
    async magicJoin(payload) {
      var data = JSON.stringify({
        id: this.meeting_id,
        pass: this.$route.query.pass,
        name: this.joiningName,
      });
      console.log(178);
      await this.$store
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
          if (!this.running && e.response.status === 400) {
            this.$vs.notify({
              title: 'Cast not started yet!',
              text: 'The cast you are trying to join has either ended or yet to begin',
              color: 'danger',
            });
          }
          this.$vs.loading.close();
          this.disabled = false;
          console.log(e.response);
        });
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
        pass: !this.sentOtp ? this.$route.query.pass : '',
        name: this.joiningName,
      });
      sessionStorage.setItem('name', this.joiningName);
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
    reloadStepOne() {
      this.verified = false;
      this.goBack();
      this.reloadStepTwo();
    },
    reloadStepTwo() {
      this.skippedStep = false;
      this.$store.dispatch('auth/removeWalletAddress', false);
    },
    requestOtp() {
      if (this.otpField) {
        this.userVerification();
      } else {
        this.payload = {
          email: this.email.toLowerCase(),
          meeting_id: this.$route.params.meetingID,
        };
        sessionStorage.setItem('email', this.payload.email);
        this.newPay = {
          email: this.email.toLowerCase(),
          cast_id: this.meeting_id,
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
    skipStep() {
      this.skippedStep = true;
    },
  },
};
</script>
<style scoped>
*:not(i) {
  /* font-family: 'Karla', sans-serif !important; */
  font-family: 'JetBrains Mono' !important;
}

.logo {
  height: 100px;
  display: flex;
  align-items: center;
}

.logo img {
  height: inherit;
}

.full-container {
  background-color: #000000;
  /* background-image: url('../assets/images/joiningPage/left.png'),
    url('../assets/images/joiningPage/right.png'); */
  background-position: left center, right top;
  background-size: 30% 70%, contain;
  background-repeat: no-repeat, no-repeat;
  height: 100vh;
  width: 100%;
  padding-left: 67px;
  padding-right: 67px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  padding-bottom: 50px;
}

.join-wrapper {
  height: calc(100vh - 100px);
}

.join-body {
  width: 100%;
  margin-top: 10px;
  display: flex;
}

.join-body-left {
  padding: 20px;
  border: 1px solid #FFFFFF;
  flex: 1;
}

.join-body-left-half {
  flex: 0.55 !important;
}

.join-body-right {
  padding: 20px;
  border: 1px solid #FFFFFF;
  flex: 0.45;
  margin-left: 10px;
}

.join-type {
  color: #5B96EB;
  width: 60%;
}

.join-by {
  color: #22C55E;
}

.join-input-content {
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  margin-bottom: 36px;
}

.join-input-content label {
  color: #FFFFFF;
}

.join-input-content input {
  background-color: #FFFFFF;
  color: #000000;
  border: none;
  outline: none;
  padding: 10px;
  margin: 5px 0px 10px 0px;
  max-width: 350px;
}

.join-input-content button {
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

.join-input-content button:disabled {
  opacity: 0.5;
}

.join-input-content button span {
  margin-right: 30px;
}

.room-name {
  color: #FFFFFF;
  font-weight: 700;
  max-width: 450px;
  margin-top: 10px;
  margin-bottom: 10px;
}

.room-status {
  color: #EF4444;
  display: flex;
  align-items: center;
}

.room-status span {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: #EF4444;
  margin-right: 5px;
}

.join-body-bottom {
  margin-top: 5px;
  color: #FFFFFF;
}

.join-body-bottom span {
  color: #22C55E;
}

@media (max-width: 499px) {
  .full-container {
    /* background-image: url('../assets/images/joiningPage/right.png'); */
    background-image: none;
    background-position: right center;
    background-size: contain;
    background-repeat: no-repeat;
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-left: 10px;
    padding-right: 10px;
    overflow-y: scroll;
    padding-bottom: 50px;
  }
}
</style>
