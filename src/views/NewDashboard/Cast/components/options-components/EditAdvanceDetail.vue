<template>
    <BaseModal :title="'Advanced Settings'" @close="closeModal">
        <template #modalContent>
            <div class="modal-content-wrapper">
                <div class="modal-content">
                    <div class="modal-heading">
                        <h3>Edit Advanced Details</h3>
                    </div>

                    <div class="flex flex-col mt-8 w-3/4">
                        <p class="collect-em-label">//Collect all attendees emails</p>
                        <span>collectEmails()</span>
                        <div class="flex flex-col mt-2">
                            <button class="custm-toggle mb-1" @click="() => stepOneProps.public_otp = true"
                                v-bind:style="stepOneProps.public_otp ? 'backgroundColor: #FFFFFF; color: #000000' : 'backgroundColor: #000000; color: #FFFFFF'">true</button>
                            <button class="custm-toggle" @click="() => stepOneProps.public_otp = false"
                                v-bind:style="stepOneProps.public_otp ? 'backgroundColor: #000000; color: #FFFFFF' : 'backgroundColor: #FFFFFF; color: #000000'">false</button>
                        </div>
                    </div>

                    <div class="flex flex-col mt-8 w-3/4">
                        <p class="collect-em-label">//Allow the recording of the session. Recording can be paused and
                            restarted multiple times.</p>
                        <span>recording()</span>
                        <div class="flex flex-col mt-2">
                            <button class="custm-toggle mb-1" @click="() => stepFourProps.start_stop_recording = true"
                                v-bind:style="stepFourProps.start_stop_recording ? 'backgroundColor: #FFFFFF; color: #000000' : 'backgroundColor: #000000; color: #FFFFFF'">true</button>
                            <button class="custm-toggle" @click="() => stepFourProps.start_stop_recording = false"
                                v-bind:style="stepFourProps.start_stop_recording ? 'backgroundColor: #000000; color: #FFFFFF' : 'backgroundColor: #FFFFFF; color: #000000'">false</button>
                        </div>
                    </div>

                    <div class="flex flex-col mt-8 w-3/4">
                        <p class="collect-em-label">//The event will automatically be recorded when it starts.</p>
                        <span>autoRecording()</span>
                        <div class="flex flex-col mt-2">
                            <button class="custm-toggle mb-1" @click="() => stepFourProps.record = true"
                                v-bind:style="stepFourProps.record ? 'backgroundColor: #FFFFFF; color: #000000' : 'backgroundColor: #000000; color: #FFFFFF'">true</button>
                            <button class="custm-toggle" @click="() => stepFourProps.record = false"
                                v-bind:style="stepFourProps.record ? 'backgroundColor: #000000; color: #FFFFFF' : 'backgroundColor: #FFFFFF; color: #000000'">false</button>
                        </div>
                    </div>

                    <div class="flex flex-col mt-8 w-3/4">
                        <p class="collect-em-label">//Moderators will be able to unmute users.</p>
                        <span>allowModUmute()</span>
                        <div class="flex flex-col mt-2">
                            <button class="custm-toggle mb-1"
                                @click="() => stepFourProps.allow_moderator_to_unmute_user = true"
                                v-bind:style="stepFourProps.allow_moderator_to_unmute_user ? 'backgroundColor: #FFFFFF; color: #000000' : 'backgroundColor: #000000; color: #FFFFFF'">true</button>
                            <button class="custm-toggle" @click="() => stepFourProps.allow_moderator_to_unmute_user = false"
                                v-bind:style="stepFourProps.allow_moderator_to_unmute_user ? 'backgroundColor: #000000; color: #FFFFFF' : 'backgroundColor: #FFFFFF; color: #000000'">false</button>
                        </div>
                    </div>

                    <div class="flex flex-col mt-8 w-3/4">
                        <p class="collect-em-label">//Cast will end when all moderators leave.</p>
                        <span>noModEnd()</span>
                        <div class="flex flex-col mt-2">
                            <button class="custm-toggle mb-1" @click="() => stepFourProps.end_when_no_moderator = true"
                                v-bind:style="stepFourProps.end_when_no_moderator ? 'backgroundColor: #FFFFFF; color: #000000' : 'backgroundColor: #000000; color: #FFFFFF'">true</button>
                            <button class="custm-toggle" @click="() => stepFourProps.end_when_no_moderator = false"
                                v-bind:style="stepFourProps.end_when_no_moderator ? 'backgroundColor: #000000; color: #FFFFFF' : 'backgroundColor: #FFFFFF; color: #000000'">false</button>
                        </div>
                    </div>

                    <div class="flex flex-col mt-8 w-3/4">
                        <p class="collect-em-label">//Layout of the Cast is locked and cannot be changed.</p>
                        <span>lockLayout()</span>
                        <div class="flex flex-col mt-2">
                            <button class="custm-toggle mb-1" @click="() => stepFourProps.lock_layout = true"
                                v-bind:style="stepFourProps.lock_layout ? 'backgroundColor: #FFFFFF; color: #000000' : 'backgroundColor: #000000; color: #FFFFFF'">true</button>
                            <button class="custm-toggle" @click="() => stepFourProps.lock_layout = false"
                                v-bind:style="stepFourProps.lock_layout ? 'backgroundColor: #000000; color: #FFFFFF' : 'backgroundColor: #FFFFFF; color: #000000'">false</button>
                        </div>
                    </div>

                    <div class="modal-heading mt-8">
                        <h3>Participant Settings (Optional)</h3>
                    </div>

                    <div class="flex flex-col mt-8 w-3/4">
                        <p class="collect-em-label">//Attendees will be muted when they join the event.</p>
                        <span>muteOnStart()</span>
                        <div class="flex flex-col mt-2">
                            <button class="custm-toggle mb-1" @click="() => stepFourProps.mute_on_start = true"
                                v-bind:style="stepFourProps.mute_on_start ? 'backgroundColor: #FFFFFF; color: #000000' : 'backgroundColor: #000000; color: #FFFFFF'">true</button>
                            <button class="custm-toggle" @click="() => stepFourProps.mute_on_start = false"
                                v-bind:style="stepFourProps.mute_on_start ? 'backgroundColor: #000000; color: #FFFFFF' : 'backgroundColor: #FFFFFF; color: #000000'">false</button>
                        </div>
                    </div>

                    <div class="flex flex-col mt-8 w-3/4">
                        <p class="collect-em-label">//Attendees will not be allowed to enable their webcams.</p>
                        <span>modOnlyCam()</span>
                        <div class="flex flex-col mt-2">
                            <button class="custm-toggle mb-1" @click="() => stepFourProps.webcam_only_for_moderator = true"
                                v-bind:style="stepFourProps.webcam_only_for_moderator ? 'backgroundColor: #FFFFFF; color: #000000' : 'backgroundColor: #000000; color: #FFFFFF'">true</button>
                            <button class="custm-toggle" @click="() => stepFourProps.webcam_only_for_moderator = false"
                                v-bind:style="stepFourProps.webcam_only_for_moderator ? 'backgroundColor: #000000; color: #FFFFFF' : 'backgroundColor: #FFFFFF; color: #000000'">false</button>
                        </div>
                    </div>

                    <div class="flex flex-col mt-8 w-3/4">
                        <p class="collect-em-label">//Attendees will not be allowed to use their microphones.</p>
                        <span>disableMic()</span>
                        <div class="flex flex-col mt-2">
                            <button class="custm-toggle mb-1" @click="() => stepFourProps.disable_mic = true"
                                v-bind:style="stepFourProps.disable_mic ? 'backgroundColor: #FFFFFF; color: #000000' : 'backgroundColor: #000000; color: #FFFFFF'">true</button>
                            <button class="custm-toggle" @click="() => stepFourProps.disable_mic = false"
                                v-bind:style="stepFourProps.disable_mic ? 'backgroundColor: #000000; color: #FFFFFF' : 'backgroundColor: #FFFFFF; color: #000000'">false</button>
                        </div>
                    </div>

                    <div class="flex flex-col mt-8 w-3/4">
                        <p class="collect-em-label">//Switch this on to enable viewer mode. This mode only allows user to
                            view to the cast.</p>
                        <span>viewOnlyMode()</span>
                        <div class="flex flex-col mt-2">
                            <button class="custm-toggle mb-1" @click="() => stepFourProps.viewer_mode = true"
                                v-bind:style="stepFourProps.viewer_mode ? 'backgroundColor: #FFFFFF; color: #000000' : 'backgroundColor: #000000; color: #FFFFFF'">true</button>
                            <button class="custm-toggle" @click="() => stepFourProps.viewer_mode = false"
                                v-bind:style="stepFourProps.viewer_mode ? 'backgroundColor: #000000; color: #FFFFFF' : 'backgroundColor: #FFFFFF; color: #000000'">false</button>
                        </div>
                    </div>

                    <vs-button class="mt-8" type="border" @click="handleEditCast">>>save</vs-button>
                </div>
                <div class="cast-modal-bottom">
                    <p>>> Edit advanced details > <span></span></p>
                </div>
            </div>
        </template>
    </BaseModal>
</template>

<script>
import BaseModal from "@/components/common/BaseModal.vue";

export default {
    name: 'EditAdvanceDetail',
    props: ['closeModal', 'stepOneProps', 'stepFourProps', 'handleEditCast'],
    components: {
        BaseModal,
    },
    data() {
        return {
        };
    },
    methods: {
    }
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