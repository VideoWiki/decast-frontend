<template>
    <BaseModal :title="'NFT Gating'" @close="closeModal">
        <template #modalContent>
            <div class="modal-content-wrapper">
                <div v-if="accessToken" class="modal-content">
                    <div class="modal-heading-success">
                        <h3>Request with:</h3>
                    </div>
                    <div class="flex flex-col w-full items-start justify-start gap-6 mb-16">
                        <div class="cast-modal-bottom">
                            <p v-if="activeUserInfo.email===''">Account: <span class="collect-em-label">{{ activeUserInfo.username }}</span></p>
                            <p v-else>Account: <span class="collect-em-label">{{ activeUserInfo.email }}</span></p>
                            <p>Name: <span class="collect-em-label">{{ activeUserInfo.first_name }}</span></p>
                        </div>
                        <div>
                            <vs-button class="mt-8" type="border" @click="handleSendRequest">
                                >>request.send</vs-button>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <div class="modal-heading-success">
                        <h3>Login please!</h3>
                    </div>
                    <div class="flex flex-col w-full items-start justify-start gap-6 mb-16">
                        <div class="cast-modal-bottom">
                            <p class="collect-em-label">/* Please login first to send the access request */<br /></p>
                        </div>
                        <div>
                            <vs-button class="mt-8" type="border" @click="openNFTGatingCastPage">
                                >>login</vs-button>
                        </div>
                    </div>
                </div>
                <div class="cast-modal-bottom">
                    <p>>> Cast > <span>Request Access</span></p>
                </div>
            </div>
        </template>
    </BaseModal>
</template>

<script>
import BaseModal from "@/components/common/BaseModal.vue";
import { ethers } from 'ethers';
import { tokenContractWithSigner } from "./Constants"

export default {
    name: 'RequestAccessModal',
    props: ['closeModal', 'castDetails', 'wallet_address', 'roleRequest', 'updateButtonOnRequestSent'],
    components: {
        BaseModal,
    },
    data() {
        return {
        };
    },
    mounted() {
        console.log("castDetails", this.castDetails)
    },
    created() {
    },
    methods: {
        openNFTGatingCastPage() {
            const url = 'https://decast.live/nft-gating/cast/abcd';
            window.open(url, '_blank');
        },
        handleSendRequest() {
            const url = 'https://api.cast.decast.live/api/nft/gating/request/';
            const payload = {
                cast_id: this.castDetails.public_meeting_id,
                email: this.activeUserInfo.email===''? this.activeUserInfo.username : this.activeUserInfo.email,
                name: this.activeUserInfo.first_name,
                wallet_address: this.wallet_address,
                profile_image: this.activeUserInfo.profile_pic,
                role: this.roleRequest,
                description: '',
            };

            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(payload)
            }).then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            }).then(data => {
                this.updateButtonOnRequestSent();
                this.$vs.notify({
                    title: 'Success',
                    text: 'Request send successfully!',
                    color: 'success',
                });
                this.closeModal();
            }).catch(error => {
                this.$vs.notify({
                    title: 'OOPS',
                    text: 'Failed to send request please try again later!',
                    color: 'danger',
                });
                this.closeModal();
            });
        }
    },
    computed: {
        accessToken() {
            return this.$store.state.auth.accessToken;
        },
        activeUserInfo() {
            return this.$store.state.AppActiveUser;
        },
    },
}
</script>

<style scoped>
* {
    font-family: 'JetBrains Mono', monospace !important;
}

.modal-content-wrapper {
    height: 50vh;
    width: 40vw;
}

input:disabled {
    background-color: #f0f0f0;
    cursor: not-allowed;
}

.collect-em-label {
    color: #5B96EB !important;
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

.modal-heading-success {
    padding: 5px 0px;
}

.modal-heading-success h3 {
    font-size: 22px;
    color: #FFFFFF;
    line-height: unset;
}

.cast-modal-bottom {
    color: #FFFFFF;
}
</style>