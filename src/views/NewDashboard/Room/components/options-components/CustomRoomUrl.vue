<template>
    <BaseModal :title="'Room'" @close="closeModal">
        <template #modalContent>
            <div class="modal-content-wrapper">
                <div class="modal-content">
                    <div class="modal-heading">
                        <h3>Edit room code</h3>
                    </div>
                    <div class="flex flex-col mt-8">
                        <span>room.url</span>
                        <div class="flex items-center">
                            <p>https://decast.live/</p>
                            <input class="py-2 pr-4 mt" placeholder="custom_room_code" type="text" v-model="shortCode"
                                @keyup="fieldsError = shortCode === ''" />
                            <!-- <p v-if="nameError" class="text-danger my-2 p-0">>> Name is required</p> -->
                        </div>
                    </div>
                    <vs-button class="mt-8" type="border" v-if="isLoading">>>saving...</vs-button>
                    <vs-button class="mt-8" type="border" v-else @click="handleSaveUrl">>>save</vs-button>
                </div>
                <div class="cast-modal-bottom">
                    <p>>> Edit url > <span>Add your custom joining code</span></p>
                </div>
            </div>
        </template>
    </BaseModal>
</template>

<script>
import BaseModal from "@/components/common/BaseModal.vue";

export default {
    name: 'CustomRoomUrl',
    props: ['closeModal', 'room', 'getRoomList'],
    data() {
        return {
            isLoading: false,
            shortCode: this.room.short_code,
            fieldsError: false,
        };
    },
    components: {
        BaseModal,
    },
    methods: {
        handleSaveUrl() {
            if (this.fieldsError) {
                this.$vs.notify({
                    title: '😕',
                    text: "Fields can't be empty",
                    color: 'danger',
                });
                return;
            }
            this.$store.dispatch('room/changeShortCode', {
                short_code: this.room.short_code,
                new_custom_code: this.shortCode,
                cast_id: this.room.room_id,
            }).then(() => {
                this.$vs.notify({
                    title: 'Successful',
                    text: 'Room Url updated',
                    color: 'success',
                });
                this.getRoomList();
                this.closeModal();
            }).catch(error => {
                this.$vs.notify({
                    title: 'Error',
                    text: 'Shortcode is already in use, Please try different shortcode',
                    color: 'danger',
                });
            });
        }
    },
    mounted() {
    },
};
</script>
  
<style scoped></style>
  