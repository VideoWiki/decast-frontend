<template>
    <BaseModal :title="'Cast options'" @close="closeModal">
        <template #modalContent>
            <div class="modal-content-wrapper"></div>
            <h1>Cast MOdal Here</h1>
        </template>
    </BaseModal>
</template>

<script>
import BaseModal from "@/components/common/BaseModal.vue";

export default {
    name: 'CastOptionsModal',
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
</style>