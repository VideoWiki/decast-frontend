<template>
    <BaseModal :title="'Cast types'" @close="closeModal">
        <template #modalContent>
            <div class="modal-content-wrapper">
                <div class="modal-content">
                    <div class="modal-heading">
                        <h3>Cast Created Successfully</h3>
                    </div>
                    <div class="flex invite-action-button">
                        <div>
                            <p>Add NFT Drops</p>
                        </div>
                        <div>
                            <p>Invite Audience</p>
                        </div>
                    </div>
                    <p v-if="inviteData.type !== 'private'" class="copy-cast-button mt-4" @click="copyCoHostLink">Share Cast
                        to Co-Host
                        <CopyIcon class="ml-2" />
                    </p>
                    <p v-if="inviteData.type !== 'private'" class="mt-2 mb-4">https://decast.live/join-cast/{{ inviteData.meeting_id }}/?pass={{ inviteData.h_mp
                    }}</p>
                    <p v-if="inviteData.type !== 'private'" class="copy-cast-button mt-4" @click="copyParticipantLink">Share Cast to Participant
                        <CopyIcon class="ml-2" />
                    </p>
                    <p v-if="inviteData.type !== 'private'" class="mt-2 mb-4">https://decast.live/join-cast/{{ inviteData.meeting_id }}/?pass={{ inviteData.h_ap
                    }}</p>
                    <p v-if="inviteData.type !== 'private' && inviteData.viewer_mode" class="copy-cast-button mt-4" @click="copyViewerLink">Share Cast to
                        Viewer
                        <CopyIcon class="ml-2" />
                    </p>
                    <p v-if="inviteData.type !== 'private' && inviteData.viewer_mode" class="mt-2 mb-4">https://decast.live/join-cast/{{
                        inviteData.meeting_id }}/?pass={{ inviteData.h_vp }}</p>

                    <p v-if="inviteData.type === 'private'" class="copy-cast-button mt-4">Great! Now you can invite the other audience from the above action...</p>
                    <vs-button class="mt-8" type="border" @click="closeModal">>>skip</vs-button>
                </div>
                <div class="cast-modal-bottom">
                    <p>>> Cast Created > <span>🎉You can still upgrade your cast settings later</span></p>
                </div>
            </div>
        </template>
    </BaseModal>
</template>

<script>
import BaseModal from "@/components/common/BaseModal.vue";
import CopyIcon from "@/assets/svgs/button-icons/CopyIcon.vue"

export default {
    name: 'CastInviteModal',
    props: ['closeModal', 'inviteData'],
    components: {
        BaseModal,
        CopyIcon,
    },
    data() {
        return {
        };
    },
    methods: {
        copyCoHostLink() {
            navigator.clipboard
                .writeText(`https://decast.live/join-cast/${this.inviteData.meeting_id}/?pass=${this.inviteData.h_mp}`)
                .then(() => {
                    console.log('Link copied');
                })
                .catch((error) => {
                    console.error('Copy failed:', error);
                });
        },
        copyParticipantLink() {
            navigator.clipboard
                .writeText(`https://decast.live/join-cast/${this.inviteData.meeting_id}/?pass=${this.inviteData.h_ap}`)
                .then(() => {
                    console.log('Link copied');
                })
                .catch((error) => {
                    console.error('Copy failed:', error);
                });
        },
        copyViewerLink() {
            navigator.clipboard
                .writeText(`https://decast.live/join-cast/${this.inviteData.meeting_id}/?pass=${this.inviteData.h_vp}`)
                .then(() => {
                    console.log('Link copied');
                })
                .catch((error) => {
                    console.error('Copy failed:', error);
                });
        },
        // getCastLink() {
        //     const castInfoList = this.castInfoList;
        //     console.log(castInfoList)
        //     if (castInfoList && castInfoList.length > 0) {
        //         const firstCast = castInfoList[0];
        //         const id = firstCast.public_meeting_id;
        //         const pass = firstCast.h_ap;
        //         const link = `https://decast.live/join-cast/${id}/?pass=${pass}`;
        //         return link;
        //     }
        // },
        // copyCastLink() {
        //     const castLink = this.getCastLink();
        //     navigator.clipboard
        //         .writeText(castLink)
        //         .then(() => {
        //             console.log('Link copied:', castLink);
        //         })
        //         .catch((error) => {
        //             console.error('Copy failed:', error);
        //         });
        // },
        // getCastList() {
        //     this.$store
        //         .dispatch('cast/getCastList')
        //         .then((response) => {
        //             this.castUrl = this.getCastLink();
        //         })
        //         .catch((error) => {
        //             // Handle API request error here
        //             console.error(error);
        //         });
        // },
    },
}
</script>

<style scoped>
.invite-action-button>* {
    height: 100px;
    width: 100px;
    margin-top: 24px;
    margin-right: 10px;
    border: 1px solid #FFFFFF;
    padding: 4px 5px;
    cursor: pointer;
}

.copy-cast-button {
    color: #D7DF23;
    display: flex;
    align-items: center;
    cursor: pointer;
}
</style>