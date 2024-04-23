<template>
    <BaseModal :title="'Basic Details'" @close="closeModal">
        <template #modalContent>
            <div class="modal-content-wrapper">
                <div class="modal-content">
                    <div class="cast-sc-detail">
                        <p>>> Date > <span>{{ stepOneProps.startD }}</span></p>
                        <p>>> Duration > <span>{{ stepTwoProps.duration / 60 }} Hours</span></p>
                        <p>>> Time Zone > <span>{{ stepOneProps.timezone }}</span></p>
                        <p>>> Start Time > <span>{{ stepOneProps.startTime }}</span></p>
                    </div>
                    <div class="modal-heading">
                        <h3>2.Basic Details</h3>
                    </div>
                    <div class="flex flex-col mt-8">
                        <span>cast.name</span>
                        <div>
                            <input class="w-2/5 p-2 mt-2" placeholder="e.g my friend hang out" id="eventName" type="text"
                                v-model="stepOneProps.event_name" @keyup="nameError = stepOneProps.event_name === ''" />
                            <p v-if="nameError" class="text-danger my-2 p-0">>> Name is required</p>
                        </div>
                    </div>
                    <div class="flex flex-col mt-8">
                        <span>cast.description</span>
                        <div>
                            <vs-textarea class="w-2/5 mt-2 txt-desc" id="description" v-model="stepOneProps.description"
                                placeholder="//Cast description" height="70px"
                                @keyup="descriptionError = stepOneProps.description === ''" />
                            <p v-if="descriptionError" class="text-danger my-2 p-0">>> Description is required</p>
                        </div>
                    </div>
                    <div class="flex flex-col mt-8">
                        <span>cast.access</span>
                        <div class="flex flex-col mt-2">
                            <button class="custm-toggle mb-1" @click="toggleSwitch"
                                v-bind:style="stepOneProps.auth_type === 'public' ? 'backgroundColor: #FFFFFF; color: #000000' : 'backgroundColor: #000000; color: #FFFFFF'">access.public</button>
                            <button class="custm-toggle" @click="toggleSwitch"
                                v-bind:style="stepOneProps.auth_type === 'public' ? 'backgroundColor: #000000; color: #FFFFFF' : 'backgroundColor: #FFFFFF; color: #000000'">access.private</button>
                        </div>
                    </div>
                    <vs-button class="mt-8" type="border" @click="handleConfirmDetails">>>save</vs-button>
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
    name: 'EditBasicDetail',
    props: ['closeModal', 'stepOneProps', 'stepTwoProps', 'handleEditCast'],
    components: {
        BaseModal,
    },
    data() {
        return {
            nameError: false,
            descriptionError: false,
        };
    },
    methods: {
        async handleConfirmDetails() {
            if (this.stepOneProps.event_name === '') {
                this.nameError = true;
                return;
            } else if (this.stepOneProps.description === '') {
                this.descriptionError = true;
                return;
            }
            this.handleEditCast();
        },
        toggleSwitch() {
            if (this.stepOneProps.auth_type === 'public') {
                this.stepOneProps.auth_type = 'private'; // Update auth_type to private
                this.stepOneProps.public_otp = false;
                this.stepOneProps.send_otp = true;
            } else {
                this.stepOneProps.auth_type = 'public'; // Update auth_type to public
                this.stepOneProps.send_otp = false;
                this.stepOneProps.password_auth = false;
            }

            // Validation logic
            if (
                this.stepOneProps.event_name === '' ||
                this.stepOneProps.description === '' ||
                (this.stepOneProps.audienceAirdrop &&
                    this.stepOneProps.airdropType === 'NFTs' &&
                    (this.stepOneProps.mint_function_name === '' ||
                        this.stepOneProps.contract_address === '' ||
                        this.stepOneProps.aib === '' ||
                        this.stepOneProps.nft_description === '' ||
                        this.stepOneProps.nft_image === '')) ||
                (this.stepOneProps.auth_type === 'private' &&
                    this.stepOneProps.send_otp === false &&
                    this.stepOneProps.password_auth === false) ||
                (!this.stepOneProps.start_now &&
                    this.stepOneProps.schedule_time_error) ||
                this.stepOneProps.invalidTimeError
            ) {
                this.stepOneProps.event_name_error =
                    this.stepOneProps.event_name === '';
                this.stepOneProps.description_error =
                    this.stepOneProps.description === '';
                if (
                    this.stepOneProps.audienceAirdrop &&
                    this.stepOneProps.airdropType === 'NFTs'
                ) {
                    this.stepOneProps.mintfnc_name_error =
                        this.stepOneProps.mint_function_name === '';
                    this.stepOneProps.contract_address_error =
                        this.stepOneProps.contract_address === '';
                    this.stepOneProps.aib_error = this.stepOneProps.aib === '';
                    this.stepOneProps.nft_image_error =
                        this.stepOneProps.nft_image === '';
                    this.stepOneProps.nft_description_error =
                        this.stepOneProps.nft_description === '';
                }

                if (
                    this.stepOneProps.auth_type === 'private' &&
                    this.stepOneProps.send_otp === false &&
                    this.stepOneProps.password_auth === false
                ) {
                    this.stepOneProps.meeting_auth_error = true;
                }

                this.stepOneProps.public_nft_flow =
                    this.stepOneProps.public_stream_nfts === 'true';
                this.stepOneProps.meeting_type = this.stepOneProps.auth_type;

                if (this.stepOneProps.invalidTimeError) {
                    this.$vs.notify({
                        time: 3000,
                        title: 'Time Error',
                        text: 'Time Should Be In 24 Hours Format',
                        iconPack: 'feather',
                        icon: 'icon-alert-circle',
                        color: 'danger',
                    });
                } else if (this.stepOneProps.schedule_time_error) {
                    this.$vs.notify({
                        time: 3000,
                        title: 'Time Error',
                        text: "Can't create a cast for the past",
                        iconPack: 'feather',
                        icon: 'icon-alert-circle',
                        color: 'danger',
                    });
                } else {
                    if (
                        this.stepOneProps.event_name === '' &&
                        this.stepOneProps.description !== ''
                    ) {
                        this.stepOneProps.event_name =
                            this.stepOneProps.generated_event_title;
                    }
                }
                return false;
            } else {
                this.stepOneProps.meeting_type = this.stepOneProps.auth_type;
                this.stepOneProps.public_nft_flow =
                    this.stepOneProps.public_stream_nfts === 'true';
                window.scroll(0, 0);
                localStorage.setItem('Step1', JSON.stringify(this.stepOneProps));
                return true;
            }
        },
    },
}
</script>

<style scoped>
.txt-desc {
    background-color: #FFFFFF !important;
    border: none !important;
    width: 100%;
    height: 100px;
    border: 1px solid #FFFFFF !important;
    background-color: #FFFFFF !important;
    border-radius: 0px !important;
    color: #000000;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 0px !important;
    padding: 0px;
}

.custm-toggle {
    padding: 0.30rem 0.75rem !important;
    border: 1px solid #FFFFFF;
    outline: none;
    cursor: pointer;
    width: fit-content;
}
</style>