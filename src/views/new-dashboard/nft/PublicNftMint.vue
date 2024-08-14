<template>
  <div class="full-container">
    <div class="logo">
      <img src="@/assets/images/logot.svg" alt="" />
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
        <div class="join-body-left">
          <div class="join-body-lt">

            <p class="join-by">/* AirDrop */</p>
            <div v-if="mintPopup">
              <div class="vx-col lg:w-2/3" style="text-align: left">
                <p class="py-2 join-type" v-if="!readMore">
                  NFT Description:
                  {{ nft_description.slice(0, 181) }}
                  <span v-if="nft_description.length > 180" @click="() => {
                    readMore = !readMore;
                  }
                    " style="
                            color: #7448ff;
                            cursor: pointer;
                            font-size: 14px;
                          ">... read more</span>
                </p>
                <p class="py-2" v-if="readMore" style="max-height: 100px; overflow-y: scroll">
                  NFT Description:
                  {{ nft_description }}
                  <span @click="() => {
                    readMore = !readMore;
                  }
                    " style="
                            color: #7448ff;
                            cursor: pointer;
                            font-size: 14px;
                          ">
                    Read Less</span>
                </p>
                <p class="text-white">
                  >> Contract > {{ truncate(contractAddress) }}
                </p>
              </div>
              <div class="flex items-center">
                <button class="mint-custm-button mt-8" v-if="hasMint == false" @click="mint">/mint.NFT</button>
              </div>
            </div>

            <button :disabled="!isConnected" class="mint-custm-button mt-8" v-else-if="public_nft_status"
              @click="toggleNftView">/airdrop.open</button>
            <p v-else class="px-2 mt-5 mb-5 small-text text-danger">Minting is not activated.</p>

          </div>
          <div class="join-body-lb">
            <Wallet ref="walletComponent" />
            <p v-if="!isConnected" class="join-type mt-4">/* Connect Wallet to claim your airdrop */</p>
            <div class="body-lb-bottom">
              <p v-if="!isConnected">>> wallet.status > <span>not connected</span></p>
              <p v-else>>> wallet.status > <span>connected</span></p>
            </div>
          </div>
        </div>
        <div class="join-body-right">
          <div class="flex flex-col h-full">
            <div class="bg-white w-full flex flex-row justify-between items-center px-4 h-8">
              <div class="bg-black w-4 h-4"></div>
              <div class="flex flex-row gap-2">
                <div class="bg-black w-4 h-4"></div>
                <div class="bg-black w-4 h-4"></div>
              </div>
            </div>
            <div class="join-body1">
              <div v-if="mintPopup" class="h-full">
                <img class="sample-img w-full h-full object-contain" v-bind:src="nft_image" />
              </div>
              <svg v-else width="292" height="273" viewBox="0 0 292 273" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M273.75 127.4H255.5V109.2H273.75V127.4Z" fill="#2D2D2D" />
                <path d="M219 163.8H200.75V145.6H219V163.8Z" fill="#2D2D2D" />
                <path d="M200.75 182H182.5V163.8H200.75V182Z" fill="#2D2D2D" />
                <path d="M200.75 218.4H182.5V200.2H200.75V218.4Z" fill="#2D2D2D" />
                <path d="M219 236.6H200.75V218.4H219V236.6Z" fill="#2D2D2D" />
                <path d="M237.25 254.8H219V236.6H237.25V254.8Z" fill="#2D2D2D" />
                <path d="M73 254.8H54.75V236.6H73V254.8Z" fill="#2D2D2D" />
                <path d="M91.25 236.6H73V218.4H91.25V236.6Z" fill="#2D2D2D" />
                <path d="M109.5 218.4H91.25V200.2H109.5V218.4Z" fill="#2D2D2D" />
                <path d="M109.5 182H91.25V163.8H109.5V182Z" fill="#2D2D2D" />
                <path d="M91.25 163.8H73V145.6H91.25V163.8Z" fill="#2D2D2D" />
                <path d="M36.5 127.4H18.25V109.2H36.5V127.4Z" fill="#2D2D2D" />
                <path d="M109.5 200.2H127.75V182H109.5V200.2Z" fill="#2D2D2D" />
                <path d="M164.25 200.2H182.5V182H164.25V200.2Z" fill="#2D2D2D" />
                <path d="M73 0V18.2H219V0H73Z" fill="#2D2D2D" />
                <path d="M18.25 18.2V36.4H73V18.2H18.25Z" fill="#2D2D2D" />
                <path d="M36.5 54.6H54.75V91H36.5V54.6Z" fill="#2D2D2D" />
                <path d="M18.25 36.4H0V109.2H18.25V36.4Z" fill="#2D2D2D" />
                <path d="M255.5 91H237.25V54.6H255.5V91Z" fill="#2D2D2D" />
                <path d="M219 18.2V36.4H273.75V18.2H219Z" fill="#2D2D2D" />
                <path d="M292 36.4H273.75V109.2H292V36.4Z" fill="#2D2D2D" />
                <path d="M255.5 145.6V127.4H219V145.6H255.5Z" fill="#2D2D2D" />
                <path d="M73 145.6V127.4H36.5V145.6H73Z" fill="#2D2D2D" />
                <path d="M219 273V254.8H73V273H219Z" fill="#2D2D2D" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import constant from '../../../../constant';
