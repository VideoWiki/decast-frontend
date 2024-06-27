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
          <p class="join-by">/* Hosted by {{ castDetails.event_creator_name }} */</p>
          <h2 class="room-name">{{ castDetails.event_name }}</h2>
          <!-- <p v-if="castDetails.running" class="room-status"><span></span> LIVE</p>
          <p v-else class="room-status"><span></span> Cast Offline</p> -->
          <div v-if="castDetails && castDetails.time"><CountDownTImer :castDetails="castDetails"/></div>

          <div>
            <div class="join-input-content">
              <div class="tc-section" v-if="tokenUri.length > 0">
                <h3>🎉Congrats! you have unlocked {{ tokenUri.length }} tickets</h3>
                <p>Select the ticket below which you want to join</p>
                <div class="flex">
                  <div class="px-4 py-8" v-for="(ticket, index) in tokenUri" :key="role" :value="index"><img
                      class="ticketImage" :class="{ 'selectedTicket': selectedIndex === index }"
                      @click="() => selectedIndex = index" :src="ticket.tokenImage" :alt="ticket.name" /></div>
                  <!-- <div class="px-4 py-4"><img class="ticketImage" :class="{'selectedTicket': selectedIndex === 0}" @click="() => selectedIndex=0" src="https://i.pinimg.com/564x/b6/36/a6/b636a6b19a75b142dc28f63baca76a40.jpg" alt="Co-host ticket"/></div>
                  <div class="px-4 py-4"><img class="ticketImage" :class="{'selectedTicket': selectedIndex === 1}" @click="() => selectedIndex=1" src="https://i.pinimg.com/564x/b6/36/a6/b636a6b19a75b142dc28f63baca76a40.jpg" alt="Co-host ticket"/></div>
                  <div class="px-4 py-4"><img class="ticketImage" :class="{'selectedTicket': selectedIndex === 2}" @click="() => selectedIndex=2" src="https://i.pinimg.com/564x/b6/36/a6/b636a6b19a75b142dc28f63baca76a40.jpg" alt="Co-host ticket"/></div> -->
                </div>
              </div>
              <!-- joining label -->
              <label v-if="hasPurchased && accessToken && address !== ''">user.name</label>
              <input v-if="hasPurchased && accessToken && address !== ''" placeholder="e.g John G. Miguel"
                @keydown.enter="joinCast" v-model="joiningName" autocomplete="off" :disabled="isLoading" />
              <br />
              <!-- <label v-if="hasPurchased && accessToken && address !== ''">select.role</label>
              <select v-if="hasPurchased && accessToken && address !== ''" v-model="selectedIndex"
                :class="{ disabled: activeRoles.length < 1 || isLoading }" class="fixed-height w-max w-fit w-2/5 mb-10">
                <option v-for="(role, index) in activeRoles" :key="role" :value="index">
                  {{ role }}
                </option>
              </select> -->
              <!--  -->

              <!-- joining button -->
              <button v-if="!accessToken" @click="openLoginModal">Please login to join</button>
              <button v-else-if="address === ''">Please connect wallet</button>
              <div v-else-if="!hasPurchased">
                <p class="reg-msg">You haven't purchased any ticket yet, </br> please visit the event page to register
                  yourself for the event</p>
                <button @click="goToEventPage">/Go to Event Page</button>
              </div>
              <button v-else @click="joinCast" :disabled="isLoading"><span>/Join as {{ tokenUri[selectedIndex].name
                  }}</span></button>
              <!--  -->
            </div>
            <div class="join-body-bottom">
              <p v-if="accessToken">>> user.account >
                <span v-if="activeUserInfo.email === ''">
                  {{ activeUserInfo.username.slice(0, 8) }}...{{
            activeUserInfo.username.slice(activeUserInfo.username.length - 5, activeUserInfo.username.length) }}
                </span>
                <span v-else>{{ activeUserInfo.email }}</span>
              </p>
              <p v-else>>> user.account > <span>Not logged in</span></p>
              <p v-if="address !== ''">>> wallet.status > <span>connected</span></p>
              <p v-else>>> wallet.status > <span>not connected</span></p>
            </div>
          </div>
        </div>
        <div class="join-body-right flex flex-col justify-between">
          <div>
            <p class="join-type w-full">/* Connect your Wallet */</p>
            <div class="step-content">
              <button v-if="address === ''" @click="connectWallet">Connect wallet</button>
              <button v-else>{{ address.slice(0, 8) }}...{{ address.slice(address.length - 5, address.length)
                }}</button>
              <p v-if="address !== ''" class="join-by mt-4">/* Wallet Connected */</p>
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
              <!-- <svg class="mr-5 mb-5" width="31" height="35" viewBox="0 0 31 35" fill="none"
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
              </svg> -->
            </div>
            <p class="join-type w-full">/* Your wallet information is not mapped to your email or name. It will be used
              to fetch your purchased ticket */</p>
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
import CountDownTImer from './CountDownTImer.vue';
import constants from '../../../../constant';

