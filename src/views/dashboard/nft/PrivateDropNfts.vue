<template>
  <div class="idk-co">
    <div class="h-screen no-gutter layout--main">
      <vertical-nav-menu-drop-nft
        v-if="windowWidth < 1200"
        :navMenuItems="navMenuItems"
        title="VideoWiki"
        parent=".layout--main"
      />
      <!--Responsive Navbar  -->
      <template v-if="windowWidth >= 1200">
        <nav-bar-drop-nft class="w-full" />
      </template>
      <template v-else>
        <the-navbar-vertical
          :navbarColor="navbarColor"
          :class="[
            { 'text-white': isNavbarDark && !isThemeDark },
            { 'text-base': !isNavbarDark && isThemeDark },
          ]"
        />
      </template>
      <!-- Main Card-->
      <div
        class="flex flex-wrap w-full vx-row no-gutter items-center justify-center centerx"
      >
        <div
          class="vx-row no-gutter justify-center items-center mt-5 main-card"
        >
          <div class="vx-row justify-center items-center w-full h-full">
            <div
              v-if="hasMint == false && loading == false"
              class="bottom vx-col md:w-1/3 w-full"
            >
              <div style="display: flex; justify-content: center">
                <img src="@/assets/images/nftart.svg" />
              </div>
              <div class="flex flex-wrap justify-center">
                <h3 style="color: #d7df23">Decast NFT</h3>
              </div>
              <p class="px-2 mt-5 small-text">
                Open the box to view the NFT details!
              </p>
              <div style="display: flex; justify-content: center">
                <vs-button
                  pill
                  @click="mintPopup = true"
                  color="#1d2129"
                  text-color="#1d2129"
                  class="mt-8 mb-4 radius font-bold text-lg shifted-button"
                  >Open Box</vs-button
                >
              </div>
              <vs-popup
                ref="mint_popup"
                title=""
                :active.sync="mintPopup"
                id="mint-popup-cover"
              >
                <div
                  class="vx-row flex flex-wrap justify-center align-center w-full h-full mint-details p-5"
                >
                  <div
                    class="vx-row w-full flex flex-wrap justify-center align-center no-gutter"
                  >
                    <div
                      class="vx-col flex flex-wrap lg:w-1/3 justify-center items-center w-full"
                    >
                      <div>
                        <img class="sample-img" v-bind:src="nft_image" />
                      </div>
                    </div>
                    <div
                      class="vx-col lg:w-2/3 pl-2 custom-color"
                      style="text-align: left"
                    >
                      <p class="p-2" v-if="!readMore">
                        NFT Description:
                        {{ nft_description.slice(0, 181) }}
                        <span
                          v-if="nft_description.length > 180"
                          @click="
                            () => {
                              readMore = !readMore;
                            }
                          "
                          style="
                            color: #7448ff;
                            cursor: pointer;
                            font-size: 14px;
                          "
                          >... read more</span
                        >
                      </p>
                      <p
                        class="p-2"
                        v-if="readMore"
                        style="max-height: 100px; overflow-y: scroll"
                      >
                        NFT Description:
                        {{ nft_description }}
                        <span
                          @click="
                            () => {
                              readMore = !readMore;
                            }
                          "
                          style="
                            color: #a6a6a6;
                            cursor: pointer;
                            font-size: 14px;
                          "
                        >
                          Read Less</span
                        >
                      </p>
                      <p class="p-2">
                        Contract: {{ truncate(contractAddress) }}
                      </p>
                    </div>
                  </div>
                  <div
                    class="vx-row mt-20 w-full flex flex-wrap justify-center align-center no-gutter"
                  >
                    <div
                      class="flex flex-wrap vx-col md:w-1/1 p-2 mt-4 justify-center items-center"
                    >
                      <vs-button
                        v-if="hasMint == false"
                        pill
                        @click="mint"
                        class="mt-8 mb-4 radius font-bold text-lg shifted-button"
                        >Mint</vs-button
                      >
                    </div>
                  </div>
                </div>
              </vs-popup>
            </div>
            <div
              v-if="loading == true"
              class="bottom flex flex-wrap items-center justify-center vx-col md:w-3/4 w-full p-2 loading-container"
            >
              <img
                src="@/assets/images/reward.png"
                style="height: 100px; width: 100px"
                class="loading-img"
                alt="loading"
              />
            </div>
            <div
              v-if="hasMint == true && loading == false"
              class="bottom mt-20 vx-col md:w-3/4 w-full p-2"
            >
              <div class="w-full flex flex-wrap justify-center">
                <div class="hexagon-cover">
                  <div class="hexagon-shadow">
                    <div
                      v-if="nft_image && nft_image.endsWith('.svg')"
                      class="hexagon"
                      v-bind:style="{
                        'background-image': 'url(' + nft_image + ')',
                      }"
                    ></div>
                    <img
                      v-else
                      v-bind:src="realImage"
                      class="hexagon-nft-img"
                    />
                  </div>
                </div>
              </div>
              <div class="flex flex-wrap align-items justify-center">
                <vs-dropdown vs-custom-content class="cursor-pointer">
                  <div class="flex items-center relative">
                    <vs-chip
                      style="color: #52c41a"
                      @click="copyTransaction"
                      class="my-2 px-4"
                    >
                      Minted #{{ truncateSmaller(transactionHash) }}
                    </vs-chip>
                  </div>
                  <vs-dropdown-menu class="vx-navbar-dropdown">
                    <ul style="min-width: 9rem">
                      <li class="flex py-2 px-4 font-bold">
                        <span class="ml-2">{{ transactionHash }}</span>
                      </li>
                    </ul>
                  </vs-dropdown-menu>
                </vs-dropdown>
              </div>
              <div
                class="flex flex-wrap align-center justify-center w-full"
                style="display: flex; justify-content: center"
              >
                <img class="open-box" src="@/assets/images/reward.png" />
              </div>
              <div class="flex flex-wrap justify-center">
                <h3 class="my-2 p-2" style="color: #a6a6a6">Decast NFT</h3>
              </div>
              <div class="flex flex-wrap justify-center align-center p-2">
                <p class="px-2 mb-1 small-text" v-if="!readMore">
                  {{ nft_description.slice(0, 181) }}
                  <span
                    v-if="nft_description.length > 180"
                    @click="
                      () => {
                        readMore = !readMore;
                      }
                    "
                    style="color: #7448ff; cursor: pointer; font-size: 14px"
                    >... read more</span
                  >
                </p>
                <p
                  class="px-2 mb-1 small-text"
                  v-if="readMore"
                  style="max-height: 75px; overflow-y: scroll"
                >
                  {{ nft_description }}
                  <span
                    @click="
                      () => {
                        readMore = !readMore;
                      }
                    "
                    style="color: #7448ff; cursor: pointer; font-size: 14px"
                  >
                    read less</span
                  >
                </p>
              </div>
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
import NavBarDropNft from '../../../layouts/components/navbar/NavBarDropNft.vue';
import TheNavbarVertical from '../../../layouts/components/navbar/VerticalNavbarDropNft.vue';
import navMenuItems from '../../../layouts/components/vertical-nav-menu/navMenuItems';
import VerticalNavMenuDropNft from '../../../layouts/components/vertical-nav-menu/VerticalNavMenuDropNft.vue';
import themeConfig from '../../../../themeConfig';
import networks from '../../create-event/netwoks';
import { ethers } from 'ethers';
import { MerkleTree } from 'merkletreejs';
import keccak256 from 'keccak256';

