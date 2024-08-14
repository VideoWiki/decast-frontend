<template>
    <BaseModal :title="'Room'" @close="closeModal">
        <template #modalContent>
            <div class="modal-content-wrapper">
                <div class="modal-content">
                    <div class="modal-heading">
                        <h3>Rename room</h3>
                    </div>
                    <div class="flex flex-col mt-8">
                        <span>room.name</span>
                        <div>
                            <input class="w-2/5 p-2 mt-2" placeholder="e.g event recording" type="text" v-model="roomName"
                                @keyup="nameError = roomName === ''" />
                            <p v-if="nameError" class="text-danger my-2 p-0">>> Room name is required</p>
                        </div>
                    </div>
                    <vs-button class="mt-8" type="border" v-if="isLoading">>>updating...</vs-button>
                    <vs-button class="mt-8" type="border" v-else @click="handleRename"
                        :disabled="nameError">>>rename</vs-button>
                </div>
                <div class="cast-modal-bottom">
                    <p>>> Rename room > <span></span></p>
                </div>
            </div>
        </template>
    </BaseModal>
</template>

<script>
import BaseModal from "@/components/common/BaseModal.vue";

export default {
    name: 'RenameRoomModal',
    props: ['closeModal', 'roomDetails', 'getRoomList'],
    data() {
        return {
            isLoading: false,
            nameError: false,
            roomName: this.roomDetails.room_name,
        };
    },
    components: {
        BaseModal
    },
    methods: {
        handleRename() {
            this.isLoading = true;
            this.$store
                .dispatch('room/renameRoom', {
                    room_id: this.roomDetails.room_id,
                    room_name: this.roomName,
                })
                .then(async (res) => {
                    this.getRoomList();
                    this.isLoading = false;
                })
                .catch((e) => {
                    this.isLoading = false;
                    //console.log(e.resonse);
                });
        },
    },
};
</script>
  
<style scoped></style>
  