<template>
    <BaseModal :title="'Room'" @close="closeModal">
        <template #modalContent>
            <div class="modal-content-wrapper">
                <div class="modal-content">
                    <div class="modal-heading">
                        <h3>Edit cast code</h3>
                    </div>
                    <!-- <div class="flex flex-col mt-8">
                        <span>cast.Attendee.Url</span>
                        <div class="flex items-center">
                            <p>https://decast.live/</p>
                            <input class="py-2 pr-4 mt" placeholder="custom_room_code" type="text"
                                v-model="newShortCodes.attendee" />
                        </div>
                    </div> -->
                    <div v-for="(shortcode, type) in newShortCodes" class="flex flex-col mt-8">
                        <span>cast.{{ type }}.url</span>
                        <div class="flex items-center">
                            <p>https://decast.live/</p>
                            <input class="py-2 pr-4 mt" placeholder="custom_room_code" type="text"
                                v-model="newShortCodes[type]" @keyup="fieldsError = newShortCodes[type] === ''"/>
                            <!-- <p v-if="nameError" class="text-danger my-2 p-0">>> Name is required</p> -->
                        </div>
                    </div>
                    <vs-button class="mt-8" type="border" v-if="isLoading">>>saving...</vs-button>
                    <vs-button class="mt-8" type="border" v-else @click="handleSaveUrl">>>save</vs-button>
                </div>
                <div class="cast-modal-bottom">
                    <p>>> Edit url > <span>Add your custom joining code</span></p>
                </div>
            </div>
        </template>
    </BaseModal>
</template>

<script>
import BaseModal from "@/components/common/BaseModal.vue";

export default {
    name: 'CustomCastUrl',
    props: ['closeModal', 'castDetails', 'getCastList'],
    data() {
        return {
            isLoading: false,
            shortCodes: {},
            newShortCodes: {},
            fieldsError: false,
        };
    },
    components: {
        BaseModal,
    },
    methods: {
        handleSaveUrl() {
            const dispatchPromises = [];
            if(this.fieldsError){
                this.$vs.notify({
                    title: '😕',
                    text: "Fields can't be empty",
                    color: 'danger',
                });
                return;
            }

            Object.entries(this.newShortCodes).forEach(([key, value]) => {
                if (this.shortCodes[key] !== this.newShortCodes[key]) {
                    dispatchPromises.push(this.$store.dispatch('cast/changeShortCode', {
                        short_code: this.shortCodes[key],
                        new_custom_code: this.newShortCodes[key],
                        cast_id: this.castDetails.public_meeting_id,
                    }));
                }
            });
            Promise.all(dispatchPromises)
                .then(() => {
                    this.$vs.notify({
                        title: 'Successful',
                        text: 'Cast Url updated',
                        color: 'success',
                    });
                    this.getCastList();
                    this.closeModal();
                })
                .catch(error => {
                    this.$vs.notify({
                        title: 'Error',
                        text: 'Shortcode is already in use, Please try different shortcode',
                        color: 'danger',
                    });
                    console.error('Error in dispatch:', error);
                });
        }
    },
    mounted() {
        this.castDetails.short_codes.sort((a, b) => a.type.localeCompare(b.type));
        this.castDetails.short_codes.forEach(item => {
            this.$set(this.shortCodes, item.type, item.short_code);
            this.$set(this.newShortCodes, item.type, item.short_code);
        });
    },
};
</script>
  
<style scoped></style>
  