<template>
    <BaseModal :title="'Cast details'" @close="closeModal">
        <template #modalContent>
            <div class="modal-content-wrapper"></div>
            <h1>Cast Detail Here</h1>
        </template>
    </BaseModal>
</template>

<script>
import BaseModal from "@/components/common/BaseModal.vue";

export default {
    name: 'CastDetailModal',
    props: ['closeModal'],
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
.modal-content-wrapper {
    height: 70vh;
    width: 60vw;
}
</style>