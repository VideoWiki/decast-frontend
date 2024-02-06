<template>
    <BaseModal :title="'Streaming'" @close="closeModal">
        <template #modalContent>
            <div class="modal-content-wrapper">
                <div class="modal-content">
                    <div class="modal-heading">
                        <h3>Live Streaming Settings</h3>
                    </div>
                    <div class="flex flex-col mt-8">
                        <div><p>Youtube</p></div>
                        <div><p>Facebook</p></div>
                        <div><p>Twitch</p></div>
                    </div>
                    <div class="flex flex-col mt-8 w-3/4">
                        <p class="collect-em-label">//For streaming the event on VideoWiki, choose this option and you will receive the stream page address in your email.</p>
                        <span>videowikiStreaming()</span>
                        <div class="flex flex-col mt-2">
                            <button class="custm-toggle mb-1" @click="() => {}"
                                v-bind:style="true ? 'backgroundColor: #FFFFFF; color: #000000' : 'backgroundColor: #000000; color: #FFFFFF'">true</button>
                            <button class="custm-toggle" @click="() => {}"
                                v-bind:style="true ? 'backgroundColor: #000000; color: #FFFFFF' : 'backgroundColor: #FFFFFF; color: #000000'">false</button>
                        </div>
                    </div>
                    <vs-button class="mt-8" type="border" @click="() => {}">>>confirm</vs-button>
                </div>
                <div class="cast-modal-bottom">
                    <p>>> Live Streaming Settings > <span></span></p>
                </div>
            </div>
        </template>
    </BaseModal>
</template>

<script>
import BaseModal from "@/components/common/BaseModal.vue";

export default {
    name: 'LiveStreamModal',
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
.custm-toggle {
    padding: 0.30rem 0.75rem !important;
    border: 1px solid #FFFFFF;
    outline: none;
    cursor: pointer;
    width: fit-content;
}

.collect-em-label {
    color: #5B96EB !important;
}
</style>