import axios from 'axios';
import NavBarDropNft from '@/layouts/components/navbar/NavBarDropNft.vue';
import TheNavbarVertical from '@/layouts/components/navbar/VerticalNavbarDropNft.vue';
import navMenuItems from '@/layouts/components/vertical-nav-menu/navMenuItems';
import VerticalNavMenuDropNft from '@/layouts/components/vertical-nav-menu/VerticalNavMenuDropNft.vue';
import themeConfig from '../../../../themeConfig';
import networks from '../../create-event/netwoks';
import { ethers } from 'ethers';
import Wallet from '@/layouts/components/navbar/components/Connect_Wallet.vue';
export default {
  components: {
    NavBarDropNft,
    TheNavbarVertical,
    VerticalNavMenuDropNft,
    Wallet,
  },
  name: 'PublicNftMint',
  data() {
    return {
      verNav: false,
      horiNav: true,
      mintPopup: false,
      disableCopy: false,
      contractAddress: '',
      functionName: '',
      abi: [],
      network: '',
      params: {},
      price: 0,
      nft_image: '',
      transactionHash: '',
      nft_description: '',
      loading: false,
      readMore: false,
      isNavbarDark: false,
      navbarColor: themeConfig.navbarColor || '#fff',
      navbarType: themeConfig.navbarType || 'floating',
      navMenuItems: navMenuItems,
      routerTransition: themeConfig.routerTransition || 'none',
      hasMint: false,
      pub_nft_flow: true,
      public_nft_status: true,
      showSecWall: true,
      newPay: {
        email: "dummy data",
        cast_id: "dummy data",
      },
    };
  },
  methods: {
    callFunctionInChildComponent() {
      this.$refs.walletComponent.connectWallet();
    },
    async getid() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const abi = this.abi;
      const contractAddress = this.contractAddress;
      const contract = new ethers.Contract(contractAddress, abi, provider);
      const iuri = await contract.balanceOf(this.accountAddress);
      //console.log(iuri, 'iuri');
      return iuri;
    },
    async fetchWallet() {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts',
          });
          return accounts[0];
        } catch (error) {
          //console.log('Error connecting...');
        }
      } else {
        alert('Meta Mask not detected');
      }
    },

    async getjson() {
      //console.log('json cllled');
      const iuri = await this.getid();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const abi = this.abi;
      const contractAddress = this.contractAddress;
      const contract = new ethers.Contract(contractAddress, abi, provider);
      const tid = iuri._hex;
      //console.log(iuri, iuri._hex, tid, 'dkjdidi');
      try {
        const uri = await contract.tokenURI(tid);
        //console.log(uri, 'jgjffh');
        const response = await axios.get(
          `https://api.allorigins.win/get?url=${encodeURIComponent(uri)}`,
          {
            headers: {
              'content-type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
              'Access-Control-Allow-Headers':
                'Origin, X-Requested-With, Content-Type, Accept',
            },
          }
        );
        //console.log(response, 'tokenmk');
        this.nft_image = response.data.image;
        this.nft_description = response.data.description;
      } catch (e) {
        //console.log(JSON.stringify(e), 'ofokfm');
        //console.log(e, 'rororo');
      }
    },
    copyTransaction() {
      if (this.disableCopy) {
        return;
      }
      this.disableCopy = true;
      setTimeout(() => {
        this.disableCopy = false;
      }, 2000);
      navigator.clipboard.writeText(this.transactionHash);
      this.$vs.notify({
        title: 'Copied',
        text: 'Transaction id copied',
        color: 'success',
      });
    },
    async switchNetworkRinkeby(id) {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: networks[id].chainId }],
        });
      } catch (error) {
        if (error.code === 4902) {
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: networks[id].chainId,
                  chainName: networks[id].chainName,
                  rpcUrls: [networks[id].rpcUrl],
                  nativeCurrency: {
                    name: networks[id].currencyName,
                    symbol: networks[id].symbol,
                    decimals: 18,
                  },
                  blockExplorerUrls: [networks[id].blockExplorerUrl],
                },
              ],
            });
          } catch (error) {
            alert(error.message);
          }
        }
      }
    },
    openNotification(position = null, color, text) {
      this.$vs.notify({
        position,
        color,
        title: '',
        text,
      });
    },
    truncate(addressString) {
      if (addressString)
        return (
          addressString.slice(0, 4) + '..........' + addressString.slice(38)
        );
    },
    truncateSmaller(x) {
      if (x) return x.slice(0, 4) + '...' + x.slice(x.length - 3);
    },

    async getMindId() {
      try {
        const res = await this.getMintIdUtil({
          cast_id: this.$route.query.cast_id,
          public_address: this.accountAddress,
        });
        if (res.data.status === true) {
          return res;
        }
      } catch (err) {
        return null;
      }
    },
    async getMintIdUtil(payload) {
      const res = await this.$store.dispatch('studio/publicGetMintId', payload);
      return res;
    },
    async updateWallet(status, mintId) {
      await this.$store
        .dispatch('studio/publicUpdateMint', {
          cast_id: this.$route.query.cast_id,
          public_address: this.accountAddress,
          status: status,
          mint_id: mintId,
        })
        .then((res) => {
          return res.data.status;
        })
        .catch((err) => {
          this.$vs.notify({
            title: 'Error',
            text:
              err.response != null
                ? err.response.data.message
                : 'Unexpected Error',
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger',
          });
        });
    },
    async verifyWallet() {
      try {
        await this.verifyWalletUtil();
        return true;
      } catch (err) {
        return false;
      }
    },
    async verifyWalletUtil() {
      const res = await this.$store.dispatch('studio/publicVerifyWallet', {
        cast_id: this.$route.query.cast_id,
        public_address: this.accountAddress,
      });
      return res;
    },

    async addWallet() {
      try {
        await this.addWalletUtil();
        return true;
      } catch (err) {
        return false;
      }
    },
    async addWalletUtil() {
      const res = await this.$store.dispatch('studio/publicAddWallet', {
        cast_id: this.$route.query.cast_id,
        public_address: this.accountAddress,
      });
      return res;
    },
    toggleNftView() {
      if (this.isConnected) {
        this.showSecWall = false;
      }
      this.mintPopup = true;
    },
    async mint() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = await provider.getSigner();
      //console.log(signer, 'sign');
      const abi = this.abi;
      const functionParameters = this.params;
      const functionName = this.functionName;
      //console.log(functionName, functionParameters, 'fkfjhhj');
      const contractAddress = this.contractAddress;
      const contract = new ethers.Contract(contractAddress, abi, signer);
      //console.log(contract, this.contract, 'cont');
      //console.log(contract, contract.tokenURI, 'token');
      //console.log('connected', this.isConnected);
      if (this.isConnected) {
        //console.log('connected', this.isConnected);
        //console.log(window.ethereum.networkVersion, 'mdoom,m');
        //console.log(this.network, 'fjko');
        if (window.ethereum.networkVersion === this.network) {
          try {
            this.$vs.loading();
            await this.addWallet();
            const verifiedWallet = await this.verifyWallet();
            if (verifiedWallet) {
              const value = ethers.utils.parseEther(this.price);
              const transactionOptions = {
                // value: value,
                gasLimit: 3000000,
              };
              const tx = await contract[functionName](
                ...Object.values(functionParameters),
                transactionOptions
              );
              //console.log(tx, 'ycndu');
              const receipt = await tx.wait();
              this.$vs.loading.close();
              this.loading = true;
              await this.updateWallet('started', '');
              await this.getjson();
              this.openNotification(
                'top-center',
                'success',
                'Congratulations! You just minted an NFT'
              );
              this.transactionHash = receipt.transactionHash;
              this.hasMint = true;
              await this.updateWallet('successful', receipt.transactionHash);
              setTimeout(() => {
                this.loading = false;
              }, 1000);
            } else {
              const mintIsStatus = await this.getMindId();
              if (mintIsStatus != null) {
                this.$vs.notify({
                  title: 'Cannot Add Again',
                  text: 'You have already minted the nft',
                  iconPack: 'feather',
                  icon: 'icon-alert-circle',
                  color: 'warning',
                });
                this.$vs.loading.close();
                this.transactionHash = mintIsStatus.data.hashed_id;
                this.hasMint = true;
              } else {
                this.$vs.loading.close();
                this.$vs.notify({
                  title: 'Error',
                  text: 'Invalid Wallet Address',
                  iconPack: 'feather',
                  icon: 'icon-alert-circle',
                  color: 'danger',
                });
              }
            }
          } catch (e) {
            this.$vs.loading.close();
            //console.log(e, 'check nft');
            if (e.code === 'INSUFFICIENT_FUNDS')
              this.$vs.notify({
                time: 3000,
                title: 'Error',
                text: 'Insufficient Balance!',
                iconPack: 'feather',
                icon: 'icon-alert-circle',
                color: 'danger',
              });
            else if (
              e.data.message === 'The sender address has a zero balance'
            ) {
              //console.log(e.data, data, 'check nft');
              this.$vs.notify({
                time: 3000,
                title: 'Error',
                text: 'Insufficient Balance!',
                iconPack: 'feather',
                icon: 'icon-alert-circle',
                color: 'danger',
              });
            } else {
              this.$vs.loading.close();
              //console.log(e.response);
              this.$vs.notify({
                time: 3000,
                title: 'Error',
                text: 'Wallet is not added for this cast. Please join the cast with this wallet to claim your NFT Or an error occurred while minting',
                iconPack: 'feather',
                icon: 'icon-alert-circle',
                color: 'danger',
              });
            }
            this.$vs.loading.close();
            //console.log('Minting Error', e);
          }
        } else {
          this.$vs.loading.close();
          this.switchNetworkRinkeby(this.network);
        }
      } else {
        this.$vs.loading.close();
        this.openNotification(
          'top-center',
          'danger',
          'Please Connect to the Wallet'
        );
      }
    },
    setNavMenuVisibility(layoutType) {
      if (
        (layoutType === 'horizontal' && this.windowWidth >= 1200) ||
        (layoutType === 'vertical' && this.windowWidth < 1200)
      ) {
        this.$store.commit('TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE_STUDIO', false);
        this.$store.dispatch('updateVerticalNavMenuWidth', 'no-nav-menu');
      } else {
        this.$store.commit('TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE_STUDIO', true);
      }
    },
    updateNavbarColor(val) {
      this.navbarColor = val;
      if (val === '#fff') this.isNavbarDark = false;
      else this.isNavbarDark = true;
    },
  },
  watch: {
    $route() {
      this.routeTitle = this.$route.meta.pageTitle;
    },
    isThemeDark(val) {
      const color = this.navbarColor === '#fff' && val ? '#10163a' : '#fff';
      this.updateNavbarColor(color);
    },
    '$store.state.mainLayoutType'(val) {
      this.setNavMenuVisibility(val);
    },
    navLoad() {
      if (this.$store.state.windowWidth < 1200) {
        this.verNav = true;
        this.horiNav = false;
      } else {
        this.verNav = false;
        this.horiNav = true;
      }
    },
  },
  computed: {
    isConnected() {
      return this.$store.state.isWalletConnected;
    },
    accountAddress() {
      return this.$store.state.accountAddress.toLowerCase();
    },
    insideIframe() {
      return this.$store.state.insideIframe;
    },
    contentAreaClass() {
      if (this.mainLayoutType === 'vertical') {
        if (this.verticalNavMenuWidth === 'default')
          return 'content-area-reduced';
        else if (this.verticalNavMenuWidth === 'reduced')
          return 'content-area-lg';
        else return 'content-area-full';
      } else return 'content-area-full';
    },
    isAppPage() {
      return this.$route.meta.no_scroll;
    },
    isThemeDark() {
      return this.$store.state.theme === 'dark';
    },
    layoutTypeClass() {
      return `main-${this.mainLayoutType}`;
    },
    mainLayoutType() {
      return this.$store.state.mainLayoutType;
    },
    verticalNavMenuWidth() {
      return this.$store.state.verticalNavMenuWidth;
    },
    windowWidth() {
      return this.$store.state.windowWidth;
    },
  },
  created() {
    const color =
      this.navbarColor === '#fff' && this.isThemeDark
        ? '#10163a'
        : this.navbarColor;
    this.updateNavbarColor(color);
    this.setNavMenuVisibility(this.$store.state.mainLayoutType);
  },
  async mounted() {
    this.callFunctionInChildComponent();
    try {
      if (this.$refs.mint_popup)
        this.$refs.mint_popup.$el.childNodes[1].childNodes[0].style.display =
          'none';

      const urlParam = new URLSearchParams(window.location.search);
      const castId = urlParam.get('cast_id');
      await axios
        .get(
          `${constant.apiCastUrl}/api/event/fetch/nft/details/?cast_id=${castId}`,
          {
            'Access-Control-Allow-Origin': '*',
          }
        )
        .then((res) => {
          /* *****UNCOMMENT THE BELOW TO FETCH DATA FROM BACKEND********* */
          this.contractAddress = res.data.contract_adress;
          this.abi = res.data.aib;
          this.functionName = res.data.mint_function_name;
          this.network = res.data.network;
          this.params = res.data.parameter;
          this.price = res.data.price;
          this.nft_description = res.data.description;
          this.nft_image = res.data.image;
          this.pub_nft_flow = res.data.pub_nft_flow;
          this.public_nft_status = res.data.nft_activated;
        });
      if (!this.pub_nft_flow) {
        this.$router.push('/error/404');
      }
    } catch (e) {
      this.$router.push('/error/404');
      //console.log(e);
    }
    this.switchNetworkRinkeby(this.network);
  },
};
</script>

<style scoped>
*:not(i) {
  /* font-family: 'Karla', sans-serif !important; */
  font-family: 'JetBrains Mono' !important;
}

.mint-custm-button {
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
.mint-custm-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.logo {
  height: 100px;
  display: flex;
  align-items: center;
  padding: 10px;
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
  padding: 20px;
  border: 1px solid #FFFFFF;
  margin-top: 10px;
  display: flex;
  height: 70vh;
}

.join-body1 {
  width: 100%;
  border: 1px solid #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin-top: 10px;
}

.join-body-left {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.join-body-right {
  flex: 1;
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
  width: 350px;
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

.body-lb-bottom {
  color: #FFFFFF;
}

.body-lb-bottom span {
  color: #22C55E;
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

@media (max-width: 499px) {}</style>
