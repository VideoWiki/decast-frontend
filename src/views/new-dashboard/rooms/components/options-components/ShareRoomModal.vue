<template>
    <BaseModal :title="'Share Room'" @close="closeModal">
        <template #modalContent>
            <div class="modal-content-wrapper">
                <div class="modal-content">
                    <div class="modal-heading">
                        <h3>Share room with your friends</h3>
                    </div>
                    <div class="flex flex-col mt-8">
                        <span>user.email</span>
                        <div>
                            <input class="w-2/5 p-2 mt-2" placeholder="email" type="text" v-model="email" @keyup="emailError = false"/>
                            <!-- <p v-if="nameError" class="text-danger my-2 p-0">>> Name is required</p> -->
                        </div>
                        <p v-if="emailError" class="text-danger my-2 p-0">Email id {{ email }} is not registered with decast</p>
                    </div>
                    <vs-button class="mt-8" type="border" v-if="isLoading">>>sharing room...</vs-button>
                    <vs-button class="mt-8" type="border" v-else @click="handleShareRoom">>>confirm</vs-button>
                </div>
                <div class="cast-modal-bottom">
                    <p>>> Share Room > <span>This action will make the added user to access this room</span></p>
                </div>
            </div>
        </template>
    </BaseModal>
</template>

<script>
import BaseModal from "@/components/common/BaseModal.vue";
import axios from '@/axios';

export default {
    name: 'ShareRoomModal',
    props: ['room', 'closeModal'],
    data() {
        return {
            email: '',
            isLoading: false,
            emailError: false,
        }
    },
    components: {
        BaseModal,
    },
    methods: {
        handleShareRoom() {
            this.isLoading = true;
            this.$store
                .dispatch('room/checkUserExist', { email: this.email, cast_id: this.room.room_url.split('/').pop() })
                .then(async (res) => {
                    if (res && res.status === 200) {
                        const options = {
                            method: 'POST',
                            url: 'https://api.room.video.wiki/api/share/room/',
                            data: {
                                public_id: this.room.room_url.split('/').pop(),
                                user: this.email,
                            },
                        };
                        axios
                            .request(options)
                            .then((response) => {
                                this.isLoading = false;
                                this.$vs.notify({
                                    color: 'success',
                                    title: 'Success',
                                    text: 'room shared successfully',
                                });
                                this.closeModal();
                            })
                            .catch(function (error) {
                                this.isLoading = false;
                                ////console.log(error);
                            });
                    }else{
                        this.isLoading = false;
                        this.emailError = true;
                    }
                })
                .catch((e) => {
                    this.isLoading = false;
                    //console.log("User does not exist");
                });
        },
    },
}
</script>

<style scoped>
.text {
    color: #a6a6a8;
    font-weight: 'regular';
    font-size: 14px;
    font-family: 'Karla', sans-serif;
}

.input input {
    margin-top: 14px;
    height: 45px;
    width: 100%;
    background-color: #18191b;
    border: 1px solid #31394e;
    padding: 20px;
    color: #a6a6a8;
    border-radius: 6px;
    border: 1px solid #31394e;
}

.button {
    display: flex;
    justify-content: flex-end;
    padding-top: 20px;
}
</style>