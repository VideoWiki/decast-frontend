<template>
    <BaseModal :title="'Cast options'" @close="closeModal">
        <template #modalContent>
            <div class="modal-content-wrapper">
                <div class="modal-content">
                    <div class="modal-heading">
                        <h3>Cast Options : Select the below actions</h3>
                    </div>
                    <div class="flex justify-center items-center mt-16">
                        <div class="grid-container">
                            <div class="grid-item" v-if="castDetails.nft_details_submitted"
                                @click="setActiveModal('editNftDropModal')">Edit NFT/Token <br>Drop</div>
                            <div class="grid-item" v-else @click="setActiveModal('nftDropModal')">NFT/Token <br>Drop</div>

                            <div v-if="castDetails.isNftGated" class="grid-item" @click="setActiveModal('createNFTGating')">Edit NFT <br>Gating</div>
                            <div v-else class="grid-item" @click="setActiveModal('createNFTGating')">NFT <br>Gating</div>

                            <div class="grid-item" @click="setActiveModal('customCastUrl')" v-if="castDetails.cast_type === 'public' && !castDetails.isNftGated">Custom <br>Cast Url</div>
                            <div class="grid-item" @click="setActiveModal('manageAudienceModal')">Manage <br>Audience</div>
                            <div class="grid-item" @click="setActiveModal('liveStreamModal')">Live <br>Streaming</div>

                            <div class="grid-item" @click="setActiveModal('editPostponeDetail')" v-if="inviteeList.length>0">Postpone <br>Cast</div>
                            <div class="grid-item" @click="setActiveModal('editSetupDetail')" v-else>Edit Setup <br>Details</div>

                            <div class="grid-item" @click="setActiveModal('editBasicDetail')">Edit Basic <br>Details</div>
                            <div class="grid-item" @click="setActiveModal('editBrandingDetail')">Edit Branding <br>Details
                            </div>
                            <div class="grid-item" @click="setActiveModal('editAdvanceDetail')">Edit Advanced <br>Details
                            </div>
                            <div class="grid-item danger-button" @click="setActiveModal('deleteCastModal')">Delete <br>Cast
                            </div>
                        </div>
                    </div>
                </div>
                <div class="cast-modal-bottom">
                    <p>>> Manage Audience > <span></span></p>
                </div>
            </div>
        </template>
    </BaseModal>
</template>

<script>
import BaseModal from "@/components/common/BaseModal.vue";

export default {
    name: 'CastOptionsModal',
    props: ['closeModal', 'setActiveModal', 'castDetails'],
    components: {
        BaseModal,
    },
    data() {
        return {
            inviteeList: [],
        };
    },
    methods: {
        userDetails() {
            this.$vs.loading();
            const payload = { cast_id: this.castDetails.public_meeting_id };
            this.$store
                .dispatch('studio/inviteeDetails', payload)
                .then(async (res) => {
                    this.inviteeList = await res.data.data;
                    this.$vs.loading.close();
                })
                .catch(() => {
                    this.$vs.loading.close();
                });
        },
    },
    mounted() {
        this.userDetails();
    }
}
</script>

<style scoped>
.grid-container {
    display: grid;
    column-gap: 20px;
    row-gap: 20px;
    grid-template-columns: repeat(3, 1fr);
}

.grid-item {
    height: 80px;
    width: 110px;
    border: 1px solid #FFFFFF;
    padding: 4px 8px;
    cursor: pointer;
}

.grid-item:hover {
    border: 1px solid #D7DF23;
}

.danger-button {
    border: 1px solid #EF4444 !important;
    color: #EF4444 !important;
}</style>