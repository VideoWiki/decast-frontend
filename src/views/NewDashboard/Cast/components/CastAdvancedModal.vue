<template>
    <BaseModal :title="'Advanced Settings'" @close="closeModal">
        <template #modalContent>
            <div class="modal-content-wrapper">
                <div class="modal-content">
                    <div class="cast-sc-detail">
                        <p>>> Date > <span>{{ stepOneProps.startD }}</span></p>
                        <p>>> Duration > <span>{{ stepTwoProps.duration / 60 }} Hours</span></p>
                        <p>>> Time Zone > <span>{{ stepOneProps.timezone }}</span></p>
                        <p>>> Start Time > <span>{{ stepOneProps.startTime }}</span></p>
                        <p>>> Name > <span>{{ stepOneProps.event_name }}</span></p>
                        <p>>> Description > <span>'{{ stepOneProps.description }}'</span></p>
                        <p>>> Access Restriction > <span>{{ stepOneProps.auth_type }}</span></p>
                        <p>>> Logo > <span>{{ stepTwoProps.logo }}</span></p>
                        <p>>> Cover Image > <span>{{ stepTwoProps.cover_image }}</span></p>
                        <p>>> Brand Colors > <span>{{ stepTwoProps.primary_color }}</span></p>
                    </div>
                    <div class="modal-heading">
                        <h3>4.Advanced Settings (Optional)</h3>
                    </div>
                    <div class="flex flex-col mt-8">
                        <p class="collect-em-label">//Collect all attendees emails</p>
                        <span>collectEmails()</span>
                        <div class="flex flex-col mt-2">
                            <button class="custm-toggle mb-1" 
                                v-bind:style="stepOneProps.auth_type === 'public' ? 'backgroundColor: #FFFFFF; color: #000000' : 'backgroundColor: #000000; color: #FFFFFF'">true</button>
                            <button class="custm-toggle"
                                v-bind:style="stepOneProps.auth_type === 'public' ? 'backgroundColor: #000000; color: #FFFFFF' : 'backgroundColor: #FFFFFF; color: #000000'">false</button>
                        </div>
                    </div>
                    <vs-button class="mt-8" type="border">>>create</vs-button>
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
    name: 'CastAdvancedModal',
    props: ['closeModal', 'stepOneProps', 'stepTwoProps'],
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