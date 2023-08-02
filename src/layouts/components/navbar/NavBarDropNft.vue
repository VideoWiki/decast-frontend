<template>
  <div class="relative">
    <div class="navbar-wrapper nav navbar-full w-full p-0">
      <vs-navbar class="navbar-custom navbar-skelton custom-header">
        <router-link
          tag="div"
          to="/"
          class="vx-logo cursor-pointer flex mx-auto w-1/2 items-center"
        >
          <img src="@/assets/images/logo/logo.svg" class="mr-2 h-12" />
          <span
            class="vx-logo-text text-custom-purple"
            style="font-size: 20px"
            >{{ $t('NavbarDashboard.videowiki') }}</span
          >
        </router-link>
        <div class="flex justify-end lg:w-1/2 w-full">
          <!-- <vs-button
            class="text-base font-bold mr-1"
            type="filled"
            @click="switchNetworkGnosis"
            >Switch to Gnosis</vs-button
          > -->
          <Wallet />
        </div>
      </vs-navbar>
    </div>
  </div>
</template>
<script setup>
import { mapState } from 'vuex';
import Wallet from './components/Connect_Wallet.vue';
export default {
  components: { Wallet },
  name: 'navbar-drop-nft',
  data() {
    return {};
  },
  methods: {
    async switchNetworkGnosis() {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x64' }],
        });
      } catch (error) {
        if (error.code === 4902) {
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: '0x64',
                  chainName: 'Gnosis Chain',
                  rpcUrls: ['https://rpc.gnosischain.com/'],
                  nativeCurrency: {
                    name: 'Matic',
                    symbol: 'xDai',
                    decimals: 18,
                  },
                  blockExplorerUrls: ['https://blockscout.com/xdai/mainnet/'],
                },
              ],
            });
          } catch (error) {
            alert(error.message);
          }
        }
      }
    },
  },
  beforeCreate() {
    if (document.getElementById('nft-popup'))
      document.getElementById('nft-popup').remove();
  },
  computed: {
    ...mapState('auth', ['isUserLoggedIn', 'accessToken']),
  },
};
</script>
<style scoped>
.nav {
  position: fixed;
  top: 0;
}
.navbar-wrapper {
  background: #fff;
  z-index: 4120;
}
</style>
