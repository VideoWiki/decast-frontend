<template>
    <BaseModal :title="'NFT Gating'" @close="closeModal">
        <template #modalContent>
            <div class="modal-content-wrapper">
                <div class="modal-content">
                    <div class="modal-heading">
                        <h3>Add Roles</h3>
                    </div>
                    <div class="flex flex-col w-full items-start justify-start gap-6 mb-16">

                        <!-- <div class="flex flex-col gap-2 w-full">
                            <p>network.select</p>
                            <select class="w-2/5 p-3 mt-2" name="network-select" id="network-select" v-model="network"
                                @change="updateNetwork">
                                <option value="41">Telos EVM Testnet</option>
                                <option value="1">Ethereum</option>
                                <option value="5">Goerli Testnet RPC</option>
                                <option value="137">Polygon</option>
                                <option value="40">Telos EVM Mainnet</option>
                                <option value="11155111">Sepolia</option>
                            </select>
                        </div> -->

                        <!-- <div class="flex flex-col gap-2 w-full">
                            <p>contract.address</p>
                            <input class="w-2/5 p-3 mt-2" type="text" id="contract_address"
                                v-model="stepOneProps.contract_address" v-on:change="valueCheck()" @keyup="valueCheck()"
                                placeholder=" ex: 0x0710A4F91Dfa5c88A81A5b7a767" />
                        </div> -->
                        <div class="w-full">
                            <!-- <div>
                                <div v-for="(selectedRole, index) in selectedRoles" :key="index">
                                    <select v-model="selectedRoles[index]">
                                        <option v-for="role in roles" :key="role.name" :value="role.name"
                                            :disabled="isDisabled(role.name)">
                                            {{ role.name }}
                                        </option>
                                    </select>
                                </div>
                            </div> -->
                            <div class="table-heading-wrapper">
                                <div class="table-head-col1">
                                    <span></span>
                                </div>
                                <div class="table-head-col2">
                                    <span>name.role</span>
                                </div>
                                <div class="table-head-col3">
                                    <span>role.price</span>
                                </div>
                                <div class="table-head-col4">
                                    <span>WhiteList.role</span>
                                </div>
                            </div>
                            <div class="table-content-wrapper">
                                <div class="table-content-row" v-for="(role, index) in roles" :key="index"
                                    :class="{ disabled: role.isDisabled }">
                                    <div class="table-content-col1">
                                        <vs-icon icon-pack="feather" icon="icon-trash-2" class="cursor delete"
                                            @click.stop="removeRole(index)" size="20px" rounded="true">
                                        </vs-icon>
                                    </div>
                                    <div class="table-content-col2">
                                        <select v-model="roles[index].name" :class="{ disabled: role.isDisabled }"
                                            class="fixed-height w-full">
                                            <option value="" disabled>Select a role</option>
                                            <option v-for="option in rolesEnum" :key="option" :value="option"
                                                :disabled="isOptionDisabled(option, role.name)">
                                                {{ option }}
                                            </option>
                                        </select>
                                        <!-- <input v-if="index === 0" class="p-3 w-full" type="text"
                                            :value="roles[index].name + ' (You)'" placeholder="e.g: Manager / Students"
                                            :disabled="role.isDisabled" />
                                        <input v-else class="p-3 w-full" type="text" v-model="roles[index].name"
                                            placeholder="e.g: Manager / Students" :disabled="role.isDisabled" /> -->
                                    </div>
                                    <div class="table-content-col3">
                                        <input class="p-3 w-full fixed-height" maxlength="15" type="text"
                                            v-model="roles[index].price" placeholder="e.g: 10"
                                            :disabled="role.isDisabled" />
                                    </div>
                                    <div class="table-content-col4">
                                        <span>
                                            <vs-checkbox v-model="roles[index].isWhiteListed"
                                                :disabled="role.isDisabled"></vs-checkbox>
                                        </span>
                                    </div>
                                </div>
                                <div class="table-content-row tcr-last">
                                    <div class="table-content-col1"></div>
                                    <div class="table-content-col2" @click="handleAddRoles">👉 Add more roles +</div>
                                    <div class="table-content-col3"></div>
                                    <div class="table-content-col4"></div>
                                </div>
                            </div>
                        </div>
                        <p v-if="castDetails.isNftGated" class="collect-em-label">//Editing is 🔒locked and cannot be
                            changed,
                            <br />Don't worry still you can add more participent.<br />
                        </p>
                        <p v-else class="collect-em-label">//Please be advised that proceeding with this action will
                            result in
                            an irreversible change to your Cast. Specifically, you will no longer be able to edit the
                            roles of participants once this change is made. Ensure that all roles and permissions are
                            configured correctly before proceeding, as modifications will not be possible
                            afterward.<br /></p>
                        <p class="collect-em-label">Do you wish to continue?</p>
                        <div v-if="address && address.length > 0">
                            <p>Account: {{ address.slice(0, 8) }}...{{ address.slice(address.length - 5, address.length)
                                }}</p>
                            <p>Balance: {{ currencyBalance }} Eth</p>
                        </div>
                        <button v-else @click="connectWallet" class="custom-button">
                            Connect Wallet
                        </button>
                        <div>
                            <vs-button v-if="castDetails.isNftGated"
                                :disabled="address === '' || roles.length <= rolesDefLength"
                                @click.stop="updateNFTGating" class="mt-8" type="border"> >>update</vs-button>
                            <vs-button v-else :disabled="address === ''" @click.stop="createNFTGating" class="mt-8"
                                type="border"> >>confirm </vs-button>
                        </div>
                    </div>
                </div>
                <div class="cast-modal-bottom">
                    <p>>> Cast > <span>NFT Gating</span></p>
                </div>
            </div>
        </template>
    </BaseModal>
