<template>
  <div class="full-container">
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
        <div class="join-body-left join-body-left-half">
          <p class="join-by">/* Hosted by {{ creator }} */</p>
          <h2 class="room-name">{{ eventName }}</h2>
          <p v-if="running" class="room-status"><span></span> LIVE</p>
          <p v-else class="room-status"><span></span> Cast Offline</p>

          <div>
            <div class="join-input-content">
              <!-- joining label -->
              <label v-if="hasPurchased && accessToken && address !== ''">user.name</label>
              <input v-if="hasPurchased && accessToken && address !== ''" placeholder="e.g John G. Miguel"
                @keydown.enter="joinCast" v-model="joiningName" autocomplete="off" :disabled="isLoading" />
              <br />
              <label v-if="hasPurchased && accessToken && address !== ''">select.role</label>
              <select v-if="hasPurchased && accessToken && address !== ''" v-model="selectedIndex"
                :class="{ disabled: activeRoles.length < 1 || isLoading }" class="fixed-height w-max w-fit w-2/5 mb-10">
                <option v-for="(role, index) in activeRoles" :key="role" :value="index">
                  {{ role }}
                </option>
              </select>
              <!--  -->

              <!-- joining button -->
              <button v-if="!accessToken">Please login to join</button>
              <button v-if="address === ''">Please connect wallet</button>
              <div v-else-if="!hasPurchased">
                <p class="reg-msg">You haven't purchased any ticket yet, </br> please visit the event page to register
                  yourself for the event</p>
                <button>/Go to Event Page</button>
              </div>
              <button v-else @click="joinCast" :disabled="isLoading"><span>/cast.join</span></button>
              <!--  -->
            </div>
            <div class="join-body-bottom">
              <p>>> user.email > <span>{{ activeUserInfo.email }}</span></p>
              <p v-if="address!==''">>> wallet.status > <span>connected</span></p>
              <p v-else>>> wallet.status > <span>not connected</span></p>
            </div>
          </div>
        </div>
        <div class="join-body-right flex flex-col justify-between">
          <div>
            <p class="join-type w-full">/* Connect your Wallet */</p>
            <div class="step-content">
              <button v-if="address === ''" @click="connectWallet">Connect wallet</button>
              <button v-else>{{ address.slice(0, 8) }}...{{ address.slice(address.length - 5, address.length) }}</button>
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
            <p class="join-type w-full">/* Your wallet information is not mapped to your email or name. It will be used to fetch your purchased ticket */</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Private from '@/layouts/components/navbar/components/Connect_Wallet.vue';
import { ethers } from 'ethers';
import { tokenContractWithSigner } from "../nft-gating/Constants"

