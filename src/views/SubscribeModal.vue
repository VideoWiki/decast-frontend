<template>
    <BaseModal :title="'decast.Subscribe()'" @close="closeModal">
        <template #modalContent>
            <div class="modal-content-wrapper">
                <div class="modal-content">
                    <div class="basic_folder_cont__">
                        <div class="max-w-4xl w-full flex flex-col gap-16 justify-start items-center m-auto">
                            <div class="flex lg:flex-row flex-col items-center justify-between gap-16 w-full">

                                <div class="w-full flex flex-col gap-4">
                                    <div class="basic_event_cont_ flex flex-col gap-4 p-8">
                                        <h1 class="text-white font-bold text-4xl">Subscribe to Decast.live</h1>
                                        <p class="text-lg mt-4" style="color:#22c55e;">/* Stay upto date with the latest <br /> releases and reward drops */</p>
                                        <div class="flex flex-col gap-4 mt-4">
                                            <input
                                                class="outline-none border-none bg-white p-2 w-2/5 font-semibold text-lg"
                                                type="email" placeholder="//email" v-model="formData.email" />
                                            <vs-button class="button-primary-filled" @click="sendMessage">
                                                /subscribe()
                                            </vs-button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex justify-end items-end h-full w-full opacity-100 transition-all absolute bottom-0 right-0"
                    style="z-index: -1;">
                    <img class="flex justify-center items-center w-full object-contain"
                        src="@/assets/images/homepage/subscribe.svg" />
                </div>
                <!-- <div class="cast-modal-bottom">
                    <p>>> Estimated time to setup > <span>5mins - 7mins</span></p>
                </div> -->
            </div>
        </template>
    </BaseModal>
</template>

<script>
import BaseModal from "@/components/common/BaseModal.vue";
import axios from '../axios';
import constants from '../../constant';

export default {
    name: 'SubscribeModal',
    props: ['closeModal', 'setActiveModal'],
    components: {
        BaseModal,
    },
    data() {
        return {
            formData: {
                email: '',
            },
        };
    },
    methods: {
        async handleConfirmSettings() {
            this.setActiveModal('');
        },
        async sendMessage() {
            if (
                !this.formData.email
            ) {
                this.$vs.notify({
                    title: 'Error',
                    text: 'Basic fields are mandatory',
                    color: 'danger',
                });
                return;
            }
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(this.formData.email)) {
                this.$vs.notify({
                    title: 'Error',
                    text: 'Incorrect email',
                    color: 'danger',
                });
                return;
            }
            try {
                const response = await axios.post(
                    constants.apiCastUrl + "/api/contact_us/",
                    this.formData
                );
                this.$vs.notify({
                    title: 'Successful',
                    text: 'Subscription added!',
                    color: 'success',
                });
                this.closeModal();
            } catch (error) {
                this.$vs.notify({
                    title: 'Error',
                    text: 'Try again',
                    color: 'danger',
                });
                console.error('Error sending message:', error);
            }
        },
    }
}
</script>

<style scoped>
.collect-em-label {
    color: #5B96EB !important;
}
</style>