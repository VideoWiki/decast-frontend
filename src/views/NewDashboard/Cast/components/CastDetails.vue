<template>
    <div class="parent_cast_cont_">
        <div class="cast_header flex justify-between items-center w-full h-16 px-4 py-2 z-5 sticky top-0">
            <p class="text-xl font-bold">/cast.details</p>
            <p class="text-red font-bold">
                <span class="font-bold text-4xl">.</span> LIVE
            </p>
        </div>

        <div class="flex flex-col gap-4 text-lg pt-6">
            <h1 class="text-xl font-bold" style="color: #545454 !important;">C:\{{ activeUserInfo.first_name }}\cast.name > <span style="color: #22C55E !important;">{{ selectedCastId.name }}</span></h1>
            <p class="basic_detail_cont_">>> Cast Type > <span class="text-white">{{ selectedCastId.type }}</span></p>
            <p class="basic_detail_cont_">>> Total Attendees > <span class="text-white">{{ selectedCastId.attendee }}</span>
            </p>
            <p class="basic_detail_cont_">>> Scheduled Date > <span class="text-white">{{ selectedCastId.date }}</span></p>
            <p class="basic_detail_cont_">>> Scheduled Time > <span class="text-white">{{ selectedCastId.time }}</span></p>
            <p class="basic_detail_cont_">>> NFT Drop > <span class="text-white">{{selectedCastId.nftEnable }}</span></p>
            <p class="basic_detail_cont_">>> Live Casting > <span class="text-white">{{ selectedCastId.isLive }}</span></p>
            <p class="basic_detail_cont_">>> Recording available > <span class="text-white">{{ selectedCastId.recording
            }}</span></p>
        </div>
    </div>
</template>

<script>
export default {
    name: "CastDetails",
    props: ['selectedCastId'],
    computed: {
        activeUserInfo() {
            return this.$store.state.AppActiveUser;
        },
    },
    methods: {
        getCastDetail() {
        }
    },
}
</script>

<style scoped>
.cast_header {
    background-color: #272727;
}

.basic_detail_cont_ {
    color: #545454;
}

.parent_cast_cont_{
    /* overflow:scroll; */
}
</style>