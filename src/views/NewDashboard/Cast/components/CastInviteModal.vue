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
                    <p class="copy-cast-button mt-4" @click="copyCastLink">Share Cast<CopyIcon class="ml-2"/></p>
                    <p class="mt-2 mb-4">{{ castUrl }}</p>
                    <vs-button class="mt-8" type="border">>>skip</vs-button>
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
    props: ['closeModal'],
    components: {
        BaseModal,
        CopyIcon,
    },
    data() {
        return {
            castUrl: 'loading...',
        };
    },
    mounted() {
        this.getCastList();
    },
    computed: {
        castInfoList() {
            return this.$store.state.cast.casts;
        },
    },
    methods: {
        getCastLink() {
            const castInfoList = this.castInfoList;
            console.log(castInfoList)
            if (castInfoList && castInfoList.length > 0) {
                const firstCast = castInfoList[0];
                const id = firstCast.public_meeting_id;
                const pass = firstCast.h_ap;
                const link = `https://decast.live/join-cast/${id}/?pass=${pass}`;
                return link;
            }
        },
        copyCastLink() {
            const castLink = this.getCastLink();
            navigator.clipboard
                .writeText(castLink)
                .then(() => {
                    console.log('Link copied:', castLink);
                })
                .catch((error) => {
                    console.error('Copy failed:', error);
                });
        },
        getCastList() {
            this.$store
                .dispatch('cast/getCastList')
                .then((response) => {
                    this.castUrl = this.getCastLink();
                })
                .catch((error) => {
                    // Handle API request error here
                    console.error(error);
                });
        },
    },
}
</script>

<style scoped>
.invite-action-button > * {
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