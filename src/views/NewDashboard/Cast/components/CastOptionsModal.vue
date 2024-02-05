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
                            <div class="grid-item" @click="setActiveModal('nftDropModal')">NFT/Token <br>Drop</div>
                            <div class="grid-item" @click="setActiveModal('')">Manage <br>Audience</div>
                            <div class="grid-item" @click="setActiveModal('')">Live <br>Streaming</div>
                            <div class="grid-item" @click="setActiveModal('editCastSchedule')">Setup <br>Details</div>
                            <div class="grid-item" @click="setActiveModal('')">Basic <br>Details</div>
                            <div class="grid-item" @click="setActiveModal('')">Branding <br>Details</div>
                            <div class="grid-item" @click="setActiveModal('')">Advanced <br>Details</div>
                            <div class="grid-item" @click="setActiveModal('')">Postpone <br>Cast</div>
                            <div class="grid-item danger-button" @click="setActiveModal('deleteCastModal')">Delete <br>Cast</div>
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
}
</style>