<template>
    <BaseModal :title="'Recording'" @close="closeModal">
        <template #modalContent>
            <div class="modal-content-wrapper">
                <div class="modal-content">
                    <div class="modal-heading">
                        <h3>Rename recording</h3>
                    </div>
                    <div class="flex flex-col mt-8">
                        <span>recording.name</span>
                        <div>
                            <input class="w-2/5 p-2 mt-2" placeholder="e.g event recording" type="text"
                                v-model="recordingName" @keyup="nameError = recordingName === ''"/>
                            <p v-if="nameError" class="text-danger my-2 p-0">>> Recording name is required</p>
                        </div>
                    </div>
                    <vs-button class="mt-8" type="border" v-if="isLoading">>>updating...</vs-button>
                    <vs-button class="mt-8" type="border" v-else @click="handleRename" :disabled="nameError">>>rename</vs-button>
                </div>
                <div class="cast-modal-bottom">
                    <p>>> Rename recording > <span></span></p>
                </div>
            </div>
        </template>
    </BaseModal>
</template>

<script>
import BaseModal from "@/components/common/BaseModal.vue";

export default {
    name: 'RenameModal',
    props: ['closeModal', 'recording', 'getRecordings'],
    data() {
        return {
            isLoading: false,
            nameError: false,
            recordingName: this.recording.Name,
        };
    },
    components: {
        BaseModal
    },
    methods: {
        handleRename() {
            this.isLoading = true;
            this.$store
                .dispatch('cast/renameRecording', {
                    cast_id: this.recording['pub_id'],
                    recording_id: this.recording['Record ID'],
                    name: this.recordingName,
                })
                .then(async (res) => {
                    this.getRecordings();
                    this.isLoading = false;
                    this.closeModal();
                })
                .catch((e) => {
                    this.isLoading = false;
                    console.log(e.resonse);
                });
        },
    },
};
</script>
  
<style scoped>
</style>
  