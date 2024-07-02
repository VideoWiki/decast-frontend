<template>
    <BaseModal :title="'NFT Gating Audience'" @close="closeModal">
        <template #modalContent>
            <div class="modal-content-wrapper">
                <div v-if="accessToken" class="modal-content">
                    <div class="modal-heading-success">
                        <h3>Total Audience ({{ allAudience.length }})</h3>
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
                            </div>
                            <div class="table-content-wrapper">
                                <p class="mt-8" v-if="isLoading">Loading...</p>
                                <p class="mt-8" v-else-if="allAudience.length<=0">No Audience</p>
                                <div v-else class="table-content-row" v-for="(audience, index) in allAudience"
                                    v-if="audience.email !== activeUserInfo.email" :key="index">
                                    <div class="table-content-col1">
                                        <span v-if="audience.name === ''">
                                            -
                                        </span>
                                        <span v-else>
                                            {{ audience.name }}
                                        </span>
                                    </div>
                                    <div class="table-content-col2">
                                        <vx-tooltip v-if="audience.email.length > 17" :text="audience.wallet_address"
                                            position="top">
                                            <span>
                                                {{ audience.wallet_address.slice(0, 8) }}...{{
        audience.wallet_address.slice(audience.wallet_address.length - 5,
            audience.wallet_address.length) }}
                                            </span>
                                        </vx-tooltip>
                                        <span v-else>
                                            {{ audience.email }}
                                        </span>
                                    </div>
                                    <div class="table-content-col2">
                                        <span>
                                            {{ audience.wallet_address.slice(0, 8) }}...{{
        audience.wallet_address.slice(audience.wallet_address.length - 5,
                                            audience.wallet_address.length) }}
                                        </span>
                                    </div>
                                    <div class="table-content-col3">
                                        <span>
                                            {{ audience.role }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- <div>
                            <vs-button class="mt-8" type="border" @click="()=>{}">
                                >>request.accept</vs-button>
                        </div> -->
                    </div>
                </div>
                <div class="cast-modal-bottom">
                    <p>>> Cast > <span>This is the list of all audiences that purchased the tickets.</span></p>
                </div>
            </div>
        </template>
    </BaseModal>
</template>

<script>
import BaseModal from "@/components/common/BaseModal.vue";

export default {
    name: 'AllAudienceModal',
    props: ['closeModal',],
    components: {
        BaseModal,
    },
    data() {
        return {
            allAudience: [],
            isLoading: false,
        };
    },
    mounted() {
        document.getElementById('loading-bg-transparent').style.display = 'none';
        // document.getElementById('loading-bg-transparent-title').innerText = 'Cooking up';
        this.getAllAudience();
    },
    created() {
    },
    methods: {
        getAllAudience() {
            this.isLoading = true;
            fetch(`https://api.cast.decast.live/api/event/audience/list/?castId=${this.$route.params.castId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
            }).then(response => response.json())
                .then(data => {
                    this.allAudience = data.data;
                    this.isLoading = false;
                })
                .catch(error => {
                    this.isLoading = false;
                });
        },
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
.table-content-wrapper p{
    color: #FFFFFF;
}

.table-head-col1,
.table-head-col2,
.table-head-col3,
.table-head-col4 {
    flex: 0.25;
    display: flex;
    align-items: center;
    padding: 5px 10px;
    background-color: #FFFFFF;
    color: #000000;
    font-weight: 600;
}

.table-content-col1,
.table-content-col2,
.table-content-col3,
.table-content-col4 {
    flex: 0.25;
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