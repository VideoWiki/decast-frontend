<template>
    <BaseModal :title="'Basic Details'" @close="closeModal">
        <template #modalContent>
            <div class="modal-content-wrapper">
                <div class="modal-content">
                    <div class="modal-heading">
                        <h3>NFT</h3>
                    </div>
                    <vs-button class="mt-8" type="border">>>confirm</vs-button>
                </div>
                <div class="cast-modal-bottom">
                    <p>>> Estimated time to setup > <span>5mins - 7mins</span></p>
                </div>
            </div>
        </template>
    </BaseModal>
</template>

<script>
import BaseModal from "@/components/common/BaseModal.vue";

export default {
    name: 'CreateNftModal',
    props: ['closeModal'],
    components: {
        BaseModal,
    },
    data() {
        return {
        };
    },
    methods: {
    },
}
</script>

<style scoped>
</style>