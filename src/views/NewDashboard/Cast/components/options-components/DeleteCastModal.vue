<template>
    <BaseModal :title="'Alert !'" @close="closeModal">
        <template #modalContent>
            <div class="modal-content-wrapper">
                <div class="modal-content">
                    <div class="modal-heading">
                        <h3>Delete Cast - {{ castName }}</h3>
                    </div>
                    <div class="flex flex-col mt-8">
                        <p class="collect-em-label">//Do you really want to delete this cast?</p>
                        <span>deleteCast()</span>
                    </div>
                    <vs-button class="mt-8" type="border" @click="confirmDelete">>>confirm</vs-button>
                </div>
                <div class="cast-modal-bottom">
                    <p>>> Delete Cast > <span>All the data related with this will be erased</span></p>
                </div>
            </div>
        </template>
    </BaseModal>
</template>

<script>
import BaseModal from "@/components/common/BaseModal.vue";

export default {
    name: 'DeleteCastModal',
    props: ['closeModal', 'castName', 'confirmDelete'],
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
.collect-em-label {
    color: #5B96EB !important;
}
</style>