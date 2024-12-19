<template>
    <BaseModal :title="'Branding Details'" @close="closeModal">
        <template #modalContent>
            <div class="modal-content-wrapper">
                <div class="modal-content">
                    <div class="modal-heading">
                        <h3>Room Branding</h3>
                    </div>
                    <div>
                        <div class="logo-img">
                            <button class="clear-img-btn" @click.stop="handleLogoRemove">
                                <vx-tooltip :text="'set default logo'" position="top">x</vx-tooltip>
                            </button>
                            <img :src="room_logo" alt="LogoImage" @click="handleLogoUpload" />
                        </div>
                        <label class="custm-clr-label mt-1">/* Click to upload your logo */</label>
                    </div>
                    <div class="input-banner-btn mt-8" @click="handleBannerUpload">
                        <button class="clear-img-btn" v-if="room_cover_image" @click.stop="handleBannerRemove">
                            <vx-tooltip :text="'remove'">x</vx-tooltip>
                        </button>
                        <div class="button-text">
                            <p for="fileInput" v-if="!room_cover_image" class="text-one">
                                /* <br>Click to upload or drag and drop your brand cover image <br>*/
                            </p>
                            <p v-if="!room_cover_image" class="text-two">
                                jpg, jpeg, png, or gif (recommended size 1440px by 600px)
                            </p>
                        </div>
                        <!-- <input type="file" id="fileInput" @change="handleBannerUpload" accept="image/*"
                            style="display: none" ref="fileInput" /> -->
                        <img v-if="room_cover_image" :src="room_cover_image" alt="Uploaded Image"
                            style="cursor: pointer" />
                    </div>
                    <div class="choose-color mt-8">
                        <label class="text">brand.color</label>
                        <ColorPicker class="mt-2" :stepTwoProps="stepTwoProps" />
                    </div>
                    <vs-button class="mt-8" type="border" @click="handleConfirmBranding">>>confirm</vs-button>
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
    name: 'RoomBrandingModal',
    props: ['closeModal', 'roomDetails', 'getRoomList'],
    components: {
        BaseModal,
        ColorPicker,
    },
    data() {
        return {
            room_logo: this.roomDetails.logo,
            room_cover_image: this.roomDetails.cover_image,
            logo_formData: null,
            banner_formData: null,
            stepTwoProps: {
                primary_color: this.roomDetails.primary_color,
            }
        };
    },
    methods: {
        handleLogoUpload() {
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'image/*';
            fileInput.onchange = (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        this.room_logo = event.target.result;
                        this.logo_formData = file;
                    };
                    reader.readAsDataURL(file);
                }
            };
            fileInput.click();
        },
        handleBannerUpload() {
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'image/*';
            fileInput.onchange = (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        this.room_cover_image = event.target.result;
                        this.banner_formData = file;
                    };
                    reader.readAsDataURL(file);
                }
            };
            fileInput.click();
        },
        async handleConfirmBranding() {
            const formData = new FormData();
            formData.append("room_id", this.roomDetails.room_id);
            if (this.logo_formData) {
                formData.append("logo", this.logo_formData);
            }
            if (this.banner_formData !== null) {
                formData.append("cover_image", this.banner_formData);
            }
            if (this.stepTwoProps.primary_color !== this.roomDetails.primary_color) {
                formData.append("primary_color", this.stepTwoProps.primary_color);
            }
            try {
                const response = await fetch("https://api.room.video.wiki/api/update/room/details/", {
                    method: 'PATCH',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    },
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error("Failed to upload image");
                }

                const data = await response.json();
                // this.imageUrl = data.updatedImageUrl;
                this.$vs.notify({
                    title: 'Success!',
                    text: 'Room branding updated...',
                    color: 'success',
                });
                this.getRoomList();
            } catch (error) {
                this.$vs.notify({
                    title: 'Error updating room!',
                    text: 'Please again later...',
                    color: 'danger',
                });
                console.error("Error uploading image:", error);
            }
        },
        handleLogoRemove() {
            let img = require('@/assets/images/logot.svg');
            fetch(img)
                .then(response => response.blob()) // Convert the image URL to a Blob
                .then(blob => {
                    // Create a File object from the Blob
                    const file = new File([blob], "logot.svg", { type: "image/svg+xml" }); 
                    // Assign it to your variables
                    this.room_logo = img; // URL for display (if needed)
                    this.logo_formData = file; // File object for payload
                })
                .catch(error => {
                    console.error("Error creating File object:", error);
                });
        },
        handleBannerRemove() {
            this.room_cover_image = '';
            this.banner_formData = '';
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
    position: relative;
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
    position: relative;
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

.clear-img-btn {
    position: absolute;
    height: 24px;
    width: 24px;
    border-radius: 50%;
    top: -5px;
    right: -5px;
    background-color: #000000;
    color: #FFFFFF;
    border: 1px solid #FFFFFF;
    cursor: pointer;
}
</style>