<template>
    <BaseModal :title="'Create new room'" @close="closeModal">
        <template #modalContent>
            <div class="modal-content-wrapper">
                <div class="modal-content">
                    <div class="modal-heading">
                        <h3>Create room</h3>
                    </div>
                    <div class="flex flex-col mt-8">
                        <span>room.name</span>
                        <div>
                            <input class="w-2/5 p-2 mt-2" placeholder="e.g my friend hang out" type="text"
                                v-model="roomName" />
                            <!-- <p v-if="nameError" class="text-danger my-2 p-0">>> Name is required</p> -->
                        </div>
                    </div>
                    <vs-button class="mt-8" type="border" v-if="isLoading">>>creating room...</vs-button>
                    <vs-button class="mt-8" type="border" v-else @click="createRoom">>>create</vs-button>
                </div>
                <div class="cast-modal-bottom">
                    <p>>> Decast room > <span>👨‍💻Start instant meeting in one click</span></p>
                </div>
            </div>
        </template>
    </BaseModal>
</template>

<script>
import BaseModal from "@/components/common/BaseModal.vue";

export default {
    name: 'CreateRoomModal',
    props: ['closeModal'],
    data() {
        return {
            isLoading: false,
            roomName: '',
        };
    },
    components: {
        BaseModal
    },
    computed: {
    },
    methods: {
        createRoom() {
            this.isLoading = true;
            const board_id = localStorage.getItem("LOG_BOARDID");
            this.$store
                .dispatch('room/addRoom', {room_name: this.roomName, board_id: board_id})
                .then(async (res) => {
                    this.isLoading = false;
                    this.closeModal();
                })
                .catch((e) => {
                    this.isLoading = false;
                    //console.log(e.resonse);
                });
        },
    },
    mounted() {
    },
};
</script>
  
<style scoped>
</style>
  