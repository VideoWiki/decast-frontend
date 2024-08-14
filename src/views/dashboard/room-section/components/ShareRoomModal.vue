<template>
    <BaseModal :title="'Share Room'" @close="closeModal">
        <template #modalContent>
            <div>
                <div class="text">User email</div>
                <div class="input">
                    <input placeholder="Email" type="text" v-model="email" />
                </div>
                <div class="button">
                    <vs-button @click="handleShareRoom">
                        Share room
                    </vs-button>
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
            email: "",
        }
    },
    components: {
        BaseModal,
    },
    methods: {
        handleShareRoom() {
            const options = {
                method: 'POST',
                url: 'https://api.room.video.wiki/api/share/room/',
                data: {
                    public_id: this.room.room_url.split('/').pop(),
                    user: this.email,
                },
            };
            //console.log(options)

            axios
                .request(options)
                .then((response) => {
                    this.$vs.notify({
                        color: 'success',
                        title: 'Success',
                        text: 'room shared successfully',
                    });
                })
                .catch(function (error) {
                    ////console.log(error);
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