<template>
    <BaseModal :title="'NFT Gating'" @close="closeModal">
        <template #modalContent>
            <div class="modal-content-wrapper">
                <div v-if="accessToken" class="modal-content">
                    <div class="modal-heading-success">
                        <h3>Pending requests</h3>
                    </div>
                    <div class="flex flex-col w-full items-start justify-start gap-6 mb-16">
                        <div class="w-full">
                            <div class="table-heading-wrapper">
                                <div class="table-head-col1">
                                    <span>sender.name</span>
                                </div>
                                <div class="table-head-col2">
                                    <span>sender.account</span>
                                </div>
                                <div class="table-head-col2">
                                    <span>sender.wallet</span>
                                </div>
                                <div class="table-head-col3">
                                    <span>requested.role</span>
                                </div>
                                <div class="table-head-col4">
                                    <span>admin.action</span>
                                </div>
                            </div>
                            <div class="table-content-wrapper">
                                <p class="mt-8" v-if="pendingRequest.length <= 0">No New Request Found</p>
                                <div v-else class="table-content-row" v-for="(request, index) in pendingRequest"
                                    v-if="request.email !== activeUserInfo.email" :key="index">
                                    <div class="table-content-col1">
                                        <span v-if="request.name === ''">
                                            -
                                        </span>
                                        <span v-else>
                                            {{ request.name }}
                                        </span>
                                    </div>
                                    <div class="table-content-col2">
                                        <vx-tooltip v-if="request.email.length > 17" :text="request.wallet_address"
                                            position="top">
                                            <span>
                                                {{ request.wallet_address.slice(0, 8) }}...{{
        request.wallet_address.slice(request.wallet_address.length - 5,
            request.wallet_address.length) }}
                                            </span>
                                        </vx-tooltip>
                                        <span v-else>
                                            {{ request.email }}
                                        </span>
                                    </div>
                                    <div class="table-content-col2">
                                        <span>
                                            {{ request.wallet_address.slice(0, 8) }}...{{
        request.wallet_address.slice(request.wallet_address.length - 5,
            request.wallet_address.length) }}
                                        </span>
                                    </div>
                                    <div class="table-content-col3">
                                        <span>
                                            {{ request.role }}
                                        </span>
                                    </div>
                                    <div class="table-content-col4">
                                        <vs-checkbox v-model="pendingRequest[index].isReqAccepted"></vs-checkbox>
                                        <!-- <span
                                            @click="handleAcceptRequest(request.email, request.wallet_address, request.role)"
                                            v-if="!request.isReqAccepted">
                                            ✔️Accept
                                        </span> -->
                                        <!-- <span @click="handleRejectRequest(request.email)">
                                            Reject
                                        </span> -->
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <vs-button class="mt-8" type="border" @click="handleAcceptAllRequest"
                                :disabled="pendingRequest.length<=0">
                                >>request.accept</vs-button>
                        </div>
                    </div>
                </div>
                <div class="cast-modal-bottom">
                    <p>>> Cast > <span>Pending requests</span></p>
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
    props: ['closeModal', 'castDetails', 'pendingRequest', 'getAllRequests'],
    components: {
        BaseModal,
    },
    data() {
        return {
        };
    },
    mounted() {
        document.getElementById('loading-bg-transparent').style.display = 'none';
        // document.getElementById('loading-bg-transparent-title').innerText = 'Cooking up';
    },
    created() {
    },
    methods: {
        async handleAcceptAllRequest() {
            try {
                document.getElementById('loading-bg-transparent-title').innerText = 'Waiting for transaction';
                document.getElementById('loading-bg-transparent').style.display = 'flex';
                const payload = {
                    cast_id: this.castDetails.public_meeting_id,
                    user_requests: [],
                }
                const _eventIds = [];
                const _to = [];
                const _accessLevels = [];
                const _amounts = [];
                for (let i = 0; i < this.pendingRequest.length; i++) {
                    if (this.pendingRequest[i].isReqAccepted) {
                        _eventIds.push(this.castDetails.public_meeting_id);
                        _to.push(this.pendingRequest[i].wallet_address);
                        _accessLevels.push(this.pendingRequest[i].role);
                        _amounts.push("1");
                        payload.user_requests.push({
                            email: this.pendingRequest[i].email,
                            isReqAccepted: 'True',
                            isReqRejected: 'False',
                        })
                    }
                }
                if (_to.length <= 0) {
                    document.getElementById('loading-bg-transparent-title').innerText = 'Loading';
                    document.getElementById('loading-bg-transparent').style.display = 'none';
                    this.$vs.notify({
                        title: 'Operation failed',
                        text: 'Please check atleast one request!',
                        color: 'danger',
                    });
                    return;
                }
                const response = await tokenContractWithSigner.setMintingApproval(_eventIds, _to, _accessLevels, _amounts);
                document.getElementById('loading-bg-transparent-title').innerText = 'Processing transaction';
                const receipt = await response.wait();
                document.getElementById('loading-bg-transparent-title').innerText = 'Transaction confirmed✔️ finishing up';
                if (receipt.transactionHash) {
                    fetch(`https://api.cast.decast.live/api/nft/gating/admin/update/`, {
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
                        this.getAllRequests(this.castDetails.public_meeting_id);
                        return response.json();
                    }).then(result => {
                        document.getElementById('loading-bg-transparent').style.display = 'none';
                        this.closeModal();
                        this.$vs.notify({
                            title: 'Request Accepted',
                            text: '',
                            color: 'success',
                        });
                    }).catch(error => {
                        document.getElementById('loading-bg-transparent').style.display = 'none';
                        this.$vs.notify({
                            title: 'Operation failed',
                            text: 'Failed to accept request, please try again later!',
                            color: 'danger',
                        });
                    });
                } else {
                    document.getElementById('loading-bg-transparent').style.display = 'none';
                    this.$vs.notify({
                        title: 'Something went wrong!',
                        text: 'Operation cancelled, please try again later',
                        color: 'danger',
                    });
                }
            } catch (error) {
                document.getElementById('loading-bg-transparent').style.display = 'none';
                this.$vs.notify({
                    title: 'Something went wrong!',
                    text: 'Operation cancelled, please try again later',
                    color: 'danger',
                });
            }
        },
        // Can be used as per requirement
        // handleRejectRequest(requestedEmail) {
        //     const payload = {
        //         cast_id: this.castDetails.public_meeting_id,
        //         email: requestedEmail,
        //         isReqAccepted: 'True',
        //         isReqRejected: 'True',
        //     }
        //     fetch(`https://api.cast.decast.live/api/nft/gating/admin/update/`, {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        //         },
        //         body: JSON.stringify(payload),
        //     }).then(response => {
        //         if (!response.ok) {
        //             throw new Error('Network response was not ok ' + response.statusText);
        //         }
        //         this.getAllRequests(this.castDetails.public_meeting_id);
        //         return response.json();
        //     }).then(result => {
        //         this.$vs.notify({
        //             title: 'Rejected Successfully',
        //             text: '',
        //             color: 'success',
        //         });
        //     }).catch(error => {
        //         this.$vs.notify({
        //             title: 'Operation failed',
        //             text: 'Failed to reject, please try again later!',
        //             color: 'danger',
        //         });
        //     });
        // }
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

.table-heading-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #FFFFFF;
    margin-top: 10px;
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

.table-content-wrapper p {
    color: #FFFFFF;
}

.table-head-col1 {
    flex: 0.25;
}

.table-head-col2 {
    flex: 0.25;
}

.table-head-col3 {
    flex: 0.25;
}

.table-head-col4 {
    flex: 0.25;
}

.table-head-col1,
.table-head-col2,
.table-head-col3,
.table-head-col4 {
    display: flex;
    align-items: center;
    padding: 5px 10px;
    background-color: #FFFFFF;
    color: #000000;
    font-weight: 600;
}

.table-content-col1 {
    flex: 0.25;
}

.table-content-col2 {
    flex: 0.25;
}

.table-content-col3 {
    flex: 0.25;
}

.table-content-col4 {
    flex: 0.25;
    transition: 0.2s color ease;
    cursor: pointer;
}

.table-content-col4:hover {
    color: #D7DF23;
}

.table-content-col1,
.table-content-col2,
.table-content-col3,
.table-content-col4 {
    overflow-wrap: anywhere;
    display: flex;
    align-items: center;
    padding: 5px 10px;
    color: #FFFFFF;
}

.modal-content-wrapper {
    height: 50vh;
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