export default {
  name: 'JoinNftGatedCast',
  components: { Private },
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


      // nft gating data
      address: '',
      currencyBalance: '',
      hasPurchased: true,
      isLoading: false,
      activeRoles: [],
      activeTokenId: [],
      isWhiteListed: [],
      selectedIndex: 0,
    };
  },
  computed: {
    accessToken() {
      return this.$store.state.auth.accessToken;
    },
    activeUserInfo() {
      return this.$store.state.AppActiveUser;
    },
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
    joiningRole: {
      get() {
        return this.activeRoles[this.selectedIndex];
      },
      set(newRole) {
        this.selectedIndex = this.activeRoles.indexOf(newRole);
      }
    }
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
    this.connectWallet();
  },
  methods: {
    async connectWallet() {
      try {
        const windowWithEthereum = window;

        if (windowWithEthereum && windowWithEthereum.ethereum) {
          const ethereum = windowWithEthereum.ethereum;
          await ethereum.request({ method: 'eth_requestAccounts' });

          const provider = new ethers.providers.Web3Provider(ethereum);
          // Get current network
          const network = await provider.getNetwork();
          const isOpSepNetwork = network.chainId === 11155420;

          // // Switch to Mumbai network if not already on it
          if (!isOpSepNetwork) {
            try {
              await provider.send('wallet_switchEthereumChain', [{ chainId: '0xaa37dc' }]);
            } catch (error) {
              console.error('Failed to switch to optimism sepolia network:', error);
            }
          }

          // Get account and balance
          const signer = provider.getSigner();
          const currentAccount = await signer.getAddress();
          const currentBalance = await signer.getBalance();

          this.fetchTokenDetails();
          this.address = currentAccount.toString();
          this.currencyBalance = parseFloat(ethers.utils.formatEther(currentBalance || ethers.constants.Zero)).toFixed(4);
        } else {
          console.warn('Window or window.ethereum is not available.');
        }
      } catch (error) {
        console.error('Error connecting wallet:', error);
      }
    },
    async fetchTokenDetails() {
      this.isLoading = true;
      let hasPurchased = false;
      this.activeRoles = [];
      this.activeTokenId = [];
      this.isWhiteListed = [];
      const castId = this.$route.params.meetingID;
      try {
        const tokenIds = await tokenContractWithSigner.getTokenIdsFromEventId(castId);
        const roles = await tokenContractWithSigner.getAccessLevelsFromEventId(castId);
        const whiteListPromises = tokenIds.map(tokenId =>
          tokenContractWithSigner.getWhitelistBooleanFromTokenId(tokenId._hex)
        );
        const isWhiteListed = await Promise.all(whiteListPromises);
        for (let i = 0; i < tokenIds.length; i++) {
          const address = ethers.utils.getAddress(this.address);
          const isPurchased = await tokenContractWithSigner.balanceOf(address, tokenIds[i]);
          if (isPurchased.toNumber() > 0) {
            hasPurchased = true;
            this.activeRoles.push(roles[i]);
            this.activeTokenId.push(tokenIds[i]._hex);
            this.isWhiteListed.push(isWhiteListed[i])
          }
        }
        this.isLoading = false;
        if (!hasPurchased) {
          this.hasPurchased = false;
        }
      } catch (error) {
        console.error("Error calling contract function:", error);
      }
    },
    async castInfo() {
      try {
        //this.$vs.loading();
        const payload = this.meeting_id;
        const response = await this.$store.dispatch(
          'auth/eventDetail',
          payload
        );

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
      console.log(details);
      this.sentOtp = details.send_otp;
      this.eventName = details.event_name;
      this.eventDescription = details.description;
      this.creator = details.event_creator_name;
      this.running = details.running;
      document.getElementById('loading-bg').style.display = 'none';
    },
    async joinCast() {
      const payload = {
        cast_id: this.meeting_id,
        email: this.activeUserInfo ? this.activeUserInfo.email : null,
        token_id: this.activeTokenId[this.selectedIndex],
        role: this.activeRoles[this.selectedIndex].toLowerCase(),
        name: this.joiningName,
        isWhiteListed: this.isWhiteListed[this.selectedIndex] ? 'True' : 'False',
      };

      fetch(`https://api.cast.decast.live/api/cast-token/join/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }).then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      }).then(result => {
        this.$vs.notify({
          title: 'Request Accepted',
          text: '',
          color: 'success',
        });
        location.href = result.url;
      }).catch(error => {
        this.$vs.notify({
          title: 'Operation failed',
          text: 'Failed to accept request, please try again later!',
          color: 'danger',
        });
      });

      // const payload = {
      //   name: this.joiningName,
      //   email: !this.sentOtp ? '' : this.email,
      //   password: !this.sentOtp ? this.$route.query.pass : '',
      //   public_meeting_id: this.meeting_id,
      //   avatar_url: '',
      //   isPublic: !this.sentOtp,
      // };
      // if (this.payload) {
      //   this.email = this.payload.email;
      // } else {
      //   this.email = '';
      // }

      // if (!this.sentOtp) {
      //   const joineePayload = {
      //     user_name: this.joiningName,
      //     user_email: payload.email || '',
      //     session_id: payload.public_meeting_id,
      //   };

      //   await this.$store
      //     .dispatch('studio/addJoinee', joineePayload)
      //     .then(async (response) => {
      //       console.log(response.data);
      //       if (response.data.status) {
      //         console.log('public path');
      //         if (this.$route.query.pass !== undefined) {
      //           console.log(payload);
      //           await this.magicJoin(payload);
      //         } else {
      //           await this.joinCastUtil(payload);
      //         }
      //       }
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //       this.$vs.loading.close();
      //       this.disabled = false;
      //       this.$vs.notify({
      //         title: 'Error Occurred',
      //         text:
      //           err.response != null
      //             ? err.response.data.message
      //             : 'Something went wrong! Try Again',
      //         color: 'danger',
      //       });
      //     });
      // } else {
      //   if (this.$route.query.pass !== undefined) {
      //     await this.magicJoin(payload);
      //   } else {
      //     this.joinCastUtil(payload);
      //   }
      // }
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
      console.log(payload);
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
  watch: {
    activeRoles(newRoles) {
      if (newRoles.length > 0 && !newRoles.includes(this.joiningRole)) {
        this.selectedIndex = 0;
      } else if (newRoles.length === 0) {
        this.selectedIndex = null;
      }
    }
  },
  created() {
    if (this.activeRoles.length > 0) {
      this.selectedIndex = 0;
    }
  }
};
</script>
<style scoped>
*:not(i) {
  /* font-family: 'Karla', sans-serif !important; */
  font-family: 'JetBrains Mono' !important;
}

.fixed-height {
  height: 38px;
  padding-left: 8px;
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
.step-content button {
  margin: 14px 0px;
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

.reg-msg {
  margin-bottom: 20px;
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
  }
}
</style>
