<template>
    <div class="parent_cast_cont_">
        <div class="room_header flex justify-between items-center w-full h-16 px-4 py-2 z-5 sticky top-0">
            <p class="text-xl font-bold">/room.details</p>
            <p class="text-red font-bold">
                <span class="font-bold text-4xl">.</span> LIVE
            </p>
        </div>

        <div class="flex flex-col gap-4 text-lg pt-6">
            <h1 class="text-xl font-bold" style="color: #545454 !important;">C:\{{ activeUserInfo.first_name }}\room.name > <span style="color: #22C55E !important;">{{ selectedRoomDetails.room_name }}</span></h1>
            <p class="basic_detail_cont_">>> Room Type > <span class="text-white">{{ selectedRoomDetails.type }}</span></p>
        </div>
    </div>
</template>

<script>
import axios from '@/axios';
export default {
    name: 'RoomDetails',
    props: ['selectedRoomDetails','firstRoomId'],
    computed: {
        activeUserInfo() {
            return this.$store.state.AppActiveUser;
        },
    },
    mounted() {
        this.selectedRoomDetails=this.firstRoomId;
    },
}
</script>

<style scoped>
.room_header {
    background-color: #272727;
}

.basic_detail_cont_ {
    color: #545454;
}
</style>
