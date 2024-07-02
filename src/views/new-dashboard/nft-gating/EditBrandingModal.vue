<template>
    <BaseModal :title="'Branding'" @close="closeModal">
        <template #modalContent>
            <div class="modal-content-wrapper">
                <div class="modal-content">
                    <div class="modal-heading">
                        <h3>Edit Branding Details</h3>
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
                        <input type="file" id="fileInput" @change="handleBannerUpload" accept="image/*"
                            style="display: none" ref="fileInput" />
                        <img v-if="imageSelected" :src="imageUrl" alt="Uploaded Image" style="cursor: pointer" />
                    </div>
                    <div class="choose-color mt-8">
                        <label class="text">brand.color</label>
                        <EventColorPicker class="mt-2" :castDetails="castDetails"/>
                    </div>
                    <vs-button class="mt-8" type="border" @click="handleEditCast">>>save</vs-button>
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
import EventColorPicker from './components/EventColorPicker.vue';

export default {
    name: 'EditBrandingDetail',
    props: ['closeModal', 'castDetails', 'getMeetingDetails'],
    components: {
        BaseModal,
        EventColorPicker,
    },
    data() {
        return {
            img1Src: this.castDetails.logo,
            logoImg: this.castDetails.logo,
            imageSelected: false,
            imageUrl: '',
        };
    },
    mounted() {
        var img;
        if (this.castDetails.cover_image !== '') {
            this.imageUrl = this.castDetails.cover_image;
            this.imageSelected = true;
        }
        if (this.castDetails.logo === '') {
            img = require('@/assets/images/logot.svg');
            this.img1Src = img;
            this.logoImg = img;
        } else {
            img = URL.createObjectURL(this.castDetails.logo);
            this.img1Src = img;
            this.logoImg = img;
        }
    },
    methods: {
        handleEditCast() {
            this.$vs.loading();
            var data = new FormData();
            data.append('cast_id', this.castDetails.public_meeting_id);
            data.append('logo', this.castDetails.logo);
            data.append('cover_image', this.castDetails.cover_image);
            data.append('primary_color', this.castDetails.primary_color);
            this.$store
                .dispatch('cast/formSubmit', data)
                .then((response) => {
                    setTimeout(() => {
                        this.$vs.loading.close();
                    }, 5000);
                    this.getMeetingDetails();
                    this.$vs.notify({
                        title: 'Success',
                        text: response.data.message,
                        color: 'success',
                    });
                    this.closeModal();
                })
                .catch((error) => {
                    this.$vs.loading.close();
                    if (error) {
                        this.$vs.notify({
                            title: 'Error!',
                            text: error.response.data.message,
                            color: 'danger',
                        });
                    } else {
                        this.$vs.notify({
                            title: 'Fields Missing!',
                            text: 'Some Fields are Missing',
                            color: 'danger',
                        });
                    }
                });
        },
        handleBannerUpload(event) {
            const file = event.target.files[0];
            if (file) {
                // Assuming you are using FileReader to display the uploaded image
                const reader = new FileReader();
                reader.onload = () => {
                    this.imageSelected = true;
                    this.imageUrl = reader.result;
                    this.castDetails.cover_image = event.target.files[0];
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
                        this.castDetails.logo = file;
                    };
                    reader.readAsDataURL(file);
                }
            };
            fileInput.click();
        },
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

.logo-img img {
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

.input-banner-btn img {
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