</template>

<script>
import axios from '@/axios';
import constants from '../../../../constant';
import BaseModal from "@/components/common/BaseModal.vue";
import { ethers } from 'ethers';
import { tokenContractWithSigner } from "./Constants"

export default {
    name: 'CreateNftGating',
    props: ['closeModal', 'castDetails', 'setActiveModal', 'updateCastListElement'],
    components: {
        BaseModal,
    },
    data() {
        return {
            rolesEnum: ['Co-host', 'Participant', 'Viewer'],
            address: '',
            currencyBalance: '',
            isNftGateEnabled: true,
            rolesDefLength: 1,
            roles: [
                {
                    name: "Co-host",
                    price: "0.0",
                    isWhiteListed: false,
                    isDisabled: false,
                },
                {
                    name: "Participant",
                    price: "0.0",
                    isWhiteListed: false,
                    isDisabled: false,
                },
                {
                    name: "Viewer",
                    price: "0.0",
                    isWhiteListed: false,
                    isDisabled: false,
                },
            ]
        };
    },
    async mounted() {
        document.getElementById('loading-bg-transparent').style.display = 'none';
        if (this.castDetails.isNftGated) {
            this.fetchNftGatingDetails();
        }
        await this.connectWallet();
    },
    created() {
    },
    methods: {
        isOptionDisabled(option, currentRole) {
            return (
                this.roles.some(role => role.name === option) && currentRole !== option
            );
        },
        async fetchNftGatingDetails() {
            await this.connectWallet();
            this.$vs.loading();
            this.roles = [];
            try {
                const tokenIds = await tokenContractWithSigner.getTokenIdsFromEventId(this.castDetails.public_meeting_id);
                const roles = await tokenContractWithSigner.getAccessLevelsFromEventId(this.castDetails.public_meeting_id);
                const pricePromises = tokenIds.map(tokenId =>
                    tokenContractWithSigner.getTicketPriceFromTokenId(tokenId._hex)
                );
                const whiteListPromises = tokenIds.map(tokenId =>
                    tokenContractWithSigner.getWhitelistBooleanFromTokenId(tokenId._hex)
                );
                const [ticketprices, isWhiteListed] = await Promise.all([
                    Promise.all(pricePromises),
                    Promise.all(whiteListPromises)
                ]);
                for (let i = 0; i < ticketprices.length; i++) {
                    // newTicketPrices.push(ethers.BigNumber.from(ticketprices[i]._hex).toString());
                    this.roles.push({
                        name: roles[i],
                        price: ethers.utils.formatEther(ticketprices[i]._hex),
                        isWhiteListed: isWhiteListed[i],
                        isDisabled: true,
                    })
                }
                this.rolesDefLength = ticketprices.length;
                this.$vs.loading.close();
            } catch (error) {
                this.$vs.loading.close();
                ////console.log("Error calling contract function:", error);
            }
        },
        async createNFTGating() {
            this.isLoading = true;
            if (!tokenContractWithSigner) {
                ////console.log("Contract not initialized");
                this.isLoading = false;
                return;
            }
            document.getElementById('loading-bg-transparent-title').innerText = 'Initializing Nft Gating';
            document.getElementById('loading-bg-transparent').style.display = 'flex';
            const payload = {
                adminWallet: this.address,
                castId: this.castDetails.public_meeting_id,
                ticketsData: [],
            }
            // const eventId = this.castDetails.public_meeting_id;
            // const accessLevels = [];
            // const ticketPrices = [];
            // const whitelist = [];
            const roles = this.roles;
            for (let i = 0; i < roles.length; i++) {
                if (this.rolesEnum.includes(roles[i].name)) {
                    payload.ticketsData.push({
                        name: roles[i].name,
                        price: roles[i].price,
                        description: '',
                        isWhiteListed: roles[i].isWhiteListed ? 'True': 'False',
                    })
                    // accessLevels.push(roles[i].name);
                    // ticketPrices.push(ethers.utils.parseEther(roles[i].price));
                    // whitelist.push(roles[i].isWhiteListed);
                }
            }
            try {
                //console.log("payload", payload)
                fetch("https://api.cast.decast.live/api/event/nft-gating/register/", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    },
                    body: JSON.stringify(payload),
                }).then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok ' + response.statusText);
                    }
                    return response.json();
                }).then(async result => {
                    this.isLoading = false;
                    document.getElementById('loading-bg-transparent').style.display = 'none';
                    this.$vs.notify({
                        title: 'NFT Gating Enabled!',
                        text: 'Your cast is now enabled with nft gating',
                        color: 'success',
                    });
                    await this.updateCastDetails();
                    this.setActiveModal("createSuccessModal")
                    return result;
                }).catch(error => {
                    this.isLoading = false;
                    document.getElementById('loading-bg-transparent').style.display = 'none';
                    ////console.log("Error while enabling nft gating")
                });
                // const result = await tokenContractWithSigner.registerEvent(eventId, accessLevels, ticketPrices, whitelist);
                // document.getElementById('loading-bg-transparent-title').innerText = 'Processing transaction';
                // await result.wait();
                // document.getElementById('loading-bg-transparent-title').innerText = 'Transaction confirmed✔️ finishing up';
                // const tokenIds = await tokenContractWithSigner.getTokenIdsFromEventId(eventId);
                // const roles = await tokenContractWithSigner.getAccessLevelsFromEventId(eventId);
                // await this.saveTokensToBackend(roles, tokenIds);
                // this.isLoading = false;
                // document.getElementById('loading-bg-transparent').style.display = 'none';
                // this.$vs.notify({
                //     title: 'NFT Gating Enabled!',
                //     text: 'Your cast is now enabled with nft gating',
                //     color: 'success',
                // });
                // await this.updateCastDetails();
                // this.setActiveModal("createSuccessModal")
            } catch (error) {
                this.isLoading = false;
                document.getElementById('loading-bg-transparent').style.display = 'none';
                ////console.log("Error calling registerEvent function:", error);
            }
        },
        async saveTokensToBackend(roles, tokenIds) {
            const payload = {
                cast_id: this.castDetails.public_meeting_id,
                moderator_token: '',
                attendee_token: '',
                viewer_token: '',
            }
            for (let i = 0; i < roles.length; i++) {
                const role = roles[i];
                switch (role) {
                    case 'Co-host':
                        payload.moderator_token = tokenIds[i]._hex;
                        break;
                    case 'Participant':
                        payload.attendee_token = tokenIds[i]._hex;
                        break;
                    case 'Viewer':
                        payload.viewer_token = tokenIds[i]._hex;
                        break;
                    default:
                        //no operation
                        break;
                }
            }
            return fetch(`https://api.cast.decast.live/api/cast-token/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(payload),
            }).then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            }).then(result => {
                return true;
            }).catch(error => {
                throw error;
            });
        },
        async updateNFTGating() {
            this.isLoading = true;
            if (!tokenContractWithSigner) {
                ////console.log("Contract not initialized");
                this.isLoading = false;
                return;
            }
            document.getElementById('loading-bg-transparent-title').innerText = 'Waiting for transaction';
            document.getElementById('loading-bg-transparent').style.display = 'flex';
            const _eventId = this.castDetails.public_meeting_id;
            const _newAccessLevel = [];
            const _newTicketPrice = [];
            const _newWhitelist = [];
            const roles = this.roles;
            for (let i = 0; i < roles.length; i++) {
                if (!roles[i].isDisabled) {
                    _newAccessLevel.push(roles[i].name);
                    _newTicketPrice.push(ethers.utils.parseEther(roles[i].price));
                    _newWhitelist.push(roles[i].isWhiteListed);
                }
            }
            try {
                const result = await tokenContractWithSigner.registerAccessLevels(_eventId, _newAccessLevel, _newTicketPrice, _newWhitelist);
                document.getElementById('loading-bg-transparent-title').innerText = 'Processing transaction';
                await result.wait();
                document.getElementById('loading-bg-transparent-title').innerText = 'Transaction confirmed✔️ finishing up';
                this.isLoading = false;
                this.$vs.notify({
                    title: 'NFT Gating updated!',
                    text: 'The new roles has been added successfully',
                    color: 'success',
                });
                document.getElementById('loading-bg-transparent').style.display = 'none';
                await this.fetchNftGatingDetails();
            } catch (error) {
                this.isLoading = false;
                document.getElementById('loading-bg-transparent').style.display = 'none';
                ////console.log("Error calling registerEvent function:", error);
            }
        },
        handleWhiteListChange(index) {
            this.roles[index].isWhiteListed = !this.roles[index].isWhiteListed;
        },
        handleAddRoles() {
            if (this.roles.length >= 3) {
                return;
            }
            const newOption = {
                name: "",
                price: "0.0",
                isWhiteListed: false,
                isDisabled: false,
            }
            this.roles.push(newOption);
        },
        removeRole(index) {
            this.roles.splice(index, 1);
        },
        updateCastDetails() {
            var data = new FormData();
            data.append('isNftGated', 'True');
            data.append('cast_id', this.castDetails.public_meeting_id);
            this.$store.dispatch('cast/formSubmit', data)
                .then((response) => {
                    this.updateCastListElement(this.castDetails.public_meeting_id, { isNftGated: true });
                })
                .catch((error) => {
                    //console.log("Error updating cast")
                });
        },
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
                                    ////console.log('Failed to add optimism sepolia network');
                                }
                            } else {
                                ////console.log('Failed to switch to optimism sepolia network');
                            }
                        }
                    }

                    // Get account and balance
                    const signer = provider.getSigner();
                    const currentAccount = await signer.getAddress();
                    const currentBalance = await signer.getBalance();

                    this.address = currentAccount.toString();
                    this.currencyBalance = parseFloat(ethers.utils.formatEther(currentBalance || ethers.constants.Zero)).toFixed(4);
                } else {
                    console.warn('Window or window.ethereum is not available.');
                }
            } catch (error) {
                ////console.log('Error connecting wallet:', error);
            }
        },
    },
}
</script>

<style scoped>
.table-heading-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #FFFFFF;
    margin-top: 10px;
}

.fixed-height {
    height: 39px;
}

.table-content-row {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px 0px 5px 0px;
    background-color: #000000;
}

.table-content-wrapper {
    margin-top: 6px;
}

.table-head-col1 {
    flex: 0.05;
}

.table-head-col2 {
    flex: 0.45;
}

.table-head-col3 {
    flex: 0.3;
}

.table-head-col4 {
    flex: 0.2;
}

.table-head-col1,
.table-head-col2,
.table-head-col3,
.table-head-col4 {
    display: flex;
    align-items: center;
    padding: 5px 10px;
}

.table-content-col1 {
    flex: 0.05;
}

.table-content-col2 {
    flex: 0.45;
}

.table-content-col3 {
    flex: 0.3;
}

.table-content-col4 {
    flex: 0.2;
}

.table-content-col1,
.table-content-col2,
.table-content-col3,
.table-content-col4 {
    overflow-wrap: anywhere;
    display: flex;
    align-items: center;
    padding: 5px 10px;
    cursor: pointer;
}

.disabled {
    opacity: 0.5;
    pointer-events: none;
}

input:disabled {
    background-color: #f0f0f0;
    cursor: not-allowed;
}

.collect-em-label {
    color: #5B96EB !important;
}

.tcr-last {
    border-bottom: 1px solid #5B5B5B;
    padding-bottom: 10px;
}

.basic_btn_ {
    background: none;
    border: 1px solid #FFFFFF;
    width: fit-content;
    color: #FFFFFF;
    cursor: pointer;
}

.basic_up_btn_ {
    color: #5B96EB;
    background: none;
    border: 1px dotted #FFFFFF;
    cursor: pointer;
}

input {
    /* font-family: 'JetBrains Mono'; */
    border: 0px;
    background-color: #FFFFFF;
    outline: none;
    border-radius: 0px;
    color: #000000;
    font: bold !important;
}

#aib {
    resize: none;
    height: 100px !important;
}

.active-btn {
    background: #fff;
    color: #000000;
    font: bold;
}

.btn-loader {
    width: 30px;
    aspect-ratio: 8;
    background: radial-gradient(circle closest-side, #D7DF23 90%, #0000) 0/calc(100%/3) 100% space;
    clip-path: inset(0 100% 0 0);
    animation: l1 0.8s steps(4) infinite;
}

.custom-button {
    border: 1px solid black;
    background-color: #D7DF23;
    box-shadow: 3px 3px 0px 0px #fff;
    color: #000000;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 185px;
    padding: 0.6rem;
    font-weight: 600;
    cursor: pointer;
    margin-top: 6px;
}

.custom-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.custom-button:hover {
    transition: 0.2s ease-in-out;
    box-shadow: 5px 5px 0px 0px #fff !important;
}

@keyframes l1 {
    to {
        clip-path: inset(0 -34% 0 0)
    }
}
</style>