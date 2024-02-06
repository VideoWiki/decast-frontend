<template>
    <BaseModal :title="'Nft/Token'" @close="closeModal">
        <template #modalContent>
            <div class="modal-content-wrapper">
                <div class="modal-content">
                    <div class="modal-heading">
                        <h3>Edit NFT/Token</h3>
                    </div>
                    <div class="flex flex-col w-full items-start justify-start gap-6 mb-16">
                        <div class="flex flex-col gap-2 w-full pt-6">
                            <p>drop.type</p>
                            <button class="basic_btn_ p-1 px-2" :class="{ 'active-btn': nftIsChecked }"
                                @click="toggleNftSwitch">NFTs</button>
                            <button class="basic_btn_ p-1 px-2" :class="{ 'active-btn': tokenIsChecked }">Tokens</button>
                        </div>

                        <div class="flex flex-col gap-2 w-full">
                            <p>nft.distribute</p>
                            <button class="basic_btn_ p-1 px-2" :class="{ 'active-btn': publicIsChecked }"
                                @click="togglePublicSwitch">
                                Public
                            </button>
                            <button class="basic_btn_ p-1 px-2" :class="{ 'active-btn': privateIsChecked }"
                                @click="togglePrivateSwitch">
                                Private
                            </button>
                        </div>

                        <div class="flex flex-col gap-2 w-full">
                            <p>network.select</p>
                            <select class="w-2/5 p-3 mt-2" name="network-select" id="network-select" v-model="stepOneProps.network"
                                @change="updateNetwork">
                                <option value="41">Telos EVM Testnet</option>
                                <option value="1">Ethereum</option>
                                <option value="5">Goerli Testnet RPC</option>
                                <option value="137">Polygon</option>
                                <option value="40">Telos EVM Mainnet</option>
                                <option value="11155111">Sepolia</option>
                            </select>
                        </div>

                        <div class="flex flex-col gap-2 w-full">
                            <p>contract.address</p>
                            <input class="w-2/5 p-3 mt-2" type="text" id="contract_address"
                                v-model="stepOneProps.contract_address" v-on:change="valueCheck()" @keyup="valueCheck()"
                                placeholder=" ex: 0x0710A4F91Dfa5c88A81A5b7a767" />
                        </div>

                        <div class="flex flex-col gap-2 w-full">
                            <p>ABI</p>
                            <textarea class="w-3/5 p-2 mt-2" id="aib" v-model="stepOneProps.aib" v-on:change="valueCheck()"
                                @keyup="valueCheck()" placeholder='ex: [{"internalType": "uint256}]'></textarea>
                        </div>

                        <div class="flex flex-col gap-2 w-full">
                            <p>parameters</p>
                            <input class="w-2/5 p-3 mt-2" type="text" id="parameter" v-model="stepOneProps.parameter"
                                v-on:change="valueCheck()" @keyup="valueCheck()" placeholder="ex: {_count:1}" />
                        </div>

                        <div class="flex flex-col gap-2 w-full">
                            <p>mintFunction.name</p>
                            <input class="w-2/5 p-3 mt-2" type="text" placeholder=" ex: mintNFTs" id="mint_function_name"
                                v-model="stepOneProps.mint_function_name" v-on:change="valueCheck()"
                                @keyup="valueCheck()" />
                        </div>

                        <div class="flex flex-col gap-2 w-full">
                            <p>price</p>
                            <input class="w-2/5 p-3 mt-2" v-model="stepOneProps.price" v-on:change="valueCheck()"
                                @keyup="valueCheck()" />
                        </div>

                        <div class="flex flex-col gap-2 w-full">
                            <p>description</p>
                            <input class="w-2/5 p-3 mt-2" id="nft_description" placeholder="ex. utility of the NFT"
                                v-model="stepOneProps.nft_description" v-on:change="valueCheck()" @keyup="valueCheck()" />
                        </div>

                        <div class="flex flex-col gap-2 w-full">
                            <p>Upload NFT</p>
                            <div>
                                <button @click="openUpload"
                                    class="basic_up_btn_ w-2/5 mt-2 flex items-center justify-between p-3 text-left">/*
                                    <br>
                                    Click to upload file<br />
                                    or drag and drop your file <br> */
                                    <span>
                                        <svg width="20" height="20" viewBox="0 0 29 29" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M13.3846 8.9232H15.6154V13.3847H20.0769V15.6155H15.6154V20.077H13.3846V15.6155H8.92308V13.3847H13.3846V8.9232Z"
                                                fill="#64748B" />
                                            <path d="M2.23077 0.00012207V2.23089H26.7692V0.00012207H2.23077Z"
                                                fill="#64748B" />
                                            <path d="M29 2.23089H26.7692V26.7694H29V2.23089Z" fill="#64748B" />
                                            <path d="M2.23077 26.7694V29.0001H26.7692V26.7694H2.23077Z" fill="#64748B" />
                                            <path d="M0 26.7694H2.23077V2.23089H0V26.7694Z" fill="#64748B" />
                                        </svg>
                                    </span></button>
                                <input type="file" class="hidden" name="Sample nft" id="nft_image" ref="nft_image"
                                    v-on:change="uploadSampleNft" />
                                <p style="max-width: 120px; overflow: hidden">{{ sampleName }}</p>
                            </div>
                        </div>

                        <div>
                            <vs-button @click.stop="addNft(true)" class="mt-8" type="border"> >>Update NFT</vs-button>
                        </div>
                    </div>

                </div>
                <div class="cast-modal-bottom">
                    <p>>> Update Drops</p>
                </div>
            </div>
        </template>
    </BaseModal>