export default {
  name: 'JoinNftGatedCast',
  components: { Private, CountDownTImer },
  props: ["castDetailsProps"],
  data() {
    return {
      joiningName: '',
      email: '',
      meeting_id: this.$route.params.meetingID,

      // nft gating data
      castDetails: this.castDetailsProps,
      address: '',
      currencyBalance: '',
      hasPurchased: true,
      isLoading: false,
      selectedIndex: 0,
      tokenUri: [],
      // tokenUriSample: [
      //   {
      //     name: "Viewer",
      //     description: '',
      //     tokenId: 'sdsdfsdfsdf',
      //     tokenImage: 'https://videowikistorage.blob.core.windows.net/sample/ViewerNFT.png'
      //   }
      // ],
    };
  },
  computed: {
    accessToken() {
      return this.$store.state.auth.accessToken;
    },
    activeUserInfo() {
      return this.$store.state.AppActiveUser;
    },
  },
  mounted() {
    document.getElementById('loading-bg').style.display = 'block';
    document.getElementById('loading-bg-transparent').style.display = 'none';
    this.joiningName = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).first_name : '';
    const urlParams = new URLSearchParams(window.location.search);
    const emailParam = urlParams.get('email');
    if (emailParam) {
      this.email = decodeURIComponent(emailParam);
    }
    if (this.castDetailsProps && this.castDetailsProps.public_meeting_id) {
      // No need fetch meeting detail again
      document.getElementById('loading-bg').style.display = 'none';
    } else {
      this.getMeetingDetails();
    }
    this.connectWallet();
  },
  methods: {
    async connectWallet() {
      try {
        const windowWithEthereum = window;

        if (windowWithEthereum && windowWithEthereum.ethereum) {
          const ethereum = windowWithEthereum.ethereum;
          await ethereum.request({ method: 'eth_requestAccounts' });

          const provider = new ethers.providers.Web3Provider(ethereum, 'any');
          // Get current network
          const network = await provider.getNetwork();
          const isOpSepNetwork = network.chainId === 11155420;

          // // Switch to Mumbai network if not already on it
          if (!isOpSepNetwork) {
            try {
              await provider.send('wallet_switchEthereumChain', [{ chainId: '0xaa37dc' }]);
            } catch (error) {
              if (error.code === 4902) {
                try {
                  await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [
                      {
                        chainId: '0xaa37dc',
                        chainName: 'Optimism Sepolia',
                        rpcUrls: ['https://sepolia.optimism.io'],
                        nativeCurrency: {
                          name: 'ether',
                          symbol: 'ETH',
                          decimals: 18,
                        },
                        blockExplorerUrls: ['https://optimism-sepolia.blockscout.com'],
                      },
                    ],
                  });
                } catch (error) {
                  console.error('Failed to add optimism sepolia network');
                }
              } else {
                console.error('Failed to switch to optimism sepolia network');
              }
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
      document.getElementById('loading-bg-transparent-title').innerText = 'Collecting your tickets';
      document.getElementById('loading-bg-transparent').style.display = 'flex';
      this.isLoading = true;
      let hasPurchased = false;
      this.tokenUri = [];
      const castId = this.$route.params.meetingID;
      try {
        const tokenIds = await tokenContractWithSigner.getTokenIdsFromEventId(castId);
        document.getElementById('loading-bg-transparent-title').innerText = 'Verifying all tickets';
        for (let i = 0; i < tokenIds.length; i++) {
          const address = ethers.utils.getAddress(this.address);
          const isPurchased = await tokenContractWithSigner.balanceOf(address, tokenIds[i]);
          const TOKEN_URI_API = await tokenContractWithSigner.uri(tokenIds[i].toString());
          //if user has purchased this token
          if (isPurchased.toNumber() > 0) {
            hasPurchased = true;
            try {
              const response = await fetch(TOKEN_URI_API, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
              });
              if (!response.ok) {
                throw new Error(response.statusText);
              }
              const result = await response.json();
              this.tokenUri.push({
                name: result.name,
                description: result.description,
                tokenId: result.tokenId,
                tokenImage: result.tokenImage,
              });
            } catch (error) {
              console.error("Error occurred:", error);
            }
          }
        }
        this.isLoading = false;
        if (!hasPurchased) {
          this.hasPurchased = false;
        }
        document.getElementById('loading-bg-transparent').style.display = 'none';
      } catch (error) {
        document.getElementById('loading-bg-transparent').style.display = 'none';
        console.error("Error calling contract function");
      }
    },
    async getMeetingDetails() {
      const res = await this.$store.dispatch(
        'cast/meetingInfo',
        this.meeting_id
      );
      const details = res.data.meeting_info;
      this.castDetails = details;
      document.getElementById('loading-bg').style.display = 'none';
    },
    async joinCast() {
      const payload = {
        cast_id: this.meeting_id,
        token_id: this.tokenUri[this.selectedIndex].tokenId,
        name: this.joiningName,
      };

      fetch(`https://api.cast.decast.live/api/cast-token/join/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify(payload),
      }).then(response => {
        if (!response.ok) {
          if (!this.castDetails.running && response.status === 400) {
            this.$vs.notify({
              title: 'Cast not started yet!',
              text: 'The cast you are trying to join has either ended or yet to begin',
              color: 'danger',
            });
          } else {
            this.$vs.notify({
              title: 'Operation failed',
              text: 'Failed to accept request, please try again later!',
              color: 'danger',
            });
          }
          throw new Error(response.statusText);
        }
        return response.json();
      }).then(result => {
        this.$vs.notify({
          title: 'Request Accepted',
          text: 'Joining you to cast...',
          color: 'success',
        });
        location.href = result.url;
      }).catch(error => {
        console.log("Error occured")
      });
    },
    openLoginModal() {
      window.open(constants.challengeUri, '_blank', 'width=600,height=600');
    },
    goToEventPage() {
      const url = `https://decast.live/cast/nft-gated/${this.castDetails.public_meeting_id}`;
      window.open(url, '_blank');
    }
  },
};
</script>
<style scoped>
*:not(i) {
  /* font-family: 'Karla', sans-serif !important; */
  font-family: 'JetBrains Mono' !important;
}

.tc-section h3 {
  color: #22C55E;
}

.tc-section p {
  color: #5B96EB;
}

.tc-section img {
  height: 150px;
  width: 150px;
  cursor: pointer;
}

.ticketImage {
  border: 2px solid transparent;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.selectedTicket {
  border-color: yellow;
  box-shadow: 0 0 6px 4px yellow;
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
  overflow-y: scroll;
  padding-bottom: 50px;
}

/* .join-wrapper {
  height: calc(100vh - 100px);
} */

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
  flex: 0.65 !important;
}

.join-body-right {
  padding: 20px;
  border: 1px solid #FFFFFF;
  flex: 0.35;
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
  margin-top: 20px;
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
    overflow-y: scroll;
    padding-bottom: 50px;
  }
}
</style>
