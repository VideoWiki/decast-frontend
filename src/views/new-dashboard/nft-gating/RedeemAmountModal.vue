<template>
    <BaseModal :title="'Redeem Collected Amount'" @close="closeModal">
        <template #modalContent>
            <div class="modal-content-wrapper">
                <div v-if="accessToken" class="modal-content">
                    <div class="modal-heading-success">
                        <!-- <h3>Request with:</h3> -->
                    </div>
                    <div class="flex flex-col w-full items-start justify-start gap-6 mb-16">
                        <div class="cast-modal-bottom">
                            <p>Total Collected Amount: <span class="collect-em-label">{{ collectedAmount }} Eth</span>
                            </p>
                        </div>
                        <div>
                            <vs-button class="mt-8" type="border" @click="handleRedeemAmount">
                                >>redeem.now</vs-button>
                        </div>
                    </div>
                </div>
                <div class="cast-modal-bottom">
                    <p>>> Cast > <span>Redeem Amount</span></p>
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
    name: 'RedeemAmountModal',
    props: ['closeModal', 'castDetails', 'collectedAmount', 'getCollectedAmount'],
    components: {
        BaseModal,
    },
    data() {
        return {
        };
    },
    mounted() {
        document.getElementById('loading-bg-transparent').style.display = 'none';
    },
    created() {
    },
    methods: {
        async handleRedeemAmount() {
            document.getElementById('loading-bg-transparent-title').innerText = 'Preparing to transfer amount';
            document.getElementById('loading-bg-transparent').style.display = 'flex';
            try {
                const tx = await tokenContractWithSigner.withdrawCollectedAmountForEventId(this.castDetails.public_meeting_id)
                document.getElementById('loading-bg-transparent-title').innerText = 'Transfering amount to your wallet';
                const receipt = await tx.wait();
                document.getElementById('loading-bg-transparent-title').innerText = 'Amount transfer finished✔️';
                if (receipt.transactionHash) {
                    this.getCollectedAmount();
                    this.$vs.notify({
                        title: 'Hurray!🎉',
                        text: 'Amount Redeemed successfully!',
                        color: 'success',
                    });
                    document.getElementById('loading-bg-transparent').style.display = 'none';
                }
            } catch (error) {
                console.error('Error Redeem Amount');
                document.getElementById('loading-bg-transparent').style.display = 'none';
                this.$vs.notify({
                    title: 'Something went wrong!',
                    text: 'Operation failed, please try again later',
                    color: 'danger',
                });
            }
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