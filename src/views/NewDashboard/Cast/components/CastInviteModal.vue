<template>
    <BaseModal :title="'Cast types'" @close="closeModal">
        <template #modalContent>
            <div class="modal-content-wrapper">
                <div class="modal-content">
                    <div class="modal-heading">
                        <h3>Cast Created Successfully</h3>
                    </div>
                    <p @click="copyCastLink">Share Cast</p>
                    <p id="cast-link">Loading</p>
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

export default {
    name: 'CastInviteModal',
    props: ['closeModal'],
    components: {
        BaseModal,
    },
    data() {
        return {
        };
    },
    mounted() {
        // var element = document.getElementById("cast-link");
        // if (element) {
        //     element.textContent = this.getCastLink();
        // } else {
        //     console.log("Element not found.");
        // }
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
    },
}
</script>

<style scoped>
.modal-content-wrapper {
    height: 70vh;
    width: 60vw;
}
</style>