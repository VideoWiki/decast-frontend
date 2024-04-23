<template>
    <BaseModal :title="'Branding Details'" @close="closeModal">
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
                    </div>
                    <div class="modal-heading">
                        <h3>3.Branding Details (Optional)</h3>
                    </div>
                    <div>
                        <div class="logo-img">
                            <img :src="logoImg" @click="handleLogoUpload" />
                        </div>
                        <label class="custm-clr-label mt-1">/* Click to upload your logo */</label>
                    </div>
                    <div class="input-banner-btn mt-8" @click="triggerFileInput">
                        <div class="button-text">
                            <p for="fileInput" v-if="!imageSelected" class="text-one">
                                /* <br>Click to upload or drag and drop your brand cover image <br>*/
                            </p>
                            <p v-if="!imageSelected" class="text-two">
                                jpg, jpeg, png, or gif (recommended size 1440px by 600px)
                            </p>
                        </div>
                        <input type="file" id="fileInput" @change="handleBannerUpload" accept="image/*" style="display: none"
                            ref="fileInput" />
                        <img v-if="imageSelected" :src="imageUrl" alt="Uploaded Image" style="cursor: pointer" />
                    </div>
                    <div class="choose-color mt-8">
                        <label class="text">brand.color</label>
                        <ColorPicker class="mt-2" :stepTwoProps="stepTwoProps" />
                    </div>
                    <vs-button v-if="castType === 'branded-cast'" class="mt-8" type="border" @click="handleConfirmBranding">>>create</vs-button>
                    <vs-button v-else class="mt-8" type="border" @click="handleConfirmBranding">>>confirm</vs-button>
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
import ColorPicker from '@/views/new-dashboard/components/ColorPicker.vue';

export default {
    name: 'CastBrandingModal',
    props: ['closeModal', 'createCast', 'castType', 'setActiveModal', 'stepOneProps', 'stepTwoProps'],
    components: {
        BaseModal,
        ColorPicker,
    },
    data() {
        return {
            img1Src: this.stepTwoProps.logo,
            logoImg: this.stepTwoProps.logo,
            imageSelected: false,
            imageUrl: '',
        };
    },
    mounted() {
        var img;
        if (this.stepTwoProps.logo === '') {
            img = require('@/assets/images/logot.svg');
            this.img1Src = img;
            this.logoImg = img;
        } else {
            img = URL.createObjectURL(this.stepTwoProps.logo);
            this.img1Src = img;
            this.logoImg = img;
        }
    },
    methods: {
        handleBannerUpload(event) {
            const file = event.target.files[0];
            if (file) {
                // Assuming you are using FileReader to display the uploaded image
                const reader = new FileReader();
                reader.onload = () => {
                    this.imageSelected = true;
                    this.imageUrl = reader.result;
                    this.stepTwoProps.cover_image = event.target.files[0];
                };
                reader.readAsDataURL(file);
            }
        },
        triggerFileInput() {
            // Trigger the file input click when the image is clicked
            this.$refs.fileInput.click();
        },
        handleLogoUpload() {
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'image/*';
            fileInput.onchange = (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        this.logoImg = event.target.result;
                        this.img1Src = event.target.result;
                        console.log(file);
                        this.stepTwoProps.logo = file;
                    };
                    reader.readAsDataURL(file);
                }
            };
            fileInput.click();
        },
        async handleConfirmBranding(){
            if (this.castType === 'branded-cast') {
                await this.createCast();
                this.setActiveModal('castInviteModal');
            } else {
                this.setActiveModal('castAdvancedModal')
            }
        }
    }
}
</script>

<style scoped>
.logo-img {
    border: 1px dashed #FFFFFF;
    height: 90px;
    width: 90px;
    margin-top: 1rem;
    margin-bottom: 0.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
.logo-img img{
    height: 90px;
    width: 90px;
    object-fit: contain;
}

.custm-clr-label {
    color: #64748B;
    font-size: 12px;
}

.input-banner-btn {
    border: 1px dashed #FFFFFF;
    height: 140px;
    width: 350px;
    cursor: pointer;
}
.input-banner-btn img{
    height: 140px;
    width: 350px;
    object-fit: contain;
}

.text-one {
    color: #5B96EB;
    font-size: 12px;
    padding: 0.5rem 1.2rem 0rem 1.2rem;
}

.text-two {
    color: #64748B;
    font-size: 12px;
    padding: 0 1.2rem 0.5rem 1.2rem;
}
</style>