export default {
  components: {
    NavBarDropNft,
    TheNavbarVertical,
    VerticalNavMenuDropNft,
  },
  name: '',
  data() {
    return {
      verNav: false,
      hasMerkel: false,
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
      realImage: '',
      merkleTree: false,
    };
  },
  methods: {
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
    async getid() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const abi = this.abi;
      const contractAddress = this.contractAddress;
      const contract = new ethers.Contract(contractAddress, abi, provider);
      const iuri = await contract.balanceOf(this.accountAddress);
      console.log(iuri, 'iuri');
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
          console.log('Error connecting...');
        }
      } else {
        alert('Meta Mask not detected');
      }
    },

    async getjson() {
      const iuri = await this.getid();
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      await provider.send('eth_requestAccounts', []);
      const abi = this.abi;
      const contractAddress = this.contractAddress;
      const contract = new ethers.Contract(contractAddress, abi, provider);

      const tid = iuri[0];
      try {
        const uri = await contract.tokenURI(tid);
        if (uri === '') {
          this.realImage =
            'https://static.vecteezy.com/system/resources/previews/002/185/673/large_2x/surprise-inside-neon-signs-style-text-free-vector.jpg';
          this.description = 'The nft will be revealed later';
        }
        axios
          .get(uri, {
            'Access-Control-Allow-Origin': '*',
          })
          .then((res) => {
            this.realImage = res.data.image;
            this.nft_description = res.data.description;
          })
          .catch((e) => {
            console.log(e.response);
          });
      } catch (e) {
        console.log(JSON.stringify(e));
        console.log(e.response);
      }
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
            this.$vs.notify({
              title: 'Error',
              text: error.message,
              iconPack: 'feather',
              icon: 'icon-alert-circle',
              color: 'danger',
            });
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
      console.log('mint id call');
      try {
        const res = await this.getMintIdUtil({
          cast_id: this.$route.query.cast_id,
          public_address: this.accountAddress,
        });
        if (res.data.status === true) {
          return res;
        }
        return null;
      } catch (err) {
        return null;
      }
    },
    async getMintIdUtil(payload) {
      const res = await this.$store.dispatch('studio/getMintId', payload);
      return res;
    },
    async updateWallet(status, mintId) {
      await this.$store
        .dispatch('studio/updateMintDetails', {
          cast_id: this.$route.query.cast_id,
          public_address: this.accountAddress,
          status: status,
          mint_id: mintId,
          nft_type: 'NFTs',
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
      const res = await this.$store.dispatch('studio/verifyMintDetails', {
        cast_id: this.$route.query.cast_id,
        public_address: this.accountAddress,
        nft_type: 'NFTs',
      });
      return res;
    },
    getMerkleTree() {
      this.$store
        .dispatch('studio/getMerkleTree', this.$route.query.cast_id)
        .then((res) => {
          // console.log('merkel tree getting');
          var leafs = res.data.map((item) => {
            return Uint8Array.from(item.data);
          });
          this.merkleTree = new MerkleTree(leafs, keccak256, {
            sortPairs: true,
          });
        })
        .catch((e) => {
          // console.log('Merkel Tree Not Getting', e);
        });
    },
    async mint() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = await provider.getSigner();
      const abi = this.abi;
      const functionParameters = this.params;
      const functionName = this.functionName;
      const contractAddress = this.contractAddress;
      const contract = new ethers.Contract(contractAddress, abi, signer);
      if (this.isConnected) {
        if (window.ethereum.networkVersion === this.network) {
          try {
            console.log('inside block');
            this.$vs.loading();
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
              console.log('mint');
              const mintIsStatus = await this.getMindId();
              console.log(mintIsStatus, 'min');
              if (mintIsStatus !== null) {
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
            console.log(e, 'check nft');
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
              console.log(e.data, data, 'check nft');
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
              console.log(e.response);
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
            console.log('Minting Error', e);
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
    // async mint() {
    //   this.$vs.loading();
    //   const provider = new ethers.providers.Web3Provider(window.ethereum);
    //   const signer = provider.getSigner();
    //   const abi = this.abi;
    //   const contractAddress = this.contractAddress;
    //   if (this.isConnected) {
    //     if (window.ethereum.networkVersion === this.network) {
    //       try {
    //         await this.verifyWallet();
    //         const mintIsStatus = await this.getMindId();
    //         console.log(mintIsStatus,'lekke');
    //         if (mintIsStatus != null) {
    //           this.$vs.notify({
    //             title: 'Cannot Add Again',
    //             text: 'You have already minted the nft',
    //             iconPack: 'feather',
    //             icon: 'icon-alert-circle',
    //             color: 'warning',
    //           });
    //           this.transactionHash = mintIsStatus.data.hashed_id;
    //           this.hasMint = true;
    //         } else {
    //           const contract = new ethers.Contract(
    //             contractAddress,
    //             abi,
    //             signer
    //           );
    //           const value = ethers.utils.parseEther(this.price);
    //           if (this.hasMerkel) {
    //             const mproof = this.merkleTree.getHexProof(
    //               keccak256(this.accountAddress)
    //             );
    //             var tx = await contract.mint(1, mproof, { value });
    //           } else {
    //             tx = await contract.mint(1, { value });
    //           }
    //           this.$vs.loading.close();
    //           const receipt = await tx.wait();
    //           this.loading = true;
    //           await this.updateWallet('started', '');
    //           await this.getjson();
    //           this.openNotification(
    //             'top-center',
    //             'success',
    //             'Congratulations! You just minted an NFT'
    //           );
    //           this.transactionHash = receipt.transactionHash;
    //           this.hasMint = true;
    //           await this.updateWallet('successful', receipt.transactionHash);
    //           setTimeout(() => {
    //             this.loading = false;
    //           }, 1000);
    //         }
    //       } catch (e) {
    //         this.$vs.loading.close();
    //         if (e.code === 'INSUFFICIENT_FUNDS')
    //           this.$vs.notify({
    //             time: 3000,
    //             title: 'Error',
    //             text: 'Insufficient Balance!',
    //             iconPack: 'feather',
    //             icon: 'icon-alert-circle',
    //             color: 'danger',
    //           });
    //         else if (e.reason === 'execution reverted: Already Claimed !') {
    //           this.$vs.notify({
    //             time: 3000,
    //             title: 'Already Claimed',
    //             text: "Can't claim again",
    //             color: 'danger',
    //           });
    //         } else {
    //           console.log('message', e.reason);
    //           this.$vs.notify({
    //             time: 3000,
    //             title: 'Error',
    //             text:
    //               e.response != null
    //                 ? e.response.data.message
    //                 : 'Wallet is not added for this cast. Please join the cast with this wallet to claim your NFT Or an error occured while minting',
    //             iconPack: 'feather',
    //             icon: 'icon-alert-circle',
    //             color: 'danger',
    //           });
    //         }
    //         console.log('Minting Error', e);
    //       }
    //     } else {
    //       this.switchNetworkRinkeby(this.network);
    //     }
    //   } else {
    //     this.openNotification(
    //       'top-center',
    //       'danger',
    //       'Please Connect to the Wallet'
    //     );
    //   }
    // },
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
    // usersData() {
    //   return this.$store.state.AppActiveUser;
    // },
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
    // if (this.$store.state.AppActiveUser.email.length > 0) {
    // } else {
    //   this.$router.push('/login');
    // }
    const color =
      this.navbarColor === '#fff' && this.isThemeDark
        ? '#10163a'
        : this.navbarColor;
    this.updateNavbarColor(color);
    this.setNavMenuVisibility(this.$store.state.mainLayoutType);
  },
  async mounted() {
    try {
      if (this.$route.query.cast_id === 'vw.svg') {
        return;
      }
      this.getMerkleTree();
      if (this.$refs.mint_popup)
        this.$refs.mint_popup.$el.childNodes[1].childNodes[0].style.display =
          'none';
      this.$refs.mint_popup.$el.childNodes[1].style.minWidth = '500px';
      const payload = {
        castId: this.$route.query.cast_id,
        nftType: 'NFTs',
      };
      await this.$store.dispatch('cast/getNFTDetails', payload).then((res) => {
        console.log('working');
        this.contractAddress = res.data.contract_adress;
        this.abi = res.data.aib;
        this.functionName = res.data.mint_function_name;
        this.network = res.data.network;
        this.params = res.data.parameter;
        this.price = res.data.price;
        this.nft_description = res.data.description;
        this.nft_image = res.data.image;
        this.realImage = res.data.image;
        this.abi.forEach((item) => {
          if (item.name === 'setmerkleroot') {
            this.hasMerkel = true;
          }
        });
        if (res.data.pub_nft_flow)
          this.$router.push(
            '/public/nftdrop?cast_id=' + this.$route.query.cast_id
          );
      });
    } catch (e) {
      if (e.response.data.message === 'invalid cast_id') {
        this.$vs.notify({
          title: 'Invalid Cast ID',
          color: 'danger',
        });
        this.$router.push('/error/404');
      }
      console.log('not workiing', e);
    }
    this.switchNetworkRinkeby(this.network);
  },
};
</script>
<style>
.vs-dropdown--custom {
  background: #000 !important;
  border: 1px solid #f2ff00 !important;
  color: #d7df23 !important;
  border-radius: 0px !important;
  box-shadow: 5px 5px 0px 0px #d7df23 !important;
}

.idk-co {
  background: #000000;
  background-image: url('../../../assets/images/back.jpeg');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: bottom;
  height: 100vh;
  width: 100%;
  overflow: hidden;
}
#mint-popup-cover .vs-popup {
  background-color: #000 !important;
  border: 1px solid #d7df23 !important;
  min-width: 50vw;
  min-height: 50vh;
  border: none;
  border-radius: 0px !important;
  box-shadow: 5px 5px 0px 0px #d7df23, 10px 10px 0px 0px #f2ff00;
}
#mint-popup-cover .vs-popup--content {
  /* background: rgba(0, 0, 0, 0.8); */
  border-color: none;
  min-height: 60vh !important;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
}
</style>
<style scoped>
.layout--main {
  backdrop-filter: brightness(0.2);
  height: 100vh;
  width: 100%;
  overflow: hidden;
}
.top {
  background: linear-gradient(112.12deg, #7448ff 1.33%, #7247c4 115.24%);
  border-radius: 12px 12px 0px 0px;
  background-repeat: no-repeat;
}
h3 {
  text-align: center;
}
.small-text {
  text-align: center;
}
.custom-color p {
  color: #a6a6a8;
}
.main-card {
  /* border-radius: 12px;
  background-color: #f4f5f7; */
  min-width: 70vw !important;
  min-height: 70vh !important;
}

.popup-mint-cover {
  width: 60vw;
}
.mint-details {
  color: #000000;
}
.sample-img {
  width: 200px !important;
  height: auto !important;
}
.hexagon img {
  width: 120px;
  height: 120px;
}
.card-top-img {
  transform: translate(0px, -40px);
}
.loading-container {
  height: 60vh !important;
}
.loading-img {
  animation: mymove 2s ease-in-out infinite;
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

@keyframes mymove {
  100% {
    transform: rotate(360deg);
  }
}
.title {
  font-style: normal;
  font-weight: bold;
  font-size: 30px;
  /* line-height: 70px; */
  color: #ffffff;
}
.bottom {
  margin-top: 15vh;
  padding: 1rem;
  background: #000;
  border: 1px solid #d7df23;
  box-shadow: 5px 5px 0px 0px #d7df23, 10px 10px 0px 0px #f2ff00;
  height: 100%;
}
.minted-msg {
  padding: 10px;
  font-size: 28px;
}
h3 {
  font-weight: bold;
  font-size: 28px;
}
form {
  text-align: center;
}
.text {
  font-weight: bold;
  font-size: 28px;
  line-height: 36px;
  text-transform: capitalize;

  color: #000000;
}
p {
  font-weight: normal;
  font-size: 18px;
  letter-spacing: -0.005em;
}
.small-text,
.minted-msg {
  font-weight: normal;
  font-size: 18px;
  letter-spacing: -0.005em;
  text-align: center;
  color: #909090;
}
.shifted-button {
  background: #000 !important;
  border: 1px solid #d7df23 !important;
  color: #d7df23 !important;
  border-radius: 0px !important;
  box-shadow: 3px 3px 0px 0px #d7df23 !important;
  padding-left: 5rem;
  padding-right: 5rem;
}
.custom-header {
  height: 100px;
  border-bottom: none !important;
  box-shadow: none !important;
  display: flex;
  /*justify-content: space-between!important;
  padding-left: 120px!important;
  padding-right: 15px!important;*/
}
.hexagon-nft-img {
  background: #7247c4;
  height: 145px !important;
  min-height: 145px !important;
  width: 145px;
  -webkit-clip-path: polygon(0 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%);
  clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%);
}
.hexagon-cover {
  display: flex;
  justify-content: center;
  width: 150px;
  height: 150px;
}
.hexagon-shadow {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  align-items: center;
  background-color: #7347c42f;
  -webkit-clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%);
  clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%);
}
.hexagon {
  width: 90%;
  height: 90%;
  z-index: 2;
  background-color: #7247c4;
  -webkit-clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%);
  clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%);
  background-position: center !important;
  background-repeat: no-repeat !important;
  background-size: cover !important;
}

.open-box {
  width: 100px !important;
  height: auto;
}
</style>
