<template>
    <div class="parent_cast_cont_">
        <div class="cast_header flex justify-between items-center w-full h-16 px-4 py-2 z-5 sticky top-0">
            <p class="text-xl font-bold">/cast.details </p>
            <p class="text-red font-bold" v-if="selectedCastId.is_running === 'true'">
                <span class="font-bold text-4xl">.</span> LIVE
            </p>
            <button class="redi_btn" v-if="selectedCastId.isNftGated" @click="goToEventPage">Event page ↗️</button>
        </div>

        <div class="flex flex-col gap-4 text-lg pt-6">
            <h1 class="text-xl font-bold" style="color: #545454 !important;">C:\{{ activeUserInfo.first_name }}\cast.name > <span style="color: #22C55E !important;">{{ selectedCastId.event_name }}</span></h1>
            <p class="basic_detail_cont_">>> Cast Type > <span class="text-white">{{ selectedCastId.cast_type }}</span></p>
            <p class="basic_detail_cont_">>> Total Attendees > <span class="text-white">{{ selectedCastId.invitee_list.length }}</span>
            </p>
            <p class="basic_detail_cont_">>> Scheduled Date > <span class="text-white">{{ selectedCastId.event_date }}</span></p>
            <p class="basic_detail_cont_">>> Scheduled Time > <span class="text-white">{{ selectedCastId.event_time }}</span></p>
            <p class="basic_detail_cont_">>> NFT Drop > <span class="text-white">{{selectedCastId.nft_details_submitted }}</span></p>
            <p class="basic_detail_cont_">>> NFT Gating > <span class="text-white">{{selectedCastId.isNftGated }}</span></p>
            <p class="basic_detail_cont_">>> Live Casting > <span class="text-white">{{ selectedCastId.is_running }}</span></p>
            <p class="basic_detail_cont_">>> Recording available > <span class="text-white">{{ selectedCastId.recording_available
            }}</span></p>
        </div>
    </div>
</template>

<script>
export default {
    name: "CastDetails",
    props: ['selectedCastId','firstCastId'],
    computed: {
        activeUserInfo() {
            return this.$store.state.AppActiveUser;
        },
    },
    methods: {
        goToEventPage() {
            const url = `https://decast.live/cast/nft-gated/${this.selectedCastId.public_meeting_id}`;
            window.open(url, '_blank');
        },
    },
    mounted() {
        this.selectedCastId=this.firstCastId;
    },
}
</script>

<style scoped>
* {
  font-family: 'JetBrains Mono', monospace !important;
}
.cast_header {
    background-color: #272727;
}

.basic_detail_cont_ {
    color: #545454;
}

.parent_cast_cont_{
    /* overflow:scroll; */
}
.redi_btn{
    background-color: transparent;
    outline: none;
    border: none;
    color: violet;
    font-size: 16px;
    cursor: pointer;
}
</style>