<template>
    <BaseModal :title="'Recording'" @close="closeModal">
        <template #modalContent>
            <div class="modal-content-wrapper">
                <div class="modal-content">
                    <div class="modal-heading">
                        <h3>Delete recording</h3>
                    </div>
                    <div class="flex flex-col mt-8">
                        <p class="collect-em-label">//Do you really want to delete this recording?</p>
                        <span>deleteRecording()</span>
                    </div>
                    <vs-button class="mt-8" type="border" v-if="isLoading">>>deleting...</vs-button>
                    <vs-button class="mt-8" type="border" v-else @click="handleDeleteRecording"
                        :disabled="nameError">>>delete</vs-button>
                </div>
                <div class="cast-modal-bottom">
                    <p>>> Delete recording > <span></span></p>
                </div>
            </div>
        </template>
    </BaseModal>
</template>

<script>
import axios from '@/axios';
import BaseModal from "@/components/common/BaseModal.vue";

export default {
    name: 'DeleteModal',
    props: ['closeModal', 'recording', 'getRecordings'],
    data() {
        return {
            isLoading: false,
            nameError: false,
            recordingName: this.recording.url.Name,
        };
    },
    components: {
        BaseModal
    },
    methods: {
        async handleDeleteRecording() {
            this.isLoading = true;
            const options = {
                method: 'DELETE',
                url: 'https://api.room.video.wiki/api/delete/user/recording/',
                data: {
                    public_meeting_id: this.recording.url['pub_id'],
                    recording_id: this.recording.url['Record ID'],
                },
            };
            try {
                await axios.request(options);
                await this.$store.dispatch('room/deleteRecording', this.recording.url['Record ID']);
                this.isLoading = false;
                this.closeModal();
            } catch (error) {
                this.isLoading = false;
                console.error(error);
            }
        },
    },
};
</script>

<style scoped>
.collect-em-label {
    color: #5B96EB !important;
}
</style>