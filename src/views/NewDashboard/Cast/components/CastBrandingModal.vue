<template>
    <BaseModal :title="'Cast types'" @close="closeModal">
        <template #modalContent>
            <div class="modal-content-wrapper"></div>
            <h1>Cast Branding Here</h1>
        </template>
    </BaseModal>
</template>

<script>
import BaseModal from "@/components/common/BaseModal.vue";

export default {
    name: 'CastBrandingModal',
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