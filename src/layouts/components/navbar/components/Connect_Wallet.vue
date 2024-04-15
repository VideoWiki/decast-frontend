<template>
  <div>
    <div v-if="this.payload">
      <button v-if="!accountAddress" class="vs-component w-full my-2 vs-button text-base font-bold wallter-button"
        @click="connectWallet" color="#1d2129" text-color="#1d2129">
        /connect.wallet
      </button>
      <button v-else class="vs-component w-full mt-2 vs-button text-base font-bold wallter-button" color="#1d2129"
        text-color="#1d2129">
        {{ truncate(accountAddress) }}
      </button>
      <!-- <p class="mt-4 mb-2 info-wall">
        Your wallet information is not mapped to your email or name. It is saved
        with encryption and only used for the airdrop configured by the event
        admin.
      </p> -->
    </div>

    <div v-else>
      <vs-button v-if="authenticated" class="text-base font-bold wallter-button" color="#1d2129" text-color="#1d2129"
        type="filled" @click="popup">Connect Wallet
      </vs-button>
      <div v-else-if="!authenticated">
        <vs-dropdown vs-custom-content class="cursor-pointer">
          <div class="flex items-center relative">
            <vs-button type="filled" class="text-base font-bold pr-4" text-color="#d7df23" color="#000">
              {{ truncate(accountAddress) }}
            </vs-button>
            <vs-icon icon="radio_button_checked" color="success" size="18px" class="absolute" style="left: 3%" />
          </div>
          <vs-dropdown-menu class="vx-navbar-dropdown">
            <ul style="min-width: 9rem" class="acc-cont">
              <li class="flex py-2 px-4 font-bold">
                <!--feather-icon icon="UserIcon" svgClasses="w-4 h-4" /-->
                <span class="ml-2">{{ accountAddress }}</span>
              </li>

              <vs-divider class="m-1" />

              <li class="flex py-2 px-4 cursor-pointer hover:bg-danger hover:text-white" @click="logout">
                <!--feather-icon icon="HomeIcon" svgClasses="w-4 h-4" /-->
                <span class="ml-2">Disconnect</span>
              </li>
            </ul>
          </vs-dropdown-menu>
        </vs-dropdown>
      </div>
      <vs-popup id="nft-popup" class="" ref="custom_modal_mine" title="" :active.sync="popupDisplay">
        <div class="popup-item flex flex-wrap items-center w-full justify-center p-5" @click="login">
          <div class="w-full flex flex-wrap items-center justify-center">
            <img class="metamask-logo" src="@/assets/images/metmask.png" />
          </div>
          <div class="w-full flex items-center justify-center">
            <h3 class="metamask-h3">MetaMask</h3>
          </div>
          <div>
            <p style="
                font-size: 18px;
                margin: 0.333em 0px;
                color: rgb(169, 169, 188);
              ">
              Connect to your MetaMask account
            </p>
          </div>
        </div>
      </vs-popup>
    </div>
  </div>
</template>
<script>
import { ajaxCallMixin } from '../../../../http/HttpCommon';
export default {
  name: 'connect-wallet',
  mixins: [ajaxCallMixin],
  props: ['payload'],
  data() {
    return {
      buttonclose: false,
      authenticated: true,
      popupDisplay: false,
    };
  },
  created() {
    console.log(this.payload);
  },
  computed: {
    accountAddress() {
      return this.$store.state.accountAddress;
    },
  },
  mounted() {
    this.connectWallet();
  },
  methods: {
    async connectWallet() {
      await this.login();
      // console.log(this.accountAddress, 'this.$store.state.isWalletConnected');
      const payload = {
          cast_id: this.payload.cast_id,
          email: this.payload.email,
          public_address: this.accountAddress.toLowerCase(),
        };
      console.log(payload,this.payload, 'this pay');
      // if (this.$store.state.isWalletConnected==true) {
        // console.log(this.accountAddress, 'this.$store.state.isWalletConnected222222');
      //   this.$vs.notify({
      //     title: 'Wallet Connected',
      //     text: 'Your wallet is connected.',
      //     iconPack: 'feather',
      //     icon: 'icon-info',
      //     color: 'info',
      //   });
      //   return;
      // } else {
        // console.log(this.accountAddress, 'this.$store.state.isWalletConnected345555555555555');
        this.$store
          .dispatch('auth/saveWalletAddress', payload)
          .then((res) => null)
          .catch((err) => {
            console.log(err, 'met err');
            this.$vs.notify({
              title: this.$t('Login.notify.title'),
              text:
                err.response != null
                  ? err.response.data.message
                  : this.$t('Metamasklogin.notconnected'),
              iconPack: 'feather',
              icon: 'icon-alert-circle',
              color: 'danger',
            });
          });
      // }

    },
    async login() {
      this.popupDisplay = false;
      await this.$store.dispatch('connectWallet');
      this.authenticated = false;
      console.log(this.$store.state.isWalletConnected);
    },
    async logout() {
      this.authenticated = true;
      this.$store.dispatch('disconnectWallet');
    },
    truncate(addressString) {
      return addressString.slice(0, 12) + '...' + addressString.slice(38);
    },
    popup() {
      this.popupDisplay = true;
    },
  },
};
</script>

<style scoped>
/* 
.modal-connect{
  max-height:60%;
  max-width: 80%;
} */

.wallter-button {
  background: #d7df23 !important;
  color: #000 !important;
  border: 2px solid #000 !important;
  border-radius: 0px !important;
  box-sizing: border-box;
  box-shadow: 5px 5px 0px -1px #fff !important;
  height: 50px;
  transition: 0.2s ease-in-out;
  transform-origin: center;
}

.wallter-button:hover {
  transform: translateY(-3px);
  transition: 0.2s ease-in-out;
  transform-origin: center;
  box-shadow: 5px 5px 0px 0px #fff!important;
}

.info-wall {
  color: #637181 !important;
}

.metamask-logo {
  width: 50px;
  height: 50px;
}

p {
  color: #d7df23 !important;
}

.info-wall {
  color: #a6a6a6;
}

.metamask-h3 {
  font-size: 24px;
  font-weight: 700;
  margin-top: 0.5em;
  color: #d7df23;
}

.popup-item {
  cursor: pointer;
  background: #000 !important;
}
</style>

<style>
.vs-popup {
  background: #000 !important;
  border: 1px solid #f2ff00 !important;
  border-radius: 0px !important;
  box-shadow: 5px 5px 0px 0px #d7df23, 10px 10px 0px 0px #f2ff00 !important;
}

.vs-popup--close {
  background: #000 !important;
  border: 1px solid #f2ff00 !important;
  color: #d7df23 !important;
  border-radius: 0px !important;
  box-shadow: 5px 5px 0px 0px #d7df23 !important;
}

.vs-dropdown--custom {
  background: #000 !important;
  border: 1px solid #f2ff00 !important;
  color: #d7df23 !important;
  border-radius: 0px !important;
  box-shadow: 5px 5px 0px 0px #d7df23 !important;
}
</style>
