<template>
    <BaseModal :title="'NFT Gating'" @close="closeModal">
        <template #modalContent>
            <div class="modal-content-wrapper">
                <div class="modal-content">
                    <div class="modal-heading-success">
                        <h3>🎉Hurray! Cast Updated</h3>
                    </div>
                    <div class="flex flex-col w-full items-start justify-start gap-6 mb-16">
                        <p class="collect-em-label">/* Your cast has been successfully NFT Gated.</br>
                            You can now customize your cast page by clicking the button below. */<br /></p>
                        <div class="cast-modal-bottom">
                            <p>✔️ <span>Customize cast branding</span></p>
                            <p>✔️ <span>Manage payable token</span></p>
                        </div>
                        <div>
                            <vs-button class="mt-8" type="border" @click="openNFTGatingCastPage"> >>go to cast
                                page</vs-button>
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
import BaseModal from "@/components/common/BaseModal.vue";

export default {
    name: 'CreateSucessModal',
    props: ['closeModal', 'castDetails'],
    components: {
        BaseModal,
    },
    data() {
        return {
        };
    },
    mounted() {
    },
    created() {
    },
    methods: {
        openNFTGatingCastPage() {
            const url = `https://decast.live/cast/nft-gated/${this.castDetails.public_meeting_id}`;
            window.open(url, '_blank');
        },
    },
}
</script>

<style scoped>
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

.modal-heading-success {
    padding: 5px 0px;
}

.modal-heading-success h3 {
    font-size: 22px;
    color: #FFFFFF;
    line-height: unset;
}
</style>