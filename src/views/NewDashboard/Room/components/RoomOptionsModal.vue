<template>
    <BaseModal :title="'Room options'" @close="closeModal">
        <template #modalContent>
            <div class="modal-content-wrapper">
                <div class="modal-content">
                    <div class="modal-heading">
                        <h3>Room Options : Select the below actions</h3>
                    </div>
                    <div class="flex justify-center items-center mt-16">
                        <div class="grid-container">
                            <div class="grid-item" @click="setActiveModal('shareRoomModal')">Share <br>Room</div>
                            <div class="grid-item" @click="setActiveModal('customRoomUrl')">Custom <br>Room URL</div>
                            <div class="grid-item danger-button" @click="setActiveModal('deleteRoomModal')">Delete <br>Room</div>
                        </div>
                    </div>
                </div>
                <div class="cast-modal-bottom">
                    <p>>> Share Room > <span></span></p>
                </div>
            </div>
        </template>
    </BaseModal>
</template>

<script>
import BaseModal from "@/components/common/BaseModal.vue";

export default {
    name: 'RoomOptionsModal',
    props: ['closeModal', 'setActiveModal'],
    components: {
        BaseModal,
    },
    data() {
        return {
        };
    },
}
</script>

<style scoped>
.grid-container {
    display: grid;
    column-gap: 20px;
    row-gap: 20px;
    grid-template-columns: repeat(2, 1fr);
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
}
</style>