</template>

<script>
import axios from '@/axios';
import constants from '../../../../constant';
import BaseModal from "@/components/common/BaseModal.vue";

export default {
    name: 'EditNftModal',
    props: ['closeModal', 'castDetails', 'getCastList'],
    components: {
        BaseModal,
    },
    data() {
        return {
            nftIsChecked: true,
            tokenIsChecked: false,
            publicIsChecked: true,
            privateIsChecked: false,
            sampleName: 'No File Selected',
            dummyURI: '',
            nftDetails: null,
            stepOneProps: {
                mint_function_name: '',
                mintfnc_name_error: false,
                contract_address: '',
                contract_address_error: false,
                aib: '',
                aib_error: false,
                parameter: '',
                parameter_error: false,
                network: '',
                audienceAirdrop: true,
                give_vc: false,
                airdropType: 'NFTs',
                price: '',
                price_error: false,
                nft_description: '',
                nft_description_error: false,
                nft_image: '',
                data_token: false,
                nft_image_error: false,
                password_auth: false,
                auth_type: 'public',
                meeting_auth_error: false,
                send_otp: false,
                public_auth: false, // Changed from the first object's 'true' to the second object's 'false'
                public_otp: false,
                give_nft: false,
                public_stream_nfts: 'true',
                public_nft_flow: false,
                nft_t_ype: 'NFTs', // Appears only in the first object, I'll keep it here
                nft_type: 'NFTs', // Appears only in the first object, I'll keep it here
                generated_event_title: '',
                event_name: '',
                invalidTimeError: false,
                moderator_password: '',
                attendee_password: '',
                meeting_type: 'public',
                schedule_time: '',
                description: '',
                max_participant: 100,
                short_description: '',
                hide_users: false,
                event_name_error: false,
                moderator_password_error: false,
                attendee_password_error: false,
                viewer_password_error: false,
                description_error: false,
                description_length_error: false,
                schedule_time_error: false,
                meeting_type_error: false,
                event_name_length_error: false,
                start_now: false,
            },
        };
    },
    mounted() {
        this.stepOneProps.meeting_type = this.castDetails.cast_type;
        this.stepOneProps.send_otp = this.castDetails.send_otp;
                    this.stepOneProps.public_otp = this.castDetails.public_otp;
        if (this.castDetails.public_meeting_id === 'vw.svg') {
            return;
        }
        this.getNFTDetails();
        // document.getElementById('loading-bg').style.display = 'none';
    },
    methods: {
        getNFTDetails() {
            this.$vs.loading();
            const payload = this.castDetails.public_meeting_id;
            this.$store
                .dispatch('cast/recieveNFTDetails', payload)
                .then((res) => {
                    this.nftDetails = res.data;
                    if (this.nftDetails && this.nftDetails.pub_nft_flow == false) {
                        this.publicIsChecked = false;
                        this.privateIsChecked = true;
                        this.isNewCheck=true;
                        console.log(this.isNewCheck,'dkjdll');
                    }else{
                        this.publicIsChecked = true;
                        this.privateIsChecked = false;
                        this.isNewCheck=false;
                    }
                    this.stepOneProps.mint_function_name = res.data.mint_function_name;
                    this.stepOneProps.contract_address = res.data.contract_adress;
                    this.stepOneProps.nft_description = res.data.description;
                    this.stepOneProps.network = res.data.network;
                    this.stepOneProps.parameter = JSON.stringify(res.data.parameter);
                    this.stepOneProps.public_stream_nfts = JSON.stringify(
                        res.data.pub_nft_flow
                    );
                    this.stepOneProps.aib = JSON.stringify(res.data.aib);
                    this.stepOneProps.image = res.data.image;
                    this.stepOneProps.nft_image = res.data.image;
                    this.stepOneProps.price = res.data.price;
                    if (this.stepOneProps.public_stream_nfts === 'false') {
                        this.stepOneProps.give_nft = true;
                    }
                    const imageUrl = res.data.image;
                    const url = new URL(imageUrl);
                    const imageName = url.pathname.split('/').pop();
                    this.sampleName = imageName;
                    this.$vs.loading.close();
                })
                .catch((e) => {
                    console.log('error in receibing', e);
                });
        },
        toggleDistributionType(type) {
            if (type === 'private') {
                this.privateIsChecked = true;
                this.publicIsChecked = false;
                this.typeOfNft(type);
                this.updateGiveNft(type);
                this.stepOneProps.public_stream_nfts = false;
                this.stepOneProps.public_nft_flow = false;
            } else if (type === 'public') {
                this.privateIsChecked = false;
                this.publicIsChecked = true;
                this.typeOfNft(type);
                this.updateGiveNft(type);
                this.stepOneProps.public_stream_nfts = true;
                this.stepOneProps.public_nft_flow = true;
            }
        },
        togglePrivateSwitch() {
            this.privateIsChecked = true;
            this.publicIsChecked = false;
            this.toggleDistributionType('private');
        },
        togglePublicSwitch() {
            this.privateIsChecked = false;
            this.publicIsChecked = true;
            this.toggleDistributionType('public');
        },
        updateDistributionType(type) {
            console.log('update called with type:', type);
            this.toggleDistributionType(type);
        },
        toggleNftSwitch() {
            this.nftIsChecked = true;
            this.tokenIsChecked = false;
            this.toggleDistributionType('private');
        },
        updateGiveNft(e) {
            console.log(e, 'updatenft');
            if (
                (this.stepOneProps.audienceAirdrop &&
                    this.stepOneProps.airdropType === 'NFTs') ||
                this.stepOneProps.public_stream_nfts === 'false'
            ) {
                this.stepOneProps.give_nft = true;
            } else {
                this.stepOneProps.give_nft = false;
            }
        },
        updateAirdropType(type) {
            this.stepOneProps.airdropType = type;
            if (type === 'NFTs') {
                this.toggleTextColor('NFTs');
                this.updateGiveNft();
                this.nftIsChecked = true;
                this.tokenIsChecked = false;
            } else if (type === 'Token') {
                this.toggleTextColor('Token');
                this.updateGiveNft();
                this.tokenIsChecked = true;
                this.nftIsChecked = false;
            }
        },
        typeOfNft(e) {
            console.log(e, 'typeNFT');
            if (this.stepOneProps.public_stream_nfts === 'true') {
                this.stepOneProps.give_nft = false;
            } else if (this.stepOneProps.public_stream_nfts === 'false') {
                if (!this.stepOneProps.public_otp && !this.stepOneProps.send_otp) {
                    this.stepOneProps.public_stream_nfts = 'true';
                    this.stepOneProps.give_nft = false;
                    this.$vs.notify({
                        time: 6000,
                        title: 'Access Restriction required',
                        text:
                            'You need to either collect attendee emails or stream the cast privately with OTP verification, for enabling NFTs' +
                            this.stepOneProps.public_stream_nfts,
                        color: 'warning',
                    });
                } else {
                    this.stepOneProps.give_nft = true;
                }
            }
        },
        updateNetwork(event) {
            this.stepOneProps.network = event.target.value;
        },
        valueCheck(e) {
            if (
                this.stepOneProps.audienceAirdrop &&
                this.stepOneProps.airdropType === 'NFTs'
            ) {
                if (this.stepOneProps.mint_function_name.length !== 0)
                    this.stepOneProps.mintfnc_name_error = false;
                if (this.stepOneProps.contract_address.length !== 0)
                    this.stepOneProps.contract_address_error = false;
                if (this.stepOneProps.aib.length !== 0)
                    this.stepOneProps.aib_error = false;
                if (this.stepOneProps.nft_description.length !== 0)
                    this.stepOneProps.nft_description_error = false;
                if (this.stepOneProps.nft_image !== '')
                    this.stepOneProps.nft_image_error = false;
            }
        },
        openUpload() {
            document.getElementById('nft_image').click();
        },
        canSubmitNft() {
            console.log(
                this.stepOneProps.audienceAirdrop,
                this.stepOneProps.airdropType,
                this.stepOneProps.mint_function_name,
                this.stepOneProps.contract_address,
                this.stepOneProps.nft_description,
                this.stepOneProps.nft_image,
                'stepproo'
            );
            if (
                this.stepOneProps.audienceAirdrop &&
                this.stepOneProps.airdropType === 'NFTs' &&
                (this.stepOneProps.mint_function_name === '' ||
                    this.stepOneProps.contract_address === '' ||
                    this.stepOneProps.aib === '' ||
                    this.stepOneProps.nft_description === '' ||
                    this.stepOneProps.nft_image === '')
            ) {
                if (
                    this.stepOneProps.audienceAirdrop &&
                    this.stepOneProps.airdropType === 'NFTs'
                ) {
                    this.stepOneProps.mintfnc_name_error =
                        this.stepOneProps.mint_function_name === '';
                    this.stepOneProps.contract_address_error =
                        this.stepOneProps.contract_address === '';
                    this.stepOneProps.aib_error = this.stepOneProps.aib === '';
                    this.stepOneProps.nft_image_error =
                        this.stepOneProps.nft_image === '';
                    this.stepOneProps.nft_description_error =
                        this.stepOneProps.nft_description === '';
                }
                this.stepOneProps.public_nft_flow =
                    this.stepOneProps.public_stream_nfts === 'true';
                console.log('error');
                this.$vs.notify({
                    time: 3000,
                    title: 'Cannot Submit',
                    text: 'Please fill the fields which are required.',
                    color: 'danger',
                });
                return false;
            } else {
                console.log('success');
                this.stepOneProps.public_nft_flow =
                    this.stepOneProps.public_stream_nfts === 'true';
                return true;
            }
        },
        updateGiveNft(e) {
            console.log(e, 'updatenft');
            if (
                (this.stepOneProps.audienceAirdrop &&
                    this.stepOneProps.airdropType === 'NFTs') ||
                this.stepOneProps.public_stream_nfts === 'false'
            ) {
                this.stepOneProps.give_nft = true;
            } else {
                this.stepOneProps.give_nft = false;
            }
        },
        async addNft(x) {
            if (
                this.publicIsChecked === false &&
                this.stepOneProps.meeting_type === 'public'
            ) {
                this.$vs.notify({
                    title: 'Action required',
                    text: 'Please collect attendee emails or stream privately before changing to private NFT.',
                    color: 'warning',
                });
                return;
            } else {
                if (this.canSubmitNft()) {
                    const castId = this.castDetails.public_meeting_id;
                    var payload = new FormData();
                    for (var [key, value] of Object.entries(this.stepOneProps)) {
                        if (value.length === 0) {
                            value = '';
                        } else {
                            if (value === false) {
                                value = 'False';
                            } else if (value === true) {
                                value = 'True';
                            } else if (value === '') {
                                value = '';
                            }
                        }
                        payload.append(key, value);
                    }
                    payload.append('public_meeting_id', castId);
                    this.$vs.loading();
                    await this.$store
                        .dispatch('studio/updateNftDetails', payload)
                        .then(async (res) => {
                            if (x) {
                                this.$vs.notify({
                                    time: 6000,
                                    title: 'Airdrop Details Updated',
                                    color: 'success',
                                });
                                this.closeModal();
                                this.$vs.loading.close();
                                this.airdrops = false;
                            }
                        })
                        .catch((e) => {
                            console.log(JSON.stringify(e));
                            if (e) {
                                console.log(e);
                                this.$vs.loading.close();
                                this.$vs.notify({
                                    time: 6000,
                                    title: 'Error',
                                    text: e.response.data.message,
                                    color: 'danger',
                                });
                            }
                        });
                }
            }
        },

        resetFields() {
            console.log('yes I am called');
            this.stepOneProps = {
                contract_address: '',
                contract_address_error: false,
                aib: '',
                aib_error: false,
                parameter: '',
                mint_function_name: '',
                mintfnc_name_error: false,
                price: '',
                nft_description: '',
                nft_image_error: false,
            };
            this.sampleName = 'No file selected';
            this.$refs.nft_image.value = '';
        },
        uploadSampleNft(event) {
            if (event.target.files.length > 0) {
                this.stepOneProps.nft_image = event.target.files[0];
                this.sampleName = event.target.files[0].name;
                this.stepOneProps.nft_image_error = false;
            } else {
                this.stepOneProps.nft_image_error = true;
                this.sampleName = 'No file selected';
                this.stepOneProps.nft_image = null;
            }
        },

    },
}
</script>

<style scoped>
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
    font-family: 'JetBrains Mono';
